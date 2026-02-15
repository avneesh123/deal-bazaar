import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ShopContent from "@/components/shop/ShopContent";

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
      </div>
    </section>
  );
}
