import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oplossingen",
  description:
    "Bekijk interactieve demo's van NOVAITEC oplossingen. Van workflow automatisering tot AI agents en slimme dashboards.",
};

export default function OplossingenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
