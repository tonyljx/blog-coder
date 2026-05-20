import { Subheading } from "./subheading";
import { Box } from "./box";

export const Companies = () => {
  const tools = [
    {
      title: "Claude Code",
      description: "用来做代码理解、重构和长链路实现。",
      label: "CC",
      boxClassName:
        "bg-linear-to-b from-stone-400 to-stone-700 ring-offset-stone-500",
    },
    {
      title: "Codex",
      description: "日常用来快速实现想法、部署和检查工程细节。",
      label: "CX",
      boxClassName:
        "bg-linear-to-b from-sky-400 to-sky-700 ring-offset-sky-500",
    },
    {
      title: "VS Code",
      description: "稳定的主力编辑器，适合长时间写代码和调试。",
      label: "VS",
      boxClassName:
        "bg-linear-to-b from-blue-400 to-blue-700 ring-offset-blue-500",
    },
  ];

  const stacks = [
    {
      title: "JS / TS",
      description: "主要用来写前端、脚本、Worker 和一些全栈小项目。",
      label: "TS",
      boxClassName:
        "bg-linear-to-b from-cyan-400 to-cyan-700 ring-offset-cyan-500",
    },
    {
      title: "Java",
      description: "后端工程里的稳定底座，适合做服务、业务系统和长期维护。",
      label: "JV",
      boxClassName:
        "bg-linear-to-b from-orange-400 to-red-600 ring-offset-orange-500",
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
              {group.items.map((item) => (
                <div key={item.title} className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Box className={item.boxClassName}>
                      <span className="text-[10px] font-semibold text-white drop-shadow-sm">
                        {item.label}
                      </span>
                    </Box>
                    <p className="text-foreground text-sm font-medium">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-foreground/70 text-sm text-pretty">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
