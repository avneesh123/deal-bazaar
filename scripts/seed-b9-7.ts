/**
 * Seed Batch 9-7: Air Jordan 1 Retro High OG GS "Team Red" — Size 6Y.
 * Brand new. Style code F01457160 (white/team red).
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

const FOLDER = "/tmp/db-batch9-extra/b9-7-aj1-retro-high-og-team-red";
const SLUG = "air-jordan-1-retro-high-og-team-red-gs";
const NAME = "Air Jordan 1 Retro High OG GS Team Red";

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

  const COST_PRICE = 80;
  const SELLING_PRICE = 150;

  console.log("\n📝 inserting product...");
  const { data: product, error: prodErr } = await supabase
    .from("products")
    .insert({
      slug: SLUG,
      name: NAME,
      cost_price: COST_PRICE,
      selling_price: SELLING_PRICE,
      shipping_cost: 10,
      tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
      currency: "USD",
      category: "sneakers",
      description:
        "Air Jordan 1 Retro High OG GS in the Team Red colorway — crisp white leather toe and quarter panels with a deep cherry-red Nike Swoosh, collar, and heel tab. Classic Wings logo on the heel, white midsole, red rubber outsole. Brand new with original box. Style code F01457160. Size 6Y (kids — fits small adult).",
      short_description: "Brand new with original box",
      status: "in_stock",
      quantity: 1,
      featured: false,
      box_number: "B9-7",
      tags: [
        "nike",
        "jordan",
        "air-jordan-1",
        "retro-high-og",
        "team-red",
        "varsity-red",
        "white",
        "red",
        "gs",
        "youth",
      ],
      images: imageUrls,
      specs: {
        Brand: "Nike",
        Model: "Air Jordan 1 Retro High OG",
        Color: "White / Team Red",
        Size: "6Y",
        Condition: "Brand New",
        StyleCode: "F01457160",
      },
    })
    .select("id")
    .single();
  if (prodErr || !product) {
    console.error(`✗ product: ${prodErr?.message ?? "no row returned"}`);
    process.exit(1);
  }
  console.log(`✓ product id=${product.id}`);

  // Box-label photo as the receipt (no actual paper packing slip in this set).
  const heic = path.join(FOLDER, "_receipt", "IMG_5709.HEIC");
  if (existsSync(heic)) {
    console.log("\n🧾 uploading box-label as receipt reference...");
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
          vendor: "Unknown — box label only",
          purchase_date: "2026-04-26",
          total_amount: COST_PRICE,
          notes:
            "No paper receipt in this batch — IMG_5709 is the box label confirming size 6Y / style F01457160. Cost is estimated.",
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
