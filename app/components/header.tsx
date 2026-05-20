import { ExternalLink } from "./external-link";

export const Header = () => {
  return (
    <div>
      <div className="text-foreground pt-4 text-base">
        I'm a software engineer at heart, tinkering with AI and code almost 90%
        of the time. I'm mostly active on{" "}
        <ExternalLink href="https://x.com/mannupaaji">X / Twitter</ExternalLink>{" "}
        where I share everything.
      </div>
      <div className="text-foreground pt-4 text-base">
        When I'm not coding, I usually talk about Design Engineering, AI Tools
        and Front-end design taste at my{" "}
        <ExternalLink href="https://www.youtube.com/@manuarora">
          YouTube Channel.
        </ExternalLink>
      </div>
      <div className="text-foreground pt-4 text-base">
        I've been building my own component library{" "}
        <ExternalLink href="https://ui.aceternity.com">
          Aceternity UI
        </ExternalLink>{" "}
        for the past 4 years. It has got around 3M page views and 200k unique
        visitors a month. My favourite thing is to update this library everyday
        with new components and features.
      </div>
    </div>
  );
};
