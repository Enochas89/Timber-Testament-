import type { Metadata } from "next";
import { Merriweather, Source_Sans_3 } from "next/font/google";
import { Suspense } from "react";

import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageViewTracker } from "@/components/PageViewTracker";
import { business } from "@/data/business";

import "./globals.css";

const headingFont = Merriweather({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.websiteUrl),
  title: {
    default: `${business.name} | Custom Carpentry in Athens Region`,
    template: `%s | ${business.name}`,
  },
  description: business.tagline,
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
    title: business.name,
    description: business.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: business.name,
    description: business.tagline,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <Analytics />
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
