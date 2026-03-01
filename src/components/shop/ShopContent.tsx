"use client";

import { Suspense, useEffect, useState } from "react";
import { products as staticProducts } from "@/data/products";
import { fetchAllProducts } from "@/lib/products";
import type { Product } from "@/data/products";
import { useShopFilters } from "@/hooks/useShopFilters";
import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";
import ShopFilterBar from "./ShopFilterBar";
import FilterPanel from "./FilterPanel";

function ShopContentInner() {
  // Stale-while-revalidate: show static data instantly, refresh in background
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    fetchAllProducts().then((fresh) => {
      setProducts(fresh);
    });
  }, []);

  const {
    filters,
    filtered,
    meta,
    availableOptions,
    toggleFilter,
    setSort,
    setPriceRange,
    clearFilter,
    clearAll,
  } = useShopFilters(products);

  const sneakers = products.filter((p) => p.category === "sneakers");
  const jewelry = products.filter((p) => p.category === "jewelry");

  const counts = {
    all: products.length,
    sneakers: sneakers.length,
    jewelry: jewelry.length,
  };

  const handleRemoveFilter = (
    dimension: "brand" | "size" | "condition" | "type" | "material" | "price",
    value: string
  ) => {
    if (dimension === "price") {
      clearFilter("price");
    } else {
      toggleFilter(dimension, value);
    }
  };

  // Show grouped "All" view only when no filters are active and no category selected
  const showGroupedView = !filters.category && !meta.hasFilters;

  return (
    <>
      <CategoryFilter counts={counts} />
      <ShopFilterBar
        filters={filters}
        meta={meta}
        sort={filters.sort}
        onTogglePanel={() => setPanelOpen(!panelOpen)}
        panelOpen={panelOpen}
        onSort={setSort}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={clearAll}
      />

      <div className="flex gap-0">
        <FilterPanel
          open={panelOpen}
          onClose={() => setPanelOpen(false)}
          filters={filters}
          availableOptions={availableOptions}
          meta={meta}
          onToggle={toggleFilter}
          onPriceRange={setPriceRange}
          onClearAll={clearAll}
        />

        <div className="flex-1 min-w-0">
          {showGroupedView ? (
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
            <ProductGrid
              key={JSON.stringify(filters)}
              products={filtered}
              hasFilters={meta.hasFilters}
              onClearFilters={clearAll}
            />
          )}
        </div>
      </div>
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
