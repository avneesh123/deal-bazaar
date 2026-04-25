"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/shop?category=sneakers", label: "Sneakers" },
  { href: "/shop?category=jewelry", label: "Jewelry" },
  { href: "/shop", label: "Archive" },
  { href: "/about", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-[28px] inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-paper-edge"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-3 items-center h-14 md:h-16">
          {/* Left — utility/meta */}
          <div className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-ink-soft">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-oxblood inline-block" />
              In stock
            </span>
            <Link href="/shop" className="link-underline hover:text-ink">
              Index
            </Link>
          </div>

          {/* Logo — center */}
          <Link
            href="/"
            className="col-start-1 md:col-start-2 flex items-center justify-self-start md:justify-self-center group"
          >
            <span className="font-serif display-soft text-[26px] md:text-[30px] tracking-tight text-ink leading-none">
              Deal
            </span>
            <span className="font-serif display-italic text-[26px] md:text-[30px] tracking-tight text-oxblood leading-none ml-1.5">
              Bazaar
            </span>
          </Link>

          {/* Right — primary nav */}
          <div className="hidden md:flex items-center justify-end gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.24em] text-ink-soft hover:text-ink link-underline"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden justify-self-end p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-px bg-ink mb-1.5" />
            <span className="block w-4 h-px bg-ink ml-auto" />
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-paper border-t border-paper-edge ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-5">
          {navLinks.map((link, i) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-baseline gap-3 group"
            >
              <span className="numeral text-[10px] text-ink-mute tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-serif display-soft text-3xl text-ink group-hover:text-oxblood transition-colors">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
