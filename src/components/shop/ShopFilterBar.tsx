"use client";

import type {
  ShopFilters,
  SortOption,
  FilterMeta,
} from "@/hooks/useShopFilters";
import SortDropdown from "./filters/SortDropdown";
import ActiveFilters from "./filters/ActiveFilters";

interface ShopFilterBarProps {
  filters: ShopFilters;
  meta: FilterMeta;
  sort: SortOption;
  onTogglePanel: () => void;
  panelOpen: boolean;
  onSort: (sort: SortOption) => void;
  onRemoveFilter: (
    dimension: "brand" | "size" | "condition" | "type" | "material" | "price",
    value: string
  ) => void;
  onClearAll: () => void;
}

export default function ShopFilterBar({
  filters,
  meta,
  sort,
  onTogglePanel,
  panelOpen,
  onSort,
  onRemoveFilter,
  onClearAll,
}: ShopFilterBarProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-4">
        {/* Left side: filter toggle + result count */}
        <div className="flex items-center gap-4">
          <button
            onClick={onTogglePanel}
            className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-sm transition-all duration-200 ${
              panelOpen
                ? "border-gold text-gold bg-gold/5"
                : "border-dark-border text-text-secondary hover:border-gold/50 hover:text-gold"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            <span>Filters</span>
            {meta.activeCount > 0 && (
              <span className="text-[10px] bg-gold text-dark font-bold px-1.5 py-0.5 rounded-sm min-w-[18px] text-center">
                {meta.activeCount}
              </span>
            )}
          </button>
          <span className="text-sm text-text-secondary hidden sm:inline">
            {meta.totalResults} product{meta.totalResults !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Right side: sort */}
        <SortDropdown value={sort} onChange={onSort} />
      </div>

      {/* Active filter pills */}
      {meta.activeCount > 0 && (
        <div className="mt-3">
          <ActiveFilters
            filters={filters}
            onRemove={onRemoveFilter}
            onClearAll={onClearAll}
          />
        </div>
      )}
    </div>
  );
}
