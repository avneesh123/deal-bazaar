/**
 * Seed Batch C1-7: Nike Vomero 5 Total Orange / Black / White, Size US 11.
 * $57 random pull from sneakerhustle on Whatnot ("$1 SNEAKER AUCTIONS — 5TRILLION SHOES",
 * 17 Oct 2025). Lot #106. Brand new with OG box.
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

const FOLDER = "/tmp/db-batchC/c1-7-vomero-5-orange-sz11";
const SLUG = "nike-vomero-5-total-orange-black-sz11";
const NAME = "Nike Vomero 5 Total Orange / Black (Size 11)";

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

  const COST_PRICE = 57;
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
        "Nike Vomero 5 in the Total Orange / Black / White colorway — early-2000s running heritage with chunky layered Phylon midsole, Zoom Air heel, breathable orange engineered mesh upper, black TPU support cage, and a chrome-finished diamond-pattern heel counter. Brand new with hangtag and original Nike box. Size US 11 (UK 10 / EU 45 / 29 cm).",
      short_description: "Brand new with OG box",
      status: "in_stock",
      quantity: 1,
      featured: false,
      box_number: "C1-7",
      tags: [
        "nike",
        "vomero",
        "vomero-5",
        "running",
        "y2k",
        "total-orange",
        "orange",
        "black",
        "size-11",
        "whatnot-pull",
      ],
      images: imageUrls,
      specs: {
        Brand: "Nike",
        Model: "Vomero 5",
        Color: "Total Orange / Black / White",
        Size: "11",
        EU: "45",
        UK: "10",
        Condition: "Brand New",
        Source: "Whatnot — sneakerhustle pull #106",
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
  const heic = path.join(FOLDER, "_receipt", "IMG_5767.HEIC");
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
          vendor: "Whatnot — sneakerhustle",
          purchase_date: "2025-10-17",
          total_amount: COST_PRICE,
          notes:
            "Whatnot packing slip — order #586633286 from sneakerhustle's '$1 SNEAKER AUCTIONS — 5TRILLION SHOES' livestream on 17 October 2025. Listed as 'SNEAKERS PULLS #106 (LISTEN FOR SIZE/CONDITION/INFO)'. Won for $57. Box label confirms Vomero 5 size 11.",
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
