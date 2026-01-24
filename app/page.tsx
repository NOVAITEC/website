import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProblemSection />
        <ServicesSection />
        <ContactSection />
      </main>
    </>
  );
}
