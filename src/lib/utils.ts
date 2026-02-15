import { products, type Product, type ProductCategory } from "@/data/products";

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
}

export function getWhatsAppUrl(phoneNumber: string, productName?: string): string {
  const text = productName
    ? `Hi, I'm interested in: ${productName}. Can you share more details?`
    : "Hi, I'd like to know more about your products.";
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}

export function getProductsByCategory(category?: ProductCategory): Product[] {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}

export const WHATSAPP_NUMBER = "18609609600";
export const BRAND_EMAIL = "hello@dealbazaar.ai";
