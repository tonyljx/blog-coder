# Changelog

## [0.2.5] - 2026-05-28

### Added

- **Resume 简历页** — 新增 `/resume` 顶层导航入口：
  - 从本地 PDF 简历整理结构化内容，按当前博客的窄栏、分隔线、mono 日期和轻量列表样式展示工作经历、项目经历、技能、教育与自我评价。
  - 将原始 PDF 放到 `public/resume/liang-jiongxin-ai-fullstack.pdf`，页面首屏提供“下载 PDF”按钮，方便对外联系时直接下载简历。

## [0.2.4] - 2026-05-28

### Added

- **Inspiration 信息流** — 把 `/inspiration` 占位 tab 升级为真正的想法流：
  - 新增 `content/inspirations/*.mdx` 内容目录，frontmatter 仅需 `title` 与 `publishedAt`，正文支持完整 MDX（列表、代码块、链接、Mermaid）。
  - 新增 `app/lib/inspirations.ts`，复用 `import.meta.glob` 模式按时间倒序加载所有条目。
  - `app/routes/inspiration.tsx` 改为 Container + Subheading + 单纵列卡片布局，每条复用 `mdxComponents` 渲染正文，日期沿用与 `/blog` 一致的 `DD-MM-YYYY` mono 样式。
  - 首条种子：`Eat Your Own Dog Food` — 做自己产品的用户。

## [0.2.3] - 2026-05-27

### Added

- MDX 代码块支持 Mermaid 渲染：识别 `language-mermaid`，按需加载 `mermaid@^11.15.0`，将文章里的 Mermaid 源码渲染为 SVG 图表。
- Mermaid 图表新增右上角全屏查看入口，使用 GSAP / `@gsap/react` 实现打开与关闭动效；弹框会按图表尺寸自适应，并在大图超出视口时仅让图表区域滚动。

### Changed

- `redis-impl` 文章里的链表、字典、跳表等 Mermaid 图改为更贴近 Redis 数据结构的图解版本，突出节点字段、指针关系、哈希桶链地址法和跳表层高。

### Fixed

- 关闭 Mermaid 全屏查看时保留原文档位置的占位高度，避免原 SVG 临时移除后导致页面出现轻微布局偏移。
- 补齐 Table of Contents 的类型标注，避免新增 MDX 代码块处理逻辑后触发 TypeScript 推断问题。

## [0.2.2] - 2026-05-27

### Added

- 首页 "技术栈" 分组在 `JS / TS`、`Java` 之后追加 `Markdown` 条目，描述为"用来和 AI 表达需求 / 沉淀对话。"，并新增 `MarkdownIcon`（使用 currentColor 描边的官方 Markdown 标记）。

## [0.2.1] - 2026-05-26

### Changed

- 首页 "Things I do" 精简为单一条目，指向新上线的 Flashcards 工具：使用 `<Link viewTransition>` 走内部路由，文案 "借助 Anki 风格的卡片帮我把读过的内容真正记住。"
- 移除模板残留的 Aceternity / Aceternity UI / YouTube 条目和未使用的 `LogoSVGNew` 组件。

## [0.2.0] - 2026-05-26

### Added

- **Flashcards 复习工具** — 新增 `/flashcards` 项目列表与 `/flashcards/:projectId` 复习页：
  - 三个示例项目（React Hooks、TypeScript、GSAP），每张卡片支持 3D 翻转，背面提供 `记不住 / 记住了 / 已掌握` 三档自评。
  - 基于 GSAP 实现三处动效：卡片翻转（`rotateY` + 微缩放）、按评分方向的出场（左下 / 右上 / 上腾）+ 后排堆叠推进、最后一张触发整组 swipe 与完成屏入场。
  - 编辑式中性调色：所有卡片共享同一纸面，每个项目仅以一种低彩度墨色（oklch ~0.5）出现在标签圆点 / 列表序号上；评分按钮采用 `轮廓 → 柔填 → 实色` 的同色阶梯，由图标语义区分。
  - 完整支持 `prefers-reduced-motion`，所有动画在系统偏好下退化为瞬时切换。
- 依赖：`gsap@^3.15.0`、`@gsap/react@^2.1.2`。
- Navbar 增加 `Flashcards` 入口。

### Changed

- Footer 签名通过 `SHOW_SIGNATURE` 常量隐藏，README 同步更新描述。
