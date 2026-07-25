"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CTAButton } from "@/components/ui/cta-button";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { asset } from "@/lib/base-path";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

// The navbar stays collapsed while the hero owns the viewport and drops down
// once the user is 75% of the way through it.
const HERO_SCROLL_THRESHOLD = 0.25;

export function Navbar() {
  const { handleAnchorClick, handleToTop, prefersReducedMotion } = useAnchorScroll();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  const pastHero = (y: number) =>
    y > window.innerHeight * HERO_SCROLL_THRESHOLD;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(pastHero(latest));
  });

  // Scroll restoration can land the page mid-document before any scroll event.
  useEffect(() => {
    setVisible(pastHero(window.scrollY));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{ y: visible ? "0%" : "-110%" }}
      transition={
        prefersReducedMotion ? { duration: 0 } : { duration: 0.7, ease }
      }
      inert={visible ? undefined : true}
      className="fixed inset-x-0 top-0 z-30 border-b border-border-subtle bg-background/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          onClick={handleToTop}
          aria-label="Visionair — back to top"
          className="inline-flex items-center opacity-90 transition-opacity hover:opacity-100"
        >
          <Image
            src={asset("/logo/wordmark.png")}
            alt="Visionair"
            width={2630}
            height={356}
            priority
            className="h-[18px] w-auto"
          />
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          <div className="flex items-center gap-8 text-[13px] tracking-wide text-muted">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleAnchorClick(item.href)}
                className={cn("transition-colors hover:text-foreground")}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <CTAButton asChild variant="purple" size="sm">
            <Link href="#contact" onClick={handleAnchorClick("#contact")}>
              Book a call
            </Link>
          </CTAButton>
        </div>

        <div className="flex items-center md:hidden">
          <CTAButton asChild variant="purple" size="sm">
            <Link href="#contact" onClick={handleAnchorClick("#contact")}>
              Book a call
            </Link>
          </CTAButton>
        </div>
      </nav>
    </motion.header>
  );
}
