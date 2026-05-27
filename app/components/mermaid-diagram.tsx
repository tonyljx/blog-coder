import { IconArrowsMaximize, IconX } from "@tabler/icons-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import { cn } from "~/lib/utils";

type Mermaid = typeof import("mermaid").default;
type BindFunctions = (element: Element) => void;
type DiagramSize = {
  width: number;
  height: number;
};

let mermaidPromise: Promise<Mermaid> | undefined;

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

async function loadMermaid() {
  mermaidPromise ??= import("mermaid").then(({ default: mermaid }) => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "neutral",
    });
    return mermaid;
  });

  return mermaidPromise;
}

function readSvgLength(value: string | null) {
  if (!value || value.trim().endsWith("%")) return undefined;

  const length = Number.parseFloat(value);

  return Number.isFinite(length) && length > 0 ? length : undefined;
}

function readDiagramSize(container: HTMLElement | null): DiagramSize | undefined {
  const svg = container?.querySelector("svg");

  if (!(svg instanceof SVGSVGElement)) return undefined;

  const viewBox = svg.viewBox.baseVal;

  if (viewBox.width > 0 && viewBox.height > 0) {
    return {
      width: viewBox.width,
      height: viewBox.height,
    };
  }

  const width =
    readSvgLength(svg.getAttribute("width")) ??
    readSvgLength(svg.style.width) ??
    svg.getBoundingClientRect().width;
  const height =
    readSvgLength(svg.getAttribute("height")) ??
    readSvgLength(svg.style.height) ??
    svg.getBoundingClientRect().height;

  if (width > 0 && height > 0) {
    return { width, height };
  }

  return undefined;
}

function readElementSize(element: HTMLElement | null): DiagramSize | undefined {
  const rect = element?.getBoundingClientRect();

  if (!rect || rect.width <= 0 || rect.height <= 0) return undefined;

  return {
    width: rect.width,
    height: rect.height,
  };
}

