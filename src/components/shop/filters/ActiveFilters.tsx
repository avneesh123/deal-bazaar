"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ShopFilters } from "@/hooks/useShopFilters";

interface ActiveFilter {
  dimension: "brand" | "size" | "condition" | "type" | "material" | "price";
  label: string;
  value: string;
}

interface ActiveFiltersProps {
  filters: ShopFilters;
  onRemove: (dimension: ActiveFilter["dimension"], value: string) => void;
  onClearAll: () => void;
}

function buildActiveFilters(filters: ShopFilters): ActiveFilter[] {
  const active: ActiveFilter[] = [];
  for (const b of filters.brands) {
    active.push({ dimension: "brand", label: b, value: b });
  }
  for (const s of filters.sizes) {
    active.push({ dimension: "size", label: `Size ${s}`, value: s });
  }
  for (const c of filters.conditions) {
    active.push({ dimension: "condition", label: c, value: c });
  }
  for (const t of filters.types) {
    active.push({ dimension: "type", label: t, value: t });
  }
  for (const m of filters.materials) {
    active.push({ dimension: "material", label: m, value: m });
  }
  if (filters.priceMin !== null || filters.priceMax !== null) {
    const min = filters.priceMin ?? 0;
    const max = filters.priceMax ?? "∞";
    active.push({
      dimension: "price",
      label: `$${min} — $${max}`,
      value: "price",
    });
  }
  return active;
}

export default function ActiveFilters({
  filters,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) {
  const active = buildActiveFilters(filters);
  if (active.length === 0) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
      <AnimatePresence mode="popLayout">
        {active.map((f) => (
          <motion.button
            key={`${f.dimension}-${f.value}`}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={() => onRemove(f.dimension, f.value)}
            className="flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-wide rounded-sm whitespace-nowrap hover:bg-gold/20 transition-colors duration-200"
          >
            {f.label}
            <svg
              className="w-3 h-3"
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
          </motion.button>
        ))}
      </AnimatePresence>
      <button
        onClick={onClearAll}
        className="text-xs text-text-secondary hover:text-gold transition-colors duration-200 whitespace-nowrap ml-1"
      >
        Clear all
      </button>
    </div>
  );
}
