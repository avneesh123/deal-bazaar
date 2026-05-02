/**
 * Seed Batch C1-5: Adidas Top Ten Hi Carolina Blue / White, Size US 12.
 * Style code GW1616. Different colorway from B9-1 (white/navy sz 11), not a duplicate.
 * No Whatnot packing slip in this batch — receipt reference is the box-label photo.
 * Cost estimated at $37 to match B9-1 (same model, prior pull cost).
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

const FOLDER = "/tmp/db-batchC/c1-5-top-ten-hi-blue-sz12";
const SLUG = "adidas-top-ten-hi-carolina-blue-sz12";
const NAME = "Adidas Top Ten Hi Carolina Blue (Size 12)";

async function uploadCatalogImages(): Promise<string[]> {
  const dir = path.join(FOLDER, "catalog");
  if (!existsSync(dir)) throw new Error(`No catalog dir at ${dir}`);
  const files = readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
  const urls: string[] = [];
  for (const f of files) {
    const storagePath = `products/batchC/${SLUG}/${f}`;
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

  const COST_PRICE = 37;
  const SELLING_PRICE = 85;

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
        "Adidas Top Ten Hi in the Carolina Blue / White colorway — heritage hardcourt high-top with all-blue leather upper, white 3-stripes on the lateral side, padded white collar wrap, and a tonal blue rubber outsole. Trefoil tongue patch with the original Top Ten basketball graphic. Brand new with original Adidas Originals box. Style code GW1616. Size US 12 (UK 11½ / EU 46⅔).",
      short_description: "Brand new with original Adidas box",
      status: "in_stock",
      quantity: 1,
      featured: false,
      box_number: "C1-5",
      tags: [
        "adidas",
        "adidas-originals",
        "top-ten",
        "top-ten-hi",
        "high-top",
        "carolina-blue",
        "light-blue",
        "size-12",
      ],
      images: imageUrls,
      specs: {
        Brand: "Adidas Originals",
        Model: "Top Ten Hi",
        Color: "Carolina Blue / White",
        Size: "12",
        EU: "46⅔",
        UK: "11½",
        Condition: "Brand New",
        "Style Code": "GW1616",
      },
    })
    .select("id")
    .single();
  if (prodErr || !product) {
    console.error(`✗ product: ${prodErr?.message ?? "no row returned"}`);
    process.exit(1);
  }
  console.log(`✓ product id=${product.id}`);

  // No Whatnot packing slip — using box-label photo as receipt reference.
  const heic = path.join(FOLDER, "_receipt", "IMG_5754.HEIC");
  if (existsSync(heic)) {
    console.log("\n🧾 uploading box-label as receipt reference...");
    const jpg = heic.replace(/\.HEIC$/i, ".jpg");
    if (!existsSync(jpg)) {
      execSync(`sips -s format jpeg "${heic}" --out "${jpg}" 2>/dev/null`);
    }
    const storagePath = `batchC/${SLUG}.jpg`;
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
          vendor: "Unknown — box label only",
          purchase_date: "2025-10-26",
          total_amount: COST_PRICE,
          notes:
            "No paper packing slip in this batch — IMG_5754 is the original Adidas box label confirming Top Ten Hi style GW1616, US 12 / UK 11½ / EU 46⅔, with seller warehouse sticker CB760. Cost price is estimated to match the prior Top Ten Hi pull (B9-1).",
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
