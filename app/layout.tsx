import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { FlyingLogo } from "@/components/effects/FlyingLogo";

export const metadata: Metadata = {
  title: "NOVAITEC | AI-gedreven Automatisering voor MKB",
  description: "Wij verkopen geen AI. Wij verkopen rust en resultaat. NOVAITEC helpt ondernemers met slimme automatisering die écht werkt.",
  keywords: ["AI automatisering", "MKB", "workflow automatisering", "n8n", "procesoptimalisatie"],
  authors: [{ name: "Kyan Cordes" }],
  creator: "Kyan Cordes",
  publisher: "NOVAITEC",
  openGraph: {
    title: "NOVAITEC | AI-gedreven Automatisering voor MKB",
    description: "Wij verkopen geen AI. Wij verkopen rust en resultaat.",
    type: "website",
    locale: "nl_NL",
    siteName: "NOVAITEC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="antialiased">
        <SmoothScroll>
          <FlyingLogo />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
