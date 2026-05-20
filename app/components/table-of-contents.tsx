import { IconListDetails } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

type TocItem = {
  id: string;
  text: string;
  depth: 2 | 3;
};

function slugifyHeading(text: string, index: number) {
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/[\s/]+/g, "-")
    .replace(/[^\p{Letter}\p{Number}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || `section-${index + 1}`;
}

function uniqueSlug(base: string, seen: Map<string, number>) {
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

function collectHeadings(selector: string) {
  const article = document.querySelector<HTMLElement>(selector);
  if (!article) return [];

  const seen = new Map<string, number>();
  const headings = Array.from(
    article.querySelectorAll<HTMLHeadingElement>("h2, h3"),
  );

  return headings
    .map((heading, index) => {
      const text = heading.textContent?.trim();
      if (!text) return null;

      const id = heading.id || uniqueSlug(slugifyHeading(text, index), seen);
      heading.id = id;

      return {
        id,
        text,
        depth: Number(heading.tagName.slice(1)) as 2 | 3,
      };
    })
    .filter((item): item is TocItem => Boolean(item));
}

export function TableOfContents({
  contentSelector = "[data-mdx-content]",
}: {
  contentSelector?: string;
}) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const nextItems = collectHeadings(contentSelector);
    setItems(nextItems);
    setActiveId(nextItems[0]?.id);

    if (nextItems.length === 0) return;

    const updateActiveHeading = () => {
      const article = document.querySelector<HTMLElement>(contentSelector);
      const headings = nextItems
        .map((item) => document.getElementById(item.id))
        .filter((heading): heading is HTMLElement => Boolean(heading));

      const anchorOffset = 128;
      const current =
        headings
          .filter(
            (heading) =>
              heading.getBoundingClientRect().top - anchorOffset <= 0,
          )
          .at(-1) ?? headings[0];

      setActiveId(current.id);

      if (article) {
        const articleTop = article.getBoundingClientRect().top + window.scrollY;
        const readableHeight = Math.max(
          article.scrollHeight - window.innerHeight * 0.45,
          1,
        );
        const scrolled = window.scrollY + anchorOffset - articleTop;
        setProgress(
          Math.min(100, Math.max(0, (scrolled / readableHeight) * 100)),
        );
      }
    };

    updateActiveHeading();
    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [contentSelector]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block xl:self-stretch">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden pl-2">
        <div className="text-foreground/70 mb-4 flex items-center gap-2 text-sm font-medium">
          <IconListDetails className="size-4" aria-hidden="true" />
          <span>On this page</span>
        </div>
        <nav aria-label="Table of contents" className="relative pl-5">
          <div className="bg-border absolute top-1 bottom-1 left-0 w-px" />
          <div
            className="bg-primary absolute top-1 left-0 w-px transition-[height] duration-200"
            style={{ height: `calc(${progress}% - 0.25rem)` }}
            aria-hidden="true"
          />
          <ul className="flex flex-col gap-1.5">
            {items.map((item) => {
              const isActive = item.id === activeId;

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative block py-1 text-sm leading-5 transition-colors",
                      item.depth === 3 && "pl-4",
                      isActive
                        ? "text-primary font-medium"
                        : "text-foreground/45 hover:text-foreground/80",
                    )}
                    onClick={(event) => {
                      event.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      window.history.replaceState(null, "", `#${item.id}`);
                    }}
                  >
                    <span
                      className={cn(
                        "absolute top-1/2 -left-[1.45rem] size-1.5 -translate-y-1/2 rounded-full transition-all",
                        isActive
                          ? "bg-primary scale-100 opacity-100"
                          : "bg-border scale-75 opacity-0",
                      )}
                      aria-hidden="true"
                    />
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
