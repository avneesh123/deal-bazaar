import { supabase } from "@/lib/supabase";
import type { InternalData, InternalSale } from "./types";

export async function queryInternalSales(opts: {
  brand?: string;
  model?: string;
  category?: string;
  days?: number;
}): Promise<InternalData> {
  const { brand, model, category, days = 90 } = opts;

  const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  let query = supabase
    .from("sales")
    .select("sale_price, sale_date, product:products(name, cost_price, category, specs)")
    .gte("sale_date", cutoffDate)
    .order("sale_date", { ascending: false });

  const { data: salesRows } = await query;

  if (!salesRows || salesRows.length === 0) {
    return { sales: [], avgMargin: null, avgSalePrice: null };
  }

  // Filter by brand/model/category client-side (specs is JSONB)
  const filtered = salesRows.filter((row) => {
    const product = row.product as unknown as {
      name: string;
      cost_price: number | null;
      category: string;
      specs: Record<string, string>;
    } | null;
    if (!product) return false;
    if (category && product.category !== category) return false;
    if (brand && product.specs?.Brand?.toLowerCase() !== brand.toLowerCase())
      return false;
    if (
      model &&
      !product.name.toLowerCase().includes(model.toLowerCase()) &&
      product.specs?.Model?.toLowerCase() !== model.toLowerCase()
    )
      return false;
    return true;
  });

  const sales: InternalSale[] = filtered.map((row) => {
    const product = row.product as unknown as {
      name: string;
      cost_price: number | null;
    };
    return {
      productName: product?.name ?? "Unknown",
      salePrice: row.sale_price,
      costPrice: product?.cost_price ?? null,
      date: row.sale_date,
    };
  });

  // Calculate averages
  const avgSalePrice =
    sales.length > 0
      ? sales.reduce((sum, s) => sum + s.salePrice, 0) / sales.length
      : null;

  const salesWithCost = sales.filter((s) => s.costPrice !== null);
  const avgMargin =
    salesWithCost.length > 0
      ? salesWithCost.reduce(
          (sum, s) => sum + (s.salePrice - s.costPrice!) / s.salePrice,
          0
        ) / salesWithCost.length
      : null;

  return { sales, avgMargin, avgSalePrice };
}
