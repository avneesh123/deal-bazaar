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
  const { data, error } = await supabase
    .from("products")
    .update({
      name: "Q4 Sports EM55-I Black Dark Blue",
      slug: "q4-sports-em55-i-black-dark-blue",
      description:
        "Q4 Sports EM55-I basketball shoe in Black/Dark Blue colorway. Features a black mesh upper with metallic gold accents, gold trim along the midsole, and a blue translucent patterned outsole. Lightweight performance basketball shoe. Brand new with OG box. Size 5.5 US / UK 5.",
      short_description: "Brand new with OG box",
      specs: {
        Brand: "Q4 Sports",
        Model: "EM55-I",
        Color: "Black/Dark Blue",
        Size: "5.5",
        Condition: "Brand New",
        "Style Code": "Q4-EM01",
      },
      tags: ["q4", "q4-sports", "em55", "basketball", "black", "blue", "gold"],
      selling_price: 40,
    })
    .eq("slug", "nike-zoom-freak-5-black-metallic-gold");

  if (error) {
    console.error("❌ Update failed:", error.message);
  } else {
    console.log("✅ Product updated:", data);
  }
}

main();
