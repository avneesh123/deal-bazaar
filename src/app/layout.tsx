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

// Runs before React hydrates so the saved theme preference applies before
// first paint. Default is dark; light is opt-in via the navbar toggle.
const themeBootScript = `(function(){try{var s=localStorage.getItem('theme');if(s==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${fraunces.variable} ${archivo.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
