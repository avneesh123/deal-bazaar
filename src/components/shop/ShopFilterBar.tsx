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
    <div className="mb-8 border-y border-ink/15 py-3">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Left: Filter toggle + result count + clear all */}
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={onTogglePanel}
            className={`flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.24em] border transition-colors duration-200 ${
              panelOpen
                ? "bg-ink text-paper border-ink"
                : "border-ink/25 text-ink hover:border-ink hover:bg-ink/5"
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
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
              <span
                className={`numeral text-[10px] px-1.5 py-0.5 tabular-nums ${
                  panelOpen ? "bg-paper text-ink" : "bg-oxblood text-paper"
                }`}
              >
                {meta.activeCount}
              </span>
            )}
          </button>

          <span className="numeral text-[11px] tracking-wider text-ink-soft">
            {meta.totalResults} {meta.totalResults === 1 ? "piece" : "pieces"}
          </span>

          {meta.activeCount > 0 && (
            <button
              onClick={onClearAll}
              className="text-[11px] uppercase tracking-[0.24em] text-oxblood link-underline pb-0.5"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Right: sort */}
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
