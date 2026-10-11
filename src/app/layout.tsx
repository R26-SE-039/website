import type { Metadata } from "next";
import { Inter_Tight, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import BackToTop from "@/components/layout/BackToTop";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { site } from "@/data/site";
import "./globals.css";

// display:"optional" keeps the metric-matched fallback in place on slow
// connections instead of swapping late, which would re-paint the hero text
// and push LCP out under Lighthouse's mobile throttling.
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], display: "optional" });
// Logo wordmark: one weight, preloaded so the header never falls back to Arial
// (with display:"optional" an un-preloaded font usually misses the first paint).
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: "700", display: "optional" });

export const metadata: Metadata = {
  title: { default: site.fullTitle, template: `%s · ${site.shortName}` },
  description: site.abstract,
  // TODO: add openGraph.images once public/images/og-cover.webp exists.
  openGraph: {
    title: site.fullTitle,
    description: site.abstract,
    siteName: site.shortName,
    type: "website",
  },
};

export const viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
