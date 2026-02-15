import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Deal Bazaar — Premium Jewelry & Sneakers",
    template: "%s | Deal Bazaar",
  },
  description:
    "Curated collection of premium jewelry and sneakers. Authenticity guaranteed, style delivered.",
  metadataBase: new URL("https://dealbazaar.ai"),
  openGraph: {
    title: "Deal Bazaar — Premium Jewelry & Sneakers",
    description:
      "Curated collection of premium jewelry and sneakers. Authenticity guaranteed, style delivered.",
    url: "https://dealbazaar.ai",
    siteName: "Deal Bazaar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
