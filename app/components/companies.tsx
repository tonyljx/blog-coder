import { Subheading } from "./subheading";
import { Box } from "./box";
import {
  ClaudeAiIcon,
  JavaIcon,
  MarkdownIcon,
  OpenAiIcon,
  TypeScriptIcon,
  VSCodeIcon,
} from "./icons/tech-stack";

export const Companies = () => {
  const tools = [
    {
      title: "Claude Code",
      description: "用来做代码理解、重构和长链路实现。",
      icon: ClaudeAiIcon,
      boxClassName:
        "bg-linear-to-b from-[#fff7f2] to-[#f2ddd4] ring-offset-[#D97757]",
      iconClassName: "size-5",
    },
    {
      title: "Codex",
      description: "日常用来快速实现想法、部署和检查工程细节。",
      icon: OpenAiIcon,
      boxClassName:
        "bg-linear-to-b from-zinc-900 to-zinc-700 text-white ring-offset-zinc-500",
      iconClassName: "size-5",
    },
    {
      title: "VS Code",
      description: "稳定的主力编辑器，适合长时间写代码和调试。",
      icon: VSCodeIcon,
      boxClassName:
        "bg-linear-to-b from-sky-50 to-blue-100 ring-offset-[#007ACC]",
      iconClassName: "size-5",
    },
  ];

  const stacks = [
    {
      title: "JS / TS",
      description: "主要用来写前端、脚本、Worker 和一些全栈小项目。",
      icon: TypeScriptIcon,
      boxClassName:
        "bg-linear-to-b from-sky-50 to-blue-100 ring-offset-[#3178C6]",
      iconClassName: "size-5 rounded-[2px]",
    },
    {
      title: "Java",
      description: "后端工程里的稳定底座，适合做服务、业务系统和长期维护。",
      icon: JavaIcon,
      boxClassName:
        "bg-linear-to-b from-orange-50 to-sky-50 ring-offset-[#E76F00]",
      iconClassName: "h-6 w-5",
    },
    {
      title: "Markdown",
      description: "用来和 AI 表达需求 / 沉淀对话。",
      icon: MarkdownIcon,
      boxClassName:
        "bg-linear-to-b from-neutral-50 to-neutral-200 text-neutral-800 ring-offset-neutral-500",
      iconClassName: "h-3 w-5",
    },
  ];

  const groups = [
    { title: "工具", items: tools },
    { title: "技术栈", items: stacks },
  ];

  return (
    <section>
      <Subheading>Tools & Tech Stack</Subheading>
      <div className="mt-6 flex flex-col gap-8">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-4">
            <p className="text-foreground/50 font-mono text-xs tracking-wide uppercase">
              {group.title}
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Box className={item.boxClassName}>
                        <Icon
                          aria-hidden="true"
                          className={item.iconClassName}
                        />
                      </Box>
                      <p className="text-foreground text-sm font-medium">
                        {item.title}
                      </p>
                    </div>
                    <p className="text-foreground/70 text-sm text-pretty">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
