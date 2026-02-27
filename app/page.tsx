import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { HorizontalScrollSection } from "@/components/HorizontalScrollSection";
import { Work } from "@/components/Work";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <HorizontalScrollSection />
      <Work />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
