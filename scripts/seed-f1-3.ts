/**
 * Seed Batch F1-3: Nike (W) Dunk Low Stadium Green / White — Women's US 7.
 * $45 random pull #116 from stewsshoes on Whatnot ("500K FREE TRAVIS SCOTT +
 * 500 SHOES AT $1", 25 Oct 2025). Brand new with OG box.
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

const FOLDER = "/tmp/db-batchF/f1-3-dunk-low-stadium-green-w7";
const SLUG = "nike-w-dunk-low-stadium-green-w7";
const NAME = "Nike (W) Dunk Low Stadium Green (Women's 7)";

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

  const COST_PRICE = 45;
  const SELLING_PRICE = 110;

  console.log("\n📝 inserting product...");
  const { data: product, error: prodErr } = await supabase.from("products").insert({
    slug: SLUG,
    name: NAME,
    cost_price: COST_PRICE,
    selling_price: SELLING_PRICE,
    shipping_cost: 12,
    tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
    currency: "USD",
    category: "sneakers",
    description:
      "Nike (W) Dunk Low in the 'Stadium Green' colorway — sail/white tumbled-leather toe and quarter panels with vivid Stadium-Green Swoosh, eyestay, collar, and heel overlay, sail laces, white midsole and green rubber outsole. Brand new with original Nike box. Women's US 7 (Men's 5.5 / EU 38 / UK 4.5).",
    short_description: "Brand new with original Nike box",
    status: "in_stock",
    quantity: 1,
    featured: false,
    box_number: "F1-3",
    tags: ["nike","dunk","dunk-low","stadium-green","green","womens","size-7w","whatnot-pull"],
    images: imageUrls,
    specs: {
      Brand: "Nike",
      Model: "(W) Dunk Low",
      Color: "Stadium Green / White",
      Size: "7W",
      EU: "38",
      UK: "4.5",
      Condition: "Brand New",
      Source: "Whatnot — stewsshoes pull #116",
    },
  }).select("id").single();
  if (prodErr || !product) { console.error(`✗ product: ${prodErr?.message ?? "no row returned"}`); process.exit(1); }
  console.log(`✓ product id=${product.id}`);

  const heic = path.join(FOLDER, "_receipt", "IMG_5878.HEIC");
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
        vendor: "Whatnot — stewsshoes",
        purchase_date: "2025-10-25",
        total_amount: COST_PRICE,
        notes: "Whatnot packing slip — order #600501873 from stewsshoes' '500K FREE TRAVIS SCOTT + 500 SHOES AT $1' livestream on 25 October 2025. Listed as 'BRAND RANDOM PULLS #116 — BRAND NEW'. Won for $45. Box label confirms W Dunk Low Stadium Green, W 7.",
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
