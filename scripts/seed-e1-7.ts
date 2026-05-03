/**
 * Seed Batch E1-7: Nike Pegasus 41 x Union "Bluebird".
 * $47 random pull #85 from stewsshoes' "FREE TRAVIS SCOTTS + 500 SHOES AT $1"
 * livestream on Whatnot (18 Oct 2025). Brand new per slip.
 *
 * Held as `unlisted` — no box visible in catalog shots, so size is unknown.
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

const FOLDER = "/tmp/db-batchE/e1-7-pegasus-41-union";
const SLUG = "nike-pegasus-41-x-union-bluebird";
const NAME = "Nike Pegasus 41 x Union Bluebird";

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

  const COST_PRICE = 47;
  const SELLING_PRICE = 130;

  console.log("\n📝 inserting product (status=unlisted — size TBD)...");
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
        "Nike Pegasus 41 x Union LA in the 'Bluebird' colorway — clean white mesh upper with blue Union-printed Swoosh, royal-blue Union heel tab, signature blue checkered/buffalo-plaid flat laces, white midsole and black rubber outsole. Brand new per the Whatnot slip. Size pending review.",
      short_description: "Brand new — size pending review",
      status: "unlisted",
      quantity: 1,
      featured: false,
      box_number: "E1-7",
      tags: [
        "nike",
        "pegasus",
        "pegasus-41",
        "union",
        "union-la",
        "bluebird",
        "running",
        "white",
        "blue",
        "whatnot-pull",
      ],
      images: imageUrls,
      specs: {
        Brand: "Nike",
        Model: "Pegasus 41 x Union LA",
        Color: "Bluebird (White / Royal Blue)",
        Condition: "Brand New",
        Source: "Whatnot — stewsshoes pull #85",
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
  const heic = path.join(FOLDER, "_receipt", "IMG_5847.HEIC");
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
          purchase_date: "2025-10-18",
          total_amount: COST_PRICE,
          notes:
            "Whatnot packing slip — order #588086000 from stewsshoes' 'FREE TRAVIS SCOTTS + 500 SHOES AT $1' livestream on 18 October 2025. Listed as 'BRAND NEW RANDOM PULLS — LISTEN FOR SIZE #85 — BRAND NEW'. Won for $47. No box label in catalog photos — size needs to be confirmed.",
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
