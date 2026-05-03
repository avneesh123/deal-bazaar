/**
 * Seed Batch E1-8: Nike Dunk Low Retro "Championship Court Purple" — pre-owned, Size 8.5.
 * $39 Whatnot pull from fragmented_soles "500+ PAIRS AT $1 + FREE SHOES ALL STREAM"
 * livestream (26 Oct 2025). Pre-owned with original box (lot label BY340).
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

const FOLDER = "/tmp/db-batchE/e1-8-dunk-court-purple-sz85";
const SLUG = "nike-dunk-low-court-purple-pre-owned-sz85";
const NAME = "Nike Dunk Low Court Purple — Pre-Owned (Size 8.5)";

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

  const COST_PRICE = 39;
  const SELLING_PRICE = 95;

  console.log("\n📝 inserting product...");
  const { data: product, error: prodErr } = await supabase
    .from("products")
    .insert({
      slug: SLUG,
      name: NAME,
      cost_price: COST_PRICE,
      selling_price: SELLING_PRICE,
      shipping_cost: 12,
      tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
      currency: "USD",
      category: "sneakers",
      description:
        "Nike Dunk Low Retro in the 'Championship Court Purple' colorway — white tumbled-leather base with rich Court Purple overlays, white Swoosh, embossed white 'NIKE' on the purple heel, white midsole and purple rubber outsole. Pre-owned with the original Nike box (lot label BY340). Size US M 8.5. Style code DD1391-104.",
      short_description: "Pre-owned with original Nike box",
      status: "in_stock",
      quantity: 1,
      featured: false,
      box_number: "E1-8",
      tags: [
        "nike",
        "dunk",
        "dunk-low",
        "court-purple",
        "championship",
        "purple",
        "white",
        "size-8-5",
        "pre-owned",
        "whatnot-pull",
      ],
      images: imageUrls,
      specs: {
        Brand: "Nike",
        Model: "Dunk Low Retro",
        Color: "White / Court Purple",
        Size: "8.5",
        Condition: "Pre-Owned",
        "Style Code": "DD1391-104",
        Source: "Whatnot — fragmented_soles BY340",
      },
    })
    .select("id")
    .single();
  if (prodErr || !product) {
    console.error(`✗ product: ${prodErr?.message ?? "no row returned"}`);
    process.exit(1);
  }
  console.log(`✓ product id=${product.id}`);

  const heic = path.join(FOLDER, "_receipt", "IMG_5852.HEIC");
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
          vendor: "Whatnot — fragmented_soles",
          purchase_date: "2025-10-26",
          total_amount: COST_PRICE,
          notes:
            "Whatnot packing slip — order #603538885 from fragmented_soles' '500+ PAIRS AT $1 + FREE SHOES ALL STREAM' livestream on 26 October 2025. Listed as 'NIKE DUNK LOW COURT PURPLE — SIZE 8.5 — PRE OWNED ORIGINAL BOX BY340'. Won for $39.",
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
