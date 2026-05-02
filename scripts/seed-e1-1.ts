/**
 * Seed Batch E1-1: London Fog Collection Hamilton Black — Size US M 9.5.
 * FREE shoe (cost $0) from stewsshoes' "50 FREE SHOES + 500 SHOES AT $1"
 * livestream on Whatnot (19 Oct 2025). Lot #23. Brand new with OG box.
 * First item of new batch E1.
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

const FOLDER = "/tmp/db-batchE/e1-1-london-fog-hamilton-sz95";
const SLUG = "london-fog-hamilton-black-memory-foam-sz95";
const NAME = "London Fog Hamilton Black Memory Foam (Size 9.5)";

async function uploadCatalogImages(): Promise<string[]> {
  const dir = path.join(FOLDER, "catalog");
  if (!existsSync(dir)) throw new Error(`No catalog dir at ${dir}`);
  const files = readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
  const urls: string[] = [];
  for (const f of files) {
    const storagePath = `products/batchE/${SLUG}/${f}`;
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

  const COST_PRICE = 0;
  const SELLING_PRICE = 40;

  console.log("\n📝 inserting product...");
  const { data: product, error: prodErr } = await supabase
    .from("products")
    .insert({
      slug: SLUG,
      name: NAME,
      cost_price: COST_PRICE,
      selling_price: SELLING_PRICE,
      shipping_cost: 12,
      tax_amount: 0,
      currency: "USD",
      category: "sneakers",
      description:
        "London Fog Collection 'Hamilton' hiking-style sneaker in tonal black — soft synthetic upper, memory-foam footbed, padded collar, lugged grip outsole. Lightweight everyday outdoor shoe. Brand new with original London Fog box. Size US M 9.5.",
      short_description: "Brand new with original London Fog box",
      status: "in_stock",
      quantity: 1,
      featured: false,
      box_number: "E1-1",
      tags: [
        "london-fog",
        "hamilton",
        "hiking",
        "outdoor",
        "memory-foam",
        "black",
        "size-9-5",
        "whatnot-pull",
        "free",
      ],
      images: imageUrls,
      specs: {
        Brand: "London Fog Collection",
        Model: "Hamilton (245M)",
        Color: "Black",
        Size: "9.5",
        Condition: "Brand New",
        Source: "Whatnot — stewsshoes free-shoes pull #23",
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
  const heic = path.join(FOLDER, "_receipt", "IMG_5822.HEIC");
  if (existsSync(heic)) {
    console.log("\n🧾 uploading receipt...");
    const jpg = heic.replace(/\.HEIC$/i, ".jpg");
    if (!existsSync(jpg)) {
      execSync(`sips -s format jpeg "${heic}" --out "${jpg}" 2>/dev/null`);
    }
    const storagePath = `batchE/${SLUG}.jpg`;
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
          vendor: "Whatnot — stewsshoes (free giveaway)",
          purchase_date: "2025-10-19",
          total_amount: COST_PRICE,
          notes:
            "Whatnot packing slip — order #589563238 from stewsshoes' '50 FREE SHOES + 500 SHOES AT $1' livestream on 19 October 2025. Listed as 'FREE BRAND NEW SHOES! #23 — RANDOM SIZE'. Won FREE ($0.00). Box label confirms London Fog Hamilton (245M) Black, size 9.5M.",
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

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
