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

const BASE = "/Users/apandey/Downloads/deal-bazaar/Sneakers/Batch4/4";
const SLUG = "q4-white-streak-495-d-sp-black-white";

async function upload(bucket: string, storagePath: string, localPath: string) {
  const file = readFileSync(localPath);
  const { error } = await supabase.storage.from(bucket).upload(storagePath, file, { upsert: true });
  if (error) throw new Error(`Upload failed ${storagePath}: ${error.message}`);
  return supabase.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl;
}

async function main() {
  console.log("📦 Processing: Q4 White Streak 495 D SP");

  // Upload images
  const images = [
    "AI-Image-Editor-2026-02-16_22-57-11.png",
    "AI-Image-Editor-2026-02-16_22-57-56.png",
    "AI-Image-Editor-2026-02-16_23-01-02.png",
  ];
  const imageUrls: string[] = [];
  for (const img of images) {
    console.log(`  📸 Uploading ${img}...`);
    const url = await upload("images", `products/batch4/${SLUG}_${img}`, join(BASE, img));
    imageUrls.push(url);
  }

  // Upload receipt
  console.log("  🧾 Uploading receipt...");
  const receiptUrl = await upload("receipts", `batch4/${SLUG}_receipt.HEIC`, join(BASE, "IMG_5129.heic"));

  // Insert product
  const costPrice = 9;
  const taxAmount = parseFloat((costPrice * 0.06625).toFixed(2));

  const { data: product, error: prodErr } = await supabase
    .from("products")
    .insert({
      name: "Q4 Sports White Streak 495 D SP Black White",
      slug: SLUG,
      category: "sneakers",
      cost_price: costPrice,
      selling_price: 35,
      shipping_cost: 9.21,
      tax_amount: taxAmount,
      currency: "USD",
      description: "Q4 Sports White Streak 495 D SP basketball shoe in Black/White/Red colorway. Features a black knit upper with bold white and black striped heel panel, red accents on the tongue and collar lining, and a white rubber outsole. Brand new with OG box. Size 7 US / UK 6.",
      short_description: "Brand new with OG box",
      status: "in_stock",
      quantity: 1,
      featured: false,
      box_number: "B4-4",
      tags: ["q4", "q4-sports", "white-streak", "basketball", "black", "white", "red"],
      images: imageUrls,
      specs: {
        Brand: "Q4 Sports",
        Model: "White Streak 495 D SP",
        Color: "Black/White/Red",
        Size: "7",
        Condition: "Brand New",
        "Style Code": "Q4BB-917",
      },
    })
    .select("id")
    .single();

  if (prodErr) throw new Error(`Product insert failed: ${prodErr.message}`);
  console.log(`  ✅ Product created: ${product.id}`);

  // Insert receipt
  const { data: receipt, error: recErr } = await supabase
    .from("receipts")
    .insert({
      vendor: "sneakerhustle (Whatnot)",
      purchase_date: "2025-10-17",
      total_amount: costPrice,
      file_url: receiptUrl,
      notes: "Order #586619139 — SNEAKERS PULLS #80 (size/condition from livestream)",
    })
    .select("id")
    .single();

  if (recErr) throw new Error(`Receipt insert failed: ${recErr.message}`);
  console.log(`  ✅ Receipt created: ${receipt.id}`);

  // Link receipt item
  const { error: itemErr } = await supabase.from("receipt_items").insert({
    receipt_id: receipt.id,
    product_id: product.id,
    item_name: "Q4 Sports White Streak 495 D SP Black White",
    quantity: 1,
    unit_price: costPrice,
  });

  if (itemErr) throw new Error(`Receipt item link failed: ${itemErr.message}`);
  console.log("  ✅ Receipt linked to product");
  console.log("\n✅ Done!");
}

main();
