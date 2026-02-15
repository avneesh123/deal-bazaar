import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// ── Config ──────────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://ajeeaetsshqfeocosxbn.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZWVhZXRzc2hxZmVvY29zeGJuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA4OTI0NSwiZXhwIjoyMDg2NjY1MjQ1fQ.__EDi69pBv9egjhcrfVjqOe3A62yea6GWgkt1nkgsiw';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const AI_DIR = '/Users/apandey/Downloads/deal-bazaar/Sneakers/Batch2/AI';
const STORAGE_BUCKET = 'images';
const STORAGE_PATH_PREFIX = 'products/batch2';

// ── 1. Upload all 15 images ────────────────────────────────────────────────
async function uploadImages() {
  console.log('\n=== Step 1: Uploading 15 images to Supabase Storage ===\n');

  const files = fs.readdirSync(AI_DIR).filter((f) => f.endsWith('.png'));
  console.log(`Found ${files.length} PNG files to upload.\n`);

  const urlMap = {}; // filename -> public URL

  for (const filename of files) {
    const filePath = path.join(AI_DIR, filename);
    const fileBuffer = fs.readFileSync(filePath);
    const storagePath = `${STORAGE_PATH_PREFIX}/${filename}`;

    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: 'image/png',
        upsert: true,
      });

    if (error) {
      console.error(`  FAILED  ${filename}: ${error.message}`);
      throw error;
    }
    console.log(`  OK      ${filename}  ->  ${data.path}`);

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);

    urlMap[filename] = publicUrl;
  }

  console.log('\nAll images uploaded successfully.\n');
  return urlMap;
}

