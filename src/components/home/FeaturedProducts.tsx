"use client";

import { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "@/lib/products";
import type { Product } from "@/data/products";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/shop/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FeaturedProducts() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts(6).then((data) => {
      setFeatured(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-20 px-4 bg-dark-secondary">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionHeading
            title="Featured Picks"
            subtitle="Hand-selected pieces from our latest collection"
          />
        </AnimatedSection>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-dark-card rounded-sm border border-dark-border animate-pulse"
              >
                <div className="aspect-square bg-dark" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-dark rounded w-3/4" />
                  <div className="h-4 bg-dark rounded w-1/2" />
                  <div className="h-6 bg-dark rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product, i) => (
              <AnimatedSection key={product.slug} delay={i * 0.1}>
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
