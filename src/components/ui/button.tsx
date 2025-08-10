import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-royal-purple via-indigo to-sky-blue text-white shadow-neon-purple hover:shadow-neon-sky hover:from-sky-blue hover:via-royal-purple hover:to-indigo transform hover:-translate-y-0.5 transition-all duration-300",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-neon-red hover:shadow-lg hover:from-red-500 hover:to-red-600 transform hover:-translate-y-0.5 transition-all duration-300",
        outline:
          "border border-royal-purple/30 bg-tech-card backdrop-blur-md text-neon-white hover:bg-royal-purple/20 hover:border-royal-purple hover:text-neon-white hover:shadow-neon-purple transition-all duration-300",
        secondary:
          "bg-tech-card backdrop-blur-md text-neon-white border border-indigo/20 hover:bg-indigo/20 hover:border-indigo hover:shadow-neon-indigo transition-all duration-300",
        ghost:
          "text-neon-white hover:bg-royal-purple/20 hover:text-white hover:shadow-glow transition-all duration-300",
        link: "text-sky-blue underline-offset-4 hover:underline hover:text-neon-sky transition-colors duration-300",
        neon: "bg-gradient-to-r from-neon-sky to-royal-purple text-white shadow-neon-sky border border-neon-sky/50 hover:shadow-neon-purple hover:border-royal-purple/50 transform hover:scale-105 transition-all duration-300 glow-animation",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
