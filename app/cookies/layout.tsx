import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie beleid van NOVAITEC. Lees welke cookies ik gebruik en hoe je je voorkeuren kunt aanpassen.",
  alternates: {
    canonical: "https://novaitec.nl/cookies",
  },
  openGraph: {
    title: "Cookie Policy | NOVAITEC",
    description:
      "Cookie beleid van NOVAITEC. Lees welke cookies ik gebruik.",
    url: "https://novaitec.nl/cookies",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
