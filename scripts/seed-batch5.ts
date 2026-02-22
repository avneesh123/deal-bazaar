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

const BASE = "/Users/apandey/Downloads/deal-bazaar/Sneakers/Batch5";

async function upload(bucket: string, storagePath: string, localPath: string) {
  const file = readFileSync(localPath);
  const { error } = await supabase.storage.from(bucket).upload(storagePath, file, { upsert: true });
  if (error) throw new Error(`Upload failed ${storagePath}: ${error.message}`);
  return supabase.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl;
}

interface Shoe {
  folder: string;
  images: string[];
  receipt: string | null;
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
    folder: "1",
    images: [
      "AI-Image-Editor-2026-02-17_18-34-54.png",
      "AI-Image-Editor-2026-02-17_18-35-22.png",
      "AI-Image-Editor-2026-02-17_18-35-54.png",
      "AI-Image-Editor-2026-02-17_18-36-36.png",
    ],
    receipt: "IMG_5151.HEIC",
    slug: "nike-nocta-air-zoom-drive-summit-white",
    name: "Nike NOCTA Air Zoom Drive Summit White",
    costPrice: 42,
    shippingCost: 0,
    sellingPrice: 130,
    description:
      "Nike NOCTA Air Zoom Drive in Summit White colorway. Drake's signature collaboration featuring an all-white leather and mesh upper with NOCTA triple-star logo on the heel, chunky sole with visible Air unit, and perforated toe box. Includes extra set of orange laces. Brand new. Size 11.",
    shortDescription: "Brand new",
    specs: {
      Brand: "Nike",
      Model: "NOCTA Air Zoom Drive",
      Color: "Summit White",
      Size: "11",
      Condition: "Brand New",
    },
    tags: ["nike", "nocta", "drake", "air-zoom-drive", "white"],
    vendor: "stewsshoes (Whatnot)",
    purchaseDate: "2025-10-16",
    orderNotes: "Order #58362610 — NO MISSES. JUST HEATERS AT A $1.",
  },
  {
    folder: "2",
    images: [
      "AI-Image-Editor-2026-02-17_18-38-44.png",
      "AI-Image-Editor-2026-02-17_18-39-18.png",
      "AI-Image-Editor-2026-02-17_18-39-55.png",
    ],
    receipt: null,
    slug: "q4-sports-emss-ii-navy-red-gold",
    name: "Q4 Sports EMSS-II Navy Red Gold",
    costPrice: 12,
    shippingCost: 0,
    sellingPrice: 40,
    description:
      "Q4 Sports EMSS-II basketball shoe in a patriotic Navy/Red/Gold/White colorway. Features a navy blue mesh upper with red collar lining and lace accents, metallic gold midsole trim and branding, and a white midsole. Brand new with OG box. Size 11.",
    shortDescription: "Brand new with OG box",
    specs: {
      Brand: "Q4 Sports",
      Model: "EMSS-II",
      Color: "Navy/Red/Gold/White",
      Size: "11",
      Condition: "Brand New",
    },
    tags: ["q4", "q4-sports", "emss-ii", "basketball", "navy", "red", "gold"],
    vendor: "Unknown",
    purchaseDate: "2025-10-17",
    orderNotes: "No receipt — cost estimated at $12 based on similar Q4 purchases",
  },
  {
    folder: "3",
    images: [
      "AI-Image-Editor-2026-02-17_18-41-51.png",
      "AI-Image-Editor-2026-02-17_18-42-32.png",
      "AI-Image-Editor-2026-02-17_18-43-17.png",
    ],
    receipt: "IMG_5160.HEIC",
    slug: "q4-sports-dc2-white-black-yellow",
    name: "Q4 Sports DC2 White Black Yellow",
    costPrice: 23,
    shippingCost: 9.21,
    sellingPrice: 45,
    description:
      "Q4 Sports DC2 basketball shoe in White/Black/Yellow colorway. Features a white mesh upper with black heel and midfoot accents, yellow/gold tongue lining and collar details, and a white speckled midsole. Brand new with OG box. Size 12.",
    shortDescription: "Brand new with OG box",
    specs: {
      Brand: "Q4 Sports",
      Model: "DC2",
      Color: "White/Black/Yellow",
      Size: "12",
      Condition: "Brand New",
      "Style Code": "Q4-DC02",
    },
    tags: ["q4", "q4-sports", "dc2", "basketball", "white", "black", "yellow"],
    vendor: "sneakerhustle (Whatnot)",
    purchaseDate: "2025-10-17",
    orderNotes: "Order #586608522 — $1 SNEAKER AUCTIONS (5TRILLION SHOES) #67",
  },
  {
    folder: "5",
    images: [
      "AI-Image-Editor-2026-02-17_18-45-22.png",
      "AI-Image-Editor-2026-02-17_18-45-46.png",
      "AI-Image-Editor-2026-02-17_18-46-16.png",
    ],
    receipt: "IMG_5169.HEIC",
    slug: "nike-air-foamposite-one-white",
    name: "Nike Air Foamposite One White",
    costPrice: 79,
    shippingCost: 0,
    sellingPrice: 130,
    description:
      "Nike Air Foamposite One in White (Light Orewood Brown/Black/Pale Ivory) colorway. Features the iconic molded Foamposite shell upper in a cream/ivory tone with black accents. Pre-owned in good condition. Comes with replacement box. Size 9.",
    shortDescription: "Pre-owned, replacement box",
    specs: {
      Brand: "Nike",
      Model: "Air Foamposite One",
      Color: "White (Light Orewood Brown/Black/Pale Ivory)",
      Size: "9",
      Condition: "Pre-owned",
    },
    tags: ["nike", "foamposite", "foam", "white", "penny", "hardaway"],
    vendor: "fragmented_soles (Whatnot)",
    purchaseDate: "2025-10-16",
    orderNotes: "Order #586289149 — $1 RAPID FIRE SNEAKER AUCTIONS / FREE SHOES ALL STREAM",
  },
  {
    folder: "6",
    images: [
      "AI-Image-Editor-2026-02-17_18-47-37.png",
      "AI-Image-Editor-2026-02-17_18-48-12.png",
      "AI-Image-Editor-2026-02-17_18-48-45.png",
    ],
    receipt: "IMG_5164.HEIC",
    slug: "air-jordan-20-white-stealth",
    name: "Air Jordan 20 (XX) White Stealth",
    costPrice: 24,
    shippingCost: 0,
    sellingPrice: 55,
    description:
      "Air Jordan 20 (XX) in the White Stealth colorway from 2005. Features a sail/cream upper with laser-etched graphic strap panels, red collar accents, black toe cap, and the distinctive circular red pods on the outsole. Pre-owned, no box. Size 14.",
    shortDescription: "Pre-owned, no box",
    specs: {
      Brand: "Nike/Jordan",
      Model: "Air Jordan 20 (XX)",
      Color: "White Stealth",
      Size: "14",
      Condition: "Pre-owned",
    },
    tags: ["jordan", "air-jordan", "jordan-20", "stealth", "retro", "vintage"],
    vendor: "fragmented_soles (Whatnot)",
    purchaseDate: "2025-11-03",
    orderNotes: "Order #616248873 — $1 RAPID FIRE SNEAKER AUCTIONS / FREE SHOES ALL STREAM",
  },
];

