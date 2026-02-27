"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { ServicesPanel } from "./panels/ServicesPanel";
import { ProcessPanel } from "./panels/ProcessPanel";
import styles from "./HorizontalScrollSection.module.css";

export function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  /*
   * scrollYProgress: 0 when the section top hits the viewport top,
   *                  1 when the section bottom hits the viewport bottom.
   * This gives us a clean 0→1 range to drive all animations.
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /*
   * Smooth the raw scroll progress with a lightweight spring so
   * motion feels continuous and inertial even across buffer regions.
   * This keeps native browser scrolling but removes any “steppy”
   * feeling as we move between keypoints.
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  /*
   * Horizontal translation of the track — five keypoints tuned for:
   *   - extra buffer while the black Services cards finish animating in
   *   - continuous, inertial-feeling slide into the purple Process panel
   *   - longer late dwell with the Process panel fully in view
   *
   *   0.00 → 0.32  hold at   0vw            (Services has generous breathing room)
   *   0.32 → 0.60  ease from 0vw →  -50vw   (core horizontal movement)
   *   0.60 → 0.84  ease from -50vw → -100vw (slide fully onto Process)
   *   0.84 → 1.00  hold at -100vw           (pure vertical buffer on Process)
   *
   * Combined with a 560vh container height (see CSS module), this creates
   * early and late vertical scroll “buffer” so the direction change never
   * happens right as the panels enter/exit the viewport edge.
   */
  const x: MotionValue<string> = useTransform(
    smoothProgress,
    [0, 0.40, 0.64, 0.84, 1],
    ["0vw", "0vw", "-50vw", "-100vw", "-100vw"],
  );

  return (
    <div ref={containerRef} className={styles.root}>
      <div className={styles.stickyView}>
        <motion.div className={styles.track} style={{ x }}>
          <div className={styles.panel}>
            <ServicesPanel progress={smoothProgress} />
          </div>
          <div className={styles.panel}>
            <ProcessPanel progress={smoothProgress} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
