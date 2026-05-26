import { IconArrowRight } from "@tabler/icons-react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import Container from "~/components/container";
import { Subheading } from "~/components/subheading";
import { flashProjects } from "~/lib/flashcard-data";

export const meta: MetaFunction = () => [
  { title: "Flashcards – Tony Liang" },
];

export default function Flashcards() {
  return (
    <Container className="pt-6">
      <Subheading>Flashcards</Subheading>
      <p className="text-foreground/70 mt-3 text-sm leading-relaxed">
        按"项目"组织的索引卡。点开一个项目，逐张翻面，自评掌握程度。
      </p>
      <ol className="border-foreground/10 mt-8 divide-foreground/10 divide-y border-y">
        {flashProjects.map((p, i) => (
          <li key={p.id}>
            <Link
              to={`/flashcards/${p.id}`}
              viewTransition
              className="group hover:bg-foreground/[0.015] flex items-baseline gap-5 py-5 transition-colors"
            >
              <span
                className="w-8 shrink-0 font-mono text-xs tabular-nums"
                style={{ color: p.ink }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-foreground group-hover:text-foreground font-medium tracking-tight">
                    {p.title}
                  </span>
                  <span className="text-foreground/35 shrink-0 font-mono text-[11px] tabular-nums">
                    {p.cards.length} 张
                  </span>
                </div>
                <p className="text-foreground/55 mt-1 text-sm text-balance">
                  {p.description}
                </p>
              </div>
              <IconArrowRight
                className="text-foreground/25 group-hover:text-foreground/60 size-3.5 shrink-0 self-center transition group-hover:translate-x-0.5"
                stroke={2}
              />
            </Link>
          </li>
        ))}
      </ol>
    </Container>
  );
}
