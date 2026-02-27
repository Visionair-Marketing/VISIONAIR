"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const tiers = [
  {
    name: "Launchpad",
    tagline: "For teams launching fast",
    description:
      "A fixed-scope website project from discovery to live. Perfect for businesses that need a polished online presence, done properly, without the agency overhead.",
    price: "From £3,500",
    period: "one-time project",
    features: [
      "Discovery & strategy session",
      "Up to 6 custom pages",
      "Brand-aligned design",
      "Next.js front-end build",
      "CMS integration & training",
      "SEO foundations",
      "90-day post-launch support",
    ],
    cta: "Start a project",
    href: "#contact",
    highlighted: false,
  },
  {
    name: "Studio",
    tagline: "For brands that move fast",
    description:
      "An ongoing creative partner. We handle your web presence on retainer — iterating, improving, and shipping new work every month as your business grows.",
    price: "From £1,200",
    period: "per month",
    features: [
      "Everything in Launchpad",
      "Unlimited design revisions",
      "Monthly development sprints",
      "A/B testing & CRO",
      "Analytics & reporting",
      "Priority turnaround",
      "Dedicated Slack channel",
    ],
    cta: "Book a discovery call",
    href: "#contact",
    highlighted: true,
  },
];

const TILT = 14;
const LIFT = 1.04;

function TiltCard({ children, className }: { children: React.ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateY = useSpring(rawX, springConfig);
  const rotateX = useSpring(rawY, springConfig);
  const scale = useSpring(1, { stiffness: 260, damping: 24 });
  const glareX = useTransform(rawX, [-TILT, TILT], ["0%", "100%"]);
  const glareY = useTransform(rawY, [-TILT, TILT], ["100%", "0%"]);
  const glareOpacity = useSpring(0, { stiffness: 260, damping: 24 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const px = (e.clientX - left) / width - 0.5;
    const py = (e.clientY - top) / height - 0.5;
    rawX.set(px * TILT * 2);
    rawY.set(-py * TILT * 2);
    scale.set(LIFT);
    glareOpacity.set(0.12);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    scale.set(1);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {/* Glare overlay */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          opacity: glareOpacity,
          background: useTransform(
            [glareX, glareY],
            ([x, y]) =>
              `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.55) 0%, transparent 70%)`,
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] as const } },
};

export function Pricing() {
  return (
    <section className="relative py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-5 text-center"
        >
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-6 bg-accent/60" />
            Pricing
            <span className="h-px w-6 bg-accent/60" />
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-5xl md:text-6xl">
            Simple,{" "}
            <span className="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
              transparent
            </span>{" "}
            pricing
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {tiers.map((tier) => (
            <motion.div key={tier.name} variants={cardVariants}>
              <TiltCard
                className={`relative flex flex-col overflow-hidden rounded-3xl border px-8 py-10 sm:px-10 sm:py-12 ${
                  tier.highlighted
                    ? "border-accent/60 bg-gradient-to-b from-accent/14 via-slate-950 to-black shadow-[0_0_80px_rgba(124,58,237,0.22)]"
                    : "border-border-subtle/60 bg-gradient-to-b from-slate-900/70 to-black/90"
                }`}
              >
              {tier.highlighted && (
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
              )}

              {tier.highlighted && (
                <span className="mb-5 inline-flex max-w-fit rounded-full bg-accent/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  Most popular
                </span>
              )}

              <div className="mb-7 space-y-3">
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-slate-500">
                  {tier.tagline}
                </p>
                <h3 className="text-2xl font-semibold tracking-tight text-slate-50">
                  {tier.name}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">{tier.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold tracking-tight text-slate-50">
                  {tier.price}
                </span>
                <span className="ml-2 text-xs text-slate-500">{tier.period}</span>
              </div>

              <ul className="mb-9 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-slate-200">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/25 text-[10px] text-accent">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`inline-flex w-full items-center justify-center rounded-full py-3 text-xs font-semibold uppercase tracking-[0.22em] transition ${
                  tier.highlighted
                    ? "bg-accent text-white shadow-[0_12px_40px_rgba(124,58,237,0.5)] hover:bg-accent-soft"
                    : "border border-border-subtle/70 bg-white/5 text-slate-200 hover:border-slate-400 hover:text-white"
                }`}
              >
                {tier.cta}
              </Link>
            </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center text-[0.7rem] text-slate-600"
        >
          Need something custom?{" "}
          <Link href="#contact" className="text-slate-400 underline-offset-2 hover:underline">
            Let&apos;s talk
          </Link>{" "}
          — enterprise and bespoke scopes welcome.
        </motion.p>
      </div>
    </section>
  );
}
