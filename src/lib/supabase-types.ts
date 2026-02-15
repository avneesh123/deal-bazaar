export type ProductStatus = "in_stock" | "sold" | "reserved" | "unlisted";
export type ProductCategory = "jewelry" | "sneakers";
export type PaymentMethod = "cash" | "zelle" | "venmo" | "paypal" | "card" | "other";

export interface DbProduct {
  id: string;
  slug: string;
  name: string;
  cost_price: number | null;
  selling_price: number;
  shipping_cost: number;
  currency: string;
  category: ProductCategory;
  description: string;
  short_description: string;
  images: string[];
  specs: Record<string, string>;
  status: ProductStatus;
  quantity: number;
  featured: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface DbReceipt {
  id: string;
  file_url: string | null;
  vendor: string;
  purchase_date: string;
  total_amount: number;
  notes: string | null;
  created_at: string;
}

export interface DbReceiptItem {
  id: string;
  receipt_id: string;
  product_id: string | null;
  item_name: string;
  quantity: number;
  unit_price: number;
}

export interface DbSale {
  id: string;
  product_id: string;
  sale_price: number;
  buyer_name: string | null;
  buyer_contact: string | null;
  payment_method: PaymentMethod;
  sale_date: string;
  notes: string | null;
  created_at: string;
  product?: DbProduct;
}

export type ProductInsert = Omit<DbProduct, "id" | "created_at" | "updated_at">;
export type ProductUpdate = Partial<ProductInsert>;
export type ReceiptInsert = Omit<DbReceipt, "id" | "created_at">;
export type ReceiptItemInsert = Omit<DbReceiptItem, "id">;
export type SaleInsert = Omit<DbSale, "id" | "created_at" | "product">;

export interface DbApiKey {
  id: string;
  service: string;
  api_key: string;
  config: Record<string, string>;
  created_at: string;
  updated_at: string;
}
