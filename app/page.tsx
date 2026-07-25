import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { WhatWeDo } from "@/components/WhatWeDo";
import { HowWeWork } from "@/components/HowWeWork";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen">
      <Navbar />
      <Hero />
      <section className="border-b border-border-subtle bg-background py-32 sm:py-40">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
          <ScrollReveal
            baseOpacity={0.08}
            baseRotation={2}
            blurStrength={5}
            revealEnd="bottom 55%"
            textClassName="text-foreground"
          >
            Visionair builds the marketing systems that make it easy for customers to find you and position you as a market leader.
            <br />
            <span className="gradient-text-brand">Here&apos;s what we do for you:</span>
          </ScrollReveal>
        </div>
      </section>
      <WhatWeDo />
      <HowWeWork />
      {/* <Work /> */}
      {/* <Testimonials /> */}
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
