"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Jewelry",
    href: "/shop?category=jewelry",
    description: "Chains, bracelets, rings & more",
    icon: (
      <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Sneakers",
    href: "/shop?category=sneakers",
    description: "Runners, high-tops & exclusives",
    icon: (
      <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function CategoryHighlights() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Link
                href={cat.href}
                className="group block relative overflow-hidden rounded-sm bg-dark-card border border-dark-border hover:border-gold/30 transition-all duration-500 p-12 md:p-16"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                    {cat.icon}
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-text-primary mb-3 group-hover:text-gold transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-text-secondary text-lg mb-6">{cat.description}</p>
                  <span className="inline-flex items-center gap-2 text-gold text-sm uppercase tracking-widest">
                    Explore
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
