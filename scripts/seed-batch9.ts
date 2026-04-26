/**
 * Seed Batch 9 — five shoes from the Apr 25 takeout.
 *
 * For each shoe:
 *   1. Upload catalog PNGs (in <folder>/catalog/) to Supabase storage
 *      under products/batch9/<slug>/<filename>.
 *   2. Upload the receipt HEIC (if present in <folder>/_receipt/)
 *      converted to JPG, into the receipts bucket.
 *   3. Insert the products row.
 *   4. Insert the receipts row + receipt_items row, linked.
 *
 * Idempotent — uses upsert on storage and skips inserts when the slug
 * already exists.
 *
 * Usage: npx tsx scripts/seed-batch9.ts
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync, readdirSync } from "fs";
import { execSync } from "child_process";
import path from "path";

// ---------------------------------------------------------------------------
// Load .env.local
// ---------------------------------------------------------------------------
const envPath = path.join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf-8");
  for (const raw of envContent.split("\n")) {
    const line = raw.replace(/\r/g, "");
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) {
      process.env[m[1].trim()] = m[2].trim();
    }
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ROOT = "/tmp/db-batch9";

// ---------------------------------------------------------------------------
// Batch definition
// ---------------------------------------------------------------------------
interface Shoe {
  folder: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  costPrice: number | null;
  sellingPrice: number;
  shippingCost: number;
  boxNumber: string;
  specs: Record<string, string>;
  tags: string[];
  category: "sneakers";
  // Receipt info (optional — some shoes don't have a receipt in this batch)
  receipt?: {
    vendor: string;
    purchaseDate: string; // YYYY-MM-DD
    totalAmount: number;
    notes: string;
  };
}

const BATCH: Shoe[] = [
  {
    folder: "b9-1-adidas-top-ten-hi",
    slug: "adidas-top-ten-hi-white-navy",
    name: "Adidas Top Ten Hi White / Navy",
    shortDescription: "Brand new with original box",
    description:
      "Adidas Top Ten Hi in white leather with navy three-stripes and red trim accents. A retro basketball silhouette from the Adidas Originals archive, featuring the classic Top Ten branding on the tongue. Brand new with original box and tags. Size 11.",
    costPrice: 37,
    sellingPrice: 65,
    shippingCost: 8,
    boxNumber: "B9-1",
    specs: {
      Brand: "Adidas",
      Model: "Top Ten Hi",
      Color: "White / Navy / Red",
      Size: "11",
      Condition: "Brand New",
    },
    tags: ["adidas", "top-ten", "originals", "retro", "white", "navy", "high-top"],
    category: "sneakers",
    receipt: {
      vendor: "Whatnot — fragmented_soles",
      purchaseDate: "2026-02-28",
      totalAmount: 37,
      notes: 'Order #862388028 — "$100,000 OF $1 SNEAKER AUCTIONS + FREE XBOX BACKBONE"',
    },
  },
  {
    folder: "b9-2-ua-kids-blue",
    slug: "under-armour-kids-light-blue-4y",
    name: "Under Armour Kids Light Blue Sneaker",
    shortDescription: "Brand new — Whatnot random pull",
    description:
      "Under Armour kids sneaker in light blue with white midsole. A breathable mesh runner with the classic UA logo on the tongue. Brand new from a Whatnot live random pull. Size 4Y (kids).",
    costPrice: 5,
    sellingPrice: 35,
    shippingCost: 8,
    boxNumber: "B9-2",
    specs: {
      Brand: "Under Armour",
      Model: "Random Pull",
      Color: "Light Blue / White",
      Size: "4Y",
      Condition: "Brand New",
    },
    tags: ["under-armour", "kids", "youth", "light-blue", "running"],
    category: "sneakers",
    receipt: {
      vendor: "Whatnot — stewsshoes",
      purchaseDate: "2025-10-16",
      totalAmount: 5,
      notes: 'Order #583632989 — Random Pull #201 from "NO MISSES. JUST HEATERS AT A $1" livestream',
    },
  },
  {
    folder: "b9-3-aj1-retro-high-white-red",
    slug: "air-jordan-1-retro-high-white-red",
    name: "Air Jordan 1 Retro High White / Red",
    shortDescription: "Brand new — StockX verified authentic",
    description:
      "Air Jordan 1 Retro High in white leather with red Nike Swoosh and red interior collar. Detailed red contrast stitching across the upper. Brand new with original box, comes with the StockX green Verified Authentic tag attached.",
    costPrice: null,
    sellingPrice: 130,
    shippingCost: 10,
    boxNumber: "B9-3",
    specs: {
      Brand: "Nike",
      Model: "Air Jordan 1 Retro High",
      Color: "White / Red",
      Condition: "Brand New",
    },
    tags: ["nike", "jordan", "air-jordan-1", "retro", "white", "red", "high-top", "stockx"],
    category: "sneakers",
  },
  {
    folder: "b9-4-random-pull-black-wave",
    slug: "random-pull-black-wave-sneaker",
    name: "Random Pull Black Wave Sneaker",
    shortDescription: "Brand new — Whatnot $1 random pull",
    description:
      "Athletic high-top in black with a tonal white wave pattern across the upper, white laces, and translucent sole. From a Whatnot live $1 random pull featuring On Cloud, Nike, Hoka, and Adidas inventory.",
    costPrice: 5,
    sellingPrice: 45,
    shippingCost: 10,
    boxNumber: "B9-4",
    specs: {
      Brand: "Random Pull",
      Color: "Black / White",
      Condition: "Brand New",
    },
    tags: ["random-pull", "black", "white", "athletic", "high-top"],
    category: "sneakers",
    receipt: {
      vendor: "Whatnot — essensole",
      purchaseDate: "2025-10-26",
      totalAmount: 5,
      notes: 'Order #602288738 — Random Sneaker Pull #309 from "$1 DOLLAR STARTS ONCLOUD, NIKE, HOKA, ADIDAS AND MORE"',
    },
  },
  {
    folder: "b9-5-aj6-red-oreo",
    slug: "air-jordan-6-retro-red-oreo-pre-owned",
    name: "Air Jordan 6 Retro Red Oreo (Pre-Owned)",
    shortDescription: "Pre-owned with original box",
    description:
      "Air Jordan 6 Retro in the Red Oreo colorway — white leather upper with red speckled accents and red lace lock. Comes with original box (red speckled). Pre-owned, in good condition. Size 8.5 men's.",
    costPrice: 78,
    sellingPrice: 130,
    shippingCost: 10,
    boxNumber: "B9-5",
    specs: {
      Brand: "Nike",
      Model: "Air Jordan 6 Retro",
      Color: "White / Red (Red Oreo)",
      Size: "8.5",
      Condition: "Pre-Owned",
    },
    tags: ["nike", "jordan", "air-jordan-6", "retro", "red", "oreo", "pre-owned"],
    category: "sneakers",
    receipt: {
      vendor: "Whatnot — fragmented_soles",
      purchaseDate: "2026-02-28",
      totalAmount: 78,
      notes: 'Order #862386731 — "$100,000 OF $1 SNEAKER AUCTIONS + FREE XBOX BACKBONE"',
    },
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function uploadCatalogImages(slug: string, catalogDir: string): Promise<string[]> {
  if (!existsSync(catalogDir)) {
    console.warn(`  ⚠️  no catalog dir at ${catalogDir}`);
    return [];
  }
  const files = readdirSync(catalogDir)
    .filter((f) => f.toLowerCase().endsWith(".png") && !f.startsWith("."))
    .sort();

  const urls: string[] = [];
  for (const f of files) {
    const local = path.join(catalogDir, f);
    const storagePath = `products/batch9/${slug}/${f}`;
    const buf = readFileSync(local);
    const { error } = await supabase.storage
      .from("images")
      .upload(storagePath, buf, { upsert: true, contentType: "image/png" });
    if (error) {
      console.error(`    ✗ ${f}: ${error.message}`);
      continue;
    }
    const url = supabase.storage.from("images").getPublicUrl(storagePath).data.publicUrl;
    urls.push(url);
    console.log(`    ✓ ${f}`);
  }
  return urls;
}

async function uploadReceipt(slug: string, receiptDir: string): Promise<string | null> {
  if (!existsSync(receiptDir)) return null;
  const heics = readdirSync(receiptDir).filter((f) => /\.heic$/i.test(f));
  if (heics.length === 0) return null;
  const heic = path.join(receiptDir, heics[0]);
  // Convert to JPG via sips
  const jpg = heic.replace(/\.heic$/i, ".jpg");
  if (!existsSync(jpg)) {
    execSync(`sips -s format jpeg "${heic}" --out "${jpg}" 2>/dev/null`);
  }
  const buf = readFileSync(jpg);
  const storagePath = `batch9/${slug}.jpg`;
  const { error } = await supabase.storage
    .from("receipts")
    .upload(storagePath, buf, { upsert: true, contentType: "image/jpeg" });
  if (error) {
    console.error(`    ✗ receipt upload: ${error.message}`);
    return null;
  }
  // receipts bucket is private — store the signed/public path. Since the
  // bucket may be private, return the storage path; admin UI can sign on demand.
  return supabase.storage.from("receipts").getPublicUrl(storagePath).data.publicUrl;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("=== Seeding Batch 9 ===\n");

  for (const shoe of BATCH) {
    console.log(`\n📦 ${shoe.boxNumber} — ${shoe.name} (${shoe.slug})`);

    // Skip if product already exists (idempotency)
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("slug", shoe.slug)
      .maybeSingle();
    if (existing) {
      console.log(`   already exists (id=${existing.id}) — skipping`);
      continue;
    }

    const folder = path.join(ROOT, shoe.folder);
    const catalogDir = path.join(folder, "catalog");

    console.log("  ☁️  uploading catalog images...");
    const imageUrls = await uploadCatalogImages(shoe.slug, catalogDir);
    if (imageUrls.length === 0) {
      console.error("     no images uploaded — skipping product");
      continue;
    }

    console.log("  📝 inserting product row...");
    const { data: product, error: prodErr } = await supabase
      .from("products")
      .insert({
        slug: shoe.slug,
        name: shoe.name,
        cost_price: shoe.costPrice,
        selling_price: shoe.sellingPrice,
        shipping_cost: shoe.shippingCost,
        tax_amount: shoe.costPrice
          ? parseFloat((shoe.costPrice * 0.06625).toFixed(2))
          : 0,
        currency: "USD",
        category: shoe.category,
        description: shoe.description,
        short_description: shoe.shortDescription,
        status: "in_stock",
        quantity: 1,
        featured: false,
        box_number: shoe.boxNumber,
        tags: shoe.tags,
        images: imageUrls,
        specs: shoe.specs,
      })
      .select("id")
      .single();

    if (prodErr || !product) {
      console.error(`     ✗ ${prodErr?.message ?? "no product returned"}`);
      continue;
    }
    console.log(`     ✓ product id=${product.id}`);

    if (shoe.receipt) {
      console.log("  🧾 uploading receipt...");
      const receiptDir = path.join(folder, "_receipt");
      const receiptUrl = await uploadReceipt(shoe.slug, receiptDir);

      console.log("  📝 inserting receipt + receipt_item...");
      const { data: receipt, error: rErr } = await supabase
        .from("receipts")
        .insert({
          file_url: receiptUrl,
          vendor: shoe.receipt.vendor,
          purchase_date: shoe.receipt.purchaseDate,
          total_amount: shoe.receipt.totalAmount,
          notes: shoe.receipt.notes,
        })
        .select("id")
        .single();

      if (rErr || !receipt) {
        console.error(`     ✗ receipt: ${rErr?.message ?? "no receipt returned"}`);
      } else {
        const { error: liErr } = await supabase.from("receipt_items").insert({
          receipt_id: receipt.id,
          product_id: product.id,
          item_name: shoe.name,
          quantity: 1,
          unit_price: shoe.receipt.totalAmount,
        });
        if (liErr) console.error(`     ✗ receipt_item: ${liErr.message}`);
        else console.log(`     ✓ receipt id=${receipt.id} linked`);
      }
    }
  }

  console.log("\n=== Done ===");
  console.log("Next: npm run generate && commit + push to deploy");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
