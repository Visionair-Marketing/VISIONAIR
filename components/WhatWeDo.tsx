"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CTAButton } from "@/components/ui/cta-button";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

const IMAGE_SRC = "/Luxury-House.avif";

// Service titles. There is intentionally ONE MORE title than there are images:
// title 0 shows before any image arrives, then each image that sweeps past the
// center reveals the next title (image i -> title i+1). See activeIndex below.
const items = [
  { id: "web", label: "Website Design & SEO" },
  { id: "ads", label: "Advertising Creative" },
  { id: "brand", label: "Brand Development" },
  { id: "leads", label: "Lead Generation" },
];

const IMAGE_COUNT = items.length - 1; // 3 images, 4 titles

const ease = [0.22, 1, 0.36, 1] as const;

/*
  Column geometry (in vh), 3 images:
    pt 55 · img 70 · gap 55 · img 70 · gap 55 · img 70 · pb 55  (= 430vh tall)
  The column translates from 30vh -> -350vh across the scroll so each tall image
  sweeps through the viewport center over a centered (z-0) title. The title swap is
  NOT guessed from scroll thresholds — each image measures its own position and
  fires exactly when its center hits the viewport center (see ParallaxImage), i.e.
  while it is covering the title. So the change is never seen; the next gap reveals it.
*/
const IMG_VH = 70;
const GAP_VH = 55;

