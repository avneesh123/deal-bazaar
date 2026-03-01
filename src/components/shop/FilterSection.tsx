"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSectionProps {
  title: string;
  activeCount?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function FilterSection({
  title,
  activeCount = 0,
  defaultOpen = true,
  children,
}: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-dark-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center justify-between w-full py-4 px-1 group"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm uppercase tracking-wider font-medium text-text-primary">
            {title}
          </span>
          {activeCount > 0 && (
            <span className="text-[10px] bg-gold text-dark font-bold px-1.5 py-0.5 rounded-sm min-w-[18px] text-center">
              {activeCount}
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 px-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
