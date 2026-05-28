import { type ReactNode } from "react";
import { IconAppWindowFilled, IconBrandZoom } from "@tabler/icons-react";
import { Subheading } from "./subheading";
import { Box } from "./box";
import { cn } from "~/lib/utils";

type WorkItem = {
  title: string;
  description: string;
  href: string;
  boxClassName: string;
  skeleton: ReactNode;
};

export const WorkWithMe = () => {
  const work: WorkItem[] = [
    {
      title: "Consultation",
      description: "Get on a paid call with me to discuss your things.",
      href: "https://cal.com/runningpig-pmtfab/chat",
      boxClassName:
        "bg-linear-to-b from-blue-400 to-blue-600 ring-offset-blue-500",
      skeleton: (
        <IconBrandZoom className="size-4 text-white drop-shadow-xl drop-shadow-black/40" />
      ),
    },
    {
      title: "Hire me and my team",
      description: "Let's build a world class website for your business.",
      href: "https://x.com/abc30037274",
      boxClassName:
        "bg-linear-to-b from-orange-400 to-orange-600 ring-offset-orange-500",
      skeleton: (
        <IconAppWindowFilled className="size-4 text-white drop-shadow-xl drop-shadow-black/40" />
      ),
    },
  ];

  return (
    <section>
      <Subheading>Work with me</Subheading>
      <div className="mt-8 flex flex-col gap-6">
        {work.map((item) => (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2"
            key={item.title}
          >
            <Box className={cn("", item.boxClassName)}>{item.skeleton}</Box>
            <p className="text-foreground shrink-0 font-medium">
              {item.title}
            </p>
            <div className="hidden size-1 rounded-full bg-neutral-200 md:block dark:bg-neutral-700"></div>
            <p className="text-foreground/70">{item.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};
