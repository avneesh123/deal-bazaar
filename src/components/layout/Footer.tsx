import Link from "next/link";
import { WHATSAPP_NUMBER, BRAND_EMAIL, getWhatsAppUrl } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-paper-deep text-ink mt-12 border-t border-ink/10">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-20 md:pt-28 pb-10">
        {/* Massive editorial wordmark */}
        <div className="grid grid-cols-12 gap-4 items-end mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-serif text-ink leading-[0.9]">
              <span className="display-soft block text-[14vw] md:text-[10vw] lg:text-[9rem]">
                Deal
              </span>
              <em className="display-italic block text-[14vw] md:text-[10vw] lg:text-[9rem] text-brass-light">
                Bazaar.
              </em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 md:pb-4">
            <p className="text-ink/55 text-[15px] leading-relaxed max-w-xs">
              An editorial marketplace for authenticated sneakers and fine
              jewelry. Sourced by hand, shipped with care, never faked.
            </p>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-6 pb-16 md:pb-20 border-t border-ink/15 pt-10">
          <FooterColumn
            n="01"
            title="The shop"
            links={[
              { href: "/shop?category=sneakers", label: "Sneakers" },
              { href: "/shop?category=jewelry", label: "Jewelry" },
              { href: "/shop", label: "Full archive" },
            ]}
          />
          <FooterColumn
            n="02"
            title="The house"
            links={[
              { href: "/about", label: "Journal" },
              { href: "/about", label: "Authentication" },
              { href: "/contact", label: "Source a piece" },
            ]}
          />
          <FooterColumn
            n="03"
            title="Get in touch"
            links={[
              { href: `mailto:${BRAND_EMAIL}`, label: BRAND_EMAIL },
              {
                href: getWhatsAppUrl(WHATSAPP_NUMBER),
                label: "WhatsApp us",
                external: true,
              },
              { href: "/contact", label: "Concierge" },
            ]}
          />

          {/* Newsletter / signup */}
          <div className="col-span-2 md:col-span-6 md:pl-10 md:border-l border-ink/15">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="numeral text-[10px] tracking-[0.3em] text-ink/45">
                N° 04
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-ink/45">
                Subscribe
              </span>
            </div>
            <p className="font-serif display-soft text-2xl md:text-3xl text-ink leading-tight mb-6">
              First look at every drop —{" "}
              <em className="display-italic text-brass-light">
                before it goes public.
              </em>
            </p>
            <form className="flex items-center gap-0 max-w-md border-b border-ink/30 focus-within:border-brass-light transition-colors">
              <input
                type="email"
                placeholder="you@somewhere.com"
                className="flex-1 bg-transparent py-3 text-[15px] placeholder:text-ink/40 text-ink focus:outline-none"
              />
              <button
                type="submit"
                className="text-[10px] uppercase tracking-[0.3em] py-3 px-3 text-ink hover:text-brass-light transition-colors"
              >
                Submit →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-ink/15 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.28em] text-ink/45">
          <p className="numeral">
            © {new Date().getFullYear()} Deal Bazaar — All rights reserved
          </p>
          <p className="flex items-center gap-3">
            <span>New York · Mumbai · Worldwide</span>
            <span className="text-brass-light">✦</span>
            <span>Issue 04</span>
          </p>
        </div>
      </div>

      {/* Floating WhatsApp — refined to match palette */}
      <a
        href={getWhatsAppUrl(WHATSAPP_NUMBER)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 bg-paper text-ink pl-4 pr-5 py-3 shadow-[0_8px_24px_rgba(13,13,13,0.18)] hover:bg-ink hover:text-ink transition-colors duration-300"
        aria-label="Chat on WhatsApp"
      >
        <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.28em]">
          Chat — WhatsApp
        </span>
      </a>
    </footer>
  );
}

function FooterColumn({
  n,
  title,
  links,
}: {
  n: string;
  title: string;
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div className="col-span-1 md:col-span-2">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="numeral text-[10px] tracking-[0.3em] text-ink/45">
          N° {n}
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-ink/45">
          {title}
        </span>
      </div>
      <ul className="space-y-3">
        {links.map((link) =>
          link.external ? (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink text-[15px] hover:text-brass-light link-underline pb-0.5 inline-block"
              >
                {link.label}
              </a>
            </li>
          ) : (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-ink text-[15px] hover:text-brass-light link-underline pb-0.5 inline-block"
              >
                {link.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
