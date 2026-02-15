/**
 * One-time migration script: imports existing products from products.ts into Supabase.
 *
 * Usage:
 *   NEXT_PUBLIC_SUPABASE_URL=xxx SUPABASE_SERVICE_ROLE_KEY=xxx npx tsx scripts/migrate-products.ts
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Import the existing hardcoded products
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { products } = require("../src/data/products");

interface LocalProduct {
  slug: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  description: string;
  shortDescription: string;
  images: string[];
  specs: Record<string, string>;
  featured: boolean;
  tags: string[];
}

async function main() {
  console.log(`📦 Migrating ${products.length} products to Supabase...`);

  const rows = (products as LocalProduct[]).map((p) => ({
    slug: p.slug,
    name: p.name,
    cost_price: null,
    selling_price: p.price,
    currency: p.currency,
    category: p.category,
    description: p.description,
    short_description: p.shortDescription,
    images: p.images,
    specs: p.specs,
    status: "in_stock" as const,
    quantity: 1,
    featured: p.featured,
    tags: p.tags,
  }));

  // Insert in batches of 20
  for (let i = 0; i < rows.length; i += 20) {
    const batch = rows.slice(i, i + 20);
    const { error } = await supabase.from("products").insert(batch);
    if (error) {
      console.error(`❌ Error at batch ${i / 20 + 1}:`, error.message);
      process.exit(1);
    }
    console.log(`  ✅ Inserted ${Math.min(i + 20, rows.length)}/${rows.length}`);
  }

  console.log("🎉 Migration complete!");
}

main();
