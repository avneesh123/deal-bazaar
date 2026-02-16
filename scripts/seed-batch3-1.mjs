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

const AI_DIR = '/Users/apandey/Downloads/deal-bazaar/Sneakers/Batch3/AI/1';
const PRODUCT_STORAGE_BUCKET = 'images';
const PRODUCT_STORAGE_PREFIX = 'products/batch3';
const RECEIPT_STORAGE_BUCKET = 'receipts';
const RECEIPT_STORAGE_PREFIX = 'batch3';

const PNG_FILES = [
  'AI-Image-Editor-2026-02-16_12-29-29.png',
  'AI-Image-Editor-2026-02-16_12-30-20.png',
  'AI-Image-Editor-2026-02-16_12-30-54.png',
];
const RECEIPT_FILE = 'IMG_5083.jpg';

// ── 1. Upload product images ────────────────────────────────────────────────
async function uploadProductImages() {
  console.log('\n=== Step 1: Uploading 3 product images to Supabase Storage ===\n');

  const publicUrls = [];

  for (const filename of PNG_FILES) {
    const filePath = path.join(AI_DIR, filename);
    const fileBuffer = fs.readFileSync(filePath);
    const storagePath = `${PRODUCT_STORAGE_PREFIX}/${filename}`;

    const { data, error } = await supabase.storage
      .from(PRODUCT_STORAGE_BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: 'image/png',
        upsert: true,
      });

    if (error) {
      console.error(`  FAILED  ${filename}: ${error.message}`);
      throw error;
    }
    console.log(`  OK      ${filename}  ->  ${data.path}`);

    const {
      data: { publicUrl },
    } = supabase.storage.from(PRODUCT_STORAGE_BUCKET).getPublicUrl(storagePath);

    publicUrls.push(publicUrl);
  }

  console.log('\nAll product images uploaded successfully.\n');
  return publicUrls;
}