function ParallaxImage({
  src,
  index,
  progress,
  onCenterPassed,
}: {
  src: string;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  onCenterPassed: (index: number, passed: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Measure the real DOM position every scroll frame: the image's own center vs
  // the viewport center. This is the actual tracked state — not a scroll-threshold
  // guess — so the title flips the instant the center crosses viewport center,
  // which is exactly when this image is covering the (centered) title.
  useMotionValueEvent(progress, "change", () => {
    const el = ref.current;
    if (!el) return;
    const vh = window.innerHeight;
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const dist = (center - vh / 2) / vh; // + below center · 0 at center · - above

    // Parallax: inner picture drifts so it travels faster than its container.
    if (innerRef.current) {
      innerRef.current.style.transform = `translateY(${dist * 21}%)`;
    }

    onCenterPassed(index, center <= vh / 2);
  });

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden border border-border-subtle"
      style={{ height: `${IMG_VH}vh` }}
    >
      <div ref={innerRef} className="absolute inset-[-22%] will-change-transform">
        <Image src={src} alt="" fill className="object-cover" sizes="640px" />
      </div>
    </div>
  );
}

// The rail LINE (track + progress fill) is rendered once at the section level
// so it spans the full section and its filled end anchors to the bottom divider.
// This counter is the number itself: it stays pinned at the viewport center and
// rides on top of that line, masking a gap in it.
function CounterRail({ index }: { index: number }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 left-[calc(50%+224px)] z-30 hidden md:block">
      <div className="relative mx-auto h-full w-px">
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div className="relative h-16 overflow-hidden bg-surface px-2">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={index}
                initial={{ y: 20, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -20, opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease }}
                className="block text-5xl font-light tabular-nums leading-[4rem] text-foreground"
              >
                {index + 1}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="mt-1 bg-surface px-2 text-xs font-medium tabular-nums tracking-widest text-foreground/40">
            / {items.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export function WhatWeDo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { handleAnchorClick } = useAnchorScroll();

  // State-tracked, not guessed: which images have swept their center past the
  // viewport center. Image i passing reveals title i+1, so the active title is
  // (last passed image) + 1; before any image passes, it's title 0. Each image
  // reports its own crossing from ParallaxImage.
  const [passed, setPassed] = useState<boolean[]>(() =>
    Array.from({ length: IMAGE_COUNT }, () => false),
  );
  const activeIndex = Math.min(items.length - 1, passed.lastIndexOf(true) + 1);

  const onCenterPassed = useCallback((index: number, isPassed: boolean) => {
    setPassed((prev) => {
      if (prev[index] === isPassed) return prev;
      const next = prev.slice();
      next[index] = isPassed;
      return next;
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // End at -345vh (not -350) so the column stops right as the last image fully
  // clears the centered title, trimming the empty scroll tail at the bottom.
  // The final title can wrap to two lines, so the last image travels a little
  // higher than a one-line title would need before the pin releases.
  const columnY = useTransform(scrollYProgress, [0, 1], ["30vh", "-345vh"]);

  return (
    <section id="services" className="relative border-y border-border-subtle bg-surface">
      {/* Rail line — spans the FULL section (top border to bottom divider), so its
          progress-fill end is anchored to the section bottom rather than floating
          inside the pinned viewport. The pinned counter number rides on top of it. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 left-[calc(50%+224px)] z-0 hidden md:block">
        <div className="relative mx-auto h-full w-px bg-border-subtle">
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-foreground/50 to-foreground/10"
          />
        </div>
      </div>

      {/* Mobile: static stacked fallback, no pin */}
      <div className="mx-auto max-w-2xl px-6 py-24 sm:px-8 md:hidden">
        <h2 className="mb-12 text-sm font-semibold uppercase tracking-[0.22em] text-foreground/60">
          What we do
        </h2>
        <div className="flex flex-col gap-10">
          {items.map((item, i) => (
            <div key={item.id}>
              <div className="mb-4 flex items-baseline gap-3">
                <span className="text-sm font-light tabular-nums text-foreground/40">
                  {i + 1} / {items.length}
                </span>
                <p className="text-2xl font-medium text-foreground">{item.label}</p>
              </div>
              <div className="relative h-64 w-full overflow-hidden border border-border-subtle">
                <Image src={IMAGE_SRC} alt="" fill className="object-cover" sizes="600px" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: pinned, scroll-scrubbed sequence with hidden title swap */}
      <div ref={wrapRef} className="relative hidden md:block md:h-[340vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Section title — mirrors the counter rail: vertically centered and
              horizontally centered in the gap between the viewport's left edge and
              the image column's left edge (224px = half of the 448px image width). */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-[calc(50%+224px)] z-30 hidden items-center justify-center md:flex">
            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-foreground/40">
              What we do
            </span>
          </div>

          <CounterRail index={activeIndex} />

          {/* Centered title — sits BEHIND the images (z-0). Images pass over it,
              so the text swap happens out of sight and is revealed in the gaps. */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="mx-auto h-32 w-full max-w-md px-8 text-center">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.h3
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease }}
                  className="text-4xl font-medium leading-tight text-foreground lg:text-6xl"
                >
                  {items[activeIndex].label}
                </motion.h3>
              </AnimatePresence>
            </div>
          </div>

          {/* Moving image column (z-10, above the title) */}
          {reduceMotion ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="mx-auto flex max-w-lg flex-col gap-10 px-8">
                {Array.from({ length: IMAGE_COUNT }).map((_, i) => (
                  <div
                    key={i}
                    className="relative h-48 w-full overflow-hidden border border-border-subtle"
                  >
                    <Image src={IMAGE_SRC} alt="" fill className="object-cover" sizes="640px" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              style={{ y: columnY }}
              className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-lg flex-col px-8 will-change-transform"
            >
              <div style={{ height: `${GAP_VH}vh` }} />
              {Array.from({ length: IMAGE_COUNT }).map((_, i) => (
                <div key={i}>
                  <ParallaxImage
                    src={IMAGE_SRC}
                    index={i}
                    progress={scrollYProgress}
                    onCenterPassed={onCenterPassed}
                  />
                  {i < IMAGE_COUNT - 1 && <div style={{ height: `${GAP_VH}vh` }} />}
                </div>
              ))}
              <div style={{ height: `${GAP_VH}vh` }} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Section CTA — routes to the contact form at the page bottom. */}
      <div className="flex justify-center px-6 py-14 sm:py-16">
        <CTAButton asChild variant="transparent">
          <Link href="#contact" onClick={handleAnchorClick("#contact")}>
            See more
          </Link>
        </CTAButton>
      </div>
    </section>
  );
}
