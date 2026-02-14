import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Deal Bazaar — where luxury meets the streets.",
};

const values = [
  {
    title: "Authenticity",
    description: "Every product is verified and sourced from trusted suppliers. No fakes, no compromises.",
    icon: (
      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Quality",
    description: "We curate only the finest pieces — premium materials, expert craftsmanship, lasting value.",
    icon: (
      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Style",
    description: "From iced-out chains to limited-edition kicks, we bring you pieces that turn heads.",
    icon: (
      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-4 bg-dark-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              About Us
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-text-primary mb-6">
              Our Story
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto" />
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
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
              <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-6">
                Where Luxury Meets <span className="text-gold">The Streets</span>
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Deal Bazaar started with a simple idea: why should premium
                  style be out of reach? We believe that everyone deserves
                  access to authentic, high-quality jewelry and sneakers without
                  the gatekeeping.
                </p>
                <p>
                  Our team hand-picks every piece in our collection, working
                  directly with craftsmen and trusted suppliers to bring you
                  products that look incredible and last for years.
                </p>
                <p>
                  Whether you&apos;re dressing up for a night out or keeping it
                  casual on the streets, Deal Bazaar has the pieces to complete
                  your look.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-dark-secondary">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">
                What We Stand For
              </h2>
              <div className="w-16 h-0.5 bg-gold mx-auto" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.15}>
                <div className="bg-dark-card border border-dark-border rounded-sm p-8 text-center hover:border-gold/30 transition-colors duration-500">
                  <div className="flex justify-center mb-4">{v.icon}</div>
                  <h3 className="font-serif text-xl text-text-primary mb-3">
                    {v.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-6">
              Ready to Explore?
            </h2>
            <p className="text-text-secondary mb-8">
              Browse our curated collection and find your next statement piece.
            </p>
            <Button href="/shop" variant="primary">
              Shop Now
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
