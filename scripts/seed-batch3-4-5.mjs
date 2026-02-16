import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// ── Config (parse .env.local manually) ──────────────────────────────────────
const envFile = fs.readFileSync('/Users/apandey/Documents/repo/deal-bazaar/.env.local', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) env[key.trim()] = rest.join('=').trim();
});
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PRODUCT_STORAGE_BUCKET = 'images';
const PRODUCT_STORAGE_PREFIX = 'products/batch3';
const RECEIPT_STORAGE_BUCKET = 'receipts';
const RECEIPT_STORAGE_PREFIX = 'batch3';

// ── Shoe 4: Jordan 1 Mauve ─────────────────────────────────────────────────
const SHOE4 = {
  dir: '/Users/apandey/Downloads/deal-bazaar/Sneakers/Batch3/AI/4',
  pngFiles: [
    'AI-Image-Editor-2026-02-16_15-50-46.png',
    'AI-Image-Editor-2026-02-16_15-51-22.png',
    'AI-Image-Editor-2026-02-16_15-51-51.png',
    'AI-Image-Editor-2026-02-16_15-52-24.png',
  ],
  receiptFile: 'IMG_5100.jpg',
  product: {
    name: 'Nike Air Jordan 1 Retro High OG Mauve (2)',
    slug: 'nike-air-jordan-1-retro-high-og-mauve-2',
    category: 'sneakers',
    cost_price: 57.00,
    selling_price: 95.00,
    shipping_cost: 9.21,
    tax_amount: 3.78,
    box_number: 'B3-4',
    status: 'in_stock',
    quantity: 1,
    currency: 'USD',
    featured: false,
    short_description: 'Brand new with OG box',
    description:
      'Nike Air Jordan 1 Retro High OG in Sky J Mauve/Sail colorway. White leather upper with mauve overlays and Swoosh. Brand new, deadstock with original mauve Nike box and tissue paper. Size 11.',
    tags: ['nike', 'jordan', 'jordan-1', 'mauve', 'retro', 'high-og'],
    specs: {
      Brand: 'Nike',
      Model: 'Air Jordan 1 Retro High OG',
      Size: '11',
      Color: 'Sky J Mauve/Sail',
      Condition: 'Brand New',
    },
  },
  receipt: {
    vendor: 'stewsshoes (Whatnot)',
    purchase_date: '2025-10-16',
    total_amount: 57.00,
    notes: 'JORDAN 1 MAUVE SIZE 11 #4 - BRAND NEW OG BOX - Order 583638456 - NO MISSES. JUST HEATERS AT A $1.',
  },
  receiptItemName: 'JORDAN 1 MAUVE SIZE 11 #4 - BRAND NEW OG BOX',
};

// ── Shoe 5: Nike Voxn ──────────────────────────────────────────────────────
const SHOE5 = {
  dir: '/Users/apandey/Downloads/deal-bazaar/Sneakers/Batch3/AI/5',
  pngFiles: [
    'AI-Image-Editor-2026-02-16_15-54-02.png',
    'AI-Image-Editor-2026-02-16_15-54-32.png',
    'AI-Image-Editor-2026-02-16_15-55-10.png',
  ],
  receiptFile: 'IMG_5105.jpg',
  product: {
    name: 'Nike Voxn Grey Infrared Black',
    slug: 'nike-voxn-grey-infrared-black',
    category: 'sneakers',
    cost_price: 52.00,
    selling_price: 80.00,
    shipping_cost: 9.21,
    tax_amount: 3.45,
    box_number: 'B3-5',
    status: 'in_stock',
    quantity: 1,
    currency: 'USD',
    featured: false,
    short_description: 'Brand new',
    description:
      'Nike Voxn in Wolf Grey/Infrared/Black colorway. Features a translucent mesh upper with heathered grey pattern, infrared red accents, black neoprene collar, and white midsole. Lightweight and modern silhouette. Brand new.',
    tags: ['nike', 'voxn', 'grey', 'infrared', 'black', 'running'],
    specs: {
      Brand: 'Nike',
      Model: 'Voxn',
      Color: 'Wolf Grey/Infrared/Black',
      Condition: 'Brand New',
    },
  },
  receipt: {
    vendor: 'stewsshoes (Whatnot)',
    purchase_date: '2025-11-03',
    total_amount: 52.00,
    notes: 'BRAND NEW RANDOM PULLS #21 - BRAND NEW - Order 616592314 - FREE TRAVIS SCOTT + 500 SHOES AT $1',
  },
  receiptItemName: 'BRAND NEW RANDOM PULLS #21',
};

