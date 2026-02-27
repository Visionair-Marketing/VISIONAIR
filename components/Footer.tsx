"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#approach" },
  { label: "Pricing", href: "#contact" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border-subtle/40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center"
        >
          {/* Logo */}
          <Link href="/" className="group inline-flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-accent-soft/40 ring-1 ring-accent/50 transition-all group-hover:bg-accent/80 group-hover:ring-accent" />
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">
              Visionair
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6 text-xs text-slate-500">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="uppercase tracking-[0.16em] transition hover:text-slate-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border-subtle/30 pt-8 text-[0.65rem] text-slate-600 sm:flex-row sm:items-center"
        >
          <p>© {new Date().getFullYear()} Visionair. All rights reserved.</p>
          <p className="uppercase tracking-[0.16em]">
            Minimal. Fast. Obsessively polished.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
