import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        {/* More sections will be added here */}
      </main>
    </>
  );
}
