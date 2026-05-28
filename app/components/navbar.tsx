import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { GENERAL_VARIANT, SPRING_CONFIG } from "~/lib/motion-config";
import { cn } from "~/lib/utils";
import { DottedUnderline } from "./dotted-underline";
import { ThemeToggle } from "./theme-toggle";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const links = [
  { title: "Home", href: "/" },
  { title: "Inspiration", href: "/inspiration" },
  { title: "Blog", href: "/blog" },
  { title: "Resume", href: "/resume" },
  { title: "Flashcards", href: "/flashcards" },
];

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-4 pt-4 pb-6 perspective-distant md:pt-8 md:pb-8">
      <div className="flex items-center gap-2 perspective-distant">
        <motion.div
          variants={GENERAL_VARIANT}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={SPRING_CONFIG}
          className="rounded-md bg-white shadow-md dark:bg-neutral-800"
        >
          <img
            src="/pig-avatar.png"
            alt="Cute pig avatar"
            width={40}
            height={40}
            className="aspect-square size-6 rounded-md shadow-2xl"
          />
        </motion.div>
        <h1 className="text-foreground text-xl font-medium tracking-tight md:text-2xl">
          Tony Liang
        </h1>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          {links.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                viewTransition
                className={cn(
                  "group relative transition-colors",
                  active
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary",
                )}
              >
                {link.title}
                <DottedUnderline
                  className={cn(
                    "mask-x-from-90% transition-opacity duration-300",
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                  )}
                />
              </Link>
            );
          })}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};
