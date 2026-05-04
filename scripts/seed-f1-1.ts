/**
 * Seed Batch F1-1: Cream canvas hi-top with leopard panel + studs (brand TBD).
 * $23 random pull #284 from essensole on Whatnot ($1 dollar starts livestream,
 * 26 Oct 2025). Pre-owned look (scuffed toe caps) per AI catalog photos.
 *
 * Held as `unlisted` — receipt says "LISTEN FOR SIZE" and no clear box label
 * in the source HEICs, so size is unknown. Brand also not visible on the shoe.
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

const FOLDER = "/tmp/db-batchF/f1-1-cream-hi-top-canvas-studded";
const SLUG = "ash-bowie-cream-leopard-studded-hi-top-pre-owned";
const NAME = "Ash Bowie Cream Leopard Studded Hi-Top — Pre-Owned";

async function uploadCatalogImages(): Promise<string[]> {
  const dir = path.join(FOLDER, "catalog");
  if (!existsSync(dir)) throw new Error(`No catalog dir at ${dir}`);
  const files = readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
  const urls: string[] = [];
  for (const f of files) {
    const storagePath = `products/batchF/${SLUG}/${f}`;
    const buf = readFileSync(path.join(dir, f));
    const { error } = await supabase.storage
      .from("images")
      .upload(storagePath, buf, { upsert: true, contentType: "image/png" });
    if (error) {
      console.error(`  ✗ ${f}: ${error.message}`);
      continue;
    }
    urls.push(supabase.storage.from("images").getPublicUrl(storagePath).data.publicUrl);
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

  const COST_PRICE = 23;
  const SELLING_PRICE = 55;

  console.log("\n📝 inserting product (status=unlisted — size + brand TBD)...");
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
        "Cream canvas hi-top sneaker with metallic gold flat laces, side zip detail, and a leopard-print pleather side panel finished with silver pyramid studs. Black foxing tape edge and a vulcanized cream cupsole with a heritage-style waffle outsole. Pre-owned condition — minor scuffing visible on the white toe caps. Brand and size pending review (no box visible in the source photos).",
      short_description: "Pre-owned — brand + size pending review",
      status: "unlisted",
      quantity: 1,
      featured: false,
      box_number: "F1-1",
      tags: [
        "hi-top",
        "canvas",
        "cream",
        "gold-laces",
        "leopard",
        "studded",
        "pre-owned",
        "whatnot-pull",
      ],
      images: imageUrls,
      specs: {
        Color: "Cream / Leopard Accent",
        Condition: "Pre-Owned",
        Source: "Whatnot — essensole pull #284",
      },
    })
    .select("id")
    .single();
  if (prodErr || !product) {
    console.error(`✗ product: ${prodErr?.message ?? "no row returned"}`);
    process.exit(1);
  }
  console.log(`✓ product id=${product.id} (status=unlisted)`);

  const heic = path.join(FOLDER, "_receipt", "IMG_5868.HEIC");
  if (existsSync(heic)) {
    console.log("\n🧾 uploading receipt...");
    const jpg = heic.replace(/\.HEIC$/i, ".jpg");
    if (!existsSync(jpg)) execSync(`sips -s format jpeg "${heic}" --out "${jpg}" 2>/dev/null`);
    const storagePath = `batchF/${SLUG}.jpg`;
    const { error } = await supabase.storage.from("receipts").upload(storagePath, readFileSync(jpg), { upsert: true, contentType: "image/jpeg" });
    if (error) {
      console.error(`receipt upload: ${error.message}`);
    } else {
      const receiptUrl = supabase.storage.from("receipts").getPublicUrl(storagePath).data.publicUrl;
      const { data: receipt, error: rErr } = await supabase.from("receipts").insert({
        file_url: receiptUrl,
        vendor: "Whatnot — essensole",
        purchase_date: "2025-10-26",
        total_amount: COST_PRICE,
        notes:
          "Whatnot packing slip — order #602277176 from essensole's '$1 DOLLAR STARTS — ONCLOUD, NIKE, HOKA, ADIDAS AND MORE' livestream on 26 October 2025. Listed as 'RANDOM SNEAKER PULL — LISTEN FOR SIZE/DETAILS #284 — Condition: New'. Won for $23. Brand and size are not visible in the source photos — confirm in admin.",
      }).select("id").single();
      if (!rErr && receipt) {
        await supabase.from("receipt_items").insert({ receipt_id: receipt.id, product_id: product.id, item_name: NAME, quantity: 1, unit_price: COST_PRICE });
        console.log(`✓ receipt id=${receipt.id} linked`);
      }
    }
  }

  console.log("\n⚠️  Confirm brand + size in /admin/products before flipping to in_stock.");
}

main().catch((e) => { console.error(e); process.exit(1); });
