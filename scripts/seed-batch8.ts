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

const BATCH_DIR = "/Users/apandey/Downloads/deal-bazaar/Sneakers/Batch8";
const RECEIPTS_DIR = join(BATCH_DIR, "receipts");

async function upload(bucket: string, storagePath: string, localPath: string) {
  const file = readFileSync(localPath);
  const { error } = await supabase.storage.from(bucket).upload(storagePath, file, { upsert: true });
  if (error) throw new Error(`Upload failed ${storagePath}: ${error.message}`);
  return supabase.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl;
}

interface Shoe {
  folder: string;
  catalogFiles: string[];
  receiptFile: string | null;
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
    catalogFiles: ["IMG_5297.png", "IMG_5298.png", "IMG_5299.png", "IMG_5300.png"],
    receiptFile: "receipt-1.HEIC",
    slug: "new-balance-fuelcell-supercomp-elite-v4-volt",
    name: "New Balance FuelCell SuperComp Elite v4 Volt",
    costPrice: 48,
    shippingCost: 9.21,
    sellingPrice: 130,
    description:
      "New Balance FuelCell SuperComp Elite v4 in Volt/Orange colorway (Style NBCELL44). A high-performance carbon-plated racing shoe with energy-returning FuelCell midsole, lightweight upper with engineered support, and bold neon volt/orange design. Brand new with OG box. Size 10.5.",
    shortDescription: "Brand new with OG box — elite racing shoe",
    specs: {
      Brand: "New Balance",
      Model: "FuelCell SuperComp Elite v4",
      Color: "Volt/Orange",
      Size: "10.5",
      Condition: "Brand New",
    },
    tags: ["new-balance", "fuelcell", "supercomp-elite", "racing", "volt", "orange", "carbon-plate"],
    vendor: "stewsshoes (Whatnot)",
    purchaseDate: "2025-10-25",
    orderNotes: "Order #600495210 — BRAND RANDOM PULLS #105. BRAND NEW. $48.",
  },
  {
    folder: "2",
    catalogFiles: ["IMG_5302.png", "IMG_5303.png", "IMG_5304.png", "IMG_5306.png"],
    receiptFile: "receipt-2.HEIC",
    slug: "nike-dunk-high-championship-red",
    name: "Nike Dunk High Championship Red",
    costPrice: 27,
    shippingCost: 9.21,
    sellingPrice: 75,
    description:
      "Nike Dunk High in the iconic Championship Red colorway. Features a red and white leather upper with classic Dunk High silhouette, Nike branding on tongue and heel, and padded collar for comfort. Pre-owned in good condition with OG box. Size 10.",
    shortDescription: "Pre-owned with OG box",
    specs: {
      Brand: "Nike",
      Model: "Dunk High",
      Color: "Championship Red/White",
      Size: "10",
      Condition: "Pre-Owned",
    },
    tags: ["nike", "dunk-high", "championship-red", "red", "white", "classic"],
    vendor: "shoebus (Whatnot)",
    purchaseDate: "2025-10-18",
    orderNotes: "Order #588066182 — RANDOM PULLS #506. $27.",
  },
  {
    folder: "3",
    catalogFiles: ["IMG_5307.png", "IMG_5308.png", "IMG_5309.png", "IMG_5311.png", "IMG_5312.png"],
    receiptFile: null,
    slug: "adidas-samba-62-camel-tan",
    name: "Adidas Samba 62 Camel",
    costPrice: 21,
    shippingCost: 9.21,
    sellingPrice: 70,
    description:
      "Adidas Samba 62 in Camel/Tan suede colorway. A retro-inspired version of the classic Samba featuring premium tan suede upper, signature three white stripes, vintage-style polka dot outsole, and gum-tone accents. Brand new with OG box. Size 9.",
    shortDescription: "Brand new with OG box",
    specs: {
      Brand: "Adidas",
      Model: "Samba 62",
      Color: "Camel/Tan",
      Size: "9",
      Condition: "Brand New",
    },
    tags: ["adidas", "samba", "samba-62", "retro", "camel", "tan", "suede"],
    vendor: "4pfwholesale (Whatnot)",
    purchaseDate: "2025-10-16",
    orderNotes: "Order #585394778 — $1 NEW SNEAKER PULLS #129. 100% AUTHENTIC. $21.",
  },
  {
    folder: "4",
    catalogFiles: ["IMG_5313.png", "IMG_5315.png"],
    receiptFile: null,
    slug: "adidas-run-70s-2-0-j-navy-blue",
    name: "Adidas Run 70s 2.0 J Navy Blue",
    costPrice: 48,
    shippingCost: 0,
    sellingPrice: 55,
    description:
      "Adidas Run 70s 2.0 J in Navy Blue colorway (Style JI2267). A junior retro-inspired running shoe with navy suede and mesh upper, classic three white stripes, gum rubber outsole, and cushioned midsole. Brand new with tags and OG box. Junior Size 6.",
    shortDescription: "Brand new with tags and OG box",
    specs: {
      Brand: "Adidas",
      Model: "Run 70s 2.0 J",
      Color: "Navy Blue/White",
      Size: "6 (Junior)",
      Condition: "Brand New",
      "Style Code": "JI2267",
    },
    tags: ["adidas", "run-70s", "retro", "navy", "blue", "junior", "kids"],
    vendor: "4pfwholesale (Whatnot)",
    purchaseDate: "2025-10-16",
    orderNotes: "Order #585409725 — $1 NEW SNEAKER PULLS #145. 100% AUTHENTIC. $48.",
  },
  {
    folder: "5",
    catalogFiles: ["IMG_5316.png", "IMG_5317.png", "IMG_5318.png", "IMG_5319.png"],
    receiptFile: "receipt-5.HEIC",
    slug: "puma-rs-dreamer-j-cole-ebony-ivory",
    name: "Puma RS Dreamer J. Cole Ebony & Ivory",
    costPrice: 27,
    shippingCost: 9.21,
    sellingPrice: 95,
    description:
      "Puma RS Dreamer J. Cole in Ebony & Ivory colorway (Style CB677). A signature basketball shoe from the Dreamville collaboration featuring a white knit upper with black Puma FormStrip, RS cushioning technology, and sleek low-profile design. Brand new with OG box. Size 12.",
    shortDescription: "Brand new with OG box — J. Cole collaboration",
    specs: {
      Brand: "Puma",
      Model: "RS Dreamer J. Cole",
      Color: "Ebony & Ivory (White/Black)",
      Size: "12",
      Condition: "Brand New",
    },
    tags: ["puma", "rs-dreamer", "j-cole", "dreamville", "collaboration", "basketball", "white", "black"],
    vendor: "fragmented_soles (Whatnot)",
    purchaseDate: "2025-10-27",
    orderNotes: "Order #603533661 — PUMA RS DREAMER J COLE EBONY AND IVORY - SIZE 12 BRAND NEW ORIGINAL BOX. CB677. $27.",
  },
  {
    folder: "6",
    catalogFiles: ["IMG_5321.png", "IMG_5323.png", "IMG_5324.png"],
    receiptFile: "receipt-6.HEIC",
    slug: "air-jordan-4-fire-red-gs",
    name: "Air Jordan 4 Retro Fire Red GS",
    costPrice: 49,
    shippingCost: 9.21,
    sellingPrice: 85,
    description:
      "Air Jordan 4 Retro in Fire Red colorway (Grade School). Features the iconic white leather upper with black and fire red accents, visible Air unit in the heel, mesh panels on the sides, and classic Jordan 4 wing eyelets. Pre-owned in good condition. GS Size 3Y.",
    shortDescription: "Pre-owned — Grade School size",
    specs: {
      Brand: "Nike/Jordan",
      Model: "Air Jordan 4 Retro Fire Red",
      Color: "White/Fire Red/Black",
      Size: "3Y (GS)",
      Condition: "Pre-Owned",
    },
    tags: ["jordan", "air-jordan-4", "fire-red", "retro", "gs", "grade-school", "white", "red"],
    vendor: "commonhype (Whatnot)",
    purchaseDate: "2025-10-16",
    orderNotes: "Order #585417257 — Jordan 4 Fire Red GS - 3Y #8035. $49.",
  },
  {
    folder: "7",
    catalogFiles: ["IMG_5325.png", "IMG_5326.png", "IMG_5328.png"],
    receiptFile: "receipt-7.HEIC",
    slug: "and1-attack-mid-black-silver",
    name: "And1 Attack Mid Black Silver",
    costPrice: 13,
    shippingCost: 9.21,
    sellingPrice: 30,
    description:
      "And1 Attack Mid basketball shoe in Black/Silver colorway. Features a striking exoskeleton cage structure on the forefoot, synthetic leather upper, padded collar, and durable rubber outsole. Pre-owned in good condition. Size 10.",
    shortDescription: "Pre-owned — basketball shoe",
    specs: {
      Brand: "And1",
      Model: "Attack Mid",
      Color: "Black/Silver",
      Size: "10",
      Condition: "Pre-Owned",
    },
    tags: ["and1", "basketball", "mid", "black", "silver"],
    vendor: "sneakerhustle (Whatnot)",
    purchaseDate: "2025-10-17",
    orderNotes: "Order #586608982 — SNEAKERS PULLS (LISTEN FOR SIZE/CONDITION/INFO) #68. $13.",
  },
  {
    folder: "8",
    catalogFiles: ["IMG_5330.png", "IMG_5331.png", "IMG_5332.png"],
    receiptFile: "receipt-8.HEIC",
    slug: "air-jordan-1-mid-mauve",
    name: "Air Jordan 1 Mid Mauve",
    costPrice: 70,
    shippingCost: 9.21,
    sellingPrice: 120,
    description:
      "Air Jordan 1 Mid in Mauve colorway. Features a premium leather upper in mauve/dusty rose with sail white panels, classic Wings logo, Nike Air branding on the tongue, and a white midsole with dark outsole. Brand new with OG box. Size 10.",
    shortDescription: "Brand new with OG box",
    specs: {
      Brand: "Nike/Jordan",
      Model: "Air Jordan 1 Mid",
      Color: "Mauve/Sail",
      Size: "10",
      Condition: "Brand New",
    },
    tags: ["jordan", "air-jordan-1", "mid", "mauve", "sail", "pink", "leather"],
    vendor: "stewsshoes (Whatnot)",
    purchaseDate: "2025-10-16",
    orderNotes: "Order #583682054 — JORDAN 1 MAUVE SIZE 10 #7. BRAND NEW OG BOX. $70.",
  },
  {
    folder: "9",
    catalogFiles: ["IMG_5335.png", "IMG_5336.png"],
    receiptFile: "receipt-9.HEIC",
    slug: "nike-dunk-low-light-carbon",
    name: "Nike Dunk Low Light Carbon",
    costPrice: 42,
    shippingCost: 9.21,
    sellingPrice: 70,
    description:
      "Nike Dunk Low in Light Carbon colorway. Features a clean white leather base with light carbon grey overlays, dark grey Swoosh, padded collar, and classic Dunk Low silhouette. Pre-owned in good condition with OG box. Size 8.5.",
    shortDescription: "Pre-owned with OG box",
    specs: {
      Brand: "Nike",
      Model: "Dunk Low",
      Color: "Light Carbon/White",
      Size: "8.5",
      Condition: "Pre-Owned",
    },
    tags: ["nike", "dunk-low", "light-carbon", "grey", "white", "classic"],
    vendor: "stewsshoes (Whatnot)",
    purchaseDate: "2025-10-16",
    orderNotes: "Order #586103202 — NIKE DUNK LOW LIGHT CARON PURPLE SZ: 8.5. USED OG BOX A-35127. $42.",
  },
];

