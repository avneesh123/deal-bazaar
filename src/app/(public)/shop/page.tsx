import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ShopContent from "@/components/shop/ShopContent";
import RequestForm from "@/components/product/RequestForm";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Browse the full archive of authenticated sneakers and fine jewelry.",
};

export default function ShopPage() {
  return (
    <>
      <section className="pt-10 md:pt-16 pb-12 md:pb-20 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading
            number="00"
            eyebrow="The full inventory"
            title="The Archive."
            subtitle="Every piece authenticated, photographed in-house, and ready to ship. Filter by category, size, brand, or price."
          />
          <div className="editorial-rule mb-10 md:mb-12" />
          <ShopContent />
        </div>
      </section>

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
                Tell us the silhouette, size, or piece you're after — a Jordan 1
                Chicago in size 10, a 5mm Cuban link, an AP Royal Oak — and
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
