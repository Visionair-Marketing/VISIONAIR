"use client";

import { useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/*
  Centralized Lenis smooth-scroll setup. Uses the official lenis/react binding
  (<ReactLenis root>), which manages the <html> element and runs its own
  requestAnimationFrame loop. No GSAP ticker is wired here on purpose: this
  project drives motion with framer-motion, whose useScroll reads native scroll
  position, which Lenis updates directly.

  Recipe: lerp 0.12, unity wheel/touch multipliers, wheel delta capped at 240 to
  flatten aggressive trackpad spikes.

  prefers-reduced-motion: when set, smoothing is turned off (smoothWheel false,
  lerp 1) so scrolling falls back to native/instant. ReactLenis stays mounted so
  useLenis() consumers (e.g. Navbar anchor scroll) keep working; they read the
  same reduced-motion flag to jump instantly instead of gliding.
*/

const WHEEL_DELTA_CAP = 240;

export function LenisProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: prefersReducedMotion ? 1 : 0.12,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        smoothWheel: !prefersReducedMotion,
        virtualScroll: (data) => {
          const cap = WHEEL_DELTA_CAP;
          data.deltaY = Math.max(-cap, Math.min(cap, data.deltaY));
          data.deltaX = Math.max(-cap, Math.min(cap, data.deltaX));
          return true;
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}
