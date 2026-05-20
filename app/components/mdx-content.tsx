import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";
import { Link } from "react-router";
import type { MDXComponents } from "mdx/types";
import { cn } from "~/lib/utils";

function isInternalLink(href?: string) {
  return Boolean(href?.startsWith("/"));
}

function MdxLink({
  href,
  className,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const linkClassName = cn(
    "text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary/50",
    className,
  );

  if (isInternalLink(href)) {
    return <Link to={href ?? "/"} className={linkClassName} {...props} />;
  }

  return (
    <a
      href={href}
      className={linkClassName}
      rel="noreferrer"
      target={href?.startsWith("http") ? "_blank" : undefined}
      {...props}
    />
  );
}

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h2
      className={cn(
        "text-foreground mt-10 scroll-mt-24 text-xl font-medium",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "text-foreground mt-10 scroll-mt-24 text-xl font-medium",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "text-foreground mt-8 scroll-mt-24 text-lg font-medium",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("text-foreground/80 leading-7 text-base", className)}
      {...props}
    />
  ),
  a: MdxLink,
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "text-foreground/75 list-disc space-y-2 pl-5 leading-7",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "text-foreground/75 list-decimal space-y-2 pl-5 leading-7",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("pl-1", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "border-border text-foreground/70 border-l-2 pl-4 italic",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    const isBlockCode =
      className?.includes("language-") || typeof children !== "string";

    return (
      <code
        className={cn(
          isBlockCode
            ? "font-mono"
            : "bg-muted text-foreground rounded-sm px-1 py-0.5 font-mono text-[0.88em]",
          className,
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "bg-muted/80 border-border overflow-x-auto rounded-md border p-4 text-sm leading-6",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("border-border my-8", className)} {...props} />
  ),
  img: ({ className, alt, ...props }) => (
    <img
      className={cn("border-border rounded-md border", className)}
      alt={alt ?? ""}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="overflow-x-auto">
      <table
        className={cn("w-full border-collapse text-sm", className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border-border text-foreground border-b px-3 py-2 text-left font-medium",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn("border-border text-foreground/75 border-b px-3 py-2", className)}
      {...props}
    />
  ),
};

export function MdxContent({ children }: { children: ReactNode }) {
  return (
    <article data-mdx-content className="mt-8 flex flex-col gap-5">
      {children}
    </article>
  );
}
