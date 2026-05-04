/**
 * Seed Batch F1-6: Adidas Gazelle Wonder Quartz / Pink — Size US 10.
 * Brand new with original Adidas box (lot label #298). Style IE6680.
 *
 * NO RECEIPT in source batch — cost is an estimate ($25 placeholder)
 * based on $1-dollar-starts auction comps. Update via /admin if known.
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
const FOLDER = "/tmp/db-batchF/f1-6-adidas-gazelle-wonder-quartz-sz10";
const SLUG = "adidas-gazelle-wonder-quartz-pink-sz10";
const NAME = "Adidas Gazelle Wonder Quartz Pink (Size 10)";

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
  const COST_PRICE = 25;     // placeholder estimate — no receipt in source batch
  const SELLING_PRICE = 80;  // mid-tier Gazelle suede comp
  console.log("\n📝 inserting product (cost is estimated — no receipt in batch)...");
  const { data: product, error: prodErr } = await supabase.from("products").insert({
    slug: SLUG, name: NAME, cost_price: COST_PRICE, selling_price: SELLING_PRICE,
    shipping_cost: 12, tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
    currency: "USD", category: "sneakers",
    description: "Adidas Gazelle in 'Wonder Quartz' (soft coral pink) — pink suede upper with black serrated 3-stripes, black trefoil and 'Gazelle' heel embroidery, pink suede tongue, white vulcanized cupsole and gum sole. Brand new with original Adidas Originals box (lot sticker #298). Size US M 10. Style code IE6680.",
    short_description: "Brand new with original Adidas box",
    status: "in_stock", quantity: 1, featured: false, box_number: "F1-6",
    tags: ["adidas","adidas-originals","gazelle","wonder-quartz","pink","coral","suede","size-10","whatnot-pull"],
    images: imageUrls,
    specs: {
      Brand: "Adidas Originals", Model: "Gazelle",
      Color: "Wonder Quartz / Pink Suede / Black 3-Stripes",
      Size: "10", Condition: "Brand New",
      "Style Code": "IE6680",
      Source: "Whatnot — vendor pull #298 (receipt missing from batch; cost estimated)",
    },
  }).select("id").single();
  if (prodErr || !product) { console.error(`✗ product: ${prodErr?.message ?? "no row"}`); process.exit(1); }
  console.log(`✓ product id=${product.id}`);
  console.log("\n⚠️  No purchase receipt was included with this batch — cost ($25) is a placeholder. Update via /admin/products if you have the actual cost basis.");
}
main().catch((e) => { console.error(e); process.exit(1); });
