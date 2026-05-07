/**
 * Seed Batch F1-12: Adidas Forum 84 Low Snake Print Cream — Size US 12.
 * Brand new with hangtag and OG box. Box label lot CB807.
 *
 * NO RECEIPT in source batch — cost is a $30 placeholder estimate based on
 * $1-dollar-starts auction comps for newer Forum 84 colorways. Update via
 * /admin/products if the actual receipt is found.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync, readdirSync } from "fs";
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
const FOLDER = "/tmp/db-batchF/f1-12-adidas-forum-84-low-snake-cream-sz12";
const SLUG = "adidas-forum-84-low-snake-print-cream-sz12";
const NAME = "Adidas Forum 84 Low Snake Print Cream (Size 12)";

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
  const COST_PRICE = 30;     // placeholder — no receipt
  const SELLING_PRICE = 95;
  const { data: product, error: prodErr } = await supabase.from("products").insert({
    slug: SLUG, name: NAME, cost_price: COST_PRICE, selling_price: SELLING_PRICE,
    shipping_cost: 14, tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
    currency: "USD", category: "sneakers",
    description: "Adidas Forum 84 Low — cream/off-white tumbled-leather upper with snake-embossed black-and-cream toe guard and heel panel, white perforated 3-stripes, gold-stitched edge tape, padded ankle strap with squared eyelet. Brand new with hangtags still attached and original Adidas Originals blue box (lot label CB807). Size US M 12 (UK 11.5 / EU 46⅔).",
    short_description: "Brand new with hangtag and OG box",
    status: "in_stock", quantity: 1, featured: false, box_number: "G1-4",
    tags: ["adidas","adidas-originals","forum","forum-84","forum-84-low","snake-print","cream","off-white","size-12","whatnot-pull"],
    images: imageUrls,
    specs: {
      Brand: "Adidas Originals", Model: "Forum 84 Low",
      Color: "Cream / Snake Print", Size: "12",
      EU: "46⅔", UK: "11.5",
      Condition: "Brand New",
      Source: "Whatnot — vendor pull (lot CB807; receipt missing from batch)",
    },
  }).select("id").single();
  if (prodErr || !product) { console.error(`✗ ${prodErr?.message}`); process.exit(1); }
  console.log(`✓ product id=${product.id}`);
  console.log("\n⚠️  No receipt was included with this batch — cost ($30) is a placeholder. Update via /admin/products if the actual cost basis is known.");
}
main().catch((e) => { console.error(e); process.exit(1); });
