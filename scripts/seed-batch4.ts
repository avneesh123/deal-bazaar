import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const envPath = join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const clean = line.replace(/\r/g, "");
    const match = clean.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2].trim();
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const BATCH = "batch4";
const BASE = "/Users/apandey/Downloads/deal-bazaar/Sneakers/Batch4";

interface ShoeData {
  folder: string;
  images: string[];
  receipt: string;
  name: string;
  slug: string;
  costPrice: number;
  shippingCost: number;
  sellingPrice: number;
  description: string;
  shortDescription: string;
  specs: Record<string, string>;
  tags: string[];
  // receipt data
  vendor: string;
  purchaseDate: string;
  orderNotes: string;
}

const shoes: ShoeData[] = [
  {
    folder: "1",
    images: [
      "AI-Image-Editor-2026-02-16_20-30-01.png",
      "AI-Image-Editor-2026-02-16_20-30-37.png",
      "AI-Image-Editor-2026-02-16_20-31-21.png",
    ],
    receipt: "IMG_5106.HEIC",
    name: "Nike Air Jordan 1 Retro High OG Mauve",
    slug: "nike-air-jordan-1-retro-high-og-mauve-sz10-5",
    costPrice: 71,
    shippingCost: 9.21,
    sellingPrice: 95,
    description:
      "Nike Air Jordan 1 Retro High OG in Mauve/Sail colorway. Features smooth leather overlays in a muted mauve/plum-brown tone with sail/cream leather base panels, white midsole, and dark outsole. Brand new deadstock with original Jordan box. Size 10.5.",
    shortDescription: "Brand new with OG box",
    specs: {
      Brand: "Nike",
      Model: "Air Jordan 1 Retro High OG",
      Color: "Mauve/Sail",
      Size: "10.5",
      Condition: "Brand New",
      "Style Code": "DZ2523-200",
    },
    tags: ["nike", "jordan", "jordan-1", "mauve", "retro", "high-og"],
    vendor: "stewsshoes (Whatnot)",
    purchaseDate: "2025-10-16",
    orderNotes: "Order #583636044 — JORDAN 1 MAUVE SIZE 10.5",
  },
  {
    folder: "2",
    images: [
      "AI-Image-Editor-2026-02-16_20-34-50.png",
      "AI-Image-Editor-2026-02-16_20-36-14.png",
      "AI-Image-Editor-2026-02-16_20-37-38.png",
      "AI-Image-Editor-2026-02-16_20-39-15.png",
    ],
    receipt: "IMG_5116.HEIC",
    name: "Nike Air Jordan 1 Retro High OG Black Toe GS",
    slug: "nike-air-jordan-1-retro-high-og-black-toe-gs",
    costPrice: 54,
    shippingCost: 9.21,
    sellingPrice: 85,
    description:
      "Nike Air Jordan 1 Retro High OG 'Black Toe' 2025 release in Grade School sizing. Classic white/black/varsity red colorway with a black toe box, white mid-panel, and red heel collar. Brand new deadstock with special retro Jordan box featuring Michael Jordan photo. Size 6.5Y (Women's 8).",
    shortDescription: "Brand new with OG box",
    specs: {
      Brand: "Nike",
      Model: "Air Jordan 1 Retro High OG",
      Color: "White/Black/Varsity Red",
      Size: "6.5Y",
      Condition: "Brand New",
    },
    tags: [
      "nike",
      "jordan",
      "jordan-1",
      "black-toe",
      "retro",
      "high-og",
      "gs",
      "grade-school",
    ],
    vendor: "stewsshoes (Whatnot)",
    purchaseDate: "2025-10-17",
    orderNotes: "Order #586418071 — JORDAN 1 BLACK TOE 2025 SIZE 6.5Y/8W",
  },
  {
    folder: "3",
    images: [
      "AI-Image-Editor-2026-02-16_20-42-07.png",
      "AI-Image-Editor-2026-02-16_20-42-47.png",
      "AI-Image-Editor-2026-02-16_20-43-18.png",
    ],
    receipt: "IMG_5120.HEIC",
    name: "Nike Zoom Freak 5 Black Metallic Gold",
    slug: "nike-zoom-freak-5-black-metallic-gold",
    costPrice: 21,
    shippingCost: 9.21,
    sellingPrice: 45,
    description:
      "Nike Zoom Freak 5 (Giannis Antetokounmpo signature) in Black/Metallic Gold/Diffused Blue colorway. Features black mesh upper with metallic gold Swoosh, gold trim along the midsole, and a blue translucent patterned outsole. Basketball performance shoe. Brand new with paper stuffing, no box.",
    shortDescription: "Brand new, no box",
    specs: {
      Brand: "Nike",
      Model: "Zoom Freak 5",
      Color: "Black/Metallic Gold/Diffused Blue",
      Size: "TBD",
      Condition: "Brand New",
    },
    tags: [
      "nike",
      "zoom-freak",
      "giannis",
      "basketball",
      "black",
      "gold",
      "blue",
    ],
    vendor: "sneakerhustle (Whatnot)",
    purchaseDate: "2025-10-17",
    orderNotes:
      "Order #586634748 — SNEAKERS PULLS #110 (size/condition from livestream)",
  },
];

