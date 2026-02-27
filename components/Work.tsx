"use client";

import { motion } from "framer-motion";

const projects = [
  {
    client: "Horizon Legal",
    industry: "Professional Services",
    headline: "A law firm that finally looks as sharp as its team.",
    outcome: "+340% qualified enquiries",
    tags: ["Brand Refresh", "Web Design", "SEO"],
    year: "2026",
    color: "from-slate-700/40",
  },
  {
    client: "Apex Fit Co.",
    industry: "Health & Wellness",
    headline: "An e-commerce rebrand that drove 6-figure opening week revenue.",
    outcome: "98 Lighthouse · 1.1s FCP",
    tags: ["E-commerce", "Performance", "Copy"],
    year: "2025",
    color: "from-purple-800/30",
  },
  {
    client: "Castleoak Group",
    industry: "Real Estate",
    headline: "Repositioning a property developer for the premium market.",
    outcome: "+180% session duration",
    tags: ["Identity", "UI Design", "CRO"],
    year: "2025",
    color: "from-indigo-800/30",
  },
  {
    client: "Vault Studio",
    industry: "Creative Agency",
    headline: "Portfolio site that books clients before they even send an email.",
    outcome: "2× conversion rate",
    tags: ["Portfolio", "Animation", "Next.js"],
    year: "2026",
    color: "from-violet-800/30",
  },
];

const ease = [0.22, 0.61, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export function Work() {
  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 space-y-4"
        >
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-6 bg-accent/60" />
            Work
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-5xl md:text-6xl">
            Recent{" "}
            <span className="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
              launches
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-6"
        >
          {projects.map((project) => (
            <motion.article
              key={project.client}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-3xl border border-border-subtle/60 bg-gradient-to-r from-slate-950 via-slate-900/80 to-black px-8 py-10 sm:px-10 sm:py-12"
            >
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">
                    {project.industry}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                    {project.client}
                  </h3>
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  {project.year}
                </p>
              </div>

              <p className="mb-6 max-w-2xl text-sm sm:text-base text-slate-300">
                {project.headline}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  {project.outcome}
                </div>
                <div className="flex flex-wrap gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
