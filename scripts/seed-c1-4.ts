/**
 * Seed Batch C1-4: Adidas Adizero Aruku — olive/brown/cream, Size US 8.
 * $56 random pull from essensola on Whatnot ("$1 DOLLAR STARTS ONCLOUD,
 * NIKE, HOKA, ADIDAS AND MORE", 26 Oct 2025). Lot #311. New with OG box.
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

const FOLDER = "/tmp/db-batchC/c1-4-adizero-aruku-sz8";
const SLUG = "adidas-adizero-aruku-olive-brown-sz8";
const NAME = "Adidas Adizero Aruku Olive / Brown (Size 8)";

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

  const COST_PRICE = 56;
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
        "Adidas Adizero Aruku — chunky retro-runner silhouette in an earthy olive / brown / cream colorway. Olive mesh and nubuck panels, brown leather toe and side overlays, cream EVA midsole, black rubber outsole. Brushed silver 3-stripes on the lateral side. Brand new with hangtag and original Adidas Originals box (lot label #311 on the side). Size US 8 (UK 7.5 / EU 43⅓ / W9).",
      short_description: "Brand new with hangtag and OG box",
      status: "in_stock",
      quantity: 1,
      featured: false,
      box_number: "C1-4",
      tags: [
        "adidas",
        "adidas-originals",
        "adizero",
        "adizero-aruku",
        "runner",
        "olive",
        "brown",
        "size-8",
        "whatnot-pull",
      ],
      images: imageUrls,
      specs: {
        Brand: "Adidas Originals",
        Model: "Adizero Aruku",
        Color: "Olive / Brown / Cream",
        Size: "8",
        EU: "43⅓",
        UK: "7.5",
        Condition: "Brand New",
        Source: "Whatnot — essensola pull #311",
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
  const heic = path.join(FOLDER, "_receipt", "IMG_5752.HEIC");
  if (existsSync(heic)) {
    console.log("\n🧾 uploading receipt...");
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
          vendor: "Whatnot — essensola",
          purchase_date: "2025-10-26",
          total_amount: COST_PRICE,
          notes:
            "Whatnot packing slip — order #602289749 from essensola's '$1 DOLLAR STARTS — ONCLOUD, NIKE, HOKA, ADIDAS AND MORE' livestream on 26 October 2025. Listed as 'RANDOM SNEAKER PULL — LISTEN FOR SIZE/DETAILS #311 — Condition: New'. Won for $56. Box label confirms Adizero Aruku size 8.",
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
