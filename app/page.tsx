import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";

// Dynamic imports for below-the-fold sections - reduces initial JS bundle
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const ProblemSection = dynamic(() =>
  import("@/components/sections/ProblemSection").then((mod) => mod.ProblemSection)
);
const ServicesSection = dynamic(() =>
  import("@/components/sections/ServicesSection").then((mod) => mod.ServicesSection)
);
const FAQSection = dynamic(() =>
  import("@/components/sections/FAQSection").then((mod) => mod.FAQSection)
);
const ContactSection = dynamic(() =>
  import("@/components/sections/ContactSection").then((mod) => mod.ContactSection)
);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProblemSection />
        <ServicesSection />
        <FAQSection />
        <ContactSection />
      </main>
    </>
  );
}
