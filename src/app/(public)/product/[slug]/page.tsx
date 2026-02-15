import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getProductBySlug, getRelatedProducts } from "@/lib/utils";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import WhatsAppCTA from "@/components/product/WhatsAppCTA";
import RequestForm from "@/components/product/RequestForm";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductGrid from "@/components/shop/ProductGrid";
import AnimatedSection from "@/components/ui/AnimatedSection";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <AnimatedSection>
            <ProductGallery images={product.images} productName={product.name} />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <ProductInfo product={product} />
            <WhatsAppCTA productName={product.name} />
            <div className="border-t border-dark-border pt-6 mt-6">
              <p className="text-white font-medium mb-1">Need a different size?</p>
              <p className="text-text-secondary text-sm mb-4">
                Let us know what you&apos;re looking for and we&apos;ll try to source it.
              </p>
              <RequestForm productName={product.name} category={product.category} />
            </div>
          </AnimatedSection>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <SectionHeading title="You May Also Like" />
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </section>
  );
}
