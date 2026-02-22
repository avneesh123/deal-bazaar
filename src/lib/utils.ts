export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
}

export function getWhatsAppUrl(phoneNumber: string, productName?: string): string {
  const text = productName
    ? `Hi, I'm interested in: ${productName}. Can you share more details?`
    : "Hi, I'd like to know more about your products.";
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_NUMBER = "18609609600";
export const BRAND_EMAIL = "hello@dealbazaar.ai";

/**
 * Convert a Supabase storage URL to a resized thumbnail URL.
 * Uses Supabase Image Transforms to serve smaller images.
 */
export function thumbnailUrl(url: string, width = 400): string {
  if (!url.includes("supabase.co/storage/v1/object/public/")) return url;
  return url.replace(
    "/storage/v1/object/public/",
    "/storage/v1/render/image/public/"
  ) + `?width=${width}&resize=contain&quality=75`;
}
