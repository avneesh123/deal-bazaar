import Link from "next/link";
import { products as staticProducts } from "@/data/products";
import ProductCard from "@/components/shop/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FeaturedProducts() {
  const featured = staticProducts.filter((p) => p.featured).slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-12 bg-paper-deep/40">
      <div className="max-w-[1400px] mx-auto">
        {/* Editorial header */}
        <div className="grid grid-cols-12 items-end gap-4 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-2">
            <div className="numeral text-[10px] tracking-[0.3em] text-ink-soft mb-2">
              § 03
            </div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-ink-soft">
              From the floor
            </div>
          </div>
          <h2 className="col-span-12 md:col-span-7 font-serif text-ink leading-[0.95]">
            <span className="display-soft text-[clamp(2.5rem,5vw,5rem)]">
              The current
            </span>{" "}
            <em className="display-italic text-oxblood text-[clamp(2.5rem,5vw,5rem)]">
              rotation.
            </em>
          </h2>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-ink link-underline pb-0.5"
            >
              See all {staticProducts.length}+ pieces →
            </Link>
          </div>
        </div>

        <div className="editorial-rule mb-12 md:mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 md:gap-x-8 md:gap-y-20">
          {featured.map((product, i) => (
            <AnimatedSection key={product.slug} delay={(i % 3) * 0.1}>
              <ProductCard product={product} index={i} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
