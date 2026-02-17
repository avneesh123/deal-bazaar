import type { KicksDBSearchResult, KicksDBPriceData } from "./types";
import { getCachedData, setCachedData } from "./cache";

const BASE_URL = "https://api.kicks.dev/v3";

async function kicksFetch(path: string, apiKey: string): Promise<unknown> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`KicksDB ${res.status}: ${text}`);
  }
  return res.json();
}

export async function searchProducts(
  query: string,
  apiKey: string
): Promise<KicksDBSearchResult[]> {
  const cacheKey = `search:${query.toLowerCase().trim()}`;
  const cached = await getCachedData<KicksDBSearchResult[]>("kicksdb", cacheKey);
  if (cached) return cached;

  // Standard API uses /stockx/products with query param
  const data = (await kicksFetch(
    `/stockx/products?query=${encodeURIComponent(query)}&limit=5`,
    apiKey
  )) as { data?: Array<Record<string, unknown>> };

  const results: KicksDBSearchResult[] = (data.data ?? []).map((item) => ({
    slug: (item.slug as string) ?? (item.id as string) ?? "",
    name: (item.name as string) ?? (item.title as string) ?? "",
    retail_price: (item.retail_price as number) ?? (item.retailPrice as number) ?? null,
    image: (item.image as string) ?? (item.thumbnail as string) ?? null,
    brand: (item.brand as string) ?? null,
  }));

  await setCachedData("kicksdb", cacheKey, results);
  return results;
}

export async function getProductPrices(
  productId: string,
  apiKey: string,
  size?: string
): Promise<KicksDBPriceData> {
  const cacheKey = `prices:${productId}:${size ?? "all"}`;
  const cached = await getCachedData<KicksDBPriceData>("kicksdb", cacheKey);
  if (cached) return cached;

  // Fetch product details and sales history in parallel
  const [productRes, salesRes] = await Promise.all([
    kicksFetch(`/stockx/products/${encodeURIComponent(productId)}`, apiKey).catch(
      () => null
    ),
    kicksFetch(
      `/stockx/products/${encodeURIComponent(productId)}/sales?limit=20`,
      apiKey
    ).catch(() => null),
  ]);

  const productData = productRes as Record<string, unknown> | null;
  const salesData = salesRes as { data?: Array<Record<string, unknown>> } | null;

  // Parse size-specific prices from product data
  const sizePrices: Record<string, { ask: number | null; bid: number | null }> =
    {};
  const allSizes = (productData?.sizes ?? productData?.variants ?? productData?.data) as
    | Array<Record<string, unknown>>
    | undefined;

  if (Array.isArray(allSizes)) {
    for (const s of allSizes) {
      const sizeLabel = String(s.size ?? s.us_size ?? s.name ?? "");
      if (sizeLabel) {
        sizePrices[sizeLabel] = {
          ask: (s.lowest_ask as number) ?? (s.lowestAsk as number) ?? (s.ask as number) ?? null,
          bid: (s.highest_bid as number) ?? (s.highestBid as number) ?? (s.bid as number) ?? null,
        };
      }
    }
  }

  // Parse recent sales
  const recentSales = ((salesData?.data ?? []) as Array<Record<string, unknown>>).map(
    (s) => ({
      price: (s.price as number) ?? (s.sale_price as number) ?? (s.amount as number) ?? 0,
      date: (s.date as string) ?? (s.created_at as string) ?? (s.createdAt as string) ?? "",
      size: String(s.size ?? s.us_size ?? ""),
    })
  );

  // Calculate 30-day average
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recentPrices = recentSales
    .filter((s) => s.date && new Date(s.date).getTime() > thirtyDaysAgo)
    .map((s) => s.price);
  const avg30d =
    recentPrices.length > 0
      ? recentPrices.reduce((a, b) => a + b, 0) / recentPrices.length
      : null;

  // Find size-specific data
  let lowestAsk: number | null = null;
  let highestBid: number | null = null;
  if (size && sizePrices[size]) {
    lowestAsk = sizePrices[size].ask;
    highestBid = sizePrices[size].bid;
  } else {
    lowestAsk = (productData?.lowest_ask as number) ?? (productData?.lowestAsk as number) ?? null;
    highestBid = (productData?.highest_bid as number) ?? (productData?.highestBid as number) ?? null;
  }

  const result: KicksDBPriceData = {
    lowest_ask: lowestAsk,
    highest_bid: highestBid,
    last_sale: recentSales.length > 0 ? recentSales[0].price : null,
    last_sale_date: recentSales.length > 0 ? recentSales[0].date : null,
    avg_sale_price_30d: avg30d,
    size_prices: sizePrices,
    recent_sales: recentSales.slice(0, 10),
  };

  await setCachedData("kicksdb", cacheKey, result);
  return result;
}
