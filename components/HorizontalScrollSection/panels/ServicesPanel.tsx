"use client";

import { motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import styles from "./ServicesPanel.module.css";

/*
 * Animation input ranges — tune here without touching JSX.
 * All values are fractions of scrollYProgress (0 → 1).
 *
 * All animations must complete before the dwell window ends at 0.40
 * (the point where the horizontal track starts moving).
 *
 * With 5 cards and cardStagger 0.018:
 *   last card finishes at cards.in[1] + 4 × cardStagger = 0.20 + 0.072 = 0.272
 *   → comfortably inside the 0.40 dwell window.
 */
const ANIM = {
  heading: { in: [0.03, 0.16] as const },
  cards:   { in: [0.06, 0.20] as const },
  cardStagger: 0.018,
} as const;

const services = [
  { index: "01", title: "Brand-led Web Design",   description: "Sites that look and feel unmistakably yours." },
  { index: "02", title: "Front-end Development",  description: "Fast, modern builds deployed to the edge." },
  { index: "03", title: "Conversion Strategy",    description: "Layouts engineered to turn visitors into clients." },
  { index: "04", title: "SEO & Performance",      description: "Ranked and loaded before the competition." },
  { index: "05", title: "Launch & Handoff",       description: "Smooth go-live with full docs and CMS access." },
] as const;

interface Props {
  progress: MotionValue<number>;
}

function ServiceCard({
  service,
  progress,
  cardIndex,
}: {
  service: (typeof services)[number];
  progress: MotionValue<number>;
  cardIndex: number;
}) {
  const offset = cardIndex * ANIM.cardStagger;
  const [inStart, inEnd] = ANIM.cards.in;

  const opacity = useTransform(
    progress,
    [inStart + offset, inEnd + offset],
    [0, 1],
  );
  const y = useTransform(
    progress,
    [inStart + offset, inEnd + offset],
    [44, 0],
  );

  return (
    <motion.div className={styles.card} style={{ opacity, y }}>
      <span className={styles.cardIndex}>{service.index}</span>
      <div className={styles.cardBottom}>
        <h3 className={styles.cardTitle}>{service.title}</h3>
        <p className={styles.cardDescription}>{service.description}</p>
      </div>
    </motion.div>
  );
}

export function ServicesPanel({ progress }: Props) {
  const [hInStart, hInEnd] = ANIM.heading.in;

  const headingOpacity = useTransform(progress, [hInStart, hInEnd], [0, 1]);
  const headingY = useTransform(progress, [hInStart, hInEnd], [30, 0]);

  return (
    <div id="approach" className={styles.panel}>
      {/* Header */}
      <motion.div
        className={styles.header}
        style={{ opacity: headingOpacity, y: headingY }}
      >
        <span className={styles.label}>
          <span className={styles.labelLine} />
          Services
        </span>
        <h2 className={styles.heading}>
          What we{" "}
          <span className={styles.headingAccent}>deliver</span>
        </h2>
      </motion.div>

      {/* Cards */}
      <div className={styles.cardsWrapper}>
        <div className={styles.cardsRow}>
          {services.map((svc, i) => (
            <ServiceCard
              key={svc.index}
              service={svc}
              progress={progress}
              cardIndex={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
