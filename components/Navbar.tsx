"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="sticky top-0 z-30 border-b border-border-subtle/60 bg-black/40 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="h-7 w-7 rounded-full bg-accent-soft/40 ring-1 ring-accent/50 transition-all group-hover:bg-accent/80 group-hover:ring-accent" />
          <span className="text-sm font-semibold tracking-[0.25em] text-slate-200 uppercase">
            Visionair
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-white",
                "data-[active=true]:text-white data-[active=true]:underline",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_40px_rgba(124,58,237,0.35)] transition hover:border-accent hover:bg-accent"
          >
            Let&apos;s talk
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="#contact"
            className="inline-flex items-center rounded-full border border-accent/70 bg-accent/90 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_24px_rgba(124,58,237,0.4)] transition hover:border-accent hover:bg-accent"
          >
            Let&apos;s talk
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}

