/**
 * Seed Batch D1-9: Air Jordan 1 Retro High OG "Rebellionaire" — pre-owned, size TBD.
 * No receipt and no box label provided in this batch — listing held as
 * `unlisted` until size + cost are confirmed in /admin.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync, readdirSync } from "fs";
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

const FOLDER = "/tmp/db-batchD/d1-9-aj1-rebellionaire-used";
const SLUG = "air-jordan-1-retro-high-og-rebellionaire-pre-owned";
const NAME = "Air Jordan 1 Retro High OG Rebellionaire — Pre-Owned";

async function uploadCatalogImages(): Promise<string[]> {
  const dir = path.join(FOLDER, "catalog");
  if (!existsSync(dir)) throw new Error(`No catalog dir at ${dir}`);
  const files = readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
  const urls: string[] = [];
  for (const f of files) {
    const storagePath = `products/batchD/${SLUG}/${f}`;
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

  // No receipt was included in this batch — leaving cost as a placeholder.
  const COST_PRICE = 35;
  const SELLING_PRICE = 140;

  console.log("\n📝 inserting product (status=unlisted until size + cost confirmed)...");
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
        "Air Jordan 1 Retro High OG 'Rebellionaire' — Black History Month 2022 release with stitched graffiti/text print across the side panels and Swoosh, light cement-grey toe and heel paneling, pink rose laces, black collar with red NIKE AIR tongue tag, white midsole and grey rubber outsole. Pre-owned with visible toe-cap wear consistent with light wear. Pending review — size and final pricing to be confirmed.",
      short_description: "Pre-owned — size and pricing pending review",
      status: "unlisted",
      quantity: 1,
      featured: false,
      box_number: "D1-9",
      tags: [
        "nike",
        "jordan",
        "air-jordan-1",
        "retro-high-og",
        "rebellionaire",
        "black-history-month",
        "pink",
        "pre-owned",
      ],
      images: imageUrls,
      specs: {
        Brand: "Nike / Jordan",
        Model: "Air Jordan 1 Retro High OG",
        Color: "Rebellionaire (Cement Grey / Black graffiti)",
        Condition: "Pre-Owned",
      },
    })
    .select("id")
    .single();
  if (prodErr || !product) {
    console.error(`✗ product: ${prodErr?.message ?? "no row returned"}`);
    process.exit(1);
  }
  console.log(`✓ product id=${product.id} (status=unlisted)`);

  console.log(
    "\n⚠️  No receipt was included with this batch — size and actual cost are " +
      "unknown. Open /admin/products to fill in size + final pricing, then flip " +
      "status to in_stock."
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
