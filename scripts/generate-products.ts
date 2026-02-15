import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// Load .env.local manually (tsx doesn't auto-load it like Next.js)
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("⚠️  Supabase not configured — using existing products.ts");
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("📦 Fetching products from Supabase...");

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .in("status", ["in_stock", "reserved"])
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Error fetching products:", error.message);
    process.exit(1);
  }

  console.log(`✅ Found ${products.length} publishable products`);

  const tsContent = `export type ProductCategory = "jewelry" | "sneakers";

export interface Product {
  slug: string;
  name: string;
  price: number;
  currency: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  images: string[];
  specs: Record<string, string>;
  featured: boolean;
  tags: string[];
}

export const products: Product[] = ${JSON.stringify(
    products.map((p) => ({
      slug: p.slug,
      name: p.name,
      price: p.selling_price,
      currency: p.currency,
      category: p.category,
      description: p.description,
      shortDescription: p.short_description,
      images: p.images,
      specs: p.specs,
      featured: p.featured,
      tags: p.tags,
    })),
    null,
    2
  )};
`;

  const outPath = join(process.cwd(), "src", "data", "products.ts");
  writeFileSync(outPath, tsContent, "utf-8");
  console.log(`📝 Generated ${outPath} with ${products.length} products`);
}

main();
