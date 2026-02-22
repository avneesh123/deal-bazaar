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

// Catalog-ready images (bg removed) are in the catalog/ folder
const CATALOG = "/Users/apandey/Downloads/deal-bazaar/Sneakers/Batch6/catalog";
// Original HEIC files (for receipts) in numbered subfolders
const RAW = "/Users/apandey/Downloads/deal-bazaar/Sneakers/Batch6";

async function upload(bucket: string, storagePath: string, localPath: string) {
  const file = readFileSync(localPath);
  const { error } = await supabase.storage.from(bucket).upload(storagePath, file, { upsert: true });
  if (error) throw new Error(`Upload failed ${storagePath}: ${error.message}`);
  return supabase.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl;
}

interface Shoe {
  catalogImages: string[];   // filenames in catalog/ folder (bg-removed PNGs)
  receiptFile: string | null; // path relative to RAW folder e.g. "1/IMG_5181.HEIC"
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
    catalogImages: ["IMG_5180.png"],
    receiptFile: "1/IMG_5181.HEIC",
    slug: "nike-p-6000-total-orange-black",
    name: "Nike P-6000 Total Orange/Black",
    costPrice: 59,
    shippingCost: 0,
    sellingPrice: 85,
    description:
      "Nike P-6000 in the Total Orange/Black colorway (Style CD6404-801). Features a bold orange mesh and synthetic upper with black overlays, white midsole, and a chunky retro runner silhouette inspired by the early 2000s. Brand new with OG box. Size 10.5. Retail $110.",
    shortDescription: "Brand new with OG box",
    specs: {
      Brand: "Nike",
      Model: "P-6000",
      Color: "Total Orange/Black",
      Size: "10.5",
      Condition: "Brand New",
      "Style Code": "CD6404-801",
    },
    tags: ["nike", "p-6000", "orange", "black", "retro", "runner"],
    vendor: "stewsshoes (Whatnot)",
    purchaseDate: "2025-10-16",
    orderNotes: "Order #583670133 — NO MISSES. JUST HEATERS AT A $1. #216",
  },
  {
    catalogImages: ["IMG_5183.png"],
    receiptFile: null,
    slug: "adidas-adilette-aqua-light-blue",
    name: "Adidas Adilette Aqua Light Blue",
    costPrice: 15,
    shippingCost: 0,
    sellingPrice: 25,
    description:
      "Adidas Adilette Aqua slide sandals in Light Blue/White. Classic three-stripe design on the strap with a comfortable contoured footbed. Brand new with tags. Size 10.",
    shortDescription: "Brand new with tags",
    specs: {
      Brand: "Adidas",
      Model: "Adilette Aqua",
      Color: "Light Blue/White",
      Size: "10",
      Condition: "Brand New",
    },
    tags: ["adidas", "adilette", "slides", "sandals", "light-blue"],
    vendor: "Unknown",
    purchaseDate: "2025-10-16",
    orderNotes: "No receipt — cost estimated at $15",
  },
  {
    catalogImages: ["IMG_5186.png"],
    receiptFile: null,
    slug: "nike-tanjun-navy-white",
    name: "Nike Tanjun Navy/White",
    costPrice: 25,
    shippingCost: 0,
    sellingPrice: 45,
    description:
      "Nike Tanjun in Navy/White colorway. A lightweight everyday sneaker with a breathable mesh upper, white Nike swoosh, and cushioned midsole. Made with at least 20% recycled content (Move to Zero). Brand new with tags and OG box. Size 11.",
    shortDescription: "Brand new with tags and OG box",
    specs: {
      Brand: "Nike",
      Model: "Tanjun",
      Color: "Navy/White",
      Size: "11",
      Condition: "Brand New",
    },
    tags: ["nike", "tanjun", "navy", "white", "running", "lightweight"],
    vendor: "Unknown",
    purchaseDate: "2025-10-16",
    orderNotes: "No receipt — cost estimated at $25. Shipped with Adilette Aqua slides.",
  },
  {
    catalogImages: ["IMG_5191.png", "IMG_5192.png", "IMG_5193.png", "IMG_5195.png"],
    receiptFile: "4/IMG_5190.HEIC",
    slug: "air-jordan-1-retro-high-og-sail",
    name: "Air Jordan 1 Retro High OG Sail",
    costPrice: 310,
    shippingCost: 0,
    sellingPrice: 375,
    description:
      "Air Jordan 1 Retro High OG in the Sail colorway. Premium leather upper in sail/white with light grey Swoosh overlays and elephant print-textured accents. Nike Air tongue labels and Wings logo. Brand new, damaged box. Size 11.",
    shortDescription: "Brand new, damaged box",
    specs: {
      Brand: "Nike/Jordan",
      Model: "Air Jordan 1 Retro High OG",
      Color: "Sail",
      Size: "11",
      Condition: "Brand New",
    },
    tags: ["jordan", "air-jordan-1", "retro", "high-og", "sail", "white", "grey"],
    vendor: "stewsshoes (Whatnot)",
    purchaseDate: "2025-10-19",
    orderNotes: "Order #589598367 — 50 FREE SHOES + 500 SHOES AT $1 — JORDAN 1 RED SAIL SIZE 11 #10. Brand New - Damaged Box.",
  },
  {
    catalogImages: ["IMG_5201.png"],
    receiptFile: null,
    slug: "adidas-sl-72-green-yellow",
    name: "Adidas SL 72 Green/Yellow",
    costPrice: 25,
    shippingCost: 0,
    sellingPrice: 65,
    description:
      "Adidas SL 72 in Green/Yellow colorway. A retro running silhouette from the Adidas Originals archive, featuring green suede and mesh upper with bold yellow three-stripe branding, gum sole, and gold Trefoil insole. Brand new with OG box.",
    shortDescription: "Brand new with OG box",
    specs: {
      Brand: "Adidas",
      Model: "SL 72",
      Color: "Green/Yellow",
      Condition: "Brand New",
    },
    tags: ["adidas", "sl-72", "originals", "retro", "green", "yellow", "gum"],
    vendor: "Unknown",
    purchaseDate: "2025-10-17",
    orderNotes: "No receipt — cost estimated at $25 based on similar Whatnot purchases. Size unknown from photos.",
  },
  {
    catalogImages: ["IMG_5203.png", "IMG_5204.png", "IMG_5206.png"],
    receiptFile: "6/IMG_5209.HEIC",
    slug: "nike-sb-blazer-low-qs-lance-mountain-black",
    name: "Nike SB Blazer Low QS Lance Mountain Black",
    costPrice: 43,
    shippingCost: 0,
    sellingPrice: 95,
    description:
      "Nike SB Zoom Blazer Low QS 'Lance Mountain' in Black/Metallic Silver (Style HJ6703-001). A collaboration with legendary skateboarder Lance Mountain, featuring premium black leather upper, metallic silver Swoosh, embossed logo on the tongue, and Nike SB Zoom Air insole. Includes extra insole and Nike SB sticker. Brand new with OG box. Size 10.5.",
    shortDescription: "Brand new with OG box",
    specs: {
      Brand: "Nike SB",
      Model: "Blazer Low QS",
      Color: "Black/Metallic Silver (Lance Mountain)",
      Size: "10.5",
      Condition: "Brand New",
      "Style Code": "HJ6703-001",
    },
    tags: ["nike", "nike-sb", "blazer", "low", "lance-mountain", "black", "skateboarding"],
    vendor: "Unknown (Whatnot)",
    purchaseDate: "2025-10-18",
    orderNotes: "Order #587913324 — LISTEN TO HOST FOR BRAND / CONDITION / SIZE. $43.",
  },
];

async function processShoe(shoe: Shoe) {
  console.log(`\n📦 Processing: ${shoe.name}`);

  const imageUrls: string[] = [];
  for (const img of shoe.catalogImages) {
    console.log(`  📸 Uploading ${img}...`);
    const url = await upload("images", `products/batch6/${shoe.slug}_${img}`, join(CATALOG, img));
    imageUrls.push(url);
  }

  let receiptUrl: string | null = null;
  if (shoe.receiptFile) {
    console.log("  🧾 Uploading receipt...");
    const ext = shoe.receiptFile.substring(shoe.receiptFile.lastIndexOf("."));
    receiptUrl = await upload(
      "receipts",
      `batch6/${shoe.slug}_receipt${ext}`,
      join(RAW, shoe.receiptFile)
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
      box_number: `B6`,
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

async function main() {
  console.log("🚀 Seeding Batch 6 — 6 shoes (with AI background removal)\n");

  for (const shoe of shoes) {
    try {
      await processShoe(shoe);
    } catch (err) {
      console.error(`❌ Failed: ${shoe.name} — ${err instanceof Error ? err.message : err}`);
    }
  }

  console.log("\n✅ Batch 6 complete!");
}

main();