async function processShoe(shoe: Shoe) {
  console.log(`\n📦 Processing: ${shoe.name}`);

  const imageUrls: string[] = [];
  for (const img of shoe.images) {
    console.log(`  📸 Uploading ${img}...`);
    const url = await upload("images", `products/batch5/${shoe.slug}_${img}`, join(BASE, shoe.folder, img));
    imageUrls.push(url);
  }

  let receiptUrl: string | null = null;
  if (shoe.receipt) {
    console.log("  🧾 Uploading receipt...");
    receiptUrl = await upload(
      "receipts",
      `batch5/${shoe.slug}_receipt${shoe.receipt.substring(shoe.receipt.lastIndexOf("."))}`,
      join(BASE, shoe.folder, shoe.receipt)
    );
  } else {
    console.log("  ⚠️  No receipt for this shoe");
  }

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
      box_number: `B5-${shoe.folder}`,
      tags: shoe.tags,
      images: imageUrls,
      specs: shoe.specs,
    })
    .select("id")
    .single();

  if (prodErr) throw new Error(`Product insert failed: ${prodErr.message}`);
  console.log(`  ✅ Product created: ${product.id}`);

  if (receiptUrl) {
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
}

async function processMauve() {
  console.log("\n📦 Processing: Nike Air Jordan 1 Retro High OG Mauve (Size 10.5) — reusing existing images");

  // Get images from an existing Mauve product
  const { data: existingMauve } = await supabase
    .from("products")
    .select("images, retail_price, price_sources")
    .like("slug", "%mauve%")
    .not("images", "is", null)
    .limit(1)
    .single();

  if (!existingMauve) throw new Error("No existing Mauve product found to copy images from");

  const imageUrls = existingMauve.images as string[];
  console.log(`  📸 Reusing ${imageUrls.length} images from existing Mauve product`);

  // Upload receipt
  console.log("  🧾 Uploading receipt...");
  const receiptUrl = await upload(
    "receipts",
    "batch5/nike-air-jordan-1-retro-high-og-mauve-4_receipt.HEIC",
    join(BASE, "4", "IMG_5161.HEIC")
  );

  const costPrice = 52;
  const taxAmount = parseFloat((costPrice * 0.06625).toFixed(2));

  const { data: product, error: prodErr } = await supabase
    .from("products")
    .insert({
      name: "Nike Air Jordan 1 Retro High OG Mauve",
      slug: "nike-air-jordan-1-retro-high-og-mauve-4",
      category: "sneakers",
      cost_price: costPrice,
      selling_price: 95,
      shipping_cost: 0,
      tax_amount: taxAmount,
      currency: "USD",
      description:
        "Nike Air Jordan 1 Retro High OG in the Mauve colorway. Features a premium suede and leather upper in mauve/light bone tones with signature Nike Air branding and Wings logo. Brand new with OG box. Size 10.5.",
      short_description: "Brand new with OG box",
      status: "in_stock",
      quantity: 1,
      featured: false,
      box_number: "B5-4",
      tags: ["nike", "jordan", "air-jordan-1", "mauve", "retro", "high-og"],
      images: imageUrls,
      specs: {
        Brand: "Nike",
        Model: "Air Jordan 1 Retro High OG",
        Color: "Mauve",
        Size: "10.5",
        Condition: "Brand New",
        "Style Code": "FJ9740-200",
      },
      retail_price: existingMauve.retail_price,
      price_sources: existingMauve.price_sources,
    })
    .select("id")
    .single();

  if (prodErr) throw new Error(`Product insert failed: ${prodErr.message}`);
  console.log(`  ✅ Product created: ${product.id}`);

  const { data: receipt, error: recErr } = await supabase
    .from("receipts")
    .insert({
      vendor: "stewsshoes (Whatnot)",
      purchase_date: "2025-10-16",
      total_amount: costPrice,
      file_url: receiptUrl,
      notes: "Order #583637259 — NO MISSES. JUST HEATERS AT A $1. — JORDAN 1 MAUVE SIZE 10.5",
    })
    .select("id")
    .single();

  if (recErr) throw new Error(`Receipt insert failed: ${recErr.message}`);
  console.log(`  ✅ Receipt created: ${receipt.id}`);

  const { error: itemErr } = await supabase.from("receipt_items").insert({
    receipt_id: receipt.id,
    product_id: product.id,
    item_name: "Nike Air Jordan 1 Retro High OG Mauve",
    quantity: 1,
    unit_price: costPrice,
  });

  if (itemErr) throw new Error(`Receipt item link failed: ${itemErr.message}`);
  console.log("  ✅ Receipt linked to product");
}

async function main() {
  console.log("🚀 Seeding Batch 5 — 6 shoes\n");

  // Process shoes 1, 2, 3, 5, 6 (normal flow)
  for (const shoe of shoes) {
    try {
      await processShoe(shoe);
    } catch (err) {
      console.error(`❌ Failed: ${shoe.name} — ${err instanceof Error ? err.message : err}`);
    }
  }

  // Process shoe 4 (Mauve — reuses existing images)
  try {
    await processMauve();
  } catch (err) {
    console.error(`❌ Failed: Mauve — ${err instanceof Error ? err.message : err}`);
  }

  console.log("\n✅ Batch 5 complete!");
}

main();
