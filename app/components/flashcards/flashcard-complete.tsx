import {
  IconArrowBackUp,
  IconArrowLeft,
  IconCheck,
  IconRefresh,
  IconStarFilled,
} from "@tabler/icons-react";
import type { ComponentType } from "react";
import { Link } from "react-router";
import type { CardStatus, FlashProject } from "~/lib/flashcard-data";

interface Props {
  project: FlashProject;
  statuses: Record<string, CardStatus>;
  onRestart: () => void;
}

const ROWS: {
  key: "mastered" | "remembered" | "forgot";
  label: string;
  Icon: ComponentType<{ className?: string; stroke?: number }>;
}[] = [
  { key: "mastered", label: "已掌握", Icon: IconStarFilled },
  { key: "remembered", label: "记住了", Icon: IconCheck },
  { key: "forgot", label: "记不住", Icon: IconArrowBackUp },
];

export const FlashcardComplete = ({
  project,
  statuses,
  onRestart,
}: Props) => {
  const total = project.cards.length;
  const counts = { mastered: 0, remembered: 0, forgot: 0 };
  for (const s of Object.values(statuses)) {
    if (s === "mastered" || s === "remembered" || s === "forgot") {
      counts[s]++;
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-2 py-8">
      <span
        aria-hidden
        className="complete-child mb-6 h-px w-12"
        style={{ backgroundColor: project.ink }}
      />
      <p
        className="complete-child font-mono text-[10px] tracking-[0.2em] uppercase"
        style={{ color: project.ink }}
      >
        本组已完成
      </p>
      <h3 className="complete-child text-foreground mt-3 text-3xl font-medium tracking-tight">
        {project.title}
      </h3>
      <p className="complete-child text-foreground/55 mt-2 text-sm">
        共 {total} 张卡片 · 你已完成全部自评
      </p>

      <dl className="complete-child border-foreground/10 mt-8 divide-foreground/10 divide-y border-y">
        {ROWS.map(({ key, label, Icon }) => (
          <div
            key={key}
            className="flex items-center justify-between py-3.5"
          >
            <div className="text-foreground/75 flex items-center gap-2.5">
              <Icon className="text-foreground/45 size-3.5" stroke={2} />
              <dt className="text-sm">{label}</dt>
            </div>
            <dd className="text-foreground font-mono text-xl tabular-nums">
              {String(counts[key]).padStart(2, "0")}
            </dd>
          </div>
        ))}
      </dl>

      <div className="complete-child mt-8 flex gap-2">
        <button
          type="button"
          onClick={onRestart}
          className="bg-foreground text-background hover:bg-foreground/90 inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition"
        >
          <IconRefresh className="size-3.5" stroke={2} />
          再来一遍
        </button>
        <Link
          to="/flashcards"
          viewTransition
          className="border-foreground/15 text-foreground/75 hover:text-foreground hover:border-foreground/30 inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-4 py-2.5 text-sm font-medium transition"
        >
          <IconArrowLeft className="size-3.5" stroke={2} />
          返回项目
        </Link>
      </div>
    </div>
  );
};
