import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "@/components/contact/ContactForm";
import { BRAND_EMAIL, WHATSAPP_NUMBER, getWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Deal Bazaar. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-4 bg-dark-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Get In Touch
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-text-primary mb-6">
              Contact Us
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto" />
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <AnimatedSection>
              <h2 className="font-serif text-2xl text-text-primary mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection delay={0.2}>
              <h2 className="font-serif text-2xl text-text-primary mb-6">
                Other Ways to Reach Us
              </h2>

              <div className="space-y-6">
                <div className="bg-dark-card border border-dark-border rounded-sm p-6">
                  <h3 className="text-gold text-sm uppercase tracking-widest mb-2">
                    Email
                  </h3>
                  <a
                    href={`mailto:${BRAND_EMAIL}`}
                    className="text-text-primary hover:text-gold transition-colors"
                  >
                    {BRAND_EMAIL}
                  </a>
                </div>

                <div className="bg-dark-card border border-dark-border rounded-sm p-6">
                  <h3 className="text-gold text-sm uppercase tracking-widest mb-2">
                    WhatsApp
                  </h3>
                  <a
                    href={getWhatsAppUrl(WHATSAPP_NUMBER)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary hover:text-gold transition-colors"
                  >
                    Chat with us on WhatsApp
                  </a>
                </div>

                <div className="bg-dark-card border border-dark-border rounded-sm p-6">
                  <h3 className="text-gold text-sm uppercase tracking-widest mb-2">
                    Hours
                  </h3>
                  <p className="text-text-primary">Mon — Fri: 10AM — 7PM</p>
                  <p className="text-text-secondary text-sm mt-1">
                    Weekend inquiries answered on Monday
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
