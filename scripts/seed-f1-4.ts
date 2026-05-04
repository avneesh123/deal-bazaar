/**
 * Seed Batch F1-4: Air Jordan 1 Low SE "Tokyo Bio Hack" — Pre-Owned, no box.
 * Size 7Y (= Women's 8.5). $63 Whatnot pull from fragmented_soles
 * "500+ PAIRS AT $1 + FREE SHOES ALL STREAM" (26 Oct 2025), lot BY505.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync, readdirSync } from "fs";
import { execSync } from "child_process";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const raw of readFileSync(envPath, "utf-8").split("\n")) {
    const line = raw.replace(/\r/g, "");
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  }
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const FOLDER = "/tmp/db-batchF/f1-4-aj1-low-tokyo-bio-hack-7y";
const SLUG = "air-jordan-1-low-se-tokyo-bio-hack-pre-owned-7y";
const NAME = "Air Jordan 1 Low SE Tokyo Bio Hack — Pre-Owned (7Y / W 8.5)";

async function uploadCatalogImages(): Promise<string[]> {
  const dir = path.join(FOLDER, "catalog");
  const files = readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
  const urls: string[] = [];
  for (const f of files) {
    const storagePath = `products/batchF/${SLUG}/${f}`;
    const { error } = await supabase.storage.from("images").upload(storagePath, readFileSync(path.join(dir, f)), { upsert: true, contentType: "image/png" });
    if (error) { console.error(`  ✗ ${f}: ${error.message}`); continue; }
    urls.push(supabase.storage.from("images").getPublicUrl(storagePath).data.publicUrl);
    console.log(`  ✓ ${f}`);
  }
  return urls;
}

async function main() {
  console.log(`\n📦 ${NAME} (${SLUG})\n`);
  const { data: existing } = await supabase.from("products").select("id").eq("slug", SLUG).maybeSingle();
  if (existing) { console.log(`Already exists (id=${existing.id}). Aborting.`); return; }
  console.log("☁️  uploading catalog images...");
  const imageUrls = await uploadCatalogImages();
  if (imageUrls.length === 0) { process.exit(1); }
  const COST_PRICE = 63;
  const SELLING_PRICE = 130;
  console.log("\n📝 inserting product...");
  const { data: product, error: prodErr } = await supabase.from("products").insert({
    slug: SLUG, name: NAME, cost_price: COST_PRICE, selling_price: SELLING_PRICE,
    shipping_cost: 12, tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
    currency: "USD", category: "sneakers",
    description: "Air Jordan 1 Low SE in the 'Tokyo Bio Hack' colorway — distinctive multi-panel makeup with a soft pink suede toe, mauve/taupe quarter panels, deep purple back panel, sunburst-yellow tongue tag and Jumpman, black side overlay and Swoosh outlined in white, sail/cream midsole, black rubber outsole. Pre-owned condition, sold WITHOUT the original box. Size 7Y (Women's US 8.5). Style code DX4334-200.",
    short_description: "Pre-owned — no box",
    status: "in_stock", quantity: 1, featured: false, box_number: "F1-4",
    tags: ["nike","jordan","air-jordan-1","aj1-low-se","tokyo-bio-hack","mauve","pink","yellow","purple","pre-owned","no-box","size-7y","whatnot-pull"],
    images: imageUrls,
    specs: {
      Brand: "Nike / Jordan", Model: "Air Jordan 1 Low SE",
      Color: "Tokyo Bio Hack (Mauve / Pink / Yellow / Purple / Black)",
      Size: "7Y (W 8.5)", Condition: "Pre-Owned (no box)",
      "Style Code": "DX4334-200",
      Source: "Whatnot — fragmented_soles BY505",
    },
  }).select("id").single();
  if (prodErr || !product) { console.error(`✗ product: ${prodErr?.message ?? "no row"}`); process.exit(1); }
  console.log(`✓ product id=${product.id}`);

  const heic = path.join(FOLDER, "_receipt", "IMG_5883.HEIC");
  if (existsSync(heic)) {
    const jpg = heic.replace(/\.HEIC$/i, ".jpg");
    if (!existsSync(jpg)) execSync(`sips -s format jpeg "${heic}" --out "${jpg}" 2>/dev/null`);
    const storagePath = `batchF/${SLUG}.jpg`;
    const { error } = await supabase.storage.from("receipts").upload(storagePath, readFileSync(jpg), { upsert: true, contentType: "image/jpeg" });
    if (!error) {
      const receiptUrl = supabase.storage.from("receipts").getPublicUrl(storagePath).data.publicUrl;
      const { data: receipt } = await supabase.from("receipts").insert({
        file_url: receiptUrl, vendor: "Whatnot — fragmented_soles", purchase_date: "2025-10-26", total_amount: COST_PRICE,
        notes: "Whatnot packing slip — order #603586018 from fragmented_soles' '500+ PAIRS AT $1 + FREE SHOES ALL STREAM' livestream on 26 October 2025. Listed as 'AIR JORDAN 1 LOW TOKYO BIO HACK — SIZE 7Y (8.5W) PRE OWNED NO BOX — BY505'. Won for $63.",
      }).select("id").single();
      if (receipt) {
        await supabase.from("receipt_items").insert({ receipt_id: receipt.id, product_id: product.id, item_name: NAME, quantity: 1, unit_price: COST_PRICE });
        console.log(`✓ receipt id=${receipt.id} linked`);
      }
    }
  }
  console.log("\nDone.");
}
main().catch((e) => { console.error(e); process.exit(1); });
