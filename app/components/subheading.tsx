import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

export const Subheading = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "text-foreground/40 font-mono text-sm tracking-wide uppercase",
        className,
      )}
    >
      {children}
    </h2>
  );
};
