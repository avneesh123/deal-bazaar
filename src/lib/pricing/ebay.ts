import type { EbayListing, EbayData } from "./types";
import { getCachedData, setCachedData } from "./cache";

const BROWSE_API_URL = "https://api.ebay.com/buy/browse/v1";

async function getEbayAppToken(clientId: string, clientSecret: string): Promise<string> {
  const cacheKey = "app_token";
  const cached = await getCachedData<{ token: string }>("ebay", cacheKey);
  if (cached) return cached.token;

  const credentials = btoa(`${clientId}:${clientSecret}`);
  const res = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope",
  });

  if (!res.ok) {
    throw new Error(`eBay auth failed: ${res.status}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  // Cache for slightly less than expiry (usually 2 hours)
  await setCachedData("ebay", cacheKey, { token: data.access_token }, 1.5);
  return data.access_token;
}

export async function searchListings(
  query: string,
  apiKey: string,
  config?: { clientSecret?: string }
): Promise<EbayData> {
  const cacheKey = `listings:${query.toLowerCase().trim()}`;
  const cached = await getCachedData<EbayData>("ebay", cacheKey);
  if (cached) return cached;

  // eBay Browse API needs an OAuth app token
  const clientSecret = config?.clientSecret ?? "";
  const token = await getEbayAppToken(apiKey, clientSecret);

  const params = new URLSearchParams({
    q: query,
    category_ids: "93427", // Athletic Shoes
    filter: "conditionIds:{1000|1500|3000}", // New, Open Box, Used
    sort: "price",
    limit: "25",
  });

  const res = await fetch(`${BROWSE_API_URL}/item_summary/search?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`eBay Browse API ${res.status}: ${text}`);
  }

  const data = (await res.json()) as {
    total: number;
    itemSummaries?: Array<{
      title: string;
      price: { value: string; currency: string };
      condition: string;
      itemWebUrl: string;
    }>;
  };

  const listings: EbayListing[] = (data.itemSummaries ?? []).map((item) => ({
    title: item.title,
    price: parseFloat(item.price.value),
    condition: item.condition ?? "Unknown",
    url: item.itemWebUrl,
  }));

  const prices = listings.map((l) => l.price).sort((a, b) => a - b);
  const avgPrice =
    prices.length > 0
      ? prices.reduce((a, b) => a + b, 0) / prices.length
      : null;
  const medianPrice =
    prices.length > 0 ? prices[Math.floor(prices.length / 2)] : null;

  const result: EbayData = {
    listings,
    avgPrice,
    medianPrice,
    listingCount: data.total ?? listings.length,
  };

  await setCachedData("ebay", cacheKey, result);
  return result;
}
