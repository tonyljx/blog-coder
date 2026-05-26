import {
  IconArrowBackUp,
  IconCheck,
  IconStarFilled,
} from "@tabler/icons-react";
import type { CardStatus } from "~/lib/flashcard-data";
import { cn } from "~/lib/utils";

type RateStatus = Exclude<CardStatus, "unseen">;

interface Props {
  onRate: (status: RateStatus) => void;
  disabled?: boolean;
}

const BUTTONS: {
  status: RateStatus;
  label: string;
  Icon: typeof IconCheck;
  variant: "ghost" | "soft" | "solid";
}[] = [
  { status: "forgot", label: "记不住", Icon: IconArrowBackUp, variant: "ghost" },
  { status: "remembered", label: "记住了", Icon: IconCheck, variant: "soft" },
  { status: "mastered", label: "已掌握", Icon: IconStarFilled, variant: "solid" },
];

const VARIANT_CLASSES: Record<(typeof BUTTONS)[number]["variant"], string> = {
  ghost:
    "border-foreground/15 text-foreground/55 hover:text-foreground/85 hover:border-foreground/30",
  soft: "border-transparent bg-foreground/[0.06] text-foreground/85 hover:bg-foreground/[0.10]",
  solid:
    "border-transparent bg-foreground text-background hover:bg-foreground/90",
};

export const RatingButtons = ({ onRate, disabled }: Props) => {
  return (
    <div className="flex w-full items-stretch gap-2">
      {BUTTONS.map(({ status, label, Icon, variant }) => (
        <button
          key={status}
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onRate(status);
          }}
          className={cn(
            "group inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium tracking-tight",
            "transition-[color,background-color,border-color,transform] duration-150 ease-out",
            "active:scale-[0.98]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card",
            "disabled:opacity-40 disabled:pointer-events-none",
            VARIANT_CLASSES[variant],
          )}
        >
          <Icon className="size-3.5" stroke={2} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};
