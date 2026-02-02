import type { Metadata } from "next";
import { Montserrat, Inter, JetBrains_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { AllSchemas } from "@/components/seo/JsonLd";
import { GoogleAnalytics, AnalyticsProvider } from "@/components/analytics";
import { MotionProvider } from "@/components/providers/MotionProvider";

// Dynamic import for IntroAnimation - not needed for initial render
const IntroAnimation = dynamic(() =>
  import("@/components/effects/IntroAnimation").then((mod) => mod.IntroAnimation)
);

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const baseUrl = "https://novaitec.nl";

export const metadata: Metadata = {
  // Basis metadata
  metadataBase: new URL(baseUrl),
  title: {
    default: "NOVAITEC | AI-gedreven Automatisering voor MKB",
    template: "%s | NOVAITEC",
  },
  description:
    "De motor achter jouw ambitie. Terwijl jij bouwt aan je visie, zorg ik dat alles blijft draaien. Slimme automatisering die ruimte schept voor groei, niet voor gedoe.",
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
    title: "NOVAITEC | AI-Driven Automation",
    description:
      "De motor achter jouw ambitie. Terwijl jij bouwt aan je visie, zorg ik dat alles blijft draaien. Slimme automatisering voor MKB-ondernemers.",
    url: baseUrl,
    siteName: "NOVAITEC",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "https://novaitec.nl/images/og-image.jpg",
        secureUrl: "https://novaitec.nl/images/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "NOVAITEC - AI-Driven Automation",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "NOVAITEC | AI-Driven Automation",
    description:
      "De motor achter jouw ambitie. Terwijl jij bouwt aan je visie, zorg ik dat alles blijft draaien. Slimme automatisering voor MKB-ondernemers.",
    images: ["https://novaitec.nl/images/og-image.jpg"],
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
    <html lang="nl" className={`${montserrat.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preconnect to Google services for faster analytics loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        {/* DNS prefetch as fallback for older browsers */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Preload critical header logo for faster LCP */}
        <link
          rel="preload"
          href="/images/novaitec_beeldmerk_transparant_wit.png"
          as="image"
          type="image/png"
        />
      </head>
      <GoogleAnalytics />
      <body className="antialiased">
        <AnalyticsProvider />
        {/* JSON-LD Structured Data voor SEO en AI-zichtbaarheid */}
        <AllSchemas />
        <MotionProvider>
          <SmoothScroll>
            <IntroAnimation />
            {children}
            <Footer />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
