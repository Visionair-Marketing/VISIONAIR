"use client";

import { Pricing as PricingBlock } from "@/components/blocks/pricing";

// Placeholder plan data. Swap for real pricing before launch.
const plans = [
  {
    name: "Starter",
    price: "350",
    yearlyPrice: "250",
    period: "per month",
    features: [
      "One landing page or up to 5 pages",
      "Responsive design and build",
      "Basic on-page SEO setup",
      "Contact and lead capture forms",
      "Email support",
    ],
    buttonText: "Book a call",
    href: "#contact",
    isPopular: false,
  },
  {
    name: "Growth",
    price: "650",
    yearlyPrice: "500",
    period: "per month",
    features: [
      "Full multi-page site design and build",
      "SEO strategy and monthly optimization",
      "Ad creative for one channel",
      "Monthly performance reporting",
      "Priority support",
      "Quarterly strategy review",
    ],
    buttonText: "Book a call",
    href: "#contact",
    isPopular: false,
  },
  {
    name: "Scale",
    price: "950",
    yearlyPrice: "750",
    period: "per month",
    features: [
      "Everything in Growth",
      "Multi-channel ad creative and management",
      "Dedicated account manager",
      "Lead sourcing and pipeline setup",
      "Conversion rate optimization",
      "Custom integrations",
    ],
    buttonText: "Contact sales",
    href: "#contact",
    isPopular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative border-b border-border-subtle bg-surface">
      <PricingBlock plans={plans} title="Pricing" />
    </section>
  );
}
