import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ButtonShine } from "@/components/ui/button-shine";

/*
  Unified button system. Every CTA on the site routes through this component so
  the button language stays consistent (see design-system.md).

  Editorial character: medium weight, sentence case (not uppercase), subtle
  tracking, and square corners. Buttons opt out of the global 8px radius with
  `rounded-none` so images and containers keep their rounding while buttons stay
  sharp. The `link` variant strips the button chrome for inline text links.
*/
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-[13px] font-medium tracking-[0.01em] outline-none transition-colors duration-300 ease-out focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary action. Static brand gradient fill, one per view ideally.
        // Hover brightens the whole fill via filter since a gradient has no
        // single hover color to swap to; transition-[filter] overrides the
        // base transition-colors (same tailwind-merge group, later wins).
        default:
          "border border-transparent bg-gradient-brand text-foreground transition-[filter] duration-300 ease-out hover:brightness-110",
        // Secondary action. Outlined, quiet until hovered.
        outline:
          "border border-border-strong text-foreground hover:border-foreground/50 hover:bg-surface-raised",
        // Tertiary surface. Filled but subdued.
        secondary:
          "border border-border-subtle bg-surface-raised text-foreground hover:bg-surface-hover",
        // Lowest emphasis. No chrome until hovered.
        ghost: "text-muted hover:bg-surface-hover hover:text-foreground",
        // Inline text link. Opts out of the uppercase/tracked treatment.
        link: "gap-1 normal-case tracking-normal text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4",
        default: "h-11 px-6",
        lg: "h-12 px-8",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /**
   * Adds a WebGL specular edge shine that rides the button border and steers
   * toward the cursor. Each shine button owns one WebGL context, so reserve it
   * for real CTAs. The line/base tones are chosen from the variant.
   */
  shine?: boolean;
}

/*
  Shine tones per variant. lineColor is the moving specular highlight (blooms in
  on hover); baseColor is the faint resting edge. The shine takes one flat
  color, so the gradient primary uses the brand gradient's mid stop; white
  reads as caught light on it. A quiet grey edge suits the outline/surface
  variants.
*/
const shineTones: Record<string, { lineColor: string; baseColor: string }> = {
  default: { lineColor: "#ffffff", baseColor: "#4c5f9e" },
  outline: { lineColor: "#ffffff", baseColor: "#5b5b66" },
  secondary: { lineColor: "#ffffff", baseColor: "#5b5b66" },
  ghost: { lineColor: "#ffffff", baseColor: "#5b5b66" },
  link: { lineColor: "#ffffff", baseColor: "#5b5b66" },
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, shine = false, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const tone = shineTones[variant ?? "default"] ?? shineTones.default;
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          shine && "relative",
        )}
        ref={ref}
        {...props}
      >
        {shine && (
          <ButtonShine lineColor={tone.lineColor} baseColor={tone.baseColor} />
        )}
        <Slottable>{children}</Slottable>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
