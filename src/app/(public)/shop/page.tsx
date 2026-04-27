import type { Metadata } from "next";
import ShopContent from "@/components/shop/ShopContent";
import RequestForm from "@/components/product/RequestForm";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Browse the full archive of authenticated sneakers and fine jewelry.",
};

const HOUSE_TECH = [
  {
    name: "Bench-Check™",
    blurb: "Every piece authenticated by hand before it ships.",
  },
  {
    name: "Photographed in House™",
    blurb: "No stock images. The piece you see is the piece that ships.",
  },
  {
    name: "Sourced, Never Faked™",
    blurb: "If we can't authenticate it, we don't list it.",
  },
];

export default function ShopPage() {
  return (
    <>
      {/* Hero band — H1 IS the hero (Skechers move). No marketing image. */}
      <section className="pt-10 md:pt-14 pb-8 px-5 sm:px-8 lg:px-12 border-b border-ink/15">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 items-end gap-4 mb-6 md:mb-8">
            <div className="col-span-12 md:col-span-2">
              <div className="numeral text-[10px] tracking-[0.3em] text-ink-soft mb-2">
                § 00
              </div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-ink-soft">
                The full inventory
              </div>
            </div>
            <h1 className="col-span-12 md:col-span-10 font-serif text-ink leading-[0.92]">
              <span className="display-soft text-[clamp(3rem,8vw,8rem)]">
                The
              </span>{" "}
              <em className="display-italic text-oxblood text-[clamp(3rem,8vw,8rem)]">
                Archive.
              </em>
            </h1>
          </div>
          <p className="max-w-2xl text-[15px] md:text-base text-ink-soft leading-relaxed">
            Authenticated sneakers and fine jewelry, sourced by hand and
            photographed in-house. Filter by category, size, brand, condition,
            or price — every piece carries a Bench-Check before it ships.
          </p>
        </div>
      </section>

      {/* House technologies — adapted from Skechers' Slip-ins / Arch Fit pattern */}
      <section className="px-5 sm:px-8 lg:px-12 py-8 bg-paper-deep/30 border-b border-ink/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOUSE_TECH.map((t, i) => (
            <div key={t.name} className="flex items-baseline gap-3">
              <span className="numeral text-[10px] tracking-[0.3em] text-ink-mute shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="font-serif display-soft text-ink text-lg md:text-xl">
                  {t.name}
                </div>
                <p className="text-ink-soft text-[13px] md:text-sm leading-snug mt-0.5">
                  {t.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop body — chips + filter bar + grid */}
      <section className="pt-8 md:pt-10 pb-12 md:pb-20 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <ShopContent />
        </div>
      </section>

      {/* Source-a-piece concierge */}
      <section className="px-5 sm:px-8 lg:px-12 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="editorial-rule mb-12 md:mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-5">
              <div className="numeral text-[10px] tracking-[0.3em] text-ink-soft mb-3">
                § Concierge
              </div>
              <h2 className="font-serif text-ink leading-[0.95]">
                <span className="display-soft text-[clamp(2rem,4vw,3.5rem)]">
                  Hunting something
                </span>{" "}
                <em className="display-italic text-oxblood text-[clamp(2rem,4vw,3.5rem)]">
                  specific?
                </em>
              </h2>
              <p className="text-ink-soft text-[15px] leading-relaxed mt-5 max-w-md">
                Tell us the silhouette, size, or piece you're after — a Jordan
                1 Chicago in size 10, a 5mm Cuban link, an AP Royal Oak — and
                we'll source it for you.
              </p>
            </div>
            <div className="md:col-span-7 bg-paper-deep border border-ink/10 p-7 md:p-10">
              <RequestForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
