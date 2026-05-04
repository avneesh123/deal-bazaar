/**
 * Seed Batch F1-7: Adidas VL Court 3.0 Navy / Light Blue — Size US 9.5.
 * $24 Whatnot pull #273 from fulfilledbymama "$1 STARTS RAPID FIRE NIKE
 * ADIDAS JORDAN!! BUNDLE SHIPPING" (16 Oct 2025), order #583687519.
 * Brand new with original Adidas box (box was bundled-shipped, slightly damaged).
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
const FOLDER = "/tmp/db-batchF/f1-7-adidas-vl-court-navy-sz95";
const SLUG = "adidas-vl-court-navy-light-blue-sz95";
const NAME = "Adidas VL Court Navy / Light Blue (Size 9.5)";

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
  if (existing) { console.log(`Already exists. Aborting.`); return; }
  console.log("☁️  uploading catalog images...");
  const imageUrls = await uploadCatalogImages();
  if (imageUrls.length === 0) { process.exit(1); }
  const COST_PRICE = 24;
  const SELLING_PRICE = 60;
  console.log("\n📝 inserting product...");
  const { data: product, error: prodErr } = await supabase.from("products").insert({
    slug: SLUG, name: NAME, cost_price: COST_PRICE, selling_price: SELLING_PRICE,
    shipping_cost: 12, tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
    currency: "USD", category: "sneakers",
    description: "Adidas VL Court (3.0) in Navy / Light Blue — navy nubuck-finish synthetic upper with light-blue 3-stripes and matching light-blue heel patch, navy laces, light-blue printed tongue label, gum rubber cupsole. Brand new with original Adidas box. Size US 9.5.",
    short_description: "Brand new with OG box (slightly damaged from bundle ship)",
    status: "in_stock", quantity: 1, featured: false, box_number: "F1-7",
    tags: ["adidas","vl-court","navy","light-blue","gum-sole","size-9-5","whatnot-pull"],
    images: imageUrls,
    specs: {
      Brand: "Adidas",
      Model: "VL Court 3.0 (likely)",
      Color: "Navy / Light Blue",
      Size: "9.5",
      Condition: "Brand New",
      Source: "Whatnot — fulfilledbymama pull #273",
    },
  }).select("id").single();
  if (prodErr || !product) { console.error(`✗ product: ${prodErr?.message ?? "no row"}`); process.exit(1); }
  console.log(`✓ product id=${product.id}`);

  const heic = path.join(FOLDER, "_receipt", "IMG_5894.HEIC");
  if (existsSync(heic)) {
    const jpg = heic.replace(/\.HEIC$/i, ".jpg");
    if (!existsSync(jpg)) execSync(`sips -s format jpeg "${heic}" --out "${jpg}" 2>/dev/null`);
    const storagePath = `batchF/${SLUG}.jpg`;
    const { error } = await supabase.storage.from("receipts").upload(storagePath, readFileSync(jpg), { upsert: true, contentType: "image/jpeg" });
    if (!error) {
      const receiptUrl = supabase.storage.from("receipts").getPublicUrl(storagePath).data.publicUrl;
      const { data: receipt } = await supabase.from("receipts").insert({
        file_url: receiptUrl, vendor: "Whatnot — fulfilledbymama", purchase_date: "2025-10-16", total_amount: COST_PRICE,
        notes: "Whatnot packing slip — order #583687519 (bundled with #583688701 = F1-8 Run 80s) from fulfilledbymama's '$1 STARTS RAPID FIRE NIKE ADIDAS JORDAN!! BUNDLE SHIPPING' livestream on 16 October 2025. Listed as 'RANDOM SNEAKER PULL!! #273 — LISTEN FOR DETAILS — Condition: New'. Won for $24. Box label confirms size 9.5.",
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
