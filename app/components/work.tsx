import { IconCards } from "@tabler/icons-react";
import { Link } from "react-router";
import { Box } from "./box";
import { Subheading } from "./subheading";

export const Work = () => {
  return (
    <div>
      <Subheading>Things I do</Subheading>
      <div className="mt-4">
        <Link
          to="/flashcards"
          viewTransition
          className="group flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2"
        >
          <Box className="mr-4">
            <IconCards
              className="size-4 text-white drop-shadow-xl drop-shadow-black/40"
              stroke={2}
            />
          </Box>
          <p className="text-foreground font-medium">Flashcards</p>
          <div className="hidden size-1 rounded-full bg-neutral-200 md:block" />
          <p className="text-foreground/70">
            借助 Anki 风格的卡片帮我把读过的内容真正记住。
          </p>
        </Link>
      </div>
    </div>
  );
};
