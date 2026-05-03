/**
 * Seed Batch E1-9: Adidas Yeezy Boost 350 V2 "Blue Tint" — pre-owned, no box, Size US M 4.
 * $34 Whatnot pull from stewsshoes "50 FREE SHOES + 500 SHOES AT $1" livestream
 * (17 Oct 2025). Used, no original box (lot A-32484).
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

const FOLDER = "/tmp/db-batchE/e1-9-yeezy-350-blue-tint-sz4";
const SLUG = "adidas-yeezy-350-v2-blue-tint-pre-owned-sz4";
const NAME = "Adidas Yeezy Boost 350 V2 Blue Tint — Pre-Owned (Size 4M)";

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

  const COST_PRICE = 34;
  const SELLING_PRICE = 130;

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
        "Adidas Yeezy Boost 350 V2 in the 'Blue Tint' colorway — Primeknit upper in pale grey/cream with subtle blue-tinted side stripe and the iconic red 'SPLY-350' text on the lateral side, soft cream Boost midsole, translucent rubber sole. Pre-owned (used) with natural midsole patina; sold WITHOUT original box. Size US M 4 (small). Style code B37571.",
      short_description: "Pre-owned — used, no original box",
      status: "in_stock",
      quantity: 1,
      featured: false,
      box_number: "E1-9",
      tags: [
        "adidas",
        "yeezy",
        "yeezy-350",
        "yeezy-350-v2",
        "blue-tint",
        "pre-owned",
        "no-box",
        "size-4",
        "whatnot-pull",
      ],
      images: imageUrls,
      specs: {
        Brand: "Adidas Yeezy",
        Model: "Yeezy Boost 350 V2",
        Color: "Blue Tint",
        Size: "4",
        Condition: "Pre-Owned (no box)",
        "Style Code": "B37571",
        Source: "Whatnot — stewsshoes A-32484",
      },
    })
    .select("id")
    .single();
  if (prodErr || !product) {
    console.error(`✗ product: ${prodErr?.message ?? "no row returned"}`);
    process.exit(1);
  }
  console.log(`✓ product id=${product.id}`);

  const heic = path.join(FOLDER, "_receipt", "IMG_5856.HEIC");
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
          vendor: "Whatnot — stewsshoes",
          purchase_date: "2025-10-17",
          total_amount: COST_PRICE,
          notes:
            "Whatnot packing slip — order #587601960 from stewsshoes' '50 FREE SHOES + 500 SHOES AT $1' livestream on 17 October 2025. Listed as 'YEEZY 350 BLUE TINT SZ. 4M — USED NO BOX A-32484'. Won for $34.",
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
