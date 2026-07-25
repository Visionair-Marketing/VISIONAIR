"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { basePath } from "@/lib/base-path";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border-subtle">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Link href="/" className="inline-flex items-center opacity-90 transition-opacity hover:opacity-100">
            <Image
              src={`${basePath}/logo/wordmark.png`}
              alt="Visionair"
              width={2630}
              height={356}
              className="h-[18px] w-auto"
            />
          </Link>
        </motion.div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border-subtle pt-8 text-[0.65rem] text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Visionair. All rights reserved.</p>
          <nav className="flex flex-wrap gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="uppercase tracking-[0.14em] transition hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
