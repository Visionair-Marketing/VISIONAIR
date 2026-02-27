"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const WORD = "VISIONAIR";

const ease = [0.22, 0.61, 0.36, 1] as const;

const letterContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
};

const letterVariant = {
  hidden: { y: "115%", skewY: 4 },
  visible: {
    y: "0%",
    skewY: 0,
    transition: { duration: 0.72, ease },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-start justify-center gap-10 px-6 pb-20 pt-16 sm:px-10 lg:px-14">

        {/* Massive VISIONAIR wordmark */}
        <motion.div
          variants={letterContainer}
          initial="hidden"
          animate="visible"
          aria-label={WORD}
          className="flex leading-none"
          style={{ fontSize: "clamp(3.8rem, 16.2vw, 22rem)" }}
        >
          {WORD.split("").map((letter, i) => (
            <div key={i} className="overflow-hidden leading-none">
              <motion.span
                variants={letterVariant}
                className="block select-none font-bold leading-[0.88] tracking-[-0.02em] text-purple-600"
              >
                {letter}
              </motion.span>
            </div>
          ))}
        </motion.div>

        {/* Motto */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.7, ease }}
          className="text-base font-medium tracking-wide text-slate-500 sm:text-lg"
        >
          Your vision into business growth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.88, ease }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_14px_48px_rgba(124,58,237,0.38)] transition hover:bg-purple-700"
          >
            Book a discovery call
          </Link>
          <Link
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-black px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
          >
            View recent launches
            <span aria-hidden className="text-base">
              ↗
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Clean separator into dark sections */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-slate-100" />
    </section>
  );
}