async function processShoe(shoe: Shoe) {
  console.log(`\nProcessing: ${shoe.name}`);

  // Upload catalog images
  const imageUrls: string[] = [];
  for (const file of shoe.catalogFiles) {
    const localPath = join(BATCH_DIR, shoe.folder, "catalog", file);
    const storagePath = `products/batch8/${shoe.slug}_${shoe.catalogFiles.indexOf(file) + 1}.png`;
    console.log(`  Uploading ${file}...`);
    const url = await upload("images", storagePath, localPath);
    imageUrls.push(url);
  }

  // Upload receipt if available
  let receiptUrl: string | null = null;
  if (shoe.receiptFile) {
    console.log("  Uploading receipt...");
    receiptUrl = await upload(
      "receipts",
      `batch8/${shoe.slug}_receipt.HEIC`,
      join(RECEIPTS_DIR, shoe.receiptFile)
    );
  }

  // Create product
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
      box_number: `B8-${shoe.folder}`,
      tags: shoe.tags,
      images: imageUrls,
      specs: shoe.specs,
    })
    .select("id")
    .single();

  if (prodErr) throw new Error(`Product insert failed: ${prodErr.message}`);
  console.log(`  Product created: ${product.id}`);

  // Create receipt and link
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
    console.log(`  Receipt created: ${receipt.id}`);

    const { error: itemErr } = await supabase.from("receipt_items").insert({
      receipt_id: receipt.id,
      product_id: product.id,
      item_name: shoe.name,
      quantity: 1,
      unit_price: shoe.costPrice,
    });

    if (itemErr) throw new Error(`Receipt item link failed: ${itemErr.message}`);
    console.log("  Receipt linked to product");
  } else {
    console.log("  No receipt file — skipping receipt record");
  }

  return product.id;
}

