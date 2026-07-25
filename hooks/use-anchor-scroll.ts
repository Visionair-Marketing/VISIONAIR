"use client";

import { useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import type { MouseEvent } from "react";

// Height of the fixed header (h-14 = 56px); anchors stop clear of it.
const HEADER_OFFSET = -56;

// Shared smooth-scroll handler for in-page anchor links. Anchors must go
// through Lenis (not the browser default) or they instant-jump, and once the
// URL hash already matches the target, a native anchor click becomes a no-op
// on every click after the first.
export function useAnchorScroll() {
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();

  const scrollTo = (target: string | number, e?: MouseEvent<HTMLAnchorElement>) => {
    if (!lenis) return;
    e?.preventDefault();
    const offset = typeof target === "string" ? HEADER_OFFSET : undefined;
    lenis.scrollTo(
      target,
      prefersReducedMotion ? { offset, immediate: true } : { offset, duration: 1.2 },
    );
  };

  const handleAnchorClick =
    (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#")) return;
      scrollTo(href, e);
    };

  const handleToTop = (e: MouseEvent<HTMLAnchorElement>) => scrollTo(0, e);

  return { handleAnchorClick, handleToTop, prefersReducedMotion };
}
