"use client";

import { motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import styles from "./ProcessPanel.module.css";

/*
 * Animation input ranges — tune here without touching JSX.
 *
 * The horizontal movement for the purple Process panel effectively runs
 * from scrollYProgress 0.32 → 0.84 (see HorizontalScrollSection.tsx),
 * then holds steady from 0.84 → 1.00 so the panel is fully in place
 * while vertical scroll continues.
 *
 * Content animates in while the panel slides into view, finishing
 * before ~0.78 so the end-dwell (0.84 → 1.00) acts as pure buffer
 * after everything is visible.
 *
 * With stepStagger 0.025 and 4 steps:
 *   last step finishes at steps.in[1] + 3 × 0.025 = 0.72 + 0.075 = 0.795
 *   → ~115–120vh of buffer before vertical scroll resumes (560vh container).
 */
const ANIM = {
  heading: { in: [0.54, 0.66] as const },
  steps:   { in: [0.58, 0.72] as const },
  stepStagger: 0.025,
} as const;

const steps = [
  { number: "01", title: "Discovery",          description: "A focused session to map your goals and audience." },
  { number: "02", title: "Strategy & Design",  description: "Wireframes and high-fidelity designs before any code." },
  { number: "03", title: "Build",              description: "Pixel-perfect, performant development from approved designs." },
  { number: "04", title: "Launch & Grow",      description: "Deploy, hand off, and optionally stay on as your growth partner." },
] as const;

interface Props {
  progress: MotionValue<number>;
}

function StepCard({
  step,
  progress,
  stepIndex,
}: {
  step: (typeof steps)[number];
  progress: MotionValue<number>;
  stepIndex: number;
}) {
  const offset = stepIndex * ANIM.stepStagger;
  const [inStart, inEnd] = ANIM.steps.in;

  const opacity = useTransform(
    progress,
    [inStart + offset, inEnd + offset],
    [0, 1],
  );
  const y = useTransform(
    progress,
    [inStart + offset, inEnd + offset],
    [36, 0],
  );

  return (
    <motion.div className={styles.step} style={{ opacity, y }}>
      <span className={styles.stepNumber}>{step.number}</span>
      <div className={styles.stepBottom}>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.stepDescription}>{step.description}</p>
      </div>
    </motion.div>
  );
}

export function ProcessPanel({ progress }: Props) {
  const [hInStart, hInEnd] = ANIM.heading.in;

  const headingOpacity = useTransform(progress, [hInStart, hInEnd], [0, 1]);
  const headingY = useTransform(progress, [hInStart, hInEnd], [30, 0]);

  return (
    <div className={styles.panel}>
      {/* Header */}
      <motion.div
        className={styles.header}
        style={{ opacity: headingOpacity, y: headingY }}
      >
        <span className={styles.label}>
          <span className={styles.labelLine} />
          How it works
        </span>
        <h2 className={styles.heading}>
          The Visionair{" "}
          <span className={styles.headingAccent}>process</span>
        </h2>
      </motion.div>

      {/* Steps grid */}
      <div className={styles.stepsGrid}>
        {steps.map((step, i) => (
          <StepCard
            key={step.number}
            step={step}
            progress={progress}
            stepIndex={i}
          />
        ))}
      </div>
    </div>
  );
}
