---
name: add-product
description: Add new products from a batch folder. Processes shoe photos, identifies the shoe, reads receipts/packing slips, uploads images to Supabase, creates product records, receipts, and receipt_items. Use when user says "add product for batch X" or similar.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task, WebSearch
argument-hint: <batch number> e.g. "3", "batch 4", "Batch3/AI/2"
---

# Add Product from Batch Folder

You are adding new sneaker/jewelry products to Deal Bazaar from photo batches.

## Folder Structure

Batch photos are stored at:
```
/Users/apandey/Downloads/deal-bazaar/Sneakers/Batch{N}/
├── AI/                     # AI-edited product photos (use these as main images)
│   ├── 1/                  # Shoe 1
│   │   ├── *.png           # Edited product photos
│   │   └── IMG_*.heic/jpg  # Receipt/packing slip photo
│   ├── 2/                  # Shoe 2
│   └── ...
├── Photos-3-001/           # Raw photos (HEIC + MP4)
└── Photos-3-001.zip        # Original archive
```

## Workflow

### 1. Discover & Identify
- List files in `Batch{N}/AI/{subfolder}/`
- View all PNG images to identify the shoe (brand, model, colorway)
- View any HEIC/JPG files — these are usually receipts/packing slips
- Convert HEIC to JPG using `sips -s format jpeg` if needed

### 2. Extract Receipt Data
- Read the packing slip image for: seller name, item name, order number, price, date, condition
- Cross-reference with the Whatnot order report CSV at `/Users/apandey/Downloads/deal-bazaar/order-report-7cac5509.csv` to get exact pricing (cost, shipping, taxes, total)
- Match by order numeric ID or item description

### 3. Upload Images to Supabase
- Upload AI-edited PNG images to Supabase storage bucket `images` under path `products/batch{N}/`
- Upload receipt image to Supabase storage bucket `receipts` under path `batch{N}/`
- Use the service role key from `.env.local`
- Use a Node.js script with `@supabase/supabase-js` (read env vars, never hardcode keys)

### 4. Create Product Record
Insert into `products` table with:
- `name`: Full product name (e.g. "Nike Air Jordan 9 Low Bred")
- `slug`: kebab-case URL slug
- `category`: "sneakers" or "jewelry"
- `cost_price`: from receipt/order report
- `selling_price`: estimate based on market (use pricing agent knowledge — typically 1.5-2.5x cost for sneakers)
- `shipping_cost`: from order report
- `tax_amount`: cost_price * 0.06625 (NJ tax)
- `box_number`: assign "B{batch}-{subfolder}" format (e.g. "B3-1")
- `status`: "in_stock"
- `quantity`: 1
- `currency`: "USD"
- `featured`: false
- `images`: array of uploaded Supabase public URLs
- `specs`: {"Brand": "...", "Model": "...", "Size": "...", "Color": "...", "Condition": "..."}
- `tags`: relevant lowercase tags
- `short_description`: brief condition note
- `description`: detailed description

### 5. Create Receipt
Insert into `receipts` table:
- `vendor`: seller name with "(Whatnot)" suffix
- `purchase_date`: from packing slip
- `total_amount`: item price from receipt
- `file_url`: uploaded receipt image URL
- `notes`: item description from receipt

### 6. Link Receipt to Product
Insert into `receipt_items`:
- `receipt_id`: from created receipt
- `product_id`: from created product
- `item_name`: item name from receipt
- `quantity`: 1
- `unit_price`: cost price

## Important Notes
- NEVER hardcode Supabase credentials. Always read from `.env.local` or use `process.env`
- Use `@supabase/supabase-js` createClient with env vars
- AI-edited PNGs are the primary product images
- HEIC files in the AI subfolder are almost always receipts
- The order report CSV has columns: order id, order numeric id, buyer, seller, product name, product description, product category, processed date, order status, order style, order currency, sold price, quantity, subtotal, shipping price, taxes, taxes currency, credits applied, total
