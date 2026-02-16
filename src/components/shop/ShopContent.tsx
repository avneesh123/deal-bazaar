"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { products as staticProducts } from "@/data/products";
import { fetchAllProducts } from "@/lib/products";
import type { Product, ProductCategory } from "@/data/products";
import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";

function ShopContentInner() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as ProductCategory | null;

  // Stale-while-revalidate: show static data instantly, refresh in background
  const [products, setProducts] = useState<Product[]>(staticProducts);

  useEffect(() => {
    fetchAllProducts().then((fresh) => {
      setProducts(fresh);
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
