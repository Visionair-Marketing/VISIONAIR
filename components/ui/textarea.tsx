import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full resize-none border border-border-subtle bg-surface-raised px-4 py-3 text-sm text-foreground placeholder-muted/60 outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-500/70",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
