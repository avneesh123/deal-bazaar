/**
 * Seed Batch F1-10: Nike NOCTA Air Zoom Drive Summit White — M 11.
 * SECOND M11 pair (B5-1 is the first; kept as separate listing because cost
 * basis differs). $54 Whatnot pull #5 from stewsshoes "FREE TRAVIS SCOTT +
 * 500 SHOES AT $1" livestream (3 Nov 2025). Brand new with OG box.
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
const FOLDER = "/tmp/db-batchF/f1-10-nocta-zoom-drive-white-m11";
const SLUG = "nike-nocta-air-zoom-drive-summit-white-m11-f1";
const NAME = "Nike NOCTA Air Zoom Drive Summit White (M 11) — F1";

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
  const COST_PRICE = 54;
  const SELLING_PRICE = 145;
  const { data: product, error: prodErr } = await supabase.from("products").insert({
    slug: SLUG, name: NAME, cost_price: COST_PRICE, selling_price: SELLING_PRICE,
    shipping_cost: 14, tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
    currency: "USD", category: "sneakers",
    description: "Nike x NOCTA Air Zoom Drive Summit White — Drake's NOCTA collab in tonal white. Tonal white mesh and synthetic upper, sculpted Summit White midsole, NOCTA woven heel pull tab, NOCTA snowflake mark on the lateral side. Brand new with original Nike box. Size US M 11 (W 12.5 / UK 10 / EU 45). This is the second pair of this exact size in inventory (separate listing from B5-1 to preserve distinct cost basis).",
    short_description: "Brand new with original Nike box",
    status: "in_stock", quantity: 1, featured: false, box_number: "G1-2",
    tags: ["nike","nocta","drake","air-zoom-drive","summit-white","white","size-11","whatnot-pull"],
    images: imageUrls,
    specs: {
      Brand: "Nike", Model: "NOCTA Air Zoom Drive",
      Color: "Summit White", Size: "11", EU: "45", UK: "10",
      Condition: "Brand New",
      Source: "Whatnot — stewsshoes pull #5",
    },
  }).select("id").single();
  if (prodErr || !product) { console.error(`✗ ${prodErr?.message}`); process.exit(1); }
  console.log(`✓ product id=${product.id}`);

  const heic = path.join(FOLDER, "_receipt", "IMG_5916.HEIC");
  if (existsSync(heic)) {
    const jpg = heic.replace(/\.HEIC$/i, ".jpg");
    if (!existsSync(jpg)) execSync(`sips -s format jpeg "${heic}" --out "${jpg}" 2>/dev/null`);
    const sp = `batchF/${SLUG}.jpg`;
    const { error } = await supabase.storage.from("receipts").upload(sp, readFileSync(jpg), { upsert: true, contentType: "image/jpeg" });
    if (!error) {
      const ru = supabase.storage.from("receipts").getPublicUrl(sp).data.publicUrl;
      const { data: r } = await supabase.from("receipts").insert({
        file_url: ru, vendor: "Whatnot — stewsshoes", purchase_date: "2025-11-03", total_amount: COST_PRICE,
        notes: "Whatnot packing slip — order #616629306 from stewsshoes' 'FREE TRAVIS SCOTT + 500 SHOES AT $1' livestream on 3 November 2025. Listed as 'Nike Air Zoom Drive Drake NOCTA White SZ: 11M/12.5W #5 — Brand New 55CZK0PQKC'. Won for $54.",
      }).select("id").single();
      if (r) await supabase.from("receipt_items").insert({ receipt_id: r.id, product_id: product.id, item_name: NAME, quantity: 1, unit_price: COST_PRICE });
      console.log(`✓ receipt id=${r?.id}`);
    }
  }
  console.log("\nDone.");
}
main().catch((e) => { console.error(e); process.exit(1); });
