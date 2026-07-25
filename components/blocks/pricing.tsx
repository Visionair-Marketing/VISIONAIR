"use client";

import { CTAButton } from "@/components/ui/cta-button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import NumberFlow from "@number-flow/react";

const ease = [0.22, 1, 0.36, 1] as const;

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
}

export function Pricing({ plans, title = "Pricing" }: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const prefersReducedMotion = useReducedMotion();

  const animate = isDesktop && !prefersReducedMotion;

  return (
    <div className="container mx-auto px-6 py-24 sm:px-8 lg:px-10">
      <div className="mb-14 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.26em] text-foreground/40">
          {title}
        </span>
      </div>

      {/* Segmented pill toggle. Sliding indicator rides under the active label. */}
      <div className="mb-16 flex justify-center">
        <div className="relative inline-flex rounded-full border border-border-subtle bg-surface-raised p-0.5">
          {[
            { label: "Monthly", value: true },
            { label: "Annual", value: false },
          ].map((option) => {
            const isActive = isMonthly === option.value;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => setIsMonthly(option.value)}
                className="relative z-10 rounded-full px-4 py-1.5 text-body font-normal outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {isActive && (
                  <motion.span
                    layoutId="billing-pill"
                    className="absolute inset-0 rounded-full bg-gradient-brand"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 300, damping: 30 }
                    }
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 transition-colors",
                    isActive ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {option.label}
                  {option.value === false && (
                    <span className={cn("ml-1.5", isActive ? "text-foreground/80" : "text-accent")}>
                      Save 20%
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 md:grid-cols-3 lg:gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ y: animate ? 24 : 0, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 1.1,
              ease,
              delay: prefersReducedMotion ? 0 : index * 0.14,
            }}
            className={cn(
              "relative flex flex-col p-8 text-left",
              "border bg-surface-faint",
              plan.name === "Scale" || plan.name === "Growth"
                ? "border-accent bg-surface-raised"
                : "border-border-subtle",
            )}
          >
            {plan.name === "Growth" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  Recommended
                </span>
              </div>
            )}

            <h3
              className={cn(
                "text-4xl font-medium leading-tight",
                plan.name === "Scale"
                  ? "bg-gradient-brand bg-clip-text text-transparent"
                  : "text-foreground",
              )}
            >
              {plan.name}
            </h3>

            <div className="mt-6 flex items-baseline gap-x-2">
              <span className="text-5xl font-semibold tracking-tight text-foreground">
                <NumberFlow
                  value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
                  format={{
                    style: "currency",
                    currency: "CAD",
                    currencyDisplay: "narrowSymbol",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }}
                  transformTiming={{ duration: 500, easing: "ease-out" }}
                  willChange
                  className="tabular-nums"
                />
              </span>
              {plan.period !== "Next 3 months" && (
                <span className="text-xs text-muted">/ CAD {isMonthly ? "billed monthly" : "billed annually"} </span>
              )}
            </div>

            <CTAButton
              asChild
              variant={plan.name === "Starter" ? "transparent" : "purple"}
              className="mt-8 w-full"
            >
              <Link href={plan.href}>{plan.buttonText}</Link>
            </CTAButton>

            <div className="mt-8 flex flex-col gap-4 border-t border-border-subtle pt-6">
              <p className="eyebrow text-muted">What&apos;s included</p>
              <ul className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 flex-shrink-0",
                        plan.name === "Starter" || plan.name === "Growth" ? "text-muted" : "text-accent",
                      )}
                    />
                    <span className="text-body text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
