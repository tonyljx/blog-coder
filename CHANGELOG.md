# Changelog

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
