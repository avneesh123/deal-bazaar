"use client";

import { useEffect, useState } from "react";
import { products as staticProducts } from "@/data/products";
import { fetchFeaturedProducts } from "@/lib/products";
import type { Product } from "@/data/products";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/shop/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

// Build-time featured products — instant render, no loading spinner
const staticFeatured = staticProducts
  .filter((p) => p.featured)
  .slice(0, 6);

export default function FeaturedProducts() {
  // Stale-while-revalidate: show static data instantly, refresh in background
  const [featured, setFeatured] = useState<Product[]>(staticFeatured);

  useEffect(() => {
    fetchFeaturedProducts(6).then((fresh) => {
      setFeatured(fresh);
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <AnimatedSection key={product.slug} delay={i * 0.1}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