export function MermaidDiagram({
  chart,
  className,
}: {
  chart: string;
  className?: string;
}) {
  const reactId = useId();
  const diagramId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const diagramRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const fullscreenDiagramRef = useRef<HTMLDivElement>(null);
  const bindFunctionsRef = useRef<BindFunctions | undefined>(undefined);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenSize, setFullscreenSize] = useState<
    DiagramSize | undefined
  >();
  const [inlinePlaceholderSize, setInlinePlaceholderSize] = useState<
    DiagramSize | undefined
  >();
  const [result, setResult] = useState<{
    error?: string;
    svg?: string;
  }>({});

  useEffect(() => {
    let isCanceled = false;

    async function renderDiagram() {
      setResult({});

      try {
        const mermaid = await loadMermaid();
        const { svg, bindFunctions } = await mermaid.render(
          diagramId,
          chart.trim(),
        );

        if (isCanceled) return;

        bindFunctionsRef.current = bindFunctions;
        setResult({ svg });
      } catch (error) {
        if (isCanceled) return;

        setResult({
          error:
            error instanceof Error
              ? error.message
              : "Mermaid diagram failed to render.",
        });
      }
    }

    void renderDiagram();

    return () => {
      isCanceled = true;
    };
  }, [chart, diagramId]);

  useEffect(() => {
    if (!result.svg || !diagramRef.current || isFullscreen) return;

    bindFunctionsRef.current?.(diagramRef.current);
  }, [isFullscreen, result.svg]);

  useEffect(() => {
    if (!result.svg || !fullscreenDiagramRef.current || !isFullscreen) return;

    bindFunctionsRef.current?.(fullscreenDiagramRef.current);
  }, [isFullscreen, result.svg]);

  const { contextSafe } = useGSAP(
    () => {
      if (
        !isFullscreen ||
        !result.svg ||
        !overlayRef.current ||
        !panelRef.current
      ) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const targets = [
        overlayRef.current,
        panelRef.current,
        fullscreenDiagramRef.current,
      ].filter(Boolean);

      gsap.killTweensOf(targets);

      if (reduceMotion) {
        gsap.set([overlayRef.current, panelRef.current], {
          autoAlpha: 1,
          clearProps: "transform",
        });
        gsap.set(fullscreenDiagramRef.current, {
          autoAlpha: 1,
          clearProps: "transform",
        });
        return;
      }

      gsap.set(overlayRef.current, { autoAlpha: 0 });
      gsap.set(panelRef.current, {
        autoAlpha: 0,
        scale: 0.96,
        y: 12,
        transformOrigin: "50% 50%",
      });
      gsap.set(fullscreenDiagramRef.current, {
        autoAlpha: 0,
        y: 8,
      });

      gsap
        .timeline({ defaults: { ease: "power3.out", overwrite: "auto" } })
        .to(overlayRef.current, { autoAlpha: 1, duration: 0.16 })
        .to(
          panelRef.current,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.3,
          },
          "<",
        )
        .to(
          fullscreenDiagramRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.22,
          },
          "-=0.14",
        );
    },
    {
      dependencies: [isFullscreen, result.svg],
      scope: overlayRef,
      revertOnUpdate: true,
    },
  );

  const closeFullscreen = contextSafe(() => {
    if (!isFullscreen) return;

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const diagram = fullscreenDiagramRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!overlay || !panel || reduceMotion) {
      setIsFullscreen(false);
      return;
    }

    gsap.killTweensOf([overlay, panel, diagram].filter(Boolean));
    gsap
      .timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => setIsFullscreen(false),
      })
      .to(diagram, {
        autoAlpha: 0,
        y: 6,
        duration: 0.12,
        ease: "power1.in",
      })
      .to(
        panel,
        {
          autoAlpha: 0,
          scale: 0.98,
          y: 8,
          duration: 0.18,
          ease: "power2.in",
        },
        "<",
      )
      .to(
        overlay,
        {
          autoAlpha: 0,
          duration: 0.14,
          ease: "power1.in",
        },
        "<",
      );
  });

  function openFullscreen() {
    setInlinePlaceholderSize(readElementSize(diagramRef.current));
    setFullscreenSize(readDiagramSize(diagramRef.current));
    setIsFullscreen(true);
  }

  useEffect(() => {
    if (!isFullscreen) return;

    const originalOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeFullscreen();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeFullscreen, isFullscreen]);

  useEffect(() => {
    if (isFullscreen || !inlinePlaceholderSize || !result.svg) return;

    const frame = window.requestAnimationFrame(() => {
      setInlinePlaceholderSize(undefined);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [inlinePlaceholderSize, isFullscreen, result.svg]);

  const fullscreenStyle = fullscreenSize
    ? ({
        "--mermaid-fullscreen-width": `${Math.ceil(fullscreenSize.width)}px`,
        "--mermaid-fullscreen-height": `${Math.ceil(fullscreenSize.height)}px`,
      } as CSSProperties)
    : undefined;
  const inlineDiagramStyle =
    isFullscreen && inlinePlaceholderSize
      ? ({
          height: `${Math.ceil(inlinePlaceholderSize.height)}px`,
          minHeight: `${Math.ceil(inlinePlaceholderSize.height)}px`,
        } as CSSProperties)
      : undefined;

  if (result.error) {
    return (
      <pre
        className={cn(
          "bg-muted/80 border-destructive/30 text-destructive overflow-x-auto rounded-md border p-4 text-sm leading-6",
          className,
        )}
      >
        {result.error}
      </pre>
    );
  }

  return (
    <figure className={cn("group relative", className)}>
      <div
        ref={diagramRef}
        style={inlineDiagramStyle}
        className="mermaid-diagram bg-muted/40 border-border overflow-x-auto rounded-md border p-4"
        dangerouslySetInnerHTML={
          result.svg && !isFullscreen ? { __html: result.svg } : undefined
        }
      >
        {!result.svg ? (
          <span className="text-muted-foreground text-sm">
            Rendering diagram...
          </span>
        ) : null}
      </div>

      {result.svg ? (
        <button
          type="button"
          aria-label="全屏查看 Mermaid 图"
          title="全屏查看"
          className="bg-background/90 text-foreground/70 border-border hover:text-foreground focus-visible:ring-ring absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-md border shadow-sm backdrop-blur transition focus-visible:ring-2 focus-visible:outline-none"
          onClick={openFullscreen}
        >
          <IconArrowsMaximize className="size-4" stroke={1.8} />
        </button>
      ) : null}

      {isFullscreen && result.svg ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mermaid 图全屏查看"
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
          onClick={closeFullscreen}
        >
          <div
            ref={panelRef}
            style={fullscreenStyle}
            className="bg-background border-border relative max-h-[calc(100vh-1.5rem)] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-md border shadow-2xl sm:max-h-[calc(100vh-3rem)] sm:max-w-[calc(100vw-3rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="关闭 Mermaid 图全屏查看"
              title="关闭"
              className="bg-background/90 text-foreground/70 border-border hover:text-foreground focus-visible:ring-ring absolute top-3 right-3 z-10 inline-flex size-9 items-center justify-center rounded-md border shadow-sm backdrop-blur transition focus-visible:ring-2 focus-visible:outline-none"
              onClick={closeFullscreen}
            >
              <IconX className="size-4" stroke={1.8} />
            </button>
            <div
              ref={fullscreenDiagramRef}
              className="mermaid-diagram mermaid-diagram-fullscreen overflow-auto p-5 pr-14 sm:p-6 sm:pr-16"
              dangerouslySetInnerHTML={{ __html: result.svg }}
            />
          </div>
        </div>
      ) : null}
    </figure>
  );
}
