"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";

import { CTAButton } from "@/components/ui/cta-button";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    title: "Discover",
    description:
      "We start with a call about your business, your customers, and what the site needs to do. From that we agree on scope, pages, and a timeline.",
  },
  {
    title: "Design",
    description:
      "You get a visual direction and page designs to react to before anything is built. We revise until you approve them.",
  },
  {
    title: "Build",
    description:
      "We build the approved designs into a fast, responsive site and test it across devices and browsers.",
  },
  {
    title: "Launch",
    description:
      "We connect your domain, set up analytics, and take the site live. You sign off before anything ships.",
  },
  {
    title: "Grow",
    description:
      "After launch we keep working on search rankings, ad creative, and content so the site keeps bringing in leads.",
  },
];

const CORNER_SIZE = 14;
const CORNER_GAP = 6;

// TL, TR, BR, BL: which two sides of each bracket get a border.
const cornerBorders = [
  "border-t-[1.5px] border-l-[1.5px]",
  "border-t-[1.5px] border-r-[1.5px]",
  "border-b-[1.5px] border-r-[1.5px]",
  "border-b-[1.5px] border-l-[1.5px]",
];

// Direction each bracket is inset toward the title's center before settling outward.
const cornerInsets = [
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
] as const;

function cornerTargets(rect: DOMRect) {
  const left = rect.left - CORNER_GAP;
  const top = rect.top - CORNER_GAP;
  const right = rect.right + CORNER_GAP;
  const bottom = rect.bottom + CORNER_GAP;
  return [
    { x: left, y: top },
    { x: right - CORNER_SIZE, y: top },
    { x: right - CORNER_SIZE, y: bottom - CORNER_SIZE },
    { x: left, y: bottom - CORNER_SIZE },
  ];
}

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const discoverRef = useRef<HTMLHeadingElement>(null);
  const growRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { handleAnchorClick } = useAnchorScroll();

  const cornerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const activeTargetRef = useRef<HTMLElement | null>(null);
  const cornersVisibleRef = useRef(false);
  const [finePointer, setFinePointer] = useState(false);

  // Drives the purple title, the corners, and the desktop description panel.
  // All three appear on hover and clear when the pointer leaves.
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const showCorners = !prefersReducedMotion && finePointer;

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleTitleEnter = (e: React.MouseEvent<HTMLHeadingElement>, index: number) => {
    setHoveredIndex(index);
    if (!showCorners) return;

    const target = e.currentTarget;
    activeTargetRef.current = target;
    const rect = target.getBoundingClientRect();
    const targets = cornerTargets(rect);
    const wasHidden = !cornersVisibleRef.current;
    cornersVisibleRef.current = true;

    cornerRefs.current.forEach((el, i) => {
      if (!el) return;
      const { x, y } = targets[i];
      if (wasHidden) {
        // Start slightly inset toward the title so the brackets settle outward
        // into place instead of flying in from their last resting position.
        const [sx, sy] = cornerInsets[i];
        gsap.set(el, { x: x + sx * 10, y: y + sy * 10, opacity: 0 });
      }
      gsap.to(el, { x, y, opacity: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    });
  };

  const handleTitleLeave = () => {
    setHoveredIndex(null);
    if (!showCorners) return;

    activeTargetRef.current = null;
    cornersVisibleRef.current = false;
    cornerRefs.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, { opacity: 0, duration: 0.2, ease: "power2.out", overwrite: "auto" });
    });
  };

  // Keep the brackets glued to the hovered title while the page scrolls
  // under a stationary pointer (trackpad scroll while hovering).
  useEffect(() => {
    if (!showCorners) return;

    const onScroll = () => {
      const target = activeTargetRef.current;
      if (!target) return;
      const targets = cornerTargets(target.getBoundingClientRect());
      cornerRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          x: targets[i].x,
          y: targets[i].y,
          duration: 0.1,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const corners = cornerRefs.current;
    return () => {
      window.removeEventListener("scroll", onScroll);
      corners.forEach((el) => el && gsap.killTweensOf(el));
    };
  }, [showCorners]);

  // Trigger points (in document Y pixels of scroll) where "Discover" and
  // "Grow" each sit dead-center in the viewport. Recomputed from the actual
  // rendered element positions, not fixed offsets, so resizing the viewport
  // or changing the section's spacing/size keeps the wheel in sync.
  const [startY, setStartY] = useState<number | null>(null);
  const [endY, setEndY] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const measure = () => {
      const discoverEl = discoverRef.current;
      const growEl = growRef.current;
      if (!discoverEl || !growEl) return;

      const vh = window.innerHeight;
      const discoverRect = discoverEl.getBoundingClientRect();
      const growRect = growEl.getBoundingClientRect();
      const discoverCenterDoc = window.scrollY + discoverRect.top + discoverRect.height / 2;
      const growCenterDoc = window.scrollY + growRect.top + growRect.height / 2;

      // scrollY at which an element's center aligns with the viewport's center.
      setStartY(discoverCenterDoc - vh / 2);
      setEndY(growCenterDoc - vh / 2);
    };

    measure();
    // Re-measure once the whileInView reveal (opacity/translate) has
    // settled, since the in-flight transform briefly offsets the rect.
    const settleTimer = window.setTimeout(measure, 1800);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("resize", measure);
    };
  }, [prefersReducedMotion]);

  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(
    scrollY,
    [startY ?? 0, endY ?? 1],
    [0, 1],
    { clamp: true },
  );

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.14 },
    },
  };

  const item = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
  };

  return (
    <section
      id="how-we-work"
      ref={sectionRef}
      className="relative border-b border-border-subtle bg-background py-28"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 right-[calc(50%+224px)] hidden items-center justify-center xl:flex">
        <div aria-hidden className="absolute inset-y-0 w-px bg-border-subtle" />
        {!prefersReducedMotion && (
          <div aria-hidden className="relative flex h-20 w-20 items-center justify-center rounded-full bg-background">
            <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-border-subtle"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="text-foreground"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center sm:px-8 lg:px-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="block text-xs font-semibold uppercase tracking-[0.26em] text-foreground/40"
        >
          How We Work
        </motion.span>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 flex flex-col gap-y-5 lg:gap-y-8"
        >
          {steps.map((step, i) => (
            <motion.div key={step.title} variants={item}>
              <h3
                ref={i === 0 ? discoverRef : i === steps.length - 1 ? growRef : undefined}
                onMouseEnter={(e) => handleTitleEnter(e, i)}
                onMouseLeave={handleTitleLeave}
                className="relative mx-auto w-fit text-4xl font-medium leading-tight text-foreground lg:text-6xl"
              >
                {/* White and gradient copies of the title crossfade on hover:
                    background-clip text can't transition, opacity can. */}
                <span
                  className={`transition-opacity duration-300 motion-reduce:transition-none ${
                    hoveredIndex === i ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {step.title}
                </span>
                <span
                  aria-hidden
                  className={`gradient-text-brand absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${
                    hoveredIndex === i ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {step.title}
                </span>
              </h3>
              {/* Below xl the description sits directly under its title; on xl
                  it moves to the right-side panel instead. */}
              <p className="mx-auto mt-3 max-w-md text-body text-muted xl:hidden">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.0, ease }}
          className="mt-14 flex justify-center"
        >
          <CTAButton asChild variant="transparent">
            <Link href="#contact" onClick={handleAnchorClick("#contact")}>
              See more of what we do
            </Link>
          </CTAButton>
        </motion.div>
      </div>

      {/* Desktop: description card in the right gutter, mirroring the progress
          ring in the left gutter. Shows the hovered step's description; when
          nothing is hovered, the placeholder fades back in after a delay so
          quick moves between titles never flash it. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 left-[calc(50%+224px)] hidden items-center justify-center xl:flex">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease }}
          className="relative mx-6 min-h-[9.5rem] w-full max-w-[300px] p-5 text-left"
        >
          <AnimatePresence mode="sync" initial={false}>
            {hoveredIndex !== null ? (
              <motion.p
                key={hoveredIndex}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0, transition: { duration: 0 } }
                    : { opacity: 0, y: -10, transition: { duration: 0.25, ease } }
                }
                transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease }}
                className="absolute inset-x-5 top-5 text-body text-muted"
              >
                {steps[hoveredIndex].description}
              </motion.p>
            ) : (
              <motion.span
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.5, duration: prefersReducedMotion ? 0 : 0.8, ease },
                }}
                exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0 : 0.15 } }}
                className="absolute inset-x-5 top-5 block text-xs font-semibold uppercase tracking-[0.26em] text-foreground/30"
              >
                Hover over an item
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {showCorners &&
        cornerBorders.map((borders, i) => (
          <div
            key={borders}
            ref={(el) => {
              cornerRefs.current[i] = el;
            }}
            aria-hidden
            className={`pointer-events-none fixed left-0 top-0 z-[9997] h-3.5 w-3.5 rounded-none border-accent opacity-0 ${borders}`}
          />
        ))}
    </section>
  );
}
