import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description:
    "Algemene voorwaarden van NOVAITEC. Lees de voorwaarden die van toepassing zijn op alle diensten en overeenkomsten.",
  alternates: {
    canonical: "https://novaitec.nl/voorwaarden",
  },
  openGraph: {
    title: "Algemene Voorwaarden | NOVAITEC",
    description:
      "Algemene voorwaarden van NOVAITEC voor AI-gedreven automatiseringsdiensten.",
    url: "https://novaitec.nl/voorwaarden",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VoorwaardenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
