import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ShopContent from "@/components/shop/ShopContent";
import RequestForm from "@/components/product/RequestForm";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our curated collection of premium jewelry and sneakers.",
};

export default function ShopPage() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Shop"
          subtitle="Discover our curated collection"
        />
        <ShopContent />

        {/* Request Section */}
        <div className="mt-20 max-w-2xl mx-auto">
          <div className="bg-dark-card border border-dark-border rounded-sm p-8">
            <h2 className="text-xl font-semibold text-white mb-2">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-text-secondary text-sm mb-6">
              Tell us what you want — a specific sneaker, size, or piece of jewelry — and we&apos;ll source it for you.
            </p>
            <RequestForm />
          </div>
        </div>
      </div>
    </section>
  );
}
