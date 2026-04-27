/**
 * Seed Batch 9-6: Nike Air Force 1 Low "Inside Out" Green Bean
 * (Pre-Owned, size 11.5, from Whatnot fragmented_soles 2026-02-28).
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

const FOLDER = "/tmp/db-batch9-extra/b9-6-nike-af1-inside-out-green-bean";
const SLUG = "nike-air-force-1-low-inside-out-green-bean";
const NAME = "Nike Air Force 1 Low Inside Out Green Bean (Pre-Owned)";

async function uploadCatalogImages(): Promise<string[]> {
  const dir = path.join(FOLDER, "catalog");
  if (!existsSync(dir)) throw new Error(`No catalog dir at ${dir}`);
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".png"))
    .sort();
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

async function uploadReceipt(): Promise<string | null> {
  const heic = path.join(FOLDER, "_receipt", "IMG_5705.HEIC");
  if (!existsSync(heic)) return null;
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
    return null;
  }
  return supabase.storage.from("receipts").getPublicUrl(storagePath).data.publicUrl;
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

  console.log("\n📝 inserting product...");
  const COST_PRICE = 30; // $1-auction livestream estimate (slip didn't show subtotal)
  const SELLING_PRICE = 100;

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
        "Nike Air Force 1 Low in the bold 'Inside Out' Green Bean colorway — grey nylon mesh and maroon/purple leather upper sitting on a black-and-white houndstooth-print midsole, with a vivid green leather lining that wraps the collar and tongue (NIKE AIR debossed in green). A standout 2014 'Year of the Snake'-era pair. Pre-owned, in good condition, comes with original box. Size 11.5 men's.",
      short_description: "Pre-owned with original box",
      status: "in_stock",
      quantity: 1,
      featured: false,
      box_number: "B9-6",
      tags: [
        "nike",
        "air-force-1",
        "af1",
        "inside-out",
        "green-bean",
        "year-of-the-snake",
        "pre-owned",
        "maroon",
        "green",
      ],
      images: imageUrls,
      specs: {
        Brand: "Nike",
        Model: "Air Force 1 Low",
        Color: "Inside Out / Green Bean (Grey / Maroon / Green)",
        Size: "11.5",
        Condition: "Pre-Owned",
      },
    })
    .select("id")
    .single();
  if (prodErr || !product) {
    console.error(`✗ product: ${prodErr?.message ?? "no row returned"}`);
    process.exit(1);
  }
  console.log(`✓ product id=${product.id}`);

  console.log("\n🧾 uploading receipt...");
  const receiptUrl = await uploadReceipt();
  const { data: receipt, error: rErr } = await supabase
    .from("receipts")
    .insert({
      file_url: receiptUrl,
      vendor: "Whatnot — fragmented_soles",
      purchase_date: "2026-02-28",
      total_amount: COST_PRICE,
      notes:
        'Order #862382199 — "$100,000 OF $1 SNEAKER AUCTIONS + FREE XBOX BACKBONE" livestream. Description code DN715. Subtotal not visible on slip.',
    })
    .select("id")
    .single();
  if (rErr || !receipt) {
    console.error(`✗ receipt: ${rErr?.message ?? "no row"}`);
  } else {
    const { error: liErr } = await supabase.from("receipt_items").insert({
      receipt_id: receipt.id,
      product_id: product.id,
      item_name: NAME,
      quantity: 1,
      unit_price: COST_PRICE,
    });
    if (liErr) console.error(`✗ receipt_item: ${liErr.message}`);
    else console.log(`✓ receipt id=${receipt.id} linked`);
  }

  console.log("\nDone. Run `npm run generate` then commit + push.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
