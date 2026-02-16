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

const filters = [
  { label: "All", value: "", key: "all" as const },
  { label: "Sneakers", value: "sneakers", key: "sneakers" as const },
  { label: "Jewelry", value: "jewelry", key: "jewelry" as const },
];

export default function CategoryFilter({ counts }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "";

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {filters.map((f) => {
        const isActive = f.value === active;
        const count = counts[f.key];
        return (
          <Link
            key={f.value}
            href={f.value ? `/shop?category=${f.value}` : "/shop"}
            className={`px-6 py-2.5 text-sm uppercase tracking-widest rounded-sm border transition-all duration-300 ${
              isActive
                ? "bg-gold text-dark border-gold font-semibold"
                : "border-dark-border text-text-secondary hover:border-gold/50 hover:text-gold"
            }`}
          >
            {f.label}
            {count > 0 && (
              <span
                className={`ml-2 text-xs ${
                  isActive ? "text-dark/70" : "text-text-secondary/50"
                }`}
              >
                {count}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
