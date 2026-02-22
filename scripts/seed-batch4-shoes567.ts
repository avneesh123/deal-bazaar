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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BASE = "/Users/apandey/Downloads/deal-bazaar/Sneakers/Batch4";

async function upload(bucket: string, storagePath: string, localPath: string) {
  const file = readFileSync(localPath);
  const { error } = await supabase.storage.from(bucket).upload(storagePath, file, { upsert: true });
  if (error) throw new Error(`Upload failed ${storagePath}: ${error.message}`);
  return supabase.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl;
}

interface Shoe {
  folder: string;
  images: string[];
  receipt: string;
  slug: string;
  name: string;
  costPrice: number;
  shippingCost: number;
  sellingPrice: number;
  description: string;
  shortDescription: string;
  specs: Record<string, string>;
  tags: string[];
  vendor: string;
  purchaseDate: string;
  orderNotes: string;
}

const shoes: Shoe[] = [
  {
    folder: "5",
    images: ["AI-Image-Editor-2026-02-16_23-23-09.png"],
    receipt: "IMG_5133.HEIC",
    slug: "adidas-yeezy-foam-runner-mx-crab",
    name: "Adidas Yeezy Foam Runner MX Crab",
    costPrice: 44,
    shippingCost: 9.21,
    sellingPrice: 75,
    description:
      "Adidas Yeezy Foam Runner in the MX Crab colorway. Features the signature lattice cutout upper in a dark olive/black base with marbled gold and olive veining. Lightweight EVA foam construction. Brand new, deadstock. Size 9.",
    shortDescription: "Brand new, no box",
    specs: {
      Brand: "Adidas",
      Model: "Yeezy Foam Runner",
      Color: "MX Crab (Black/Forest)",
      Size: "9",
      Condition: "Brand New",
      "Style Code": "GX1028",
    },
    tags: ["adidas", "yeezy", "foam-runner", "crab", "kanye", "slides"],
    vendor: "commonhype (Whatnot)",
    purchaseDate: "2025-10-16",
    orderNotes: "Order #585459230 — crab slides black and forest - 9",
  },
  {
    folder: "6",
    images: [
      "AI-Image-Editor-2026-02-16_23-28-15.png",
      "AI-Image-Editor-2026-02-16_23-28-55.png",
    ],
    receipt: "IMG_5142.HEIC",
    slug: "adidas-grand-court-2-k-blue-iridescent",
    name: "Adidas Grand Court 2.0 K Blue Iridescent",
    costPrice: 25,
    shippingCost: 0,
    sellingPrice: 40,
    description:
      "Adidas Grand Court 2.0 K in steel blue with iridescent holographic three stripes and heel tab. Clean white sole. Kids/youth sizing. Brand new with tags. Size 5 (Youth).",
    shortDescription: "Brand new with tags",
    specs: {
      Brand: "Adidas",
      Model: "Grand Court 2.0 K",
      Color: "Blue/Iridescent/White",
      Size: "5Y",
      Condition: "Brand New",
      "Style Code": "JR6095",
    },
    tags: ["adidas", "grand-court", "blue", "iridescent", "kids", "youth"],
    vendor: "4pfwholesale (Whatnot)",
    purchaseDate: "2025-10-16",
    orderNotes: "Order #585376609 — $1 NEW SNEAKER PULLS #107",
  },
  {
    folder: "7",
    images: [
      "AI-Image-Editor-2026-02-16_23-31-56.png",
      "AI-Image-Editor-2026-02-16_23-33-46.png",
    ],
    receipt: "IMG_5143.HEIC",
    slug: "nike-revolution-7-black-white",
    name: "Nike Revolution 7 Black White",
    costPrice: 25,
    shippingCost: 9.21,
    sellingPrice: 50,
    description:
      "Nike Revolution 7 running shoe in Black/White colorway. Features a black mesh upper with white Swoosh, white midsole, and black outsole. Lightweight and comfortable for everyday wear. Brand new with OG box. Size 10.",
    shortDescription: "Brand new with OG box",
    specs: {
      Brand: "Nike",
      Model: "Revolution 7",
      Color: "Black/White",
      Size: "10",
      Condition: "Brand New",
      "Style Code": "FB2207-001",
    },
    tags: ["nike", "revolution", "running", "black", "white"],
    vendor: "4pfwholesale (Whatnot)",
    purchaseDate: "2025-10-16",
    orderNotes: "Order #585371847 — $1 NEW SNEAKER PULLS #102",
  },
];

async function processShoe(shoe: Shoe) {
  console.log(`\n📦 Processing: ${shoe.name}`);

  const imageUrls: string[] = [];
  for (const img of shoe.images) {
    console.log(`  📸 Uploading ${img}...`);
    const url = await upload("images", `products/batch4/${shoe.slug}_${img}`, join(BASE, shoe.folder, img));
    imageUrls.push(url);
  }

  console.log("  🧾 Uploading receipt...");
  const receiptUrl = await upload(
    "receipts",
    `batch4/${shoe.slug}_receipt${shoe.receipt.substring(shoe.receipt.lastIndexOf("."))}`,
    join(BASE, shoe.folder, shoe.receipt)
  );

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

  const { error: itemErr } = await supabase.from("receipt_items").insert({
    receipt_id: receipt.id,
    product_id: product.id,
    item_name: shoe.name,
    quantity: 1,
    unit_price: shoe.costPrice,
  });

  if (itemErr) throw new Error(`Receipt item link failed: ${itemErr.message}`);
  console.log("  ✅ Receipt linked to product");
}

async function main() {
  console.log("🚀 Seeding Batch 4 — shoes 5, 6, 7\n");
  for (const shoe of shoes) {
    try {
      await processShoe(shoe);
    } catch (err) {
      console.error(`❌ Failed: ${shoe.name} — ${err instanceof Error ? err.message : err}`);
    }
  }
  console.log("\n✅ Batch 4 shoes 5-7 complete!");
}

main();
