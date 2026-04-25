import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, basename, extname } from "path";
import sharp from "sharp";

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
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("⚠️  Supabase not configured — using existing products.ts");
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const FULL_WIDTH = 1200;
const THUMB_WIDTH = 400;
const JPEG_QUALITY = 82;

const IMAGES_ROOT = join(process.cwd(), "public", "images", "products");

/**
 * Download a remote image, resize to 1200px (full) and 400px (thumbnail) JPEGs,
 * and save to public/images/products/<slug>/. Skip work if both files exist.
 * Returns the public URL the site should use (the full-size local path).
 */
async function localizeImage(
  remoteUrl: string,
  slug: string
): Promise<string> {
  if (!remoteUrl) return remoteUrl;

  // Already a local path? Pass through.
  if (remoteUrl.startsWith("/")) return remoteUrl;

  // Not a Supabase storage URL? Leave it alone (e.g. external CDN).
  if (!remoteUrl.includes("supabase.co/storage/v1/")) return remoteUrl;

  // Strip query (resize params) and derive a stable local filename.
  const cleanUrl = remoteUrl.split("?")[0];
  const remoteBase = basename(cleanUrl);
  const stem = remoteBase.replace(extname(remoteBase), "");
  const localName = `${stem}.jpg`;
  const thumbName = `${stem}-400.jpg`;

  const dir = join(IMAGES_ROOT, slug);
  const fullPath = join(dir, localName);
  const thumbPath = join(dir, thumbName);
  const publicPath = `/images/products/${slug}/${localName}`;

  if (existsSync(fullPath) && existsSync(thumbPath)) {
    return publicPath;
  }

  mkdirSync(dir, { recursive: true });

  try {
    const res = await fetch(remoteUrl);
    if (!res.ok) {
      console.warn(`  ⚠️  Skip (${res.status}): ${remoteUrl}`);
      return remoteUrl;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const base = sharp(buf).rotate(); // auto-orient via EXIF

    if (!existsSync(fullPath)) {
      await base
        .clone()
        .resize({
          width: FULL_WIDTH,
          withoutEnlargement: true,
          fit: "inside",
        })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(fullPath);
    }
    if (!existsSync(thumbPath)) {
      await base
        .clone()
        .resize({
          width: THUMB_WIDTH,
          withoutEnlargement: true,
          fit: "inside",
        })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(thumbPath);
    }
    return publicPath;
  } catch (err) {
    console.warn(
      `  ⚠️  Failed to localize ${remoteUrl}: ${(err as Error).message}`
    );
    return remoteUrl;
  }
}

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
    console.log("⚠️  Keeping existing products.ts (Supabase unavailable)");
    process.exit(0);
  }

  console.log(`✅ Found ${products.length} publishable products`);
  console.log(`🖼️  Localizing images → public/images/products/...`);

  let totalImages = 0;
  let downloadedCount = 0;

  for (const p of products) {
    const before = downloadedCount;
    const localized: string[] = [];
    for (const url of p.images || []) {
      totalImages++;
      const remote = url;
      const local = await localizeImage(remote, p.slug);
      if (local !== remote) {
        downloadedCount++;
      }
      localized.push(local);
    }
    p.images = localized;
    if (downloadedCount > before) {
      console.log(`  · ${p.slug} (${localized.length} images)`);
    }
  }

  console.log(
    `🖼️  Localized ${downloadedCount}/${totalImages} images (rest were already local or external)`
  );

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
  retailPrice?: number;
  priceSources?: { name: string; price: number | null; url: string }[];
  featured: boolean;
  tags: string[];
  createdAt?: string;
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
      retailPrice: p.retail_price ?? undefined,
      priceSources: p.price_sources ?? undefined,
      featured: p.featured,
      tags: p.tags,
      createdAt: p.created_at,
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
