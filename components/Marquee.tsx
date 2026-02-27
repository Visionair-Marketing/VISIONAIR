"use client";

const capabilities = [
  "Brand Identity",
  "Web Design",
  "Front-end Development",
  "Conversion Strategy",
  "SEO Optimised",
  "Mobile-first",
  "Lighthouse 98+",
  "Edge-deployed",
  "UX Strategy",
  "Copywriting",
  "Design Systems",
  "Performance Tuned",
];

const Dot = () => (
  <span className="mx-4 inline-block h-1 w-1 shrink-0 rounded-full bg-accent/60" />
);

export function Marquee() {
  const items = [...capabilities, ...capabilities];

  return (
    <div className="relative overflow-hidden border-b border-border-subtle/40 bg-black py-4">
      {/* Fade masks on edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee 28s linear infinite",
          willChange: "transform",
        }}
      >
        {items.map((cap, i) => (
          <span
            key={i}
            className="inline-flex shrink-0 items-center text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400"
          >
            {cap}
            <Dot />
          </span>
        ))}
      </div>

    </div>
  );
}
