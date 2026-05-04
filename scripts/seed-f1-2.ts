/**
 * Seed Batch F1-2: Nike (W) Air Max Sunder "Sundial" — Women's US 7.5.
 * $57 random pull #73 from sneakerhustle on Whatnot ("$1 SNEAKER AUCTIONS —
 * 5TRILLION SHOES", 17 Oct 2025). Brand new with OG box. Style HJ8080-700.
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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const FOLDER = "/tmp/db-batchF/f1-2-air-max-sunder-sundial-w75";
const SLUG = "nike-w-air-max-sunder-sundial-w75";
const NAME = "Nike (W) Air Max Sunder Sundial (Women's 7.5)";

async function uploadCatalogImages(): Promise<string[]> {
  const dir = path.join(FOLDER, "catalog");
  const files = readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
  const urls: string[] = [];
  for (const f of files) {
    const storagePath = `products/batchF/${SLUG}/${f}`;
    const buf = readFileSync(path.join(dir, f));
    const { error } = await supabase.storage.from("images").upload(storagePath, buf, { upsert: true, contentType: "image/png" });
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
  if (imageUrls.length === 0) { console.error("No catalog images — aborting."); process.exit(1); }

  const COST_PRICE = 57;
  const SELLING_PRICE = 130;

  console.log("\n📝 inserting product...");
  const { data: product, error: prodErr } = await supabase.from("products").insert({
    slug: SLUG,
    name: NAME,
    cost_price: COST_PRICE,
    selling_price: SELLING_PRICE,
    shipping_cost: 14,
    tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
    currency: "USD",
    category: "sneakers",
    description:
      "Nike (W) Air Max Sunder in the 'Sundial' colorway — sundial-yellow stretchy neoprene zip-up upper, navy 'AIR' midfoot strap, grey TPU support cage, white midsole and chunky black trail-style outsole. The Sunder is Nike's late-90s zip-front trail runner reissued for 2024+. Brand new with original Nike box. Women's US 7.5 (Men's 6 / EU 38.5 / UK 5). Style code HJ8080-700.",
    short_description: "Brand new with original Nike box",
    status: "in_stock",
    quantity: 1,
    featured: false,
    box_number: "F1-2",
    tags: ["nike","air-max","sunder","sndr","sundial","yellow","womens","size-7-5w","whatnot-pull"],
    images: imageUrls,
    specs: {
      Brand: "Nike",
      Model: "(W) Air Max Sunder",
      Color: "Sundial / Navy",
      Size: "7.5W",
      EU: "38.5",
      UK: "5",
      Condition: "Brand New",
      "Style Code": "HJ8080-700",
      Source: "Whatnot — sneakerhustle pull #73",
    },
  }).select("id").single();
  if (prodErr || !product) { console.error(`✗ product: ${prodErr?.message ?? "no row returned"}`); process.exit(1); }
  console.log(`✓ product id=${product.id}`);

  const heic = path.join(FOLDER, "_receipt", "IMG_5873.HEIC");
  if (existsSync(heic)) {
    console.log("\n🧾 uploading receipt...");
    const jpg = heic.replace(/\.HEIC$/i, ".jpg");
    if (!existsSync(jpg)) execSync(`sips -s format jpeg "${heic}" --out "${jpg}" 2>/dev/null`);
    const storagePath = `batchF/${SLUG}.jpg`;
    const { error } = await supabase.storage.from("receipts").upload(storagePath, readFileSync(jpg), { upsert: true, contentType: "image/jpeg" });
    if (!error) {
      const receiptUrl = supabase.storage.from("receipts").getPublicUrl(storagePath).data.publicUrl;
      const { data: receipt } = await supabase.from("receipts").insert({
        file_url: receiptUrl,
        vendor: "Whatnot — sneakerhustle",
        purchase_date: "2025-10-17",
        total_amount: COST_PRICE,
        notes: "Whatnot packing slip — order #586615136 from sneakerhustle's '$1 SNEAKER AUCTIONS — 5TRILLION SHOES' livestream on 17 October 2025. Listed as 'SNEAKERS PULLS #73 (LISTEN FOR SIZE/CONDITION/INFO)'. Won for $57. Box label confirms W Air Max SNDR, W 7.5, style HJ8080-700.",
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
