import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import { ProblemSection } from "@/components/sections/ProblemSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProblemSection />
        {/* More sections will be added here */}
      </main>
    </>
  );
}
