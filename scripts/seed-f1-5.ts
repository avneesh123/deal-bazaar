/**
 * Seed Batch F1-5: Air Jordan 1 Retro High OG Metallic Burgundy — Size US 12.
 * Brand new with OG box. $54 Whatnot pull #155 from stewsshoes
 * "NO MISSES, JUST HEATERS AT A $1." (16 Oct 2025).
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync, readdirSync } from "fs";
import { execSync } from "child_process";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const raw of readFileSync(envPath, "utf-8").split("\n")) {
    const line = raw.replace(/\r/g, "");
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  }
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const FOLDER = "/tmp/db-batchF/f1-5-aj1-high-og-metallic-burgundy-sz12";
const SLUG = "air-jordan-1-retro-high-og-metallic-burgundy-sz12";
const NAME = "Air Jordan 1 Retro High OG Metallic Burgundy (Size 12)";

async function uploadCatalogImages(): Promise<string[]> {
  const dir = path.join(FOLDER, "catalog");
  const files = readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
  const urls: string[] = [];
  for (const f of files) {
    const storagePath = `products/batchF/${SLUG}/${f}`;
    const { error } = await supabase.storage.from("images").upload(storagePath, readFileSync(path.join(dir, f)), { upsert: true, contentType: "image/png" });
    if (error) { console.error(`  ✗ ${f}: ${error.message}`); continue; }
    urls.push(supabase.storage.from("images").getPublicUrl(storagePath).data.publicUrl);
    console.log(`  ✓ ${f}`);
  }
  return urls;
}

async function main() {
  console.log(`\n📦 ${NAME} (${SLUG})\n`);
  const { data: existing } = await supabase.from("products").select("id").eq("slug", SLUG).maybeSingle();
  if (existing) { console.log(`Already exists (id=${existing.id}). Aborting.`); return; }
  console.log("☁️  uploading catalog images...");
  const imageUrls = await uploadCatalogImages();
  if (imageUrls.length === 0) { process.exit(1); }
  const COST_PRICE = 54;
  const SELLING_PRICE = 220;
  console.log("\n📝 inserting product...");
  const { data: product, error: prodErr } = await supabase.from("products").insert({
    slug: SLUG, name: NAME, cost_price: COST_PRICE, selling_price: SELLING_PRICE,
    shipping_cost: 14, tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
    currency: "USD", category: "sneakers",
    description: "Air Jordan 1 Retro High OG in the 'Metallic Burgundy' colorway — white tumbled leather toe and quarter panels paired with rich metallic-burgundy leather Swoosh, eyestay, collar, and heel wrap. White midsole, white rubber outsole. Brand new with original Nike box. Size US M 12 (UK 11 / EU 46). Style code FD1437-160.",
    short_description: "Brand new with original Nike box",
    status: "in_stock", quantity: 1, featured: false, box_number: "F1-5",
    tags: ["nike","jordan","air-jordan-1","retro-high-og","metallic-burgundy","burgundy","white","red","size-12","whatnot-pull"],
    images: imageUrls,
    specs: {
      Brand: "Nike / Jordan", Model: "Air Jordan 1 Retro High OG",
      Color: "Metallic Burgundy / White", Size: "12",
      EU: "46", UK: "11", Condition: "Brand New",
      "Style Code": "FD1437-160",
      Source: "Whatnot — stewsshoes pull #155",
    },
  }).select("id").single();
  if (prodErr || !product) { console.error(`✗ product: ${prodErr?.message ?? "no row"}`); process.exit(1); }
  console.log(`✓ product id=${product.id}`);

  const heic = path.join(FOLDER, "_receipt", "IMG_5887.HEIC");
  if (existsSync(heic)) {
    const jpg = heic.replace(/\.HEIC$/i, ".jpg");
    if (!existsSync(jpg)) execSync(`sips -s format jpeg "${heic}" --out "${jpg}" 2>/dev/null`);
    const storagePath = `batchF/${SLUG}.jpg`;
    const { error } = await supabase.storage.from("receipts").upload(storagePath, readFileSync(jpg), { upsert: true, contentType: "image/jpeg" });
    if (!error) {
      const receiptUrl = supabase.storage.from("receipts").getPublicUrl(storagePath).data.publicUrl;
      const { data: receipt } = await supabase.from("receipts").insert({
        file_url: receiptUrl, vendor: "Whatnot — stewsshoes", purchase_date: "2025-10-16", total_amount: COST_PRICE,
        notes: "Whatnot packing slip — order #583609615 from stewsshoes' 'NO MISSES, JUST HEATERS AT A $1.' livestream on 16 October 2025. Listed as 'BRAND NEW RANDOM PULLS — LISTEN FOR SIZE #155 — BRAND NEW'. Won for $54. Receipt was on the same fabric quilt with no other shoe paired in the photo; matched to AJ1 Burgundy by price tier and brand-new condition.",
      }).select("id").single();
      if (receipt) {
        await supabase.from("receipt_items").insert({ receipt_id: receipt.id, product_id: product.id, item_name: NAME, quantity: 1, unit_price: COST_PRICE });
        console.log(`✓ receipt id=${receipt.id} linked`);
      }
    }
  }
  console.log("\nDone.");
}
main().catch((e) => { console.error(e); process.exit(1); });
