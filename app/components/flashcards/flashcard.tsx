import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { CardStatus, FlashCard, FlashProject } from "~/lib/flashcard-data";
import { cn } from "~/lib/utils";
import { RatingButtons } from "./rating-buttons";

type RateStatus = Exclude<CardStatus, "unseen">;

interface Props {
  card: FlashCard;
  project: FlashProject;
  isFlipped: boolean;
  isInteractive: boolean;
  onFlip: () => void;
  onRate: (status: RateStatus) => void;
}

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const Flashcard = ({
  card,
  project,
  isFlipped,
  isInteractive,
  onFlip,
  onRate,
}: Props) => {
  const rotatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rotatorRef.current) return;
      if (prefersReduced()) {
        gsap.set(rotatorRef.current, { rotateY: isFlipped ? 180 : 0 });
        return;
      }
      const tl = gsap.timeline();
      tl.to(rotatorRef.current, {
        rotateY: isFlipped ? 180 : 0,
        duration: 0.7,
        ease: "power3.inOut",
      });
      tl.to(
        rotatorRef.current,
        { scale: 1.03, duration: 0.25, ease: "power2.out" },
        0,
      );
      tl.to(
        rotatorRef.current,
        { scale: 1, duration: 0.3, ease: "power2.inOut" },
        ">-0.05",
      );
    },
    { dependencies: [isFlipped] },
  );

  const inkStyle = { color: project.ink } as React.CSSProperties;
  const markStyle = { backgroundColor: project.ink } as React.CSSProperties;

  return (
    <div
      className={cn(
        "h-full w-full select-none [perspective:1400px]",
        isInteractive ? "cursor-pointer" : "pointer-events-none",
      )}
      onClick={() => {
        if (isInteractive && !isFlipped) onFlip();
      }}
    >
      <div
        ref={rotatorRef}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        <CardFace>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className="block size-1.5 rounded-full"
                style={markStyle}
              />
              <span
                className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={inkStyle}
              >
                {project.title}
              </span>
            </span>
            <span className="text-foreground/30 font-mono text-[10px] tabular-nums">
              {card.id}
            </span>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <p className="text-foreground text-center text-2xl leading-[1.35] font-medium tracking-tight text-balance md:text-[28px]">
              {card.question}
            </p>
          </div>

          {card.hint ? (
            <p className="text-foreground/55 text-center text-sm italic">
              提示 · {card.hint}
            </p>
          ) : (
            <span aria-hidden className="block h-5" />
          )}

          <div className="text-foreground/30 mt-4 flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase">
            <span className="bg-foreground/20 h-px w-6" />
            <span>tap to reveal</span>
            <span className="bg-foreground/20 h-px w-6" />
          </div>
        </CardFace>

        <CardFace back>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className="block size-1.5 rounded-full"
                style={markStyle}
              />
              <span
                className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={inkStyle}
              >
                你的作答
              </span>
            </span>
            <span className="text-foreground/30 font-mono text-[10px] tabular-nums">
              {card.id}
            </span>
          </div>

          <div
            className="bg-foreground/[0.015] relative mt-4 flex flex-1 items-center justify-center rounded-md px-6 text-center"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0, transparent 27px, color-mix(in oklch, currentColor 8%, transparent) 27px, color-mix(in oklch, currentColor 8%, transparent) 28px)",
              backgroundPosition: "0 18px",
            }}
          >
            {card.answer ? (
              <p className="text-foreground/85 text-left text-base leading-7 md:text-lg">
                {card.answer}
              </p>
            ) : (
              <p className="text-foreground/40 text-sm italic">
                凭记忆作答 · 自评你的掌握程度
              </p>
            )}
          </div>

          <div className="mt-5">
            <p className="text-foreground/40 mb-2.5 font-mono text-[10px] tracking-[0.18em] uppercase">
              自评
            </p>
            <RatingButtons
              onRate={onRate}
              disabled={!isInteractive || !isFlipped}
            />
          </div>
        </CardFace>
      </div>
    </div>
  );
};

const CardFace = ({
  children,
  back,
}: {
  children: React.ReactNode;
  back?: boolean;
}) => (
  <div
    className={cn(
      "absolute inset-0 flex flex-col rounded-2xl p-7 md:p-8 [backface-visibility:hidden]",
      "bg-card text-foreground border-foreground/8 border",
      "shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_12px_32px_-12px_rgba(0,0,0,0.18)]",
      "dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03),0_18px_48px_-18px_rgba(0,0,0,0.6)]",
      back && "[transform:rotateY(180deg)]",
    )}
  >
    {children}
  </div>
);
