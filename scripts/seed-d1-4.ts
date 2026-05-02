/**
 * Seed Batch D1-4: Nike Air Max 720 Volt / Bright Crimson — size TBD.
 *
 * NOTE: the IMG_5781.HEIC file shipped in this batch is the SAME file
 * (verified by MD5) as the receipt already attached to D1-3, so it was not
 * re-uploaded. The actual purchase receipt + size for this Air Max 720
 * appear to be missing — the listing is therefore inserted with status
 * `unlisted` and a placeholder cost so the user can review before going live.
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

const FOLDER = "/tmp/db-batchD/d1-4-air-max-720-volt-crimson";
const SLUG = "nike-air-max-720-volt-bright-crimson";
const NAME = "Nike Air Max 720 Volt / Bright Crimson";

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

  // Cost is a placeholder — actual receipt is missing from this batch.
  const COST_PRICE = 40;
  const SELLING_PRICE = 130;

  console.log("\n📝 inserting product (status=unlisted until receipt + size confirmed)...");
  const { data: product, error: prodErr } = await supabase
    .from("products")
    .insert({
      slug: SLUG,
      name: NAME,
      cost_price: COST_PRICE,
      selling_price: SELLING_PRICE,
      shipping_cost: 14,
      tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
      currency: "USD",
      category: "sneakers",
      description:
        "Nike Air Max 720 in the Volt / Bright Crimson colorway — full-foot 720° Air Max bubble in volt-tinted clear cushion, perforated black mesh upper with subtle gradient overlay, bright crimson Swoosh and 'AIRMAX' tongue branding. Pending review — size and receipt to be confirmed.",
      short_description: "Pending review — size + receipt TBD",
      status: "unlisted",
      quantity: 1,
      featured: false,
      box_number: "D1-4",
      tags: [
        "nike",
        "air-max",
        "air-max-720",
        "volt",
        "bright-crimson",
        "black",
      ],
      images: imageUrls,
      specs: {
        Brand: "Nike",
        Model: "Air Max 720",
        Color: "Volt / Bright Crimson / Black",
        Condition: "Brand New (TBC)",
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
    "\n⚠️  Receipt was not uploaded — the IMG_5781.HEIC in this batch is " +
      "the same file already attached to D1-3. Add the actual purchase " +
      "receipt + size via /admin/products before flipping to in_stock."
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