// ── 2. Create 5 products ───────────────────────────────────────────────────
async function createProducts(urlMap) {
  console.log('=== Step 2: Creating 5 product records ===\n');

  const products = [
    {
      name: 'Adidas Cloudfoam Bounce Triple White',
      slug: 'adidas-cloudfoam-bounce-triple-white',
      category: 'sneakers',
      status: 'in_stock',
      quantity: 1,
      featured: false,
      currency: 'USD',
      cost_price: 34.00,
      selling_price: 55.00,
      shipping_cost: 9.21,
      tax_amount: 2.25,
      box_number: '253',
      short_description: 'Brand new with box',
      description:
        'Adidas Cloudfoam Bounce running shoes in triple white colorway. Lightweight and comfortable with Bounce cushioning technology. Size 10.5.',
      tags: ['adidas', 'bounce', 'cloudfoam', 'white', 'running'],
      specs: {
        Brand: 'Adidas',
        Size: '10.5',
        Color: 'Triple White',
        Condition: 'Brand New',
        Style: 'Running',
      },
      images: [
        urlMap['adidas_bounce_white_2.png'],
        urlMap['adidas_bounce_white_3.png'],
        urlMap['adidas_bounce_white_4.png'],
      ],
    },
    {
      name: 'Adidas Gazelle Blue Green',
      slug: 'adidas-gazelle-blue-green',
      category: 'sneakers',
      status: 'in_stock',
      quantity: 1,
      featured: false,
      currency: 'USD',
      cost_price: 45.00,
      selling_price: 95.00,
      shipping_cost: 9.21,
      tax_amount: 2.98,
      box_number: 'B2-2',
      short_description: 'Brand new with tags and OG box',
      description:
        'Adidas Originals Gazelle in royal blue suede with green three stripes. Style IH5389. Deadstock with original tags. Size 10.5 US / 270mm.',
      tags: ['adidas', 'gazelle', 'blue', 'green', 'originals', 'suede'],
      specs: {
        Brand: 'Adidas',
        Model: 'Gazelle',
        'Style Code': 'IH5389',
        Size: '10.5',
        Color: 'Blue/Green/White',
        Condition: 'Brand New',
      },
      images: [
        urlMap['adidas_gazelle_blue_green_1.png'],
        urlMap['adidas_gazelle_blue_green_2.png'],
        urlMap['adidas_gazelle_blue_green_3.png'],
      ],
    },
    {
      name: 'Adidas Racer TR23 Black Royal Blue',
      slug: 'adidas-racer-tr23-black-royal-blue',
      category: 'sneakers',
      status: 'in_stock',
      quantity: 1,
      featured: false,
      currency: 'USD',
      cost_price: 26.00,
      selling_price: 50.00,
      shipping_cost: 0.00,
      tax_amount: 1.72,
      box_number: '257',
      short_description: 'Brand new with box',
      description:
        'Adidas Racer TR23 in black mesh with royal blue Adidas pull tab accents. Lightweight running shoe. Size 6.5.',
      tags: ['adidas', 'racer', 'black', 'blue', 'running'],
      specs: {
        Brand: 'Adidas',
        Model: 'Racer TR23',
        Size: '6.5',
        Color: 'Black/Royal Blue',
        Condition: 'Brand New',
      },
      images: [
        urlMap['adidas_racer_black_blue_1.png'],
        urlMap['adidas_racer_black_blue_2.png'],
        urlMap['adidas_racer_black_blue_3.png'],
      ],
    },
    {
      name: 'Adidas Gazelle Indoor Orange Black Gum',
      slug: 'adidas-gazelle-indoor-orange-black-gum',
      category: 'sneakers',
      status: 'in_stock',
      quantity: 1,
      featured: false,
      currency: 'USD',
      cost_price: 30.00,
      selling_price: 85.00,
      shipping_cost: 0.00,
      tax_amount: 1.99,
      box_number: '272',
      short_description: 'Brand new with tags and OG box',
      description:
        'Adidas Originals Gazelle Indoor in bright orange suede with black three stripes and gum sole. Size 13.',
      tags: [
        'adidas',
        'gazelle',
        'indoor',
        'orange',
        'black',
        'gum',
        'originals',
      ],
      specs: {
        Brand: 'Adidas',
        Model: 'Gazelle Indoor',
        Size: '13',
        Color: 'Orange/Black/Gum',
        Condition: 'Brand New',
      },
      images: [
        urlMap['adidas_gazelle_orange_black_1.png'],
        urlMap['adidas_gazelle_orange_black_2.png'],
        urlMap['adidas_gazelle_orange_black_3.png'],
      ],
    },
    {
      name: 'Nike Air Jordan 1 Retro High OG Mauve',
      slug: 'nike-air-jordan-1-retro-high-og-mauve',
      category: 'sneakers',
      status: 'in_stock',
      quantity: 1,
      featured: false,
      currency: 'USD',
      cost_price: 52.00,
      selling_price: 95.00,
      shipping_cost: 9.21,
      tax_amount: 3.45,
      box_number: 'B2-5',
      short_description: 'Brand new with OG box',
      description:
        'Nike Air Jordan 1 Retro High OG in Mauve/Sail colorway. Brand new, deadstock with original pink box. Size 11.',
      tags: ['nike', 'jordan', 'jordan-1', 'mauve', 'retro', 'high-og'],
      specs: {
        Brand: 'Nike',
        Model: 'Air Jordan 1 Retro High OG',
        Size: '11',
        Color: 'Mauve/Sail',
        Condition: 'Brand New',
      },
      images: [
        urlMap['nike_jordan1_mauve_1.png'],
        urlMap['nike_jordan1_mauve_2.png'],
        urlMap['nike_jordan1_mauve_3.png'],
      ],
    },
  ];

  const { data, error } = await supabase
    .from('products')
    .insert(products)
    .select();

  if (error) {
    console.error('Failed to create products:', error.message);
    throw error;
  }

  for (const p of data) {
    console.log(`  OK  [${p.id}]  ${p.name}  (${p.slug})`);
  }
  console.log(`\nCreated ${data.length} products.\n`);
  return data;
}

