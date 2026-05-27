import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

type TocItem = {
  id: string;
  text: string;
  depth: 2 | 3 | 4;
  children: TocItem[];
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

function collectHeadings(selector: string): TocItem[] {
  const article = document.querySelector<HTMLElement>(selector);
  if (!article) return [];

  const seen = new Map<string, number>();
  const headings = Array.from(
    article.querySelectorAll<HTMLHeadingElement>("h2, h3, h4"),
  );

  return headings
    .map((heading, index) => {
      const text = heading.textContent?.trim();
      if (!text) return null;

      const id = heading.id || uniqueSlug(slugifyHeading(text, index), seen);
      heading.id = id;

      const item: TocItem = {
        id,
        text,
        depth: Number(heading.tagName.slice(1)) as 2 | 3 | 4,
        children: [],
      };

      return item;
    })
    .filter((item): item is TocItem => Boolean(item));
}

function buildTree(items: TocItem[]) {
  const result: TocItem[] = [];
  const stack: TocItem[] = [];

  for (const item of items) {
    const node: TocItem = { ...item, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].depth >= node.depth) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];
    if (parent) {
      parent.children.push(node);
    } else {
      result.push(node);
    }

    stack.push(node);
  }

  return result;
}

export function TableOfContents({
  contentSelector = "[data-mdx-content]",
}: {
  contentSelector?: string;
}) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>();
  const [markerTop, setMarkerTop] = useState(32);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const flatItems = collectHeadings(contentSelector);
    const nextItems = buildTree(flatItems);
    setItems(nextItems);
    setActiveId(flatItems[0]?.id);

    if (flatItems.length === 0) return;

    const updateActiveHeading = () => {
      const headings = flatItems
        .map((item) => document.getElementById(item.id))
        .filter((heading): heading is HTMLElement => Boolean(heading));

      if (headings.length === 0) return;

      const isBottom =
        Math.abs(
          window.scrollY + window.innerHeight - document.body.offsetHeight,
        ) < 2;
      const anchorOffset = 112;
      const current = isBottom
        ? headings[headings.length - 1]
        : headings
            .filter(
              (heading) =>
                heading.getBoundingClientRect().top - anchorOffset <= 0,
            )
            .at(-1) ?? headings[0];

      const link = Array.from(
        navRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
      ).find((anchor) => anchor.getAttribute("href") === `#${current.id}`);

      setActiveId(current.id);
      if (link && navRef.current) {
        const linkRect = link.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        setMarkerTop(linkRect.top - navRect.top + linkRect.height / 2 - 9);
      }
    };

    let frame = 0;
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveHeading);
    };

    const initialUpdate = window.setTimeout(scheduleUpdate, 0);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.clearTimeout(initialUpdate);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [contentSelector]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block xl:self-stretch">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden">
        <nav
          ref={navRef}
          aria-labelledby="table-of-contents-title"
          className="border-border/80 relative border-l pl-4 text-sm"
        >
          <div
            className="bg-primary absolute left-[-1px] h-[18px] w-0.5 rounded-full opacity-100 transition-[top,opacity] duration-200 ease-out"
            style={{ top: markerTop }}
            aria-hidden="true"
          />
          <div
            id="table-of-contents-title"
            className="text-foreground mb-1 h-8 truncate text-sm leading-8 font-medium"
          >
            On this page
          </div>
          <TocItems items={items} activeId={activeId} root />
        </nav>
      </div>
    </aside>
  );
}

function TocItems({
  items,
  activeId,
  root = false,
}: {
  items: TocItem[];
  activeId?: string;
  root?: boolean;
}) {
  return (
    <ul className={cn("relative z-10", !root && "pl-4")}>
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              title={item.text}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "block h-8 truncate leading-8 font-normal transition-colors duration-200",
                isActive
                  ? "text-foreground"
                  : "text-foreground/50 hover:text-foreground/80",
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
              {item.text}
            </a>
            {item.children.length > 0 ? (
              <TocItems items={item.children} activeId={activeId} />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
