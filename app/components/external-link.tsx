import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

/**
 * Inline external link with an underlined style. Replaces the template's
 * LinkPreview hover-card with a lightweight, dependency-free anchor.
 */
export const ExternalLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground",
        className,
      )}
    >
      {children}
    </a>
  );
};
