import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const size = product.specs?.Size;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-dark-card rounded-sm border border-dark-border hover:border-gold/30 overflow-hidden transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-dark-secondary">
        {product.images[0] && !product.images[0].includes("placeholder") ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-text-secondary/20 text-xs uppercase tracking-widest text-center px-4">
              {product.name}
            </span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Condition badge */}
        <span className="absolute top-3 left-3 bg-dark/80 text-gold text-xs uppercase tracking-wider px-3 py-1 rounded-sm backdrop-blur-sm">
          {product.specs?.Condition || product.category}
        </span>
        {/* Size badge */}
        {size && (
          <span className="absolute top-3 right-3 bg-dark/80 text-text-primary text-xs px-3 py-1 rounded-sm backdrop-blur-sm">
            Size {size}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-text-primary font-medium text-lg mb-1 group-hover:text-gold transition-colors duration-300 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-text-secondary text-sm mb-3 line-clamp-1">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-gold font-semibold text-lg">
            {formatPrice(product.price, product.currency)}
          </p>
          <span className="text-text-secondary/50 text-xs uppercase">
            {product.specs?.Brand}
          </span>
        </div>
      </div>
    </Link>
  );
}
