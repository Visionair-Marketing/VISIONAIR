"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const ease = [0.22, 1, 0.36, 1] as const;

// Placeholder testimonials — no real client quotes yet. Swap before launch.
const testimonials = [
  {
    text: "Our new site started pulling in booking enquiries within the first week. The design finally matches the quality of the work we do.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Daniel Brooks",
    role: "Owner, Brooks Landscaping",
  },
  {
    text: "Listings that used to sit for weeks are moving faster. The site loads instantly and makes every property look premium.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Priya Sharma",
    role: "Director, Meridian Real Estate",
  },
  {
    text: "The lead forms and ad creative work together properly now. We can actually see where every enquiry comes from.",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    name: "Marcus Reed",
    role: "GM, Reed Auto Group",
  },
  {
    text: "They understood our brand in the first call and shipped a site that felt like us, not a template with our logo dropped in.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Elena Popova",
    role: "Founder, Verdant Gardens",
  },
  {
    text: "Search traffic doubled over three months and the enquiries are better qualified. Reporting is clear enough that I actually read it.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    name: "James Okafor",
    role: "Partner, Okafor Property Group",
  },
  {
    text: "Turnaround is fast and communication is direct. It feels like having an in-house team without the overhead.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Sofia Alvarez",
    role: "Marketing Lead, Coastline Motors",
  },
  {
    text: "The redesign paid for itself. More people reach the contact page and more of them actually fill it out.",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
    name: "Tom Whitfield",
    role: "Owner, Whitfield Outdoor",
  },
  {
    text: "Every deliverable came back polished and on time. No chasing, no excuses, just good work.",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    name: "Amara Nwosu",
    role: "Director, Halcyon Homes",
  },
  {
    text: "Our showroom traffic is up since the new campaigns went live. The creative finally looks like the cars we sell.",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    name: "Kevin Tanaka",
    role: "Sales Director, Apex Motors",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section className="relative border-b border-border-subtle bg-background py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-xl flex-col items-center text-center"
        >
          <span className="border border-border-subtle px-4 py-1 text-xs uppercase tracking-[0.18em] text-muted">
            Testimonials
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What our clients say
          </h2>
          <p className="mt-5 text-body text-muted">
            Results from the businesses we build for.
          </p>
        </motion.div>

        <div className="mt-12 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
