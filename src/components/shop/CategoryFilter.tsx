"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const filters = [
  { label: "All", value: "" },
  { label: "Jewelry", value: "jewelry" },
  { label: "Sneakers", value: "sneakers" },
];

export default function CategoryFilter() {
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "";

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {filters.map((f) => {
        const isActive = f.value === active;
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
          </Link>
        );
      })}
    </div>
  );
}
