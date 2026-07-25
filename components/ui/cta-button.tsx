import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

/*
  The single CTA button for the entire site. Every call-to-action is an instance
  of this so the button language stays identical everywhere — change the
  treatment here (or in the shared shine/Button primitives) and it propagates.

  Two styles, both modeled on the hero pair and both carrying the specular shine:
    - "purple"      → solid violet primary (hero "Book a call")
    - "transparent" → outlined secondary  (hero "See the work")

  Not for embedded text links (nav items, footer links) or functional controls
  (toggles, menu icons) — those are not CTAs.
*/
export type CTAVariant = "purple" | "transparent";

export interface CTAButtonProps
  extends Omit<ButtonProps, "variant" | "shine"> {
  variant?: CTAVariant;
}

const variantMap: Record<CTAVariant, ButtonProps["variant"]> = {
  purple: "default",
  transparent: "outline",
};

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ variant = "purple", size = "default", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variantMap[variant]}
        size={size}
        shine
        {...props}
      />
    );
  },
);
CTAButton.displayName = "CTAButton";

export { CTAButton };
