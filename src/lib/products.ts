import { supabase } from "./supabase";
import {
  products as staticProducts,
  type Product,
  type ProductCategory,
} from "@/data/products";
import type { DbProduct } from "./supabase-types";

export function mapDbToProduct(db: DbProduct): Product {
  return {
    slug: db.slug,
    name: db.name,
    price: db.selling_price,
    currency: db.currency,
    category: db.category as ProductCategory,
    description: db.description,
    shortDescription: db.short_description,
    images: db.images || [],
    specs: db.specs || {},
    retailPrice: db.retail_price ?? undefined,
    priceSources: db.price_sources ?? undefined,
    featured: db.featured,
    tags: db.tags || [],
    createdAt: db.created_at,
  };
}

/** Fetch all in-stock products. Supabase first, then merge static-only products. */
export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .in("status", ["in_stock", "reserved"])
      .order("created_at", { ascending: false });

    if (error) throw error;

    const dbProducts = (data || []).map(mapDbToProduct);
    const dbSlugs = new Set(dbProducts.map((p) => p.slug));
    const staticOnly = staticProducts.filter((p) => !dbSlugs.has(p.slug));

    return [...dbProducts, ...staticOnly];
  } catch {
    return staticProducts;
  }
}

/** Fetch featured products for the homepage. */
export async function fetchFeaturedProducts(
  limit = 6
): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .in("status", ["in_stock", "reserved"])
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    const dbProducts = (data || []).map(mapDbToProduct);
    const dbSlugs = new Set(dbProducts.map((p) => p.slug));
    const staticFeatured = staticProducts.filter(
      (p) => p.featured && !dbSlugs.has(p.slug)
    );

    return [...dbProducts, ...staticFeatured].slice(0, limit);
  } catch {
    return staticProducts.filter((p) => p.featured).slice(0, limit);
  }
}

/** Fetch a single product by slug. */
export async function fetchProductBySlug(
  slug: string
): Promise<Product | null> {
  try {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (data) return mapDbToProduct(data);
  } catch {
    // Fall through to static lookup
  }

  return staticProducts.find((p) => p.slug === slug) || null;
}

/** Fetch related products (same category, different slug). */
export async function fetchRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  try {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category", product.category)
      .neq("slug", product.slug)
      .in("status", ["in_stock", "reserved"])
      .order("created_at", { ascending: false })
      .limit(limit);

    const dbProducts = (data || []).map(mapDbToProduct);

    if (dbProducts.length >= limit) return dbProducts;

    const dbSlugs = new Set(dbProducts.map((p) => p.slug));
    dbSlugs.add(product.slug);
    const staticFill = staticProducts
      .filter((p) => p.category === product.category && !dbSlugs.has(p.slug))
      .slice(0, limit - dbProducts.length);

    return [...dbProducts, ...staticFill];
  } catch {
    return staticProducts
      .filter((p) => p.category === product.category && p.slug !== product.slug)
      .slice(0, limit);
  }
}

/** Get all product slugs (for generateStaticParams). */
export async function fetchAllSlugs(): Promise<string[]> {
  try {
    const { data } = await supabase
      .from("products")
      .select("slug")
      .in("status", ["in_stock", "reserved"]);

    const dbSlugs = (data || []).map((p: { slug: string }) => p.slug);
    const staticSlugs = staticProducts.map((p) => p.slug);
    return [...new Set([...dbSlugs, ...staticSlugs])];
  } catch {
    return staticProducts.map((p) => p.slug);
  }
}
