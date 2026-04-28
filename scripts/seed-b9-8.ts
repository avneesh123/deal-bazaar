/**
 * Seed Batch 9-8: Q4 Sports EM55-I — Size UK 4.5, black/gold/navy.
 * Same model as B4-3 in a different size + colorway emphasis.
 * $13 random pull from sneakerhustle on Whatnot ($1 SNEAKER AUCTIONS / 5TRILLION SHOES, 17 Oct 2025).
 * Lot/pull #83.
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

const FOLDER = "/tmp/db-batch9-extra/b9-8-qsport-q4-em";
const SLUG = "q4-sports-em55-i-black-gold-navy-uk-4-5";
const NAME = "Q4 Sports EM55-I Black Gold Navy (UK 4.5)";

async function uploadCatalogImages(): Promise<string[]> {
  const dir = path.join(FOLDER, "catalog");
  if (!existsSync(dir)) throw new Error(`No catalog dir at ${dir}`);
  const files = readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
  const urls: string[] = [];
  for (const f of files) {
    const storagePath = `products/batch9/${SLUG}/${f}`;
    const buf = readFileSync(path.join(dir, f));
    const { error } = await supabase.storage
      .from("images")
      .upload(storagePath, buf, { upsert: true, contentType: "image/png" });
    if (error) {
      console.error(`  ✗ ${f}: ${error.message}`);
      continue;
    }
    urls.push(
      supabase.storage.from("images").getPublicUrl(storagePath).data.publicUrl
    );
    console.log(`  ✓ ${f}`);
  }
  return urls;
}

async function main() {
  console.log(`\n📦 ${NAME} (${SLUG})\n`);

  const { data: existing } = await supabase
    .from("products")
    .select("id")
    .eq("slug", SLUG)
    .maybeSingle();
  if (existing) {
    console.log(`Already exists (id=${existing.id}). Aborting.`);
    return;
  }

  console.log("☁️  uploading catalog images...");
  const imageUrls = await uploadCatalogImages();
  if (imageUrls.length === 0) {
    console.error("No catalog images — aborting.");
    process.exit(1);
  }

  const COST_PRICE = 13;
  const SELLING_PRICE = 45;

  console.log("\n📝 inserting product...");
  const { data: product, error: prodErr } = await supabase
    .from("products")
    .insert({
      slug: SLUG,
      name: NAME,
      cost_price: COST_PRICE,
      selling_price: SELLING_PRICE,
      shipping_cost: 8,
      tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
      currency: "USD",
      category: "sneakers",
      description:
        "Q4 Sports EM55-I mid-top basketball sneaker in black / gold / navy. Black breathable mesh upper, gold metallic toe overlay and tongue tag, gold stylized monogram on the lateral side panel, and a navy heel wrap printed with a metallic-gold sneaker-icon pattern. Brand new with the original Q4 Sports patterned box (lot #83). Style code Q4-EM01. Sourced from a Whatnot $1 sneaker auction (sneakerhustle / 5 Trillion Shoes). Size UK 4.5 (≈ US 5).",
      short_description: "Brand new with original Q4 Sports box",
      status: "in_stock",
      quantity: 1,
      featured: false,
      box_number: "B9-8",
      tags: [
        "q4-sports",
        "em55-i",
        "basketball",
        "mid-top",
        "black",
        "gold",
        "navy",
        "uk-4-5",
        "whatnot-pull",
      ],
      images: imageUrls,
      specs: {
        Brand: "Q4 Sports",
        Model: "EM55-I",
        Color: "Black / Gold / Navy",
        Size: "UK 4.5",
        Condition: "Brand New",
        "Style Code": "Q4-EM01",
        Source: "Whatnot — sneakerhustle pull #83",
      },
    })
    .select("id")
    .single();
  if (prodErr || !product) {
    console.error(`✗ product: ${prodErr?.message ?? "no row returned"}`);
    process.exit(1);
  }
  console.log(`✓ product id=${product.id}`);

  // Whatnot packing slip as receipt.
  const heic = path.join(FOLDER, "_receipt", "IMG_5717.HEIC");
  if (existsSync(heic)) {
    console.log("\n🧾 uploading receipt...");
    const jpg = heic.replace(/\.HEIC$/i, ".jpg");
    if (!existsSync(jpg)) {
      execSync(`sips -s format jpeg "${heic}" --out "${jpg}" 2>/dev/null`);
    }
    const storagePath = `batch9/${SLUG}.jpg`;
    const { error } = await supabase.storage
      .from("receipts")
      .upload(storagePath, readFileSync(jpg), {
        upsert: true,
        contentType: "image/jpeg",
      });
    if (error) {
      console.error(`receipt upload: ${error.message}`);
    } else {
      const receiptUrl = supabase.storage
        .from("receipts")
        .getPublicUrl(storagePath).data.publicUrl;
      const { data: receipt, error: rErr } = await supabase
        .from("receipts")
        .insert({
          file_url: receiptUrl,
          vendor: "Whatnot — sneakerhustle",
          purchase_date: "2025-10-17",
          total_amount: COST_PRICE,
          notes:
            "Whatnot packing slip — order #586620174 from sneakerhustle's $1 SNEAKER AUCTIONS (5TRILLION SHOES) livestream on 17 October 2025. Listed as 'SNEAKERS PULLS #83 (LISTEN FOR SIZE/CONDITION/INFO)'. Won for $13.",
        })
        .select("id")
        .single();
      if (!rErr && receipt) {
        await supabase.from("receipt_items").insert({
          receipt_id: receipt.id,
          product_id: product.id,
          item_name: NAME,
          quantity: 1,
          unit_price: COST_PRICE,
        });
        console.log(`✓ receipt id=${receipt.id} linked`);
      }
    }
  }

  console.log("\nDone. Run `npm run generate` then commit + push.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
