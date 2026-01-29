import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy beleid van NOVAITEC. Lees hoe ik omga met je persoonsgegevens en welke rechten je hebt onder de AVG.",
  alternates: {
    canonical: "https://novaitec.nl/privacy",
  },
  openGraph: {
    title: "Privacy Policy | NOVAITEC",
    description:
      "Privacy beleid van NOVAITEC. Lees hoe ik omga met je persoonsgegevens.",
    url: "https://novaitec.nl/privacy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
