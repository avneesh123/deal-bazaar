"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useCallback } from "react";
import type { Product, ProductCategory } from "@/data/products";

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "discount";

export interface ShopFilters {
  category: ProductCategory | null;
  brands: string[];
  sizes: string[];
  conditions: string[];
  types: string[];
  materials: string[];
  priceMin: number | null;
  priceMax: number | null;
  sort: SortOption;
}

export interface FilterOption {
  value: string;
  count: number;
}

export interface AvailableOptions {
  brands: FilterOption[];
  sizes: FilterOption[];
  conditions: FilterOption[];
  types: FilterOption[];
  materials: FilterOption[];
  priceRange: { min: number; max: number };
}

export interface FilterMeta {
  activeCount: number;
  hasFilters: boolean;
  totalResults: number;
}

function parseCommaSeparated(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function getRetailPrice(p: Product): number | null {
  return (
    p.retailPrice ??
    (p.priceSources
      ?.map((s) => s.price)
      .filter((pr): pr is number => pr !== null)
      .sort((a, b) => b - a)[0] ?? null)
  );
}

function getDiscount(p: Product): number {
  const retail = getRetailPrice(p);
  if (!retail || p.price >= retail) return 0;
  return Math.round((1 - p.price / retail) * 100);
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => {
        const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return db - da;
      });
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "discount":
      return sorted.sort((a, b) => getDiscount(b) - getDiscount(a));
    default:
      return sorted;
  }
}

function countByField(
  products: Product[],
  accessor: (p: Product) => string | undefined
): FilterOption[] {
  const counts = new Map<string, number>();
  for (const p of products) {
    const val = accessor(p);
    if (val) counts.set(val, (counts.get(val) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value));
}

function parseSizeNum(s: string): number {
  const match = s.match(/^[\d.]+/);
  return match ? parseFloat(match[0]) : Infinity;
}

export function useShopFilters(allProducts: Product[]) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: ShopFilters = useMemo(
    () => ({
      category: searchParams.get("category") as ProductCategory | null,
      brands: parseCommaSeparated(searchParams.get("brand")),
      sizes: parseCommaSeparated(searchParams.get("size")),
      conditions: parseCommaSeparated(searchParams.get("condition")),
      types: parseCommaSeparated(searchParams.get("type")),
      materials: parseCommaSeparated(searchParams.get("material")),
      priceMin: searchParams.get("priceMin")
        ? Number(searchParams.get("priceMin"))
        : null,
      priceMax: searchParams.get("priceMax")
        ? Number(searchParams.get("priceMax"))
        : null,
      sort: (searchParams.get("sort") as SortOption) || "newest",
    }),
    [searchParams]
  );

  // Products filtered by category (base set for computing available options)
  const categoryProducts = useMemo(() => {
    if (!filters.category) return allProducts;
    return allProducts.filter((p) => p.category === filters.category);
  }, [allProducts, filters.category]);

  // Available options computed from category-level products
  const availableOptions: AvailableOptions = useMemo(() => {
    const brands = countByField(categoryProducts, (p) => p.specs?.Brand);
    const sizes = countByField(categoryProducts, (p) => p.specs?.Size).sort(
      (a, b) => parseSizeNum(a.value) - parseSizeNum(b.value)
    );
    const conditions = countByField(
      categoryProducts,
      (p) => p.specs?.Condition
    );
    const types = countByField(categoryProducts, (p) => p.specs?.Type);
    const materials = countByField(categoryProducts, (p) => p.specs?.Material);

    const prices = categoryProducts.map((p) => p.price);
    const priceRange = {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 1000,
    };

    return { brands, sizes, conditions, types, materials, priceRange };
  }, [categoryProducts]);

  // Apply all filters
  const filtered = useMemo(() => {
    let result = categoryProducts;

    if (filters.brands.length > 0) {
      result = result.filter((p) =>
        filters.brands.includes(p.specs?.Brand || "")
      );
    }
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        filters.sizes.includes(p.specs?.Size || "")
      );
    }
    if (filters.conditions.length > 0) {
      result = result.filter((p) =>
        filters.conditions.includes(p.specs?.Condition || "")
      );
    }
    if (filters.types.length > 0) {
      result = result.filter((p) =>
        filters.types.includes(p.specs?.Type || "")
      );
    }
    if (filters.materials.length > 0) {
      result = result.filter((p) =>
        filters.materials.includes(p.specs?.Material || "")
      );
    }
    if (filters.priceMin !== null) {
      result = result.filter((p) => p.price >= filters.priceMin!);
    }
    if (filters.priceMax !== null) {
      result = result.filter((p) => p.price <= filters.priceMax!);
    }

    return sortProducts(result, filters.sort);
  }, [categoryProducts, filters]);

  const meta: FilterMeta = useMemo(() => {
    let activeCount = 0;
    if (filters.brands.length) activeCount += filters.brands.length;
    if (filters.sizes.length) activeCount += filters.sizes.length;
    if (filters.conditions.length) activeCount += filters.conditions.length;
    if (filters.types.length) activeCount += filters.types.length;
    if (filters.materials.length) activeCount += filters.materials.length;
    if (filters.priceMin !== null || filters.priceMax !== null) activeCount += 1;
    return {
      activeCount,
      hasFilters: activeCount > 0 || filters.sort !== "newest",
      totalResults: filtered.length,
    };
  }, [filters, filtered.length]);

  const updateURL = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      // Remove default sort from URL
      if (params.get("sort") === "newest") params.delete("sort");
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const toggleFilter = useCallback(
    (
      dimension: "brand" | "size" | "condition" | "type" | "material",
      value: string
    ) => {
      const current = filters[`${dimension}s` as keyof ShopFilters] as string[];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updateURL({ [dimension]: next.length ? next.join(",") : null });
    },
    [filters, updateURL]
  );

  const setSort = useCallback(
    (sort: SortOption) => {
      updateURL({ sort: sort === "newest" ? null : sort });
    },
    [updateURL]
  );

  const setPriceRange = useCallback(
    (min: number | null, max: number | null) => {
      const { min: absMin, max: absMax } = availableOptions.priceRange;
      updateURL({
        priceMin: min !== null && min > absMin ? String(min) : null,
        priceMax: max !== null && max < absMax ? String(max) : null,
      });
    },
    [updateURL, availableOptions.priceRange]
  );

  const clearFilter = useCallback(
    (dimension: "brand" | "size" | "condition" | "type" | "material" | "price") => {
      if (dimension === "price") {
        updateURL({ priceMin: null, priceMax: null });
      } else {
        updateURL({ [dimension]: null });
      }
    },
    [updateURL]
  );

  const clearAll = useCallback(() => {
    updateURL({
      brand: null,
      size: null,
      condition: null,
      type: null,
      material: null,
      priceMin: null,
      priceMax: null,
      sort: null,
    });
  }, [updateURL]);

  return {
    filters,
    filtered,
    meta,
    availableOptions,
    toggleFilter,
    setSort,
    setPriceRange,
    clearFilter,
    clearAll,
  };
}
