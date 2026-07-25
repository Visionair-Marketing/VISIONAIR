"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  /** Where the word reveal begins, as a ScrollTrigger start string. Later = more scroll before it kicks in. */
  revealStart?: string;
  /** Where the word reveal completes, as a ScrollTrigger end string. Later = spans more scroll, slower. */
  revealEnd?: string;
  /** Per-word stagger inside the scrubbed timeline. Higher = more separated, word-by-word cascade. */
  wordStagger?: number;
}

export function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  revealStart = "top 80%",
  revealEnd = "bottom 20%",
  wordStagger = 0.12,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const lenis = useLenis();

  // Accepts plain text plus <br/> and styled inline wrappers (e.g.
  // <span className="gradient-text-brand">…</span>); every word still becomes
  // its own .word span (inheriting the wrapper's className) so the scrubbed
  // stagger stays per-word.
  const splitText = useMemo(() => {
    const nodes: ReactNode[] = [];
    let key = 0;

    const pushWords = (text: string, className = "") => {
      for (const part of text.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          nodes.push(part);
        } else {
          nodes.push(
            <span className={`inline-block word ${className}`.trim()} key={key++}>
              {part}
            </span>,
          );
        }
      }
    };

    Children.forEach(children, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        pushWords(String(child));
      } else if (isValidElement(child)) {
        const props = child.props as { className?: string; children?: ReactNode };
        if (child.type === "br") {
          nodes.push(<br key={key++} />);
        } else if (typeof props.children === "string") {
          pushWords(props.children, props.className);
        }
      }
    });

    return nodes;
  }, [children]);

  // Lenis drives scroll but wires no GSAP ticker (see LenisProvider). Bridge its
  // scroll events into ScrollTrigger so scrub stays in sync with smooth scroll.
  // Refresh once Lenis owns the scroll so trigger start/end are measured against
  // the final scroll setup, not the pre-Lenis layout.
  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();
    return () => lenis.off("scroll", ScrollTrigger.update);
  }, [lenis]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const wordElements = el.querySelectorAll<HTMLElement>(".word");

    /*
      Words carrying .gradient-text-brand each paint their own copy of the
      brand gradient (a single background-clip:text wrapper can't work here:
      the per-word opacity/blur tweens would not affect a parent-painted
      fill). Stretch every copy to a shared 2x paragraph width and offset it
      by the word's own position so the sentence reads as one continuous
      gradient, then drift that shared window across the full palette for the
      "living" motion. Reduced motion gets the static, centered gradient.
    */
    const gradientWords = Array.from(
      el.querySelectorAll<HTMLElement>(".word.gradient-text-brand"),
    );
    const paragraph = el.querySelector("p");
    let driftTween: gsap.core.Tween | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let lastParagraphWidth = 0;

    const setupGradient = () => {
      if (!paragraph || gradientWords.length === 0) return;
      driftTween?.kill();
      const w = paragraph.offsetWidth;
      lastParagraphWidth = w;
      // offsetLeft ignores transforms, so the scrubbed rotation on the
      // container can't skew these measurements.
      const wordShift = (word: HTMLElement) =>
        -(word.offsetLeft - paragraph.offsetLeft);
      for (const word of gradientWords) {
        word.style.backgroundSize = `${2 * w}px 100%`;
      }
      if (prefersReducedMotion) {
        for (const word of gradientWords) {
          word.style.backgroundPosition = `${wordShift(word) - 0.5 * w}px 50%`;
        }
        return;
      }
      // One shared sweep: every word moves by the same delta from its own
      // offset, so the words stay in lockstep and the visible window travels
      // the whole indigo-to-purple range with no seam at the turnaround.
      driftTween = gsap.fromTo(
        gradientWords,
        {
          backgroundPosition: (_i: number, target: HTMLElement) =>
            `${wordShift(target)}px 50%`,
        },
        {
          backgroundPosition: (_i: number, target: HTMLElement) =>
            `${wordShift(target) - w}px 50%`,
          duration: 8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        },
      );
    };

    if (paragraph && gradientWords.length > 0) {
      setupGradient();
      // Realign on real width changes only; re-running on same-width resize
      // events would needlessly reset the drift phase.
      resizeObserver = new ResizeObserver(() => {
        if (paragraph.offsetWidth !== lastParagraphWidth) setupGradient();
      });
      resizeObserver.observe(paragraph);
    }

    if (prefersReducedMotion) {
      gsap.set(el, { rotate: 0 });
      gsap.set(wordElements, { opacity: 1, filter: "blur(0px)" });
      return () => {
        resizeObserver?.disconnect();
      };
    }

    const ctx = gsap.context(() => {
      // Seed the blurred/dim starting state before any tween exists. This makes
      // it the revert baseline for ScrollTrigger.refresh(), so a refresh can
      // never strip the initial styles and leave untouched words sharp until
      // the scrub playhead first reaches them.
      gsap.set(wordElements, {
        opacity: baseOpacity,
        filter: enableBlur ? `blur(${blurStrength}px)` : "none",
        willChange: "opacity, filter",
      });

      // Rotation settles early and subtly; kept on its own short range.
      gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top 55%",
            scrub: true,
          },
        },
      );

      // Opacity + blur share one scrubbed timeline tied to the block's travel
      // through the viewport (revealStart -> revealEnd). Both tweens start at
      // position 0 with the same stagger, so each word's fade and de-blur are
      // locked together and resolve word-by-word as the user scrolls.
      // No invalidateOnRefresh here: every tween value is a fixed literal, and
      // invalidating on the post-mount refreshes wipes the applied from-styles,
      // deferring each word's blur to the first time the playhead touches it.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: revealStart,
          end: revealEnd,
          scrub: true,
        },
      });

      timeline.fromTo(
        wordElements,
        { opacity: baseOpacity },
        { ease: "none", opacity: 1, stagger: wordStagger },
        0,
      );

      if (enableBlur) {
        timeline.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          { ease: "none", filter: "blur(0px)", stagger: wordStagger },
          0,
        );
      }
    }, el);

    // Trigger positions are pixel values captured at creation. Recompute them
    // after paint (and after late-loading images, e.g. the hero) so the very
    // first scroll uses correct start/end instead of a compressed range that
    // makes the reveal step one word at a time until ScrollTrigger self-corrects.
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      resizeObserver?.disconnect();
      driftTween?.kill();
      ctx.revert();
    };
  }, [
    enableBlur,
    baseRotation,
    baseOpacity,
    blurStrength,
    revealStart,
    revealEnd,
    wordStagger,
  ]);

  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p
        className={`text-[clamp(1.6rem,4vw,3rem)] font-semibold leading-[1.5] ${textClassName}`}
      >
        {splitText}
      </p>
    </h2>
  );
}

export default ScrollReveal;
