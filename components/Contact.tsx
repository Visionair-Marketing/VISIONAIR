"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Glow behind the form */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.14),transparent_70%)]" />

      <div className="relative mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 space-y-5 text-center"
        >
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-6 bg-accent/60" />
            Get in touch
            <span className="h-px w-6 bg-accent/60" />
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-5xl md:text-6xl">
            Let&apos;s build{" "}
            <span className="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
              something great
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-border-subtle/60 bg-gradient-to-b from-slate-900/70 to-black/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:p-10"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-12 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-xl text-accent">
                ✓
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Message received!</h3>
              <p className="max-w-xs text-sm text-slate-400">
                Thanks for reaching out. We&apos;ll be in touch within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-500">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Jane Smith"
                    className="w-full rounded-xl border border-border-subtle/50 bg-white/5 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none ring-accent/0 transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-500">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-border-subtle/50 bg-white/5 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-500">
                  Company / Project name
                </label>
                <input
                  type="text"
                  placeholder="Acme Inc."
                  className="w-full rounded-xl border border-border-subtle/50 bg-white/5 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-500">
                  Tell us about your project
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="What are you building, who's it for, and when do you need it?"
                  className="w-full resize-none rounded-xl border border-border-subtle/50 bg-white/5 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_14px_50px_rgba(124,58,237,0.5)] transition hover:bg-accent-soft"
              >
                Send message
                <span aria-hidden className="text-base">
                  →
                </span>
              </button>

              <p className="text-center text-[0.65rem] text-slate-600">
                No spam. No hard sell. Just a conversation.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
