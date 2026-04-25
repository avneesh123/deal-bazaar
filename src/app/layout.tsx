import type { Metadata } from "next";
import { Fraunces, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Deal Bazaar — Authenticated Sneakers & Fine Jewelry",
    template: "%s | Deal Bazaar",
  },
  description:
    "An editorial marketplace for authenticated sneakers and fine jewelry. Where the street meets the vault.",
  metadataBase: new URL("https://dealbazaar.ai"),
  openGraph: {
    title: "Deal Bazaar — Authenticated Sneakers & Fine Jewelry",
    description:
      "An editorial marketplace for authenticated sneakers and fine jewelry.",
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
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
