"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pt-8 md:pt-12 pb-20 md:pb-28 overflow-hidden">
      {/* Decorative corner ornaments — set the editorial tone */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-6 right-6 md:top-10 md:right-12 text-[10px] uppercase tracking-[0.32em] text-ink-mute z-20 text-right"
      >
        <div className="numeral mb-1">N° 04</div>
        <div>Spring / Summer 2026</div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-12 left-6 md:left-12 text-[10px] uppercase tracking-[0.32em] text-ink-mute z-20 hidden md:block"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        Deal Bazaar — Authenticated · Curated · Delivered
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Top meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-12 items-end gap-4 mb-10 md:mb-16"
        >
          <div className="col-span-1 md:col-span-3 text-[10px] uppercase tracking-[0.32em] text-ink-soft">
            <div className="numeral text-ink mb-1">— Vol. 04</div>
            The Authentication Issue
          </div>
          <div className="col-span-1 md:col-span-6 text-[10px] uppercase tracking-[0.32em] text-ink-soft md:text-center">
            New York · Mumbai · Worldwide
          </div>
          <div className="col-span-2 md:col-span-3 text-[10px] uppercase tracking-[0.32em] text-ink-soft md:text-right">
            <span className="numeral text-ink">{new Date().getFullYear()}</span>{" "}
            — Issue rotates monthly
          </div>
        </motion.div>

        {/* Hero rule */}
        <div className="editorial-rule mb-10 md:mb-16" />

        {/* Editorial headline — asymmetric, mixed serif-italic */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end">
          <div className="md:col-span-9">
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
              className="font-serif text-ink leading-[0.92]"
            >
              <span className="block display-soft text-[16vw] md:text-[10.5vw] lg:text-[9vw]">
                Where the
              </span>
              <span className="block">
                <em className="display-italic text-oxblood text-[18vw] md:text-[12vw] lg:text-[10.5vw] leading-[0.85]">
                  street
                </em>
                <span className="display-soft text-[16vw] md:text-[10.5vw] lg:text-[9vw] ml-3 md:ml-6">
                  meets the
                </span>
              </span>
              <span className="block">
                <em className="display-italic text-brass text-[18vw] md:text-[12vw] lg:text-[10.5vw] leading-[0.85]">
                  vault
                </em>
                <span className="display-soft text-[16vw] md:text-[10.5vw] lg:text-[9vw]">
                  .
                </span>
              </span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="md:col-span-3 md:pb-4"
          >
            <p className="text-ink-soft text-[15px] leading-[1.55] max-w-xs">
              An editorial marketplace for{" "}
              <span className="text-ink">authenticated sneakers</span> and{" "}
              <span className="text-ink">fine jewelry</span> — sourced by hand,
              shipped with care, never faked.
            </p>
          </motion.div>
        </div>

        {/* CTA row + featured spec strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-end"
        >
          <div className="md:col-span-7 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-oxblood transition-colors duration-300"
            >
              Enter the archive
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-3 py-4 text-[11px] uppercase tracking-[0.28em] text-ink link-underline"
            >
              Read the journal
            </Link>
          </div>

          {/* Three-up spec strip — Nike does this for headline drops */}
          <div className="md:col-span-5 grid grid-cols-3 gap-4 border-t border-ink/15 pt-4">
            <Stat label="Authenticated" value="100%" />
            <Stat label="In Rotation" value="120+" />
            <Stat label="Brands Carried" value="40+" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="numeral text-2xl md:text-3xl text-ink leading-none">
        {value}
      </div>
      <div className="mt-1.5 text-[9px] uppercase tracking-[0.28em] text-ink-mute">
        {label}
      </div>
    </div>
  );
}
