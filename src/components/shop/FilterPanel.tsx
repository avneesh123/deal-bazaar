"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  ShopFilters,
  AvailableOptions,
  FilterMeta,
} from "@/hooks/useShopFilters";
import FilterSection from "./FilterSection";
import CheckboxFilter from "./filters/CheckboxFilter";
import SizeGridFilter from "./filters/SizeGridFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";

interface FilterPanelProps {
  open: boolean;
  onClose: () => void;
  filters: ShopFilters;
  availableOptions: AvailableOptions;
  meta: FilterMeta;
  onToggle: (
    dimension: "brand" | "size" | "condition" | "type" | "material",
    value: string
  ) => void;
  onPriceRange: (min: number | null, max: number | null) => void;
  onClearAll: () => void;
}

function FilterSections({
  filters,
  availableOptions,
  onToggle,
  onPriceRange,
}: Pick<
  FilterPanelProps,
  "filters" | "availableOptions" | "onToggle" | "onPriceRange"
>) {
  const showSizes =
    filters.category === "sneakers" && availableOptions.sizes.length > 0;
  const showTypes =
    filters.category === "jewelry" && availableOptions.types.length > 0;
  const showMaterials =
    filters.category === "jewelry" && availableOptions.materials.length > 0;

  return (
    <>
      {availableOptions.brands.length > 0 && (
        <FilterSection title="Brand" activeCount={filters.brands.length}>
          <CheckboxFilter
            options={availableOptions.brands}
            selected={filters.brands}
            onToggle={(v) => onToggle("brand", v)}
          />
        </FilterSection>
      )}
      {showSizes && (
        <FilterSection title="Size" activeCount={filters.sizes.length}>
          <SizeGridFilter
            options={availableOptions.sizes}
            selected={filters.sizes}
            onToggle={(v) => onToggle("size", v)}
          />
        </FilterSection>
      )}
      {availableOptions.conditions.length > 0 && (
        <FilterSection
          title="Condition"
          activeCount={filters.conditions.length}
        >
          <CheckboxFilter
            options={availableOptions.conditions}
            selected={filters.conditions}
            onToggle={(v) => onToggle("condition", v)}
          />
        </FilterSection>
      )}
      {showTypes && (
        <FilterSection title="Type" activeCount={filters.types.length}>
          <CheckboxFilter
            options={availableOptions.types}
            selected={filters.types}
            onToggle={(v) => onToggle("type", v)}
          />
        </FilterSection>
      )}
      {showMaterials && (
        <FilterSection
          title="Material"
          activeCount={filters.materials.length}
        >
          <CheckboxFilter
            options={availableOptions.materials}
            selected={filters.materials}
            onToggle={(v) => onToggle("material", v)}
          />
        </FilterSection>
      )}
      <FilterSection
        title="Price"
        activeCount={
          filters.priceMin !== null || filters.priceMax !== null ? 1 : 0
        }
      >
        <PriceRangeFilter
          min={availableOptions.priceRange.min}
          max={availableOptions.priceRange.max}
          currentMin={filters.priceMin}
          currentMax={filters.priceMax}
          onCommit={onPriceRange}
        />
      </FilterSection>
    </>
  );
}

export default function FilterPanel({
  open,
  onClose,
  filters,
  availableOptions,
  meta,
  onToggle,
  onPriceRange,
  onClearAll,
}: FilterPanelProps) {
  // Lock body scroll on mobile when drawer is open
  useEffect(() => {
    if (open) {
      const mq = window.matchMedia("(min-width: 1024px)");
      if (!mq.matches) {
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = "";
        };
      }
    }
  }, [open]);

  return (
    <>
      {/* Desktop sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 250, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="hidden lg:block flex-shrink-0 overflow-hidden"
          >
            <div className="w-[250px] pr-6">
              <div className="bg-dark-card border border-dark-border rounded-sm p-4 overflow-y-auto max-h-[calc(100vh-200px)] sticky top-4">
                <FilterSections
                  filters={filters}
                  availableOptions={availableOptions}
                  onToggle={onToggle}
                  onPriceRange={onPriceRange}
                />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-x-0 bottom-0 z-50 lg:hidden bg-dark-card border-t border-dark-border rounded-t-xl max-h-[85vh] flex flex-col"
            >
              {/* Drawer handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-dark-border" />
              </div>
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-dark-border">
                <h3 className="text-base font-semibold text-text-primary uppercase tracking-wider">
                  Filters
                </h3>
                <button
                  onClick={onClose}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-5 py-2">
                <FilterSections
                  filters={filters}
                  availableOptions={availableOptions}
                  onToggle={onToggle}
                  onPriceRange={onPriceRange}
                />
              </div>
              {/* Footer */}
              <div className="flex items-center gap-3 px-5 py-4 border-t border-dark-border">
                <button
                  onClick={onClearAll}
                  className="px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary border border-dark-border rounded-sm transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-gold text-dark font-semibold text-sm uppercase tracking-wider rounded-sm hover:bg-gold-light transition-colors"
                >
                  Show {meta.totalResults} Result
                  {meta.totalResults !== 1 ? "s" : ""}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