// ── 2. Upload receipt image ─────────────────────────────────────────────────
async function uploadReceiptImage() {
  console.log('=== Step 2: Uploading receipt image to Supabase Storage ===\n');

  const filePath = path.join(AI_DIR, RECEIPT_FILE);
  const fileBuffer = fs.readFileSync(filePath);
  const storagePath = `${RECEIPT_STORAGE_PREFIX}/${RECEIPT_FILE}`;

  const { data, error } = await supabase.storage
    .from(RECEIPT_STORAGE_BUCKET)
    .upload(storagePath, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) {
    console.error(`  FAILED  ${RECEIPT_FILE}: ${error.message}`);
    throw error;
  }
  console.log(`  OK      ${RECEIPT_FILE}  ->  ${data.path}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from(RECEIPT_STORAGE_BUCKET).getPublicUrl(storagePath);

  console.log(`\nReceipt image uploaded successfully.\n`);
  return publicUrl;
}

// ── 3. Create product ───────────────────────────────────────────────────────
async function createProduct(imageUrls) {
  console.log('=== Step 3: Creating product record ===\n');

  const product = {
    name: 'Nike Air Jordan 9 Low Bred',
    slug: 'nike-air-jordan-9-low-bred',
    category: 'sneakers',
    cost_price: 38.00,
    selling_price: 75.00,
    shipping_cost: 9.21,
    tax_amount: 2.52,
    box_number: 'B3-1',
    status: 'in_stock',
    quantity: 1,
    currency: 'USD',
    featured: false,
    short_description: 'Pre-owned, no box',
    description:
      'Nike Air Jordan 9 Retro Low Bred in black leather with red accents and white midsole. Features iconic #23 on the heel. Pre-owned in great condition. Size 9. No original box.',
    tags: ['nike', 'jordan', 'jordan-9', 'bred', 'retro', 'low'],
    specs: {
      Brand: 'Nike',
      Model: 'Air Jordan 9 Retro Low',
      Size: '9',
      Color: 'Black/Gym Red/White',
      Condition: 'Pre-Owned',
      'Style Code': 'BW434',
    },
    images: imageUrls,
  };

  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select();

  if (error) {
    console.error('Failed to create product:', error.message);
    throw error;
  }

  const p = data[0];
  console.log(`  OK  [${p.id}]  ${p.name}  $${p.selling_price}`);
  console.log(`\nProduct created successfully.\n`);
  return p;
}

// ── 4. Create receipt ───────────────────────────────────────────────────────
async function createReceipt(receiptUrl) {
  console.log('=== Step 4: Creating receipt record ===\n');

  const receipt = {
    vendor: 'fragmented_soles (Whatnot)',
    purchase_date: '2025-11-03',
    total_amount: 38.00,
    file_url: receiptUrl,
    notes: 'AIR JORDAN 9 LOW BRED - SIZE 9 PRE OWNED NO BOX - Order 616251360',
  };

  const { data, error } = await supabase
    .from('receipts')
    .insert(receipt)
    .select();

  if (error) {
    console.error('Failed to create receipt:', error.message);
    throw error;
  }

  const r = data[0];
  console.log(`  OK  [${r.id}]  ${r.vendor}  $${r.total_amount}`);
  console.log(`\nReceipt created successfully.\n`);
  return r;
}

// ── 5. Create receipt item ──────────────────────────────────────────────────
async function createReceiptItem(receiptId, productId) {
  console.log('=== Step 5: Creating receipt_item linking receipt to product ===\n');

  const item = {
    receipt_id: receiptId,
    product_id: productId,
    item_name: 'AIR JORDAN 9 LOW BRED - SIZE 9 PRE OWNED NO BOX',
    quantity: 1,
    unit_price: 38.00,
  };

  const { data, error } = await supabase
    .from('receipt_items')
    .insert(item)
    .select();

  if (error) {
    console.error('Failed to create receipt_item:', error.message);
    throw error;
  }

  const ri = data[0];
  console.log(
    `  OK  [${ri.id}]  receipt=${ri.receipt_id}  product=${ri.product_id}  "${ri.item_name}"  $${ri.unit_price}`
  );
  console.log(`\nReceipt item created successfully.\n`);
  return ri;
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log('============================================');
  console.log('  Batch 3-1 Seed Script');
  console.log('  Nike Air Jordan 9 Low Bred');
  console.log('============================================');

  try {
    // Step 1: Upload product images
    const imageUrls = await uploadProductImages();

    // Step 2: Upload receipt image
    const receiptUrl = await uploadReceiptImage();

    // Step 3: Create product
    const product = await createProduct(imageUrls);

    // Step 4: Create receipt
    const receipt = await createReceipt(receiptUrl);

    // Step 5: Link receipt to product
    const receiptItem = await createReceiptItem(receipt.id, product.id);

    // ── Summary ──────────────────────────────────────────────────────
    console.log('============================================');
    console.log('  SEED COMPLETE - Summary');
    console.log('============================================\n');

    console.log('Product created:');
    console.log(`  ID:    ${product.id}`);
    console.log(`  Name:  ${product.name}`);
    console.log(`  Slug:  ${product.slug}`);
    console.log(`  Price: $${product.selling_price}`);
    console.log(`  Images:`);
    for (const img of product.images) {
      console.log(`    ${img}`);
    }

    console.log('\nReceipt created:');
    console.log(`  ID:       ${receipt.id}`);
    console.log(`  Vendor:   ${receipt.vendor}`);
    console.log(`  Total:    $${receipt.total_amount}`);
    console.log(`  File URL: ${receipt.file_url}`);

    console.log('\nReceipt item created:');
    console.log(`  ID:         ${receiptItem.id}`);
    console.log(`  Receipt ID: ${receiptItem.receipt_id}`);
    console.log(`  Product ID: ${receiptItem.product_id}`);
    console.log(`  Item Name:  ${receiptItem.item_name}`);

    console.log('\nDone!');
  } catch (err) {
    console.error('\nSeed script failed:', err.message);
    process.exit(1);
  }
}

main();
