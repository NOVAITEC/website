import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { IntroAnimation } from "@/components/effects/IntroAnimation";
import { AllSchemas } from "@/components/seo/JsonLd";

const baseUrl = "https://novaitec.nl";

export const metadata: Metadata = {
  // Basis metadata
  metadataBase: new URL(baseUrl),
  title: {
    default: "NOVAITEC | AI-gedreven Automatisering voor MKB",
    template: "%s | NOVAITEC",
  },
  description:
    "Ik verkoop geen AI. Ik verkoop rust en resultaat. NOVAITEC helpt MKB-ondernemers met slimme automatisering: workflow automation, AI agents en dashboards. Bespaar tijd, krijg overzicht.",
  keywords: [
    "AI automatisering",
    "MKB automatisering",
    "workflow automatisering",
    "n8n",
    "procesoptimalisatie",
    "AI agents",
    "business automation",
    "automatisering ZZP",
    "digitale transformatie",
    "Kyan Cordes",
    "NOVAITEC",
  ],
  authors: [{ name: "Kyan Cordes", url: "https://linkedin.com/in/kyancordes" }],
  creator: "Kyan Cordes",
  publisher: "NOVAITEC",

  // Canonical URL
  alternates: {
    canonical: baseUrl,
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    title: "NOVAITEC | AI-gedreven Automatisering voor MKB",
    description:
      "Ik verkoop geen AI. Ik verkoop rust en resultaat. Workflow automatisering, AI agents en slimme dashboards voor MKB-ondernemers.",
    url: baseUrl,
    siteName: "NOVAITEC",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NOVAITEC - AI-Driven Automation voor MKB-ondernemers",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "NOVAITEC | AI-gedreven Automatisering voor MKB",
    description:
      "Ik verkoop geen AI. Ik verkoop rust en resultaat. Workflow automatisering, AI agents en slimme dashboards.",
    images: ["/images/og-image.jpg"],
    creator: "@kyancordes",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (voeg je eigen codes toe indien nodig)
  // verification: {
  //   google: "your-google-verification-code",
  // },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  // Web App Manifest
  manifest: "/site.webmanifest",

  // Overig
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="antialiased">
        {/* JSON-LD Structured Data voor SEO en AI-zichtbaarheid */}
        <AllSchemas />
        <SmoothScroll>
          <IntroAnimation />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
