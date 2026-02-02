import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Lees hoe NOVAITEC omgaat met jouw persoonsgegevens. Wij respecteren je privacy en verwerken gegevens volgens de AVG.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
