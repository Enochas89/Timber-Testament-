import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";

import { Analytics } from "@/components/Analytics";
import { ConversionTracker } from "@/components/ConversionTracker";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { PageViewTracker } from "@/components/PageViewTracker";
import { business } from "@/data/business";
import { allSeoKeywords } from "@/data/seoKeywords";
import { localBusinessSchema } from "@/lib/seo";

import "./globals.css";

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(business.websiteUrl),
  title: {
    default: `Home Services from Chattanooga to Knoxville | Timber & Testament`,
    template: `%s | Timber & Testament`,
  },
  description:
    "Home repair, handyman, leak repair help, drywall, door, plumbing fixture, and property maintenance across East Tennessee.",
  applicationName: business.name,
  keywords: allSeoKeywords,
  openGraph: {
    type: "website",
    siteName: business.name,
    url: business.websiteUrl,
    title: "Home Services from Chattanooga to Knoxville | Timber & Testament",
  description:
      "Home repair, handyman, leak repair help, drywall, door, plumbing fixture, and property maintenance across East Tennessee.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Services from Chattanooga to Knoxville | Timber & Testament",
  description:
      "Home repair, handyman, leak repair help, drywall, door, plumbing fixture, and property maintenance across East Tennessee.",
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification
      ? {
          other: {
            "msvalidate.01": bingVerification,
          },
        }
      : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} bg-blueprint-grid`}>
        <JsonLd data={localBusinessSchema()} />
        <Analytics />
        <ConversionTracker />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
