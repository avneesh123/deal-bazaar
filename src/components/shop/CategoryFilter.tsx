"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface CategoryFilterProps {
  counts: {
    all: number;
    sneakers: number;
    jewelry: number;
  };
}

// Audience-shortcut chip row, Skechers style: top-level category chips +
// a separator + condition / price quick filters. Each chip is a link that
// rewrites the query string so it remains shareable + back-button friendly.
const CATEGORY_CHIPS = [
  { label: "All", category: "" as const, key: "all" as const },
  { label: "Sneakers", category: "sneakers" as const, key: "sneakers" as const },
  { label: "Jewelry", category: "jewelry" as const, key: "jewelry" as const },
];

const QUICK_CHIPS = [
  { label: "Brand New", param: "conditions", value: "Brand New" },
  { label: "Pre-Owned", param: "conditions", value: "Pre-Owned" },
  { label: "Under $100", param: "priceMax", value: "100" },
];

export default function CategoryFilter({ counts }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const activeConditions = (searchParams.get("conditions") || "")
    .split(",")
    .filter(Boolean);
  const activePriceMax = searchParams.get("priceMax");

  function buildHref(key: string, value: string): string {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "category") {
      if (value) params.set("category", value);
      else params.delete("category");
    } else if (key === "conditions") {
      // toggle within the comma-separated list
      const set = new Set(activeConditions);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      if (set.size) params.set("conditions", [...set].join(","));
      else params.delete("conditions");
    } else if (key === "priceMax") {
      if (params.get("priceMax") === value) params.delete("priceMax");
      else params.set("priceMax", value);
    }
    const qs = params.toString();
    return `/shop${qs ? `?${qs}` : ""}`;
  }

  function isQuickActive(param: string, value: string): boolean {
    if (param === "conditions") return activeConditions.includes(value);
    if (param === "priceMax") return activePriceMax === value;
    return false;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      {CATEGORY_CHIPS.map((c) => {
        const isActive = c.category === activeCategory;
        const count = counts[c.key];
        return (
          <Link
            key={c.label}
            href={buildHref("category", c.category)}
            className={`text-[11px] uppercase tracking-[0.24em] px-4 py-2 border transition-colors duration-200 ${
              isActive
                ? "bg-ink text-paper border-ink"
                : "border-ink/25 text-ink hover:border-ink hover:bg-ink/5"
            }`}
          >
            {c.label}
            {count > 0 && (
              <span
                className={`ml-2 numeral text-[10px] tabular-nums ${
                  isActive ? "text-paper/70" : "text-ink-mute"
                }`}
              >
                {count}
              </span>
            )}
          </Link>
        );
      })}

      <span aria-hidden className="mx-1 h-5 w-px bg-ink/20" />

      {QUICK_CHIPS.map((c) => {
        const isActive = isQuickActive(c.param, c.value);
        return (
          <Link
            key={c.label}
            href={buildHref(c.param, c.value)}
            className={`text-[11px] uppercase tracking-[0.24em] px-4 py-2 border transition-colors duration-200 ${
              isActive
                ? "bg-oxblood text-paper border-oxblood"
                : "border-ink/25 text-ink hover:border-oxblood hover:text-oxblood"
            }`}
          >
            {c.label}
          </Link>
        );
      })}
    </div>
  );
}
