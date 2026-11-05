import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-none border px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.22em] transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-primary/50 bg-[#0c0b09]/90 text-primary",
        secondary:
          "border-border bg-secondary/80 text-secondary-foreground",
        outline:
          "border-primary/35 bg-transparent text-primary",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
