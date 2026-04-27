"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    number: "01",
    name: "Sneakers",
    italic: "kicks",
    href: "/shop?category=sneakers",
    blurb:
      "Limited drops, deadstock pairs, and grail-tier silhouettes — every pair authenticated by hand before it ships.",
    spec: "Jordan · Nike · Adidas · NB · Yeezy",
    accent: "text-oxblood",
    swatch: "from-[#3a1f1f] to-[#1a0f0f]",
  },
  {
    number: "02",
    name: "Jewelry",
    italic: "jewels",
    href: "/shop?category=jewelry",
    blurb:
      "Cuban links, tennis chains, signet rings, and fine pieces — gold, diamond, and stones graded under loupe.",
    spec: "Cuban · Tennis · Solitaire · Signet",
    accent: "text-brass",
    swatch: "from-[#2a200d] to-[#13100a]",
  },
];

export default function CategoryHighlights() {
  return (
    <section className="py-20 md:py-32 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Section meta */}
        <div className="grid grid-cols-12 items-end gap-4 mb-12 md:mb-20">
          <div className="col-span-12 md:col-span-3 text-[10px] uppercase tracking-[0.32em] text-ink-soft">
            <div className="numeral text-ink mb-1">§ Two halves</div>
            of one cabinet
          </div>
          <h2 className="col-span-12 md:col-span-9 font-serif display-soft text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] text-ink">
            Choose your <em className="display-italic text-oxblood">side</em> —
            or take both.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="bg-paper"
            >
              <Link
                href={cat.href}
                className="group relative block aspect-[4/5] md:aspect-[5/6] overflow-hidden bg-paper-deep"
              >
                {/* Swatch panel — stands in for a photographic backdrop */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.swatch}`}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.18) 0%, transparent 60%)",
                  }}
                />

                {/* Number — top left */}
                <div className="absolute top-6 md:top-10 left-6 md:left-10 z-10">
                  <div className="numeral text-ink/70 text-[11px] tracking-[0.3em]">
                    N°
                  </div>
                  <div className="numeral text-ink text-7xl md:text-[8rem] leading-none mt-1 transition-transform duration-700 group-hover:-translate-y-1">
                    {cat.number}
                  </div>
                </div>

                {/* Spec — top right */}
                <div className="absolute top-6 md:top-10 right-6 md:right-10 z-10 text-right text-[10px] uppercase tracking-[0.28em] text-ink/55 max-w-[140px]">
                  {cat.spec}
                </div>

                {/* Big italic title — center-bottom */}
                <div className="absolute inset-x-6 md:inset-x-10 bottom-6 md:bottom-10 z-10">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-ink/55 mb-3">
                    Department
                  </div>
                  <h3 className="font-serif text-ink">
                    <span className="display-soft text-5xl md:text-7xl block leading-[0.95]">
                      {cat.name}
                    </span>
                    <em
                      className={`display-italic text-3xl md:text-5xl ${cat.accent} block leading-tight mt-1`}
                    >
                      &amp; the {cat.italic} we love.
                    </em>
                  </h3>
                  <p className="mt-5 text-ink/70 text-sm leading-relaxed max-w-md">
                    {cat.blurb}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-3 text-ink text-[11px] uppercase tracking-[0.28em]">
                    <span className="link-underline pb-0.5">Enter the floor</span>
                    <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                      →
                    </span>
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
