"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Placeholder slot. Visionair is pre-launch — there's no real case study yet.
 * Filling this with fabricated client names is a credibility risk with a real
 * prospective client, not just a style choice, so it stays an honest empty
 * state until there's real work to show.
 */
export function Work() {
  return (
    <section id="work" className="relative border-b border-border-subtle py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-14 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          Work
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="border border-dashed border-accent/40 px-8 py-16 text-center"
        >
          <p className="text-body text-accent">First project in progress.</p>
          <p className="mx-auto mt-3 max-w-md text-body text-muted">
            This section goes live once there&apos;s real work to show —
            no placeholder case studies.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
