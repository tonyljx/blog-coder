import type { MetaFunction } from "react-router";
import Container from "~/components/container";
import { mdxComponents } from "~/components/mdx-content";
import { Subheading } from "~/components/subheading";
import { formatPostDate } from "~/lib/format-post-date";
import { getAllInspirations } from "~/lib/inspirations";

export const meta: MetaFunction = () => [
  { title: "Inspiration – Tony Liang" },
];

export default function Inspiration() {
  const items = getAllInspirations();

  return (
    <Container className="pt-6">
      <Subheading>Inspiration</Subheading>
      <div className="mt-6 flex flex-col gap-12">
        {items.map((item) => {
          const Body = item.Component;
          return (
            <article key={item.slug} className="flex flex-col gap-3">
              <header className="flex items-baseline justify-between gap-6">
                <h3 className="text-foreground text-base font-medium">
                  {item.title}
                </h3>
                <span className="text-foreground/50 shrink-0 font-mono text-xs font-light">
                  {formatPostDate(item.publishedAt)}
                </span>
              </header>
              <div className="flex flex-col gap-3">
                <Body components={mdxComponents} />
              </div>
            </article>
          );
        })}
      </div>
    </Container>
  );
}
