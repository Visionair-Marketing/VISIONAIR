"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CTAButton } from "@/components/ui/cta-button";
import { DarkVeil } from "@/components/animation/DarkVeil";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { basePath } from "@/lib/base-path";

/*
  easeInOutCubic. The old easeOutQuint curve [0.22, 1, 0.36, 1] dumps ~97% of
  the motion in the first half of the duration then crawls the rest of the
  way, which reads as "fast launch, dead tail" no matter how long the
  duration is. This curve is symmetric: gentle start, even build through the
  middle, gentle finish, so a 1.4s duration actually reads as 1.4s of motion.
*/
const ease = [0.55, 0, 0.35, 1] as const;

/*
  Reveal timeline knobs. Each entry is { delay, duration } in seconds, where
  delay is the START time of that element (not the gap from the previous
  one) and duration is how long its own transition takes. Order below
  matches visual top-to-bottom hierarchy: backdrop, wordmark, top hairline,
  tagline, subtext, CTA, bottom hairline. Tweak freely; reduced-motion users
  always get the fast 0.4s fallback defined per-element below, untouched by
  this config.
*/
const TIMELINE = {
  backdrop: { delay: 0.0, duration: 2.6 },
  wordmark: { delay: 0.1, duration: 2.5 },
  hairlineTop: { delay: 1.1, duration: 1.5 },
  tagline: { delay: 1.3, duration: 1.5 },
  subtext: { delay: 1.6, duration: 1.4 },
  cta: { delay: 2.0, duration: 1.3 },
  hairlineBottom: { delay: 2.3, duration: 1.6 },
};

/* Decorative hairline: fades to transparent at both ends and draws itself
   outward from center once the main reveal sequence has settled. */
function Hairline({
  delay,
  duration,
  reduced,
  className = "",
}: {
  delay: number;
  duration: number;
  reduced: boolean;
  className?: string;
}) {
  return (
    <motion.div
      aria-hidden
      initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
      animate={reduced ? { opacity: 1 } : { scaleX: 1 }}
      transition={
        reduced ? { duration: 0.4, ease } : { duration, ease, delay }
      }
      className={`h-px w-full origin-center bg-gradient-to-r from-transparent via-border-subtle to-transparent ${className}`}
    />
  );
}

/*
  Centered brand-lockup hero. The wordmark is the visual: near edge-to-edge,
  pinned toward the top of the viewport, always the same proportion of the
  screen. The tagline group sits centered in the space beneath it, stepping
  down in scale: serif tagline, Inter subtext, single CTA. Reveal order follows
  that hierarchy: wordmark, tagline, subtext, CTA. A faint brand bloom fades up
  behind the lockup for depth. The navbar stays collapsed while the hero is on
  screen (see Navbar.tsx), so the hero owns the full viewport.
*/

export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const { handleAnchorClick } = useAnchorScroll();

  const rise = ({ delay, duration }: { delay: number; duration: number }) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: reduced
      ? { duration: 0.4, ease }
      : { duration, ease, delay },
  });

  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden border-b border-border-subtle bg-background">
      {/* Animated silk backdrop behind the lockup: the stock DarkVeil CPPN
          noise field rendered as-is (its own purple on solid black), with
          only a slow opacity fade-in on load. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          reduced
            ? { duration: 0.4, ease }
            : { duration: TIMELINE.backdrop.duration, ease, delay: TIMELINE.backdrop.delay }
        }
        className="pointer-events-none absolute inset-0"
      >
        <DarkVeil paused={reduced} brightness={0.8} saturation={0.85} />
      </motion.div>

      <div className="relative mx-auto flex w-full flex-1 flex-col items-center px-5 pb-16 pt-8 text-center sm:px-8 sm:pt-10">
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.985 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          transition={
            reduced
              ? { duration: 0.4, ease }
              : { duration: TIMELINE.wordmark.duration, ease, delay: TIMELINE.wordmark.delay }
          }
          className="w-full"
        >
          <Image
            src={`${basePath}/logo/wordmark.png`}
            alt="Visionair"
            width={2630}
            height={356}
            priority
            className="h-auto w-full"
            sizes="100vw"
          />
        </motion.div>

        <Hairline
          delay={TIMELINE.hairlineTop.delay}
          duration={TIMELINE.hairlineTop.duration}
          reduced={reduced}
          className="mt-10 max-w-3xl"
        />

        {/* The tagline group centers itself in the space left under the
            wordmark, landing the tagline near the middle of the viewport. */}
        <div className="flex flex-1 flex-col items-center justify-center">
        {/* Tagline rises out of a mask once the wordmark has landed. Bottom
            padding on the mask keeps serif descenders from clipping. */}
        <h1 className="overflow-hidden pb-[0.14em] -mb-[0.14em] font-display text-3xl font-normal leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          <motion.span
            className="block"
            initial={reduced ? { opacity: 0 } : { y: "115%" }}
            animate={reduced ? { opacity: 1 } : { y: "0%" }}
            transition={
              reduced
                ? { duration: 0.4, ease }
                : { duration: TIMELINE.tagline.duration, ease, delay: TIMELINE.tagline.delay }
            }
          >
            Website design and brand systems that convert visitors into{" "}
            <em className="italic">clients</em>.
          </motion.span>
        </h1>

        <motion.p
          {...rise(TIMELINE.subtext)}
          className="mt-6 max-w-md text-body text-muted"
        >
          We build premium websites for landscaping, real estate, and
          dealership brands who want to look like the market leader.
        </motion.p>

        <motion.div {...rise(TIMELINE.cta)} className="mt-10">
          <CTAButton asChild variant="purple" size="lg">
            <Link href="#contact" onClick={handleAnchorClick("#contact")}>
              Book a call
            </Link>
          </CTAButton>
        </motion.div>

        <Hairline
          delay={TIMELINE.hairlineBottom.delay}
          duration={TIMELINE.hairlineBottom.duration}
          reduced={reduced}
          className="mt-14 max-w-xs"
        />
        </div>
      </div>
    </section>
  );
}
