import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-gray-400 selection:bg-royal-purple selection:text-white bg-tech-card backdrop-blur-md border-royal-purple/30 flex h-10 w-full min-w-0 rounded-lg border text-neon-white px-4 py-2 text-base shadow-glow transition-all duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-neon-sky focus:shadow-neon-sky focus:bg-royal-purple/10 hover:border-indigo/50 hover:shadow-neon-purple",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
