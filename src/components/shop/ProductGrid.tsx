"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

const PAGE_SIZE = 12;

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary text-lg">No products found.</p>
      </div>
    );
  }

  const shown = products.slice(0, visible);
  const hasMore = visible < products.length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {shown.map((product, i) => (
          <AnimatedSection key={product.slug} delay={Math.min(i, 11) * 0.05}>
            <ProductCard product={product} />
          </AnimatedSection>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="px-8 py-3 border border-gold/30 text-gold hover:bg-gold/10 rounded-sm text-sm uppercase tracking-wider transition-colors duration-300"
          >
            Load More ({products.length - visible} remaining)
          </button>
        </div>
      )}
    </>
  );
}
