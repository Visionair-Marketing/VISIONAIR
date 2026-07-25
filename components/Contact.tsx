"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type Status = "idle" | "submitting" | "success" | "error";

interface FormValues {
  name: string;
  email: string;
  company: string;
  project: string;
}

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.project.trim()) errors.project = "Tell us a little about your project.";
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    company: "",
    project: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: keyof FormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear a field's error as soon as the user edits it.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      // TODO: wire up a real endpoint before launch. The server-side handler
      // must validate input, rate-limit submissions, and must not log PII
      // (name/email). This client currently simulates a successful send.
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-12 block text-center text-xs font-semibold uppercase tracking-[0.26em] text-foreground/40"
        >
          Let&apos;s talk
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="grid"
        >
          {/* Stacked in the same grid cell as the form so the section's
              height stays fixed at whichever state is taller, instead of
              reflowing when the success message swaps in. */}
          <div
            inert={status !== "success"}
            aria-hidden={status !== "success"}
            className={cn(
              "col-start-1 row-start-1 flex flex-col items-center justify-center gap-3 py-12 text-center transition-opacity duration-700",
              status === "success" ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <h3 className="text-lg font-medium text-foreground">Message received</h3>
            <p className="max-w-xs text-body text-muted">
              Thanks for reaching out. We&apos;ll be in touch within 24 hours.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            inert={status === "success"}
            aria-hidden={status === "success"}
            className={cn(
              "col-start-1 row-start-1 space-y-12 transition-opacity duration-700",
              status === "success" ? "pointer-events-none opacity-0" : "opacity-100",
            )}
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-[10px] text-muted">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Jane Smith"
                value={values.name}
                onChange={update("name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="w-full border-0 border-b border-border-subtle bg-transparent pb-2 text-xs text-foreground placeholder:text-muted/50 focus:border-foreground focus:outline-none"
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-[10px] text-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="jane@company.com"
                value={values.email}
                onChange={update("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="w-full border-0 border-b border-border-subtle bg-transparent pb-2 text-xs text-foreground placeholder:text-muted/50 focus:border-foreground focus:outline-none"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="mb-2 block text-[10px] text-muted">
                Company (optional)
              </label>
              <input
                id="company"
                type="text"
                placeholder="Acme Inc."
                value={values.company}
                onChange={update("company")}
                className="w-full border-0 border-b border-border-subtle bg-transparent pb-2 text-xs text-foreground placeholder:text-muted/50 focus:border-foreground focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="project" className="mb-2 block text-[10px] text-muted">
                Project
              </label>
              <textarea
                id="project"
                rows={3}
                placeholder="What are you building, who's it for, and when do you need it?"
                value={values.project}
                onChange={update("project")}
                aria-invalid={!!errors.project}
                aria-describedby={errors.project ? "project-error" : undefined}
                className="w-full resize-none border-0 border-b border-border-subtle bg-transparent pb-2 text-xs text-foreground placeholder:text-muted/50 focus:border-foreground focus:outline-none"
              />
              {errors.project && (
                <p id="project-error" className="mt-1 text-xs text-red-400">
                  {errors.project}
                </p>
              )}
            </div>

            {status === "error" && (
              <p className="text-body text-red-400">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            <CTAButton
              type="submit"
              variant="purple"
              disabled={status === "submitting"}
              className="w-full"
            >
              {status === "submitting" ? "Sending…" : "Send"}
            </CTAButton>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