async function uploadFile(
  bucket: string,
  storagePath: string,
  localPath: string
): Promise<string> {
  const file = readFileSync(localPath);
  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, file, { upsert: true });
  if (error) throw new Error(`Upload failed ${storagePath}: ${error.message}`);
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return publicUrl;
}

async function processShoe(shoe: ShoeData) {
  console.log(`\n📦 Processing: ${shoe.name}`);

  // 1. Upload product images
  const imageUrls: string[] = [];
  for (const img of shoe.images) {
    const localPath = join(BASE, shoe.folder, img);
    const storagePath = `products/${BATCH}/${shoe.slug}_${img}`;
    console.log(`  📸 Uploading ${img}...`);
    const url = await uploadFile("images", storagePath, localPath);
    imageUrls.push(url);
  }

  // 2. Upload receipt
  const receiptPath = join(BASE, shoe.folder, shoe.receipt);
  const receiptStoragePath = `${BATCH}/${shoe.slug}_receipt${shoe.receipt.substring(shoe.receipt.lastIndexOf("."))}`;
  console.log(`  🧾 Uploading receipt...`);
  const receiptUrl = await uploadFile("receipts", receiptStoragePath, receiptPath);

  // 3. Insert product
  const taxAmount = parseFloat((shoe.costPrice * 0.06625).toFixed(2));
  const { data: product, error: prodErr } = await supabase
    .from("products")
    .insert({
      name: shoe.name,
      slug: shoe.slug,
      category: "sneakers",
      cost_price: shoe.costPrice,
      selling_price: shoe.sellingPrice,
      shipping_cost: shoe.shippingCost,
      tax_amount: taxAmount,
      currency: "USD",
      description: shoe.description,
      short_description: shoe.shortDescription,
      status: "in_stock",
      quantity: 1,
      featured: false,
      box_number: `B4-${shoe.folder}`,
      tags: shoe.tags,
      images: imageUrls,
      specs: shoe.specs,
    })
    .select("id")
    .single();

  if (prodErr) throw new Error(`Product insert failed: ${prodErr.message}`);
  console.log(`  ✅ Product created: ${product.id}`);

  // 4. Insert receipt
  const { data: receipt, error: recErr } = await supabase
    .from("receipts")
    .insert({
      vendor: shoe.vendor,
      purchase_date: shoe.purchaseDate,
      total_amount: shoe.costPrice,
      file_url: receiptUrl,
      notes: shoe.orderNotes,
    })
    .select("id")
    .single();

  if (recErr) throw new Error(`Receipt insert failed: ${recErr.message}`);
  console.log(`  ✅ Receipt created: ${receipt.id}`);

  // 5. Link receipt item
  const { error: itemErr } = await supabase.from("receipt_items").insert({
    receipt_id: receipt.id,
    product_id: product.id,
    item_name: shoe.name,
    quantity: 1,
    unit_price: shoe.costPrice,
  });

  if (itemErr)
    throw new Error(`Receipt item insert failed: ${itemErr.message}`);
  console.log(`  ✅ Receipt linked to product`);
}

async function main() {
  console.log("🚀 Seeding Batch 4 — 3 shoes\n");

  for (const shoe of shoes) {
    try {
      await processShoe(shoe);
    } catch (err) {
      console.error(
        `❌ Failed: ${shoe.name} — ${err instanceof Error ? err.message : err}`
      );
    }
  }

  console.log("\n✅ Batch 4 complete!");
}

main();
