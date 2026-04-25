"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const QUOTE_WORDS = [
  "We", "don't", "sell", "what's", "available.",
  "We", "sell", "what's", "earned.",
];

const COMMITMENTS = [
  {
    n: "01",
    title: "Authenticated by hand",
    body: "Every pair, every link, every stone — examined under loupe and weighed by spec before it leaves.",
  },
  {
    n: "02",
    title: "Photographed in-house",
    body: "No stock images, no Photoshop. The piece you see is the piece that ships.",
  },
  {
    n: "03",
    title: "Sourced, never reproduced",
    body: "We chase grails — not aftermarket replicas. If we can't authenticate it, we don't list it.",
  },
];

export default function BrandStory() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const inView = useInView(quoteRef, { once: true, margin: "-30%" });

  return (
    <section className="py-24 md:py-40 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Pull quote — hero of the section */}
        <div
          ref={quoteRef}
          className="grid grid-cols-12 gap-4 mb-24 md:mb-32"
        >
          <div className="col-span-12 md:col-span-2 md:pt-3">
            <div className="numeral text-[10px] tracking-[0.3em] text-ink-soft mb-2">
              § 04
            </div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-ink-soft">
              The thesis
            </div>
          </div>

          <blockquote className="col-span-12 md:col-span-10 font-serif text-ink leading-[0.95]">
            <p className="display-soft text-[clamp(2rem,7vw,7rem)]">
              {QUOTE_WORDS.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden mr-[0.18em] align-baseline"
                >
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={inView ? { y: 0 } : { y: "110%" }}
                    transition={{
                      duration: 0.85,
                      delay: i * 0.06,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                    className={`inline-block ${
                      word === "earned." || word === "available."
                        ? "display-italic text-oxblood"
                        : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </p>
            <footer className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-ink-soft">
              <span className="w-10 h-px bg-ink/30" />
              <span>The Deal Bazaar Manifesto</span>
            </footer>
          </blockquote>
        </div>

        <div className="editorial-rule mb-16 md:mb-24" />

        {/* Three commitments — Tanishq does promise-row beautifully */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 mb-20">
          {COMMITMENTS.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="md:pr-8 border-t border-ink/15 pt-6"
            >
              <div className="flex items-baseline justify-between mb-4">
                <span className="numeral text-[10px] tracking-[0.3em] text-ink-mute">
                  N° {c.n}
                </span>
                <span className="text-brass text-lg leading-none">✦</span>
              </div>
              <h3 className="font-serif display-soft text-2xl md:text-3xl text-ink leading-tight mb-3">
                {c.title}
              </h3>
              <p className="text-ink-soft text-[15px] leading-relaxed">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-3 group text-[11px] uppercase tracking-[0.32em] text-ink"
          >
            <span className="link-underline pb-0.5">
              Read the founder's note
            </span>
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
