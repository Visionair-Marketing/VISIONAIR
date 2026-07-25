"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={props.className}>
      <motion.div
        animate={prefersReducedMotion ? undefined : { translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 bg-background pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="w-full max-w-xs border border-border-subtle bg-surface-faint p-8"
                  key={i}
                >
                  <p className="text-body text-foreground/90">{text}</p>
                  <div className="mt-5 flex items-center gap-3">
                    {/* Placeholder avatars — swap for real client photos before launch. */}
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="dot h-10 w-10 object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="text-body font-normal leading-5 tracking-tight text-foreground">
                        {name}
                      </div>
                      <div className="text-body leading-5 tracking-tight text-muted">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
