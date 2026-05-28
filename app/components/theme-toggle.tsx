import { type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { cn } from "~/lib/utils";
import { useTheme } from "~/lib/theme";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const next = resolvedTheme === "dark" ? "light" : "dark";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setTheme(next, { clientX: event.clientX, clientY: event.clientY });
  };

  const Icon = resolvedTheme === "dark" ? IconMoon : IconSun;

  return (
    <motion.button
      type="button"
      aria-label={`Switch to ${next} mode`}
      onClick={handleClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 600, damping: 22, mass: 0.5 }}
      className={cn(
        "relative flex size-8 items-center justify-center rounded-md",
        "text-foreground/70 hover:text-primary hover:bg-accent transition-colors",
      )}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={resolvedTheme}
          initial={{ opacity: 0, rotate: -70, scale: 0.4 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 70, scale: 0.4 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 24,
            mass: 0.6,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Icon className="size-[18px]" />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};
