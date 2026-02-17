import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const discount =
    product.retailPrice && product.price < product.retailPrice
      ? Math.round((1 - product.price / product.retailPrice) * 100)
      : 0;

  return (
    <div>
      <span className="text-gold uppercase tracking-widest text-sm">
        {product.category}
      </span>

      <h1 className="font-serif text-3xl md:text-4xl text-text-primary mt-2 mb-4">
        {product.name}
      </h1>

      <div className="mb-6">
        <div className="flex items-center gap-3">
          <p className="text-gold text-3xl font-semibold">
            {formatPrice(product.price, product.currency)}
          </p>
          {discount > 0 && product.retailPrice && (
            <>
              <span className="text-text-secondary/50 text-xl line-through">
                {formatPrice(product.retailPrice, product.currency)}
              </span>
              <span className="bg-emerald-500 text-white text-sm font-bold px-2.5 py-0.5 rounded-sm">
                {discount}% OFF
              </span>
            </>
          )}
        </div>
        {discount > 0 && (
          <p className="text-text-secondary text-sm mt-1">
            Retail price
          </p>
        )}
      </div>

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

      {/* Price Comparison */}
      {product.priceSources && product.priceSources.length > 0 && (
        <div className="border-t border-dark-border pt-6 mt-6">
          <h3 className="text-text-primary font-semibold uppercase tracking-widest text-sm mb-4">
            Price Comparison
          </h3>
          <div className="bg-dark-secondary/50 rounded-lg border border-dark-border overflow-hidden">
            {product.priceSources.map((source, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-3 ${
                  i > 0 ? "border-t border-dark-border" : ""
                }`}
              >
                <span className="text-text-primary font-medium text-sm">
                  {source.name}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-text-secondary text-sm">
                    {source.price
                      ? formatPrice(source.price, product.currency)
                      : "—"}
                  </span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold text-sm hover:text-gold-light transition-colors"
                  >
                    {source.price ? `View on ${source.name}` : "Check Price"} &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
