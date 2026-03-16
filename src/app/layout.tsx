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
import { localBusinessSchema } from "@/lib/seo";

import "./globals.css";

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600"],
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
    default: `Custom Carpentry in Athens, TN | Timber & Testament`,
    template: `%s | Timber & Testament`,
  },
  description:
    "Custom-built master carpentry by licensed and insured professionals serving Athens, Cleveland, and Chattanooga with built-ins, trim, cabinetry, and woodwork.",
  applicationName: business.name,
  keywords: [
    "custom carpentry",
    "built-ins",
    "trim work",
    "media walls",
    "custom cabinets",
    "custom furniture",
    "Chattanooga carpenter",
    "Cleveland TN carpenter",
    "Athens TN carpenter",
    "Dalton GA carpenter",
    "Collegedale carpentry",
    "Ooltewah carpentry",
    "Apison carpentry",
    "Charleston TN carpentry",
  ],
  openGraph: {
    type: "website",
    siteName: business.name,
    url: business.websiteUrl,
    title: "Custom Carpentry in Athens, TN | Timber & Testament",
    description:
      "Custom-built master carpentry by licensed and insured professionals serving Athens, Cleveland, and Chattanooga with built-ins, trim, cabinetry, and woodwork.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Carpentry in Athens, TN | Timber & Testament",
    description:
      "Custom-built master carpentry by licensed and insured professionals serving Athens, Cleveland, and Chattanooga with built-ins, trim, cabinetry, and woodwork.",
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
