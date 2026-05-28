type ClickLike = { clientX: number; clientY: number } | undefined;

type ViewTransition = {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
};

type DocumentWithVT = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

export function startThemeViewTransition(
  event: ClickLike,
  callback: () => void,
) {
  if (typeof document === "undefined") {
    callback();
    return;
  }

  const doc = document as DocumentWithVT;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!doc.startViewTransition || reduced) {
    callback();
    return;
  }

  const x = event?.clientX ?? window.innerWidth / 2;
  const y = event?.clientY ?? window.innerHeight / 2;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const root = document.documentElement;
  root.style.setProperty("--vt-x", `${x}px`);
  root.style.setProperty("--vt-y", `${y}px`);
  root.style.setProperty("--vt-radius", `${radius}px`);
  root.dataset.vtType = "theme";

  const transition = doc.startViewTransition(callback);
  transition.finished.finally(() => {
    delete root.dataset.vtType;
    root.style.removeProperty("--vt-x");
    root.style.removeProperty("--vt-y");
    root.style.removeProperty("--vt-radius");
  });
}
