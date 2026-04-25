import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { formatPrice, thumbnailUrl } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function isNew(product: Product): boolean {
  if (!product.createdAt) return false;
  const days =
    (Date.now() - new Date(product.createdAt).getTime()) / 86_400_000;
  return days <= 14;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const size = product.specs?.Size;
  const productIsNew = isNew(product);
  const retailPrice =
    product.retailPrice ??
    (product.priceSources
      ?.map((s) => s.price)
      .filter((p): p is number => p !== null)
      .sort((a, b) => b - a)[0] ?? null);
  const discount =
    retailPrice && product.price < retailPrice
      ? Math.round((1 - product.price / retailPrice) * 100)
      : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative block"
    >
      {/* Editorial number — sits above the card, slides on hover */}
      {typeof index === "number" && (
        <div className="numeral text-[11px] tracking-[0.3em] text-ink-mute mb-3 flex items-baseline gap-2">
          <span>N° {String(index + 1).padStart(3, "0")}</span>
          <span className="flex-1 h-px bg-ink/15 group-hover:bg-oxblood transition-colors duration-500" />
          {productIsNew && (
            <span className="text-oxblood uppercase tracking-[0.3em]">
              · New in
            </span>
          )}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep border border-ink/10">
        {product.images[0] && !product.images[0].includes("placeholder") ? (
          <Image
            src={thumbnailUrl(product.images[0])}
            alt={product.name}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif display-italic text-3xl text-ink-mute/40 text-center px-6">
              {product.name}
            </span>
          </div>
        )}

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {discount > 0 && (
            <span className="bg-oxblood text-paper text-[10px] font-medium uppercase tracking-[0.2em] px-2.5 py-1">
              −{discount}%
            </span>
          )}
          <span className="bg-paper/85 text-ink text-[10px] uppercase tracking-[0.22em] px-2.5 py-1 backdrop-blur-sm">
            {product.specs?.Condition || product.category}
          </span>
        </div>

        {size && (
          <span className="absolute top-3 right-3 numeral text-[10px] tracking-wider bg-paper/85 text-ink px-2.5 py-1 backdrop-blur-sm">
            US {size}
          </span>
        )}

        {/* Hover scrim — brand watermark fades in */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.28em] text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          View piece →
        </div>
      </div>

      {/* Info — magazine-style stacked label rows */}
      <div className="pt-4 pb-1">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h3 className="font-serif display-soft text-xl md:text-[22px] leading-tight text-ink line-clamp-1 group-hover:text-oxblood transition-colors duration-300">
            {product.name}
          </h3>
          <span className="numeral text-ink whitespace-nowrap text-[15px]">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.24em] text-ink-soft">
          <span className="line-clamp-1">
            {product.specs?.Brand || product.shortDescription}
          </span>
          {discount > 0 && retailPrice && (
            <span className="text-ink-mute line-through whitespace-nowrap numeral text-[11px] tracking-normal normal-case">
              {formatPrice(retailPrice, product.currency)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
