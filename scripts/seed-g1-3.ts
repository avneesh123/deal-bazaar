/**
 * Seed Batch F1-11: Nike NOCTA Air Zoom Drive BLACK — M 10.5.
 * $60 Whatnot pull #8 from stewsshoes "FREE TRAVIS SCOTT + 500 SHOES AT $1"
 * livestream (3 Nov 2025). NOTE: Listing on slip says "NOCTA WHITE SZ 10.5"
 * but the actual delivered shoe is the BLACK colorway in size 10.5 — likely
 * a seller mismark. Box label confirms M 10.5.
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
const FOLDER = "/tmp/db-batchF/f1-11-nocta-zoom-drive-black-m105";
const SLUG = "nike-nocta-air-zoom-drive-black-m105";
const NAME = "Nike NOCTA Air Zoom Drive Black (M 10.5)";

async function uploadCatalogImages(): Promise<string[]> {
  const dir = path.join(FOLDER, "catalog");
  const files = readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
  const urls: string[] = [];
  for (const f of files) {
    const sp = `products/batchF/${SLUG}/${f}`;
    const { error } = await supabase.storage.from("images").upload(sp, readFileSync(path.join(dir, f)), { upsert: true, contentType: "image/png" });
    if (error) { console.error(`  ✗ ${f}: ${error.message}`); continue; }
    urls.push(supabase.storage.from("images").getPublicUrl(sp).data.publicUrl);
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
  const COST_PRICE = 60;
  const SELLING_PRICE = 165;
  const { data: product, error: prodErr } = await supabase.from("products").insert({
    slug: SLUG, name: NAME, cost_price: COST_PRICE, selling_price: SELLING_PRICE,
    shipping_cost: 14, tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
    currency: "USD", category: "sneakers",
    description: "Nike x NOCTA Air Zoom Drive in the Black / Triple Black colorway — Drake's NOCTA collab. Black engineered mesh and synthetic upper with white-stitch laces, sculpted black midsole, NOCTA woven heel pull tab in white-on-black, NOCTA snowflake mark on the lateral side. Brand new with original Nike box (matte black box). Size US M 10.5 (W 11 / UK 9.5 / EU 44.5). First black NOCTA Drive in inventory.",
    short_description: "Brand new with original Nike box",
    status: "in_stock", quantity: 1, featured: false, box_number: "G1-3",
    tags: ["nike","nocta","drake","air-zoom-drive","black","triple-black","size-10-5","whatnot-pull"],
    images: imageUrls,
    specs: {
      Brand: "Nike", Model: "NOCTA Air Zoom Drive",
      Color: "Black / Triple Black", Size: "10.5", EU: "44.5", UK: "9.5",
      Condition: "Brand New",
      Source: "Whatnot — stewsshoes pull #8",
    },
  }).select("id").single();
  if (prodErr || !product) { console.error(`✗ ${prodErr?.message}`); process.exit(1); }
  console.log(`✓ product id=${product.id}`);

  const heic = path.join(FOLDER, "_receipt", "IMG_5921.HEIC");
  if (existsSync(heic)) {
    const jpg = heic.replace(/\.HEIC$/i, ".jpg");
    if (!existsSync(jpg)) execSync(`sips -s format jpeg "${heic}" --out "${jpg}" 2>/dev/null`);
    const sp = `batchF/${SLUG}.jpg`;
    const { error } = await supabase.storage.from("receipts").upload(sp, readFileSync(jpg), { upsert: true, contentType: "image/jpeg" });
    if (!error) {
      const ru = supabase.storage.from("receipts").getPublicUrl(sp).data.publicUrl;
      const { data: r } = await supabase.from("receipts").insert({
        file_url: ru, vendor: "Whatnot — stewsshoes", purchase_date: "2025-11-03", total_amount: COST_PRICE,
        notes: "Whatnot packing slip — order #616626409 from stewsshoes' 'FREE TRAVIS SCOTT + 500 SHOES AT $1' livestream on 3 November 2025. Listed as 'Nike Air Zoom Drive Drake NOCTA White SZ: 10.5M/12W #8 — Brand New 0U5HP15H18'. NOTE: Slip says 'NOCTA WHITE' but the actual delivered shoe is the Black colorway in size 10.5; box label confirms M 10.5. Won for $60.",
      }).select("id").single();
      if (r) await supabase.from("receipt_items").insert({ receipt_id: r.id, product_id: product.id, item_name: NAME, quantity: 1, unit_price: COST_PRICE });
      console.log(`✓ receipt id=${r?.id}`);
    }
  }
  console.log("\nDone.");
}
main().catch((e) => { console.error(e); process.exit(1); });