// ── 3. Create 2 receipts ──────────────────────────────────────────────────
async function createReceipts() {
  console.log('=== Step 3: Creating 2 receipt records ===\n');

  const receipts = [
    {
      vendor: 'fulfilledbymama (Whatnot)',
      purchase_date: '2025-10-16',
      total_amount: 90.00,
      notes: 'Whatnot livestream random sneaker pulls',
      file_url: null,
    },
    {
      vendor: 'stewsshoes (Whatnot)',
      purchase_date: '2025-10-30',
      total_amount: 52.00,
      notes: 'Whatnot - Jordan 1 Mauve Size 11 Brand New OG Box',
      file_url: null,
    },
  ];

  const { data, error } = await supabase
    .from('receipts')
    .insert(receipts)
    .select();

  if (error) {
    console.error('Failed to create receipts:', error.message);
    throw error;
  }

  for (const r of data) {
    console.log(`  OK  [${r.id}]  ${r.vendor}  $${r.total_amount}`);
  }
  console.log(`\nCreated ${data.length} receipts.\n`);
  return data;
}

// ── 4. Create receipt_items ────────────────────────────────────────────────
async function createReceiptItems(products, receipts) {
  console.log('=== Step 4: Creating receipt_items linking receipts to products ===\n');

  // products array order matches our insert order:
  // [0] Bounce White, [1] Gazelle Blue Green, [2] Racer Black Blue,
  // [3] Gazelle Orange Black, [4] Jordan 1 Mauve
  const [product1, product2, product3, product4, product5] = products;
  const [receipt1, receipt2] = receipts;

  const items = [
    // Receipt 1 items (fulfilledbymama)
    {
      receipt_id: receipt1.id,
      product_id: product1.id,
      item_name: 'RANDOM SNEAKER PULL #253',
      quantity: 1,
      unit_price: 34.00,
    },
    {
      receipt_id: receipt1.id,
      product_id: product3.id,
      item_name: 'RANDOM SNEAKER PULL #257',
      quantity: 1,
      unit_price: 26.00,
    },
    {
      receipt_id: receipt1.id,
      product_id: product4.id,
      item_name: 'RANDOM SNEAKER PULL #272',
      quantity: 1,
      unit_price: 30.00,
    },
    // Receipt 2 items (stewsshoes)
    {
      receipt_id: receipt2.id,
      product_id: product5.id,
      item_name: 'JORDAN 1 MAUVE SIZE 11 #3',
      quantity: 1,
      unit_price: 52.00,
    },
  ];

  const { data, error } = await supabase
    .from('receipt_items')
    .insert(items)
    .select();

  if (error) {
    console.error('Failed to create receipt_items:', error.message);
    throw error;
  }

  for (const ri of data) {
    console.log(
      `  OK  [${ri.id}]  receipt=${ri.receipt_id}  product=${ri.product_id}  "${ri.item_name}"  $${ri.unit_price}`
    );
  }
  console.log(`\nCreated ${data.length} receipt_items.\n`);
  return data;
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log('============================================');
  console.log('  Batch 2 Seed Script');
  console.log('============================================');

  try {
    // Step 1: Upload images
    const urlMap = await uploadImages();

    // Step 2: Create products (with image URLs)
    const products = await createProducts(urlMap);

    // Step 3: Create receipts
    const receipts = await createReceipts();

    // Step 4: Link receipts to products
    const receiptItems = await createReceiptItems(products, receipts);

    // ── Summary ──────────────────────────────────────────────────────
    console.log('============================================');
    console.log('  SEED COMPLETE - Summary');
    console.log('============================================\n');

    console.log('Products created:');
    for (const p of products) {
      console.log(`  ID: ${p.id}`);
      console.log(`    Name:  ${p.name}`);
      console.log(`    Slug:  ${p.slug}`);
      console.log(`    Images:`);
      for (const img of p.images) {
        console.log(`      ${img}`);
      }
      console.log();
    }

    console.log('Receipts created:');
    for (const r of receipts) {
      console.log(`  ID: ${r.id}  Vendor: ${r.vendor}  Total: $${r.total_amount}`);
    }

    console.log('\nReceipt items created:');
    for (const ri of receiptItems) {
      console.log(
        `  ID: ${ri.id}  Receipt: ${ri.receipt_id}  Product: ${ri.product_id}  "${ri.item_name}"`
      );
    }

    console.log('\nDone!');
  } catch (err) {
    console.error('\nSeed script failed:', err.message);
    process.exit(1);
  }
}

main();
