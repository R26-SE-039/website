import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import BackToTop from "@/components/layout/BackToTop";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { site } from "@/data/site";
import "./globals.css";

// display:"optional" — on a slow connection the metric-matched fallback stays in
// place instead of swapping in late, which otherwise re-paints the hero text and
// pushes LCP past 2.4 s under Lighthouse's mobile throttling.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "optional" });
// Mono is decorative (badges, dates): not preloaded, so it stays off the LCP critical path.
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "optional", preload: false });

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

export const viewport = { themeColor: "#0b1220" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
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