async function main() {
  console.log("Seeding Batch 8 — 9 shoes\n");

  // Handle receipt-3-4 (shared receipt for shoes 3 and 4) separately
  const productIds: Record<string, string> = {};

  for (const shoe of shoes) {
    try {
      const id = await processShoe(shoe);
      productIds[shoe.folder] = id;
    } catch (err) {
      console.error(`Failed: ${shoe.name} — ${err instanceof Error ? err.message : err}`);
    }
  }

  // Create shared receipt for shoes 3 and 4
  if (productIds["3"] && productIds["4"]) {
    console.log("\nCreating shared receipt for shoes 3 & 4...");
    try {
      const receiptUrl = await upload(
        "receipts",
        "batch8/receipt-3-4.HEIC",
        join(RECEIPTS_DIR, "receipt-3-4.HEIC")
      );

      const { data: receipt, error: recErr } = await supabase
        .from("receipts")
        .insert({
          vendor: "4pfwholesale (Whatnot)",
          purchase_date: "2025-10-16",
          total_amount: 69, // $21 + $48
          file_url: receiptUrl,
          notes: "Order #585394778 & #585409725 — 2 items: $1 NEW SNEAKER PULLS #129 ($21) + #145 ($48). 100% AUTHENTIC.",
        })
        .select("id")
        .single();

      if (recErr) throw new Error(`Shared receipt insert failed: ${recErr.message}`);

      // Link to shoe 3
      await supabase.from("receipt_items").insert({
        receipt_id: receipt.id,
        product_id: productIds["3"],
        item_name: "Adidas Samba 62 Camel",
        quantity: 1,
        unit_price: 21,
      });

      // Link to shoe 4
      await supabase.from("receipt_items").insert({
        receipt_id: receipt.id,
        product_id: productIds["4"],
        item_name: "Adidas Run 70s 2.0 J Navy Blue",
        quantity: 1,
        unit_price: 48,
      });

      console.log("  Shared receipt created and linked to both products");
    } catch (err) {
      console.error(`Shared receipt failed: ${err instanceof Error ? err.message : err}`);
    }
  }

  console.log("\nBatch 8 seeding complete!");
}

main();
