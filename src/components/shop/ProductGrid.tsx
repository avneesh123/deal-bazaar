"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

const PAGE_SIZE = 12;
// Editorial pull-quote inserted between rows of the grid (Skechers'
// mid-grid UGC strip — but ours is a manifesto fragment, not Instagram).
const BREAK_AFTER = 6;

interface ProductGridProps {
  products: Product[];
  hasFilters?: boolean;
  onClearFilters?: () => void;
}

export default function ProductGrid({
  products,
  hasFilters,
  onClearFilters,
}: ProductGridProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  if (products.length === 0) {
    return (
      <div className="text-center py-20 border border-ink/10 bg-paper-deep/40">
        <p className="text-ink-soft text-[15px]">
          {hasFilters
            ? "No pieces match your filters."
            : "Nothing in the cabinet right now."}
        </p>
        {hasFilters && onClearFilters && (
          <button
            onClick={onClearFilters}
            className="mt-4 px-6 py-2.5 border border-ink/30 text-ink hover:bg-ink hover:text-paper text-[11px] uppercase tracking-[0.24em] transition-colors duration-300"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  const shown = products.slice(0, visible);
  const hasMore = visible < products.length;
  const showBreak = shown.length > BREAK_AFTER;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
        {shown.slice(0, BREAK_AFTER).map((product, i) => (
          <AnimatedSection key={product.slug} delay={Math.min(i, 5) * 0.05}>
            <ProductCard product={product} index={i} />
          </AnimatedSection>
        ))}
      </div>

      {showBreak && (
        <aside
          className="my-12 md:my-16 py-10 md:py-14 px-6 md:px-10 bg-ink text-paper relative overflow-hidden"
          aria-label="House manifesto"
        >
          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-12 md:col-span-2">
              <div className="numeral text-[10px] tracking-[0.3em] text-paper/55 mb-2">
                § Mid-floor
              </div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-paper/55">
                The thesis
              </div>
            </div>
            <p className="col-span-12 md:col-span-10 font-serif leading-[0.98]">
              <span className="display-soft text-[clamp(1.75rem,4vw,3.75rem)]">
                We don&rsquo;t sell what&rsquo;s
              </span>{" "}
              <em className="display-italic text-brass-light text-[clamp(1.75rem,4vw,3.75rem)]">
                available.
              </em>{" "}
              <span className="display-soft text-[clamp(1.75rem,4vw,3.75rem)]">
                We sell what&rsquo;s
              </span>{" "}
              <em className="display-italic text-brass-light text-[clamp(1.75rem,4vw,3.75rem)]">
                earned.
              </em>
            </p>
          </div>
        </aside>
      )}

      {showBreak && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
          {shown.slice(BREAK_AFTER).map((product, i) => (
            <AnimatedSection key={product.slug} delay={Math.min(i, 5) * 0.05}>
              <ProductCard product={product} index={i + BREAK_AFTER} />
            </AnimatedSection>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="px-8 py-4 bg-ink text-paper hover:bg-oxblood text-[11px] uppercase tracking-[0.28em] transition-colors duration-300"
          >
            Load {Math.min(PAGE_SIZE, products.length - visible)} more —{" "}
            <span className="text-paper/60">
              {products.length - visible} remaining
            </span>
          </button>
        </div>
      )}
    </>
  );
}
