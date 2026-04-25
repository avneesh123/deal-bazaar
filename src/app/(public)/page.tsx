import HeroSection from "@/components/home/HeroSection";
import BrandMarquee from "@/components/home/BrandMarquee";
import CategoryHighlights from "@/components/home/CategoryHighlights";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandMarquee />
      <CategoryHighlights />
      <FeaturedProducts />
      <BrandStory />
    </>
  );
}
