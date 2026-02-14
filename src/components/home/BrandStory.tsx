import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function BrandStory() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="aspect-[4/3] rounded-sm bg-dark-card border border-dark-border flex items-center justify-center">
              <span className="text-text-secondary/30 text-sm uppercase tracking-widest">
                Brand Image
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-6 leading-tight">
              Where Luxury Meets
              <span className="text-gold"> The Streets</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Deal Bazaar was born from a simple belief: premium doesn&apos;t have to
              be boring. We curate the finest jewelry and sneakers for those who
              live at the intersection of luxury and culture. Every piece in our
              collection is hand-picked, verified for authenticity, and delivered
              with care.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              From iced-out chains to limited-edition kicks, we bring you the
              best of both worlds — no compromises, no fakes, no limits.
            </p>
            <Button href="/about" variant="secondary">
              Learn More
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
