"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { products } from "@/data/products";
import type { ProductCategory } from "@/data/products";
import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";

function ShopContentInner() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as ProductCategory | null;
  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <>
      <CategoryFilter />
      <ProductGrid products={filtered} />
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
