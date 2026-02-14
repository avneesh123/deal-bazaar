import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div>
      <span className="text-gold uppercase tracking-widest text-sm">
        {product.category}
      </span>

      <h1 className="font-serif text-3xl md:text-4xl text-text-primary mt-2 mb-4">
        {product.name}
      </h1>

      <p className="text-gold text-3xl font-semibold mb-6">
        {formatPrice(product.price, product.currency)}
      </p>

      <p className="text-text-secondary leading-relaxed mb-8">
        {product.description}
      </p>

      {/* Specs */}
      {Object.keys(product.specs).length > 0 && (
        <div className="border-t border-dark-border pt-6">
          <h3 className="text-text-primary font-semibold uppercase tracking-widest text-sm mb-4">
            Specifications
          </h3>
          <dl className="space-y-3">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <dt className="text-text-secondary">{key}</dt>
                <dd className="text-text-primary">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
