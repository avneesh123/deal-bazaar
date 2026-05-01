/**
 * Seed Batch C1-1: Air Jordan 1 Retro High OG Sail — Size 8.
 * $100 Whatnot pull from stewsshoes ("NO MISSES, JUST HEATERS AT A $1." livestream, 16 Oct 2025).
 * Listed on the slip as "JORDAN 1 RED SAIL". Brand new with OG box (box may have minor damage).
 * Different size from B6-2 (sz 11); not a duplicate.
 *
 * NB: catalog images are AI-cleaned PNGs the user dropped in (no bg-removal needed).
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

const FOLDER = "/tmp/db-batchC/c1-1-aj1-sail-sz8";
const SLUG = "air-jordan-1-retro-high-og-sail-sz8";
const NAME = "Air Jordan 1 Retro High OG Sail (Size 8)";

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

  const COST_PRICE = 100;
  const SELLING_PRICE = 275;

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
        "Air Jordan 1 Retro High OG in the tonal Sail colorway — premium sail leather upper with subtle textured side panels, tonal sail Swoosh and Wings logo, Sail collar and toe, classic red NIKE AIR tongue tags and red Air Jordan hangtag. Cream midsole and white rubber outsole. Brand new with original elephant-print box (box may show minor damage from shipping). Size US 8 (EU 41 / UK 7 / 26 cm).",
      short_description: "Brand new with OG box (box may be damaged)",
      status: "in_stock",
      quantity: 1,
      featured: false,
      box_number: "C1-1",
      tags: [
        "nike",
        "jordan",
        "air-jordan-1",
        "retro-high-og",
        "sail",
        "cream",
        "off-white",
        "size-8",
        "whatnot-pull",
      ],
      images: imageUrls,
      specs: {
        Brand: "Nike / Jordan",
        Model: "Air Jordan 1 Retro High OG",
        Color: "Sail",
        Size: "8",
        EU: "41",
        UK: "7",
        Condition: "Brand New",
        Source: "Whatnot — stewsshoes 16 Oct 2025",
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
  const heic = path.join(FOLDER, "_receipt", "IMG_5740.HEIC");
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
          vendor: "Whatnot — stewsshoes",
          purchase_date: "2025-10-16",
          total_amount: COST_PRICE,
          notes:
            "Whatnot packing slip — order #583654088 from stewsshoes' 'NO MISSES, JUST HEATERS AT A $1.' livestream on 16 October 2025. Listed as 'JORDAN 1 RED SAIL — SIZE 8 #2 — BRAND NEW OG BOX, BOX MIGHT BE DAMAGED'. Won for $100.",
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
