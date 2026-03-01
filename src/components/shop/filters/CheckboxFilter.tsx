"use client";

import type { FilterOption } from "@/hooks/useShopFilters";

interface CheckboxFilterProps {
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
}

export default function CheckboxFilter({
  options,
  selected,
  onToggle,
}: CheckboxFilterProps) {
  if (options.length === 0) return null;

  return (
    <div className="space-y-1.5">
      {options.map((opt) => {
        const isSelected = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            onClick={() => onToggle(opt.value)}
            className="flex items-center gap-3 w-full px-2 py-1.5 rounded-sm text-left transition-colors duration-200 hover:bg-white/5 group"
          >
            <span
              className={`flex-shrink-0 w-4 h-4 rounded-sm border transition-all duration-200 flex items-center justify-center ${
                isSelected
                  ? "border-gold bg-gold/10"
                  : "border-dark-border group-hover:border-gold/50"
              }`}
            >
              {isSelected && (
                <svg
                  className="w-3 h-3 text-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
            <span
              className={`text-sm transition-colors duration-200 ${
                isSelected ? "text-gold" : "text-text-secondary group-hover:text-text-primary"
              }`}
            >
              {opt.value}
            </span>
            <span className="ml-auto text-xs text-text-secondary/50">
              {opt.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
