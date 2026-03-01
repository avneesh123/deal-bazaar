---
name: add-product
description: Add new products from a batch folder. Processes shoe photos (auto bg removal via Picsart API), identifies the shoe, reads receipts/packing slips, uploads images to Supabase, creates product records, receipts, and receipt_items. Use when user says "add product for batch X" or similar.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task, WebSearch
argument-hint: <batch number> e.g. "3", "batch 4", "Batch3/AI/2"
---

# Add Product from Batch Folder

You are adding new sneaker/jewelry products to Deal Bazaar from photo batches.

## Folder Structure

Batch photos are stored at:
```
/Users/apandey/Downloads/deal-bazaar/Sneakers/Batch{N}/
├── 1/                          # Shoe 1 — raw HEIC/JPG photos from phone
│   ├── IMG_*.HEIC              # Product photos (multiple angles)
│   ├── IMG_*.HEIC              # Receipt/packing slip (usually last photo)
│   └── catalog/                # AUTO-GENERATED — catalog-ready PNGs
├── 2/                          # Shoe 2
│   └── ...
├── catalog/                    # Or batch-level catalog folder
└── Photos-*.zip                # Original archive (optional)
```

## Workflow

### 0. Process Raw Images (Automated Background Removal)

**This step is automatic — run it before identification.**

For each shoe subfolder with raw HEIC/JPG photos:

1. **Classify images**: View all images in the subfolder. Separate product photos (shoe from various angles) from receipt/packing slip photos. Receipt photos typically show text, barcodes, shipping labels — set these aside for Step 2.

2. **Run the image processing pipeline** on product photos only:
   ```bash
   npx tsx scripts/lib/process-images.ts /Users/apandey/Downloads/deal-bazaar/Sneakers/Batch{N}/{subfolder}
   ```
   This automatically:
   - Converts HEIC → JPG (via `sips`)
   - Removes background via Picsart API (transparent PNG)
   - Creates catalog-ready output: 1000×1000, white background, centered with padding, subtle drop shadow
   - Saves to `{subfolder}/catalog/*.png`

   To process the entire batch at once:
   ```bash
   npx tsx scripts/lib/process-images.ts /Users/apandey/Downloads/deal-bazaar/Sneakers/Batch{N}
   ```

3. **Review results**: View the catalog PNGs to verify quality. If any need re-processing, delete the catalog PNG and re-run.

**Important**: Move receipt/packing slip images OUT of the shoe subfolder before running the pipeline (or rename them so they're easy to identify), so they don't get processed through background removal. Alternatively, process images selectively by running on specific files.

**Requirements**: `PICSART_API_KEY` must be set in `.env.local`. Uses 8 API credits per image.

### 1. Discover & Identify
- View the catalog-ready PNGs from Step 0 to identify the shoe (brand, model, colorway, size)
- View any HEIC/JPG receipt files — these are usually receipts/packing slips
- Convert HEIC to JPG using `sips -s format jpeg` if needed for viewing

### 2. Extract Receipt Data
- Read the packing slip image for: seller name, item name, order number, price, date, condition
- Cross-reference with the Whatnot order report CSV at `/Users/apandey/Downloads/deal-bazaar/order-report-7cac5509.csv` to get exact pricing (cost, shipping, taxes, total)
- Match by order numeric ID or item description

### 3. Upload Images to Supabase
- Upload catalog-ready PNGs to Supabase storage bucket `images` under path `products/batch{N}/`
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
- NEVER hardcode Supabase credentials or API keys. Always read from `.env.local` or use `process.env`
- Use `@supabase/supabase-js` createClient with env vars
- Catalog-ready PNGs (from Step 0) are the primary product images
- HEIC files that contain receipts should NOT be run through the image pipeline
- The order report CSV has columns: order id, order numeric id, buyer, seller, product name, product description, product category, processed date, order status, order style, order currency, sold price, quantity, subtotal, shipping price, taxes, taxes currency, credits applied, total
- The image processing script is at `scripts/lib/process-images.ts` — it can be imported as a module or run directly via CLI
