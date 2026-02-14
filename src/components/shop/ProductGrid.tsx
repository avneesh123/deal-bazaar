import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <AnimatedSection key={product.slug} delay={i * 0.05}>
          <ProductCard product={product} />
        </AnimatedSection>
      ))}
    </div>
  );
}
