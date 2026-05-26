import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { CardStatus, FlashProject } from "~/lib/flashcard-data";
import { Flashcard } from "./flashcard";
import { FlashcardComplete } from "./flashcard-complete";

type RateStatus = Exclude<CardStatus, "unseen">;

const VISIBLE = 3;

const EXIT_BY_STATUS: Record<
  RateStatus,
  { x?: number; y?: number; rotate?: number; scale?: number }
> = {
  forgot: { x: -500, y: 80, rotate: -18 },
  remembered: { x: 500, y: -60, rotate: 14 },
  mastered: { y: -700, scale: 0.6, rotate: 0 },
};

const PEEK_POS = [
  { y: 0, scale: 1 },
  { y: 16, scale: 0.95 },
  { y: 32, scale: 0.9 },
] as const;

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface Props {
  project: FlashProject;
}

export const FlashcardStack = ({ project }: Props) => {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [statuses, setStatuses] = useState<Record<string, CardStatus>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const stackRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const total = project.cards.length;
  const visibleCards = project.cards.slice(index, index + VISIBLE);
  const current = visibleCards[0];
  const isLast = index >= total - 1;

  useGSAP(
    () => {
      visibleCards.forEach((card, posIdx) => {
        const el = cardRefs.current.get(card.id);
        if (!el || el.dataset.posInit) return;
        gsap.set(el, { ...PEEK_POS[posIdx], opacity: 1 });
        el.dataset.posInit = "1";
      });
    },
    { dependencies: [index] },
  );

  useGSAP(
    () => {
      if (!showComplete || !completeRef.current) return;
      if (prefersReduced()) {
        gsap.set(completeRef.current, { opacity: 1 });
        gsap.set(completeRef.current.querySelectorAll(".complete-child"), {
          opacity: 1,
          y: 0,
        });
        return;
      }
      const tl = gsap.timeline();
      tl.from(completeRef.current, {
        scale: 0.4,
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
      tl.from(
        completeRef.current.querySelectorAll(".complete-child"),
        { opacity: 0, y: 20, stagger: 0.08, ease: "power2.out" },
        "-=0.3",
      );
    },
    { dependencies: [showComplete] },
  );

  const handleRate = useCallback(
    (status: RateStatus) => {
      if (isAnimating || !current) return;
      const topEl = cardRefs.current.get(current.id);
      if (!topEl) return;

      setIsAnimating(true);
      setStatuses((prev) => ({ ...prev, [current.id]: status }));

      const peek1 = project.cards[index + 1];
      const peek2 = project.cards[index + 2];
      const peek3 = project.cards[index + 3];

      const finish = () => {
        if (isLast) {
          if (stackRef.current && !prefersReduced()) {
            gsap.to(stackRef.current, {
              x: "-110%",
              opacity: 0,
              duration: 0.5,
              ease: "power3.in",
              onComplete: () => {
                setShowComplete(true);
                setIsAnimating(false);
              },
            });
          } else {
            setShowComplete(true);
            setIsAnimating(false);
          }
        } else {
          setIndex((i) => i + 1);
          setIsFlipped(false);
          setIsAnimating(false);
        }
      };

      if (prefersReduced()) {
        gsap.to(topEl, { opacity: 0, duration: 0.12, onComplete: finish });
        return;
      }

      const tl = gsap.timeline({ onComplete: finish });

      tl.to(
        topEl,
        {
          ...EXIT_BY_STATUS[status],
          opacity: 0,
          duration: 0.55,
          ease: "power3.in",
        },
        0,
      );

      if (peek1) {
        const el = cardRefs.current.get(peek1.id);
        if (el) {
          tl.to(
            el,
            { ...PEEK_POS[0], duration: 0.5, ease: "power2.out" },
            0.1,
          );
        }
      }
      if (peek2) {
        const el = cardRefs.current.get(peek2.id);
        if (el) {
          tl.to(
            el,
            { ...PEEK_POS[1], duration: 0.5, ease: "power2.out" },
            0.15,
          );
        }
      }
      if (peek3) {
        const el = cardRefs.current.get(peek3.id);
        if (el) {
          gsap.set(el, { ...PEEK_POS[2], opacity: 0 });
          tl.to(el, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.2);
        }
      }
    },
    [current, isAnimating, isLast, index, project.cards],
  );

  const restart = useCallback(() => {
    setShowComplete(false);
    setIndex(0);
    setIsFlipped(false);
    setStatuses({});
    setIsAnimating(false);
    if (stackRef.current) {
      gsap.set(stackRef.current, { x: 0, opacity: 1 });
    }
    cardRefs.current.forEach((el) => {
      delete el.dataset.posInit;
    });
  }, []);

  return (
    <div className="relative w-full">
      {!showComplete && (
        <>
          <div className="mx-auto mb-5 flex max-w-md items-center gap-3">
            <span className="text-foreground/40 font-mono text-[10px] tracking-widest tabular-nums uppercase">
              {Math.min(index + 1, total)} / {total}
            </span>
            <div className="bg-foreground/10 h-0.5 flex-1 overflow-hidden rounded-full">
              <div
                className="bg-foreground/40 h-full transition-all duration-500 ease-out"
                style={{ width: `${(index / total) * 100}%` }}
              />
            </div>
          </div>

          <div
            ref={stackRef}
            className="relative mx-auto aspect-[3/4] w-full max-w-md"
          >
            {visibleCards
              .slice()
              .reverse()
              .map((card, reversedIdx) => {
                const posIdx = visibleCards.length - 1 - reversedIdx;
                const isTop = posIdx === 0;
                return (
                  <div
                    key={card.id}
                    ref={(el) => {
                      if (el) cardRefs.current.set(card.id, el);
                      else cardRefs.current.delete(card.id);
                    }}
                    className="absolute inset-0"
                    style={{ zIndex: 30 - posIdx * 10 }}
                  >
                    <Flashcard
                      card={card}
                      project={project}
                      isFlipped={isTop ? isFlipped : false}
                      isInteractive={isTop && !isAnimating}
                      onFlip={() => setIsFlipped(true)}
                      onRate={handleRate}
                    />
                  </div>
                );
              })}
          </div>

          <p className="text-foreground/40 mt-6 text-center text-xs">
            {isFlipped ? "选择你的掌握程度" : "点击卡片翻面查看作答"}
          </p>
        </>
      )}

      {showComplete && (
        <div ref={completeRef}>
          <FlashcardComplete
            project={project}
            statuses={statuses}
            onRestart={restart}
          />
        </div>
      )}
    </div>
  );
};
