import { getFeaturedProducts } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/shop/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-20 px-4 bg-dark-secondary">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionHeading
            title="Featured Picks"
            subtitle="Hand-selected pieces from our latest collection"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <AnimatedSection key={product.slug} delay={i * 0.1}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
