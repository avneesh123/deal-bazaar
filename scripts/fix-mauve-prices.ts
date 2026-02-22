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

async function main() {
  // First get the source of truth (mauve-2)
  const { data: source } = await supabase
    .from("products")
    .select("slug, retail_price, price_sources")
    .eq("slug", "nike-air-jordan-1-retro-high-og-mauve-2")
    .single();

  if (!source) {
    console.error("Source product not found");
    return;
  }

  console.log("Source:", source.slug);
  console.log("  retail_price:", source.retail_price);
  console.log("  price_sources:", source.price_sources?.length, "sources");

  // Find all other Mauve products
  const { data: allMauve } = await supabase
    .from("products")
    .select("slug, retail_price, price_sources")
    .like("slug", "%mauve%")
    .neq("slug", "nike-air-jordan-1-retro-high-og-mauve-2");

  if (!allMauve || allMauve.length === 0) {
    console.log("No other Mauve products found");
    return;
  }

  console.log(`\nFound ${allMauve.length} other Mauve products to update:`);
  for (const p of allMauve) {
    console.log(`  ${p.slug} — retail: ${p.retail_price ?? "null"}, sources: ${p.price_sources?.length ?? 0}`);
  }

  // Update them all
  const slugs = allMauve.map((p) => p.slug);
  const { error } = await supabase
    .from("products")
    .update({
      retail_price: source.retail_price,
      price_sources: source.price_sources,
    })
    .in("slug", slugs);

  if (error) {
    console.error("Update failed:", error.message);
  } else {
    console.log(`\n✅ Updated ${slugs.length} products with retail_price=${source.retail_price} and ${source.price_sources?.length} price sources`);
  }
}

main();
