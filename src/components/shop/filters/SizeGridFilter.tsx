"use client";

import type { FilterOption } from "@/hooks/useShopFilters";

interface SizeGridFilterProps {
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
}

export default function SizeGridFilter({
  options,
  selected,
  onToggle,
}: SizeGridFilterProps) {
  if (options.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isSelected = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            onClick={() => onToggle(opt.value)}
            className={`px-3 py-1.5 text-xs uppercase tracking-wide rounded-sm border transition-all duration-200 ${
              isSelected
                ? "border-gold bg-gold/15 text-gold"
                : "border-dark-border text-text-secondary hover:border-gold/50 hover:text-gold"
            }`}
          >
            {opt.value}
          </button>
        );
      })}
    </div>
  );
}
