import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
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
    <div>
      <span className="text-[10px] uppercase tracking-[0.32em] text-ink-soft">
        {product.category}
      </span>

      <h1 className="font-serif display-soft text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink mt-2 mb-5">
        {product.name}
      </h1>

      <div className="mb-7">
        <div className="flex items-baseline gap-3">
          <p className="numeral text-3xl md:text-4xl text-ink leading-none">
            {formatPrice(product.price, product.currency)}
          </p>
          {discount > 0 && (
            <span className="text-oxblood text-sm font-medium uppercase tracking-[0.22em]">
              −{discount}%
            </span>
          )}
        </div>
        {discount > 0 && retailPrice && (
          <p className="text-ink-mute text-sm mt-2">
            reg.{" "}
            <span className="line-through numeral">
              {formatPrice(retailPrice, product.currency)}
            </span>
          </p>
        )}
        <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-oxblood/85 flex items-center gap-1.5">
          <span aria-hidden className="text-brass">
            ✦
          </span>
          Bench-checked &amp; ships within 48h
        </p>
      </div>

      <p className="text-ink-soft text-[15px] leading-relaxed mb-8">
        {product.description}
      </p>

      {/* Specs */}
      {Object.keys(product.specs).length > 0 && (
        <div className="border-t border-ink/15 pt-6">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="numeral text-[10px] tracking-[0.3em] text-ink-mute">
              §
            </span>
            <h3 className="text-[10px] uppercase tracking-[0.32em] text-ink">
              Specifications
            </h3>
            <span className="flex-1 h-px bg-ink/15" />
          </div>
          <dl className="space-y-2.5">
            {Object.entries(product.specs).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between text-sm gap-4 pb-2.5 border-b border-ink/10 last:border-b-0"
              >
                <dt className="text-ink-soft uppercase tracking-[0.18em] text-[11px]">
                  {key}
                </dt>
                <dd className="text-ink font-medium text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Price Comparison */}
      {product.priceSources && product.priceSources.length > 0 && (
        <div className="border-t border-ink/15 pt-6 mt-8">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="numeral text-[10px] tracking-[0.3em] text-ink-mute">
              §
            </span>
            <h3 className="text-[10px] uppercase tracking-[0.32em] text-ink">
              Compare retail
            </h3>
            <span className="flex-1 h-px bg-ink/15" />
          </div>
          <div className="bg-paper-deep/40 border border-ink/10 overflow-hidden">
            {product.priceSources.map((source, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-3 ${
                  i > 0 ? "border-t border-ink/10" : ""
                }`}
              >
                <span className="text-ink font-medium text-sm">
                  {source.name}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-ink-soft text-sm numeral">
                    {source.price
                      ? formatPrice(source.price, product.currency)
                      : "—"}
                  </span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-oxblood text-[10px] uppercase tracking-[0.22em] hover:text-oxblood-deep link-underline pb-0.5"
                  >
                    {source.price ? `View on ${source.name}` : "Check price"} →
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
