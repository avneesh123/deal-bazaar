/**
 * Seed Batch E1-5: Vans Era Tie-Dye (Orange / Blue / Red).
 * $19 random pull #314 from essensola on Whatnot ($1 dollar starts livestream,
 * 26 Oct 2025). Brand new (per slip).
 *
 * Held as `unlisted` — no box visible in the catalog shots, so size is unknown.
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

const FOLDER = "/tmp/db-batchE/e1-5-vans-era-tie-dye";
const SLUG = "vans-era-tie-dye-orange-blue";
const NAME = "Vans Era Tie-Dye Orange / Blue";

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

  const COST_PRICE = 19;
  const SELLING_PRICE = 50;

  console.log("\n📝 inserting product (status=unlisted — size TBD)...");
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
        "Vans Era in a vivid tie-dye colorway — orange/yellow sunburst tie-dye on the toe and forefoot, electric-blue tie-dye collar, red heel cap with the white 'Off The Wall' label, white vulcanized cupsole and gum welt. Brand new per the Whatnot slip. Size pending review.",
      short_description: "Brand new — size pending review",
      status: "unlisted",
      quantity: 1,
      featured: false,
      box_number: "E1-5",
      tags: [
        "vans",
        "era",
        "tie-dye",
        "orange",
        "blue",
        "low-top",
        "whatnot-pull",
      ],
      images: imageUrls,
      specs: {
        Brand: "Vans",
        Model: "Era",
        Color: "Tie-Dye Orange / Blue / Red",
        Condition: "Brand New",
        Source: "Whatnot — essensola pull #314",
      },
    })
    .select("id")
    .single();
  if (prodErr || !product) {
    console.error(`✗ product: ${prodErr?.message ?? "no row returned"}`);
    process.exit(1);
  }
  console.log(`✓ product id=${product.id} (status=unlisted)`);

  // Whatnot packing slip as receipt.
  const heic = path.join(FOLDER, "_receipt", "IMG_5839.HEIC");
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
          vendor: "Whatnot — essensola",
          purchase_date: "2025-10-26",
          total_amount: COST_PRICE,
          notes:
            "Whatnot packing slip — order #602290712 from essensola's '$1 DOLLAR STARTS — ONCLOUD, NIKE, HOKA, ADIDAS AND MORE' livestream on 26 October 2025. Listed as 'RANDOM SNEAKER PULL — LISTEN FOR SIZE/DETAILS #314 — Condition: New'. Won for $19. No box label in catalog photos — size needs to be confirmed.",
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

  console.log("\n⚠️  Confirm size in /admin/products before flipping to in_stock.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
