/**
 * Seed Batch E1-6: Air Jordan 1 Retro High OG "Yellow Ochre" — Size US 9.
 * Brand new with original Nike OG box. Style code FQ2941-701 (July 2024 release).
 *
 * No receipt was included in this batch — cost is a placeholder estimate
 * based on typical retail / market wholesale comps. Update in /admin if known.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync, readdirSync } from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const raw of readFileSync(envPath, "utf-8").split("\n")) {
    const line = raw.replace(/\r/g, "");
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const FOLDER = "/tmp/db-batchE/e1-6-aj1-yellow-ochre-sz9";
const SLUG = "air-jordan-1-retro-high-og-yellow-ochre-sz9";
const NAME = "Air Jordan 1 Retro High OG Yellow Ochre (Size 9)";

async function uploadCatalogImages(): Promise<string[]> {
  const dir = path.join(FOLDER, "catalog");
  if (!existsSync(dir)) throw new Error(`No catalog dir at ${dir}`);
  const files = readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
  const urls: string[] = [];
  for (const f of files) {
    const storagePath = `products/batchE/${SLUG}/${f}`;
    const buf = readFileSync(path.join(dir, f));
    const { error } = await supabase.storage
      .from("images")
      .upload(storagePath, buf, { upsert: true, contentType: "image/png" });
    if (error) {
      console.error(`  ✗ ${f}: ${error.message}`);
      continue;
    }
    urls.push(
      supabase.storage.from("images").getPublicUrl(storagePath).data.publicUrl
    );
    console.log(`  ✓ ${f}`);
  }
  return urls;
}

async function main() {
  console.log(`\n📦 ${NAME} (${SLUG})\n`);

  const { data: existing } = await supabase
    .from("products")
    .select("id")
    .eq("slug", SLUG)
    .maybeSingle();
  if (existing) {
    console.log(`Already exists (id=${existing.id}). Aborting.`);
    return;
  }

  console.log("☁️  uploading catalog images...");
  const imageUrls = await uploadCatalogImages();
  if (imageUrls.length === 0) {
    console.error("No catalog images — aborting.");
    process.exit(1);
  }

  // No receipt — cost is a placeholder based on typical wholesale/market comp.
  const COST_PRICE = 150;
  const SELLING_PRICE = 260;

  console.log("\n📝 inserting product...");
  const { data: product, error: prodErr } = await supabase
    .from("products")
    .insert({
      slug: SLUG,
      name: NAME,
      cost_price: COST_PRICE,
      selling_price: SELLING_PRICE,
      shipping_cost: 14,
      tax_amount: parseFloat((COST_PRICE * 0.06625).toFixed(2)),
      currency: "USD",
      category: "sneakers",
      description:
        "Air Jordan 1 Retro High OG in the 'Yellow Ochre' colorway — black leather quarter panels and Swoosh, bright yellow-ochre toe and side overlays, sail/cream Nike Air collar lining, sail midsole, gum-tinted outsole. Brand new with original Nike box. Style code FQ2941-701. Size US M 9.",
      short_description: "Brand new with original Nike box",
      status: "in_stock",
      quantity: 1,
      featured: false,
      box_number: "E1-6",
      tags: [
        "nike",
        "jordan",
        "air-jordan-1",
        "retro-high-og",
        "yellow-ochre",
        "yellow",
        "black",
        "size-9",
      ],
      images: imageUrls,
      specs: {
        Brand: "Nike / Jordan",
        Model: "Air Jordan 1 Retro High OG",
        Color: "Yellow Ochre / Black / Sail",
        Size: "9",
        Condition: "Brand New",
        "Style Code": "FQ2941-701",
      },
    })
    .select("id")
    .single();
  if (prodErr || !product) {
    console.error(`✗ product: ${prodErr?.message ?? "no row returned"}`);
    process.exit(1);
  }
  console.log(`✓ product id=${product.id}`);
  console.log(
    "\n⚠️  No purchase receipt was included — cost ($150) is a placeholder. " +
      "Update via /admin/products if you have the actual cost basis."
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
