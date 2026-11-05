import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "border border-primary bg-primary text-primary-foreground shadow-[0_4px_20px_-4px_rgba(245,184,46,0.45)] hover:bg-amber-400 hover:border-amber-400",
        destructive:
          "border border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary/70 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground",
        secondary:
          "border border-border bg-secondary text-secondary-foreground hover:border-primary/60 hover:text-primary",
        ghost:
          "text-foreground/80 hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2.5",
        sm: "h-8 rounded-md px-3.5 text-[10px] tracking-[0.15em]",
        lg: "h-12 rounded-lg px-8 text-xs tracking-[0.2em]",
        icon: "size-9 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
