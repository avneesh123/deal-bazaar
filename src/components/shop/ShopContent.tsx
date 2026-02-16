"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { fetchAllProducts } from "@/lib/products";
import type { Product, ProductCategory } from "@/data/products";
import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";

function ShopContentInner() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as ProductCategory | null;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const sneakers = products.filter((p) => p.category === "sneakers");
  const jewelry = products.filter((p) => p.category === "jewelry");
  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  const counts = {
    all: products.length,
    sneakers: sneakers.length,
    jewelry: jewelry.length,
  };

  if (loading) {
    return (
      <>
        <CategoryFilter counts={{ all: 0, sneakers: 0, jewelry: 0 }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-dark-card rounded-sm border border-dark-border animate-pulse"
            >
              <div className="aspect-square bg-dark-secondary" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-dark-secondary rounded w-3/4" />
                <div className="h-4 bg-dark-secondary rounded w-1/2" />
                <div className="h-6 bg-dark-secondary rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <CategoryFilter counts={counts} />

      {!category ? (
        /* "All" view — grouped by category with section headers */
        <div className="space-y-16">
          {sneakers.length > 0 && (
            <div>
              <div className="flex items-baseline gap-3 mb-8">
                <h2 className="text-xl font-semibold text-white tracking-wide">
                  Sneakers
                </h2>
                <span className="text-text-secondary text-sm">
                  {sneakers.length} items
                </span>
              </div>
              <ProductGrid products={sneakers} />
            </div>
          )}
          {jewelry.length > 0 && (
            <div>
              <div className="flex items-baseline gap-3 mb-8">
                <h2 className="text-xl font-semibold text-white tracking-wide">
                  Jewelry
                </h2>
                <span className="text-text-secondary text-sm">
                  {jewelry.length} items
                </span>
              </div>
              <ProductGrid products={jewelry} />
            </div>
          )}
        </div>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </>
  );
}

export default function ShopContent() {
  return (
    <Suspense>
      <ShopContentInner />
    </Suspense>
  );
}
