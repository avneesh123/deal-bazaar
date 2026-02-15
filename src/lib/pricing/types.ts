export interface ParsedProduct {
  brand: string;
  model: string;
  colorway: string;
  size: string;
}

export interface PriceTier {
  price: number;
  label: string;
  timeframe: string;
}

export interface PricingEstimate {
  query: string;
  parsed: ParsedProduct;
  quickSell: PriceTier;
  competitive: PriceTier;
  maxProfit: PriceTier;
  confidence: number;
  reasoning: string;
  dataSources: string[];
  marketData: MarketDataSnapshot;
}

export interface MarketDataSnapshot {
  kicksdb?: KicksDBData;
  ebay?: EbayData;
  internal?: InternalData;
}

// KicksDB types
export interface KicksDBSearchResult {
  slug: string;
  name: string;
  retail_price: number | null;
  image: string | null;
  brand: string | null;
}

export interface KicksDBPriceData {
  lowest_ask: number | null;
  highest_bid: number | null;
  last_sale: number | null;
  last_sale_date: string | null;
  avg_sale_price_30d: number | null;
  size_prices: Record<string, { ask: number | null; bid: number | null }>;
  recent_sales: Array<{ price: number; date: string; size: string }>;
}

export interface KicksDBData {
  product: KicksDBSearchResult | null;
  prices: KicksDBPriceData | null;
}

// eBay types
export interface EbayListing {
  title: string;
  price: number;
  condition: string;
  url: string;
}

export interface EbayData {
  listings: EbayListing[];
  avgPrice: number | null;
  medianPrice: number | null;
  listingCount: number;
}

// Internal data types
export interface InternalSale {
  productName: string;
  salePrice: number;
  costPrice: number | null;
  date: string;
}

export interface InternalData {
  sales: InternalSale[];
  avgMargin: number | null;
  avgSalePrice: number | null;
}

// Agent step for streaming UI
export interface AgentStep {
  id: string;
  type: "thinking" | "tool_call" | "tool_result" | "answer";
  content: string;
  timestamp: number;
  toolName?: string;
  status?: "running" | "done" | "error";
}

// DB row type
export interface DbPriceEstimate {
  id: string;
  product_id: string | null;
  query: string;
  parsed_brand: string | null;
  parsed_model: string | null;
  parsed_colorway: string | null;
  parsed_size: string | null;
  quick_sell_price: number | null;
  competitive_price: number | null;
  max_profit_price: number | null;
  confidence_score: number | null;
  reasoning: string | null;
  data_sources: string[] | null;
  market_data: MarketDataSnapshot | null;
  estimated_by: string;
  created_at: string;
}
