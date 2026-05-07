/**
 * Seed Batch F1-9: Air Jordan 1 Mid Gym Red — Pre-Owned, Size 10.5.
 * $31 Whatnot pull from fragmented_soles "$50,000 OF HEAT AT $1 / FREE
 * JORDANS" livestream (24 Oct 2025), lot CB491. Pre-owned with OG box.
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
const FOLDER = "/tmp/db-batchF/f1-9-aj1-mid-gym-red-105-pre-owned";
const SLUG = "air-jordan-1-mid-gym-red-pre-owned-sz105";
const NAME = "Air Jordan 1 Mid Gym Red — Pre-Owned (Size 10.5)";

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
  if (existing) { console.log("Already exists. Aborting."); return; }
  const imageUrls = await uploadCatalogImages();
  if (imageUrls.length === 0) { process.exit(1); }
  const COST_PRICE = 31;
  const SELLING_PRICE = 110;
  const { data: product, error: prodErr } = await supabase.from("products").insert({
    slug: SLUG, name: NAME, cost_price: COST_PRICE, selling_price: SELLING_PRICE,
    shipping_cost: 12, tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
    currency: "USD", category: "sneakers",
    description: "Air Jordan 1 Mid in the 'Gym Red Black' colorway — white tumbled-leather toe and quarter panels with black overlays and Swoosh, Gym Red trim accent stripe, sail-cream midsole, black/red heel collar with Wings logo. Pre-owned with original Nike Jordan box. Size US M 10.5.",
    short_description: "Pre-owned with original Nike box",
    status: "in_stock", quantity: 1, featured: false, box_number: "F1-9",
    tags: ["nike","jordan","air-jordan-1","aj1-mid","gym-red","black","white","red","size-10-5","pre-owned","whatnot-pull"],
    images: imageUrls,
    specs: {
      Brand: "Nike / Jordan", Model: "Air Jordan 1 Mid",
      Color: "Gym Red / Black / White", Size: "10.5",
      Condition: "Pre-Owned",
      Source: "Whatnot — fragmented_soles CB491",
    },
  }).select("id").single();
  if (prodErr || !product) { console.error(`✗ ${prodErr?.message}`); process.exit(1); }
  console.log(`✓ product id=${product.id}`);

  const heic = path.join(FOLDER, "_receipt", "IMG_5911.HEIC");
  if (existsSync(heic)) {
    const jpg = heic.replace(/\.HEIC$/i, ".jpg");
    if (!existsSync(jpg)) execSync(`sips -s format jpeg "${heic}" --out "${jpg}" 2>/dev/null`);
    const sp = `batchF/${SLUG}.jpg`;
    const { error } = await supabase.storage.from("receipts").upload(sp, readFileSync(jpg), { upsert: true, contentType: "image/jpeg" });
    if (!error) {
      const ru = supabase.storage.from("receipts").getPublicUrl(sp).data.publicUrl;
      const { data: r } = await supabase.from("receipts").insert({
        file_url: ru, vendor: "Whatnot — fragmented_soles", purchase_date: "2025-10-24", total_amount: COST_PRICE,
        notes: "Whatnot packing slip — order #600302288 from fragmented_soles' '$50,000 OF HEAT AT $1 / FREE JORDANS' livestream on 24 October 2025. Listed as 'AIR JORDAN 1 MID GYM RED — SIZE 10.5 PRE OWNED ORIGINAL BOX — CB491'. Won for $31.",
      }).select("id").single();
      if (r) await supabase.from("receipt_items").insert({ receipt_id: r.id, product_id: product.id, item_name: NAME, quantity: 1, unit_price: COST_PRICE });
      console.log(`✓ receipt id=${r?.id}`);
    }
  }
  console.log("\nDone.");
}
main().catch((e) => { console.error(e); process.exit(1); });