// ── Helpers ─────────────────────────────────────────────────────────────────
async function uploadProductImages(shoe) {
  const publicUrls = [];
  for (const filename of shoe.pngFiles) {
    const filePath = path.join(shoe.dir, filename);
    const fileBuffer = fs.readFileSync(filePath);
    const storagePath = `${PRODUCT_STORAGE_PREFIX}/${filename}`;

    const { data, error } = await supabase.storage
      .from(PRODUCT_STORAGE_BUCKET)
      .upload(storagePath, fileBuffer, { contentType: 'image/png', upsert: true });

    if (error) { console.error(`  FAILED  ${filename}: ${error.message}`); throw error; }
    console.log(`  OK      ${filename}  ->  ${data.path}`);

    const { data: { publicUrl } } = supabase.storage
      .from(PRODUCT_STORAGE_BUCKET)
      .getPublicUrl(storagePath);
    publicUrls.push(publicUrl);
  }
  return publicUrls;
}

async function uploadReceiptImage(shoe) {
  const filePath = path.join(shoe.dir, shoe.receiptFile);
  const fileBuffer = fs.readFileSync(filePath);
  const storagePath = `${RECEIPT_STORAGE_PREFIX}/${shoe.receiptFile}`;

  const { data, error } = await supabase.storage
    .from(RECEIPT_STORAGE_BUCKET)
    .upload(storagePath, fileBuffer, { contentType: 'image/jpeg', upsert: true });

  if (error) { console.error(`  FAILED  ${shoe.receiptFile}: ${error.message}`); throw error; }
  console.log(`  OK      ${shoe.receiptFile}  ->  ${data.path}`);

  const { data: { publicUrl } } = supabase.storage
    .from(RECEIPT_STORAGE_BUCKET)
    .getPublicUrl(storagePath);
  return publicUrl;
}

async function createProduct(shoe, imageUrls) {
  const product = { ...shoe.product, images: imageUrls };
  const { data, error } = await supabase.from('products').insert(product).select();
  if (error) { console.error('Failed to create product:', error.message); throw error; }
  const p = data[0];
  console.log(`  OK  [${p.id}]  ${p.name}  $${p.selling_price}`);
  return p;
}

async function createReceipt(shoe, receiptUrl) {
  const receipt = { ...shoe.receipt, file_url: receiptUrl };
  const { data, error } = await supabase.from('receipts').insert(receipt).select();
  if (error) { console.error('Failed to create receipt:', error.message); throw error; }
  const r = data[0];
  console.log(`  OK  [${r.id}]  ${r.vendor}  $${r.total_amount}`);
  return r;
}

async function createReceiptItem(shoe, receiptId, productId) {
  const item = {
    receipt_id: receiptId,
    product_id: productId,
    item_name: shoe.receiptItemName,
    quantity: 1,
    unit_price: shoe.product.cost_price,
  };
  const { data, error } = await supabase.from('receipt_items').insert(item).select();
  if (error) { console.error('Failed to create receipt_item:', error.message); throw error; }
  const ri = data[0];
  console.log(`  OK  [${ri.id}]  receipt=${ri.receipt_id}  product=${ri.product_id}  "${ri.item_name}"  $${ri.unit_price}`);
  return ri;
}

async function processShoe(label, shoe) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`  ${label}`);
  console.log(`${'='.repeat(50)}`);

  console.log(`\n--- Uploading ${shoe.pngFiles.length} product images ---`);
  const imageUrls = await uploadProductImages(shoe);

  console.log(`\n--- Uploading receipt ---`);
  const receiptUrl = await uploadReceiptImage(shoe);

  console.log(`\n--- Creating product ---`);
  const product = await createProduct(shoe, imageUrls);

  console.log(`\n--- Creating receipt ---`);
  const receipt = await createReceipt(shoe, receiptUrl);

  console.log(`\n--- Linking receipt to product ---`);
  await createReceiptItem(shoe, receipt.id, product.id);

  return product;
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log('============================================');
  console.log('  Batch 3 — Shoes 4 & 5 Seed Script');
  console.log('============================================');

  try {
    const p4 = await processShoe('Shoe 4: Nike Air Jordan 1 Retro High OG Mauve', SHOE4);
    const p5 = await processShoe('Shoe 5: Nike Voxn Grey Infrared Black', SHOE5);

    console.log('\n============================================');
    console.log('  SEED COMPLETE - Summary');
    console.log('============================================\n');

    for (const p of [p4, p5]) {
      console.log(`  ${p.name}`);
      console.log(`    ID:    ${p.id}`);
      console.log(`    Slug:  ${p.slug}`);
      console.log(`    Price: $${p.selling_price}`);
      console.log(`    Box:   ${p.box_number}`);
      console.log();
    }

    console.log('Done!');
  } catch (err) {
    console.error('\nSeed script failed:', err.message);
    process.exit(1);
  }
}

main();
