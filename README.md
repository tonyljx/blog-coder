# Minimalist Portfolio

一个极简风格的个人作品集 / 博客网站，用 **Vite + React Router v7（框架模式 / SSR）** 构建，**Tailwind CSS v4** 负责样式，部署在 **Cloudflare Workers** 上。

设计复刻自 [manuarora.in](https://manuarora.in) 的 Minimalist Portfolio 模板，但工程架构改用 React Router + Vite，而非原项目的 Next.js。

## 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | React 19 + React Router v7（框架模式，开启 SSR） |
| 构建 | Vite 8 |
| 样式 | Tailwind CSS v4（`@tailwindcss/vite`，oklch 设计令牌） |
| 动画 | `motion`（Framer Motion） |
| 图标 / Logo | `@tabler/icons-react` + [SVGL](https://svgl.app/) 内联 SVG |
| 代码高亮 | [Shiki](https://shiki.style/)（`@shikijs/rehype`，MDX 构建期高亮） |
| 部署 | Cloudflare Workers（`wrangler`） |
| 字体 | Schibsted Grotesk / Geist / Geist Mono / Inter（Google Fonts） |

## 功能

- **主页**：自我介绍、Things I do、合作过的公司、Work with me、最新文章列表和页脚。
- **博客**：`/blog` 列表页 + `/blog/:slug` 详情页。文章通过服务端 `loader` 加载，未知 slug 会返回 404。
- **代码块**：MDX fenced code block 通过 Shiki 在构建阶段完成语法高亮，支持 light/dark 双主题 token。
- **导航**：当前路由高亮（虚线下划线），其余页面（Tweets / Inspiration）目前为占位页。
- **SSR**：所有页面服务端渲染，首屏直出 HTML，利于 SEO。
- **Logo 来源**：工具和技术栈 logo 选自 [SVGL](https://svgl.app/)，并以内联 React SVG 组件放在 `app/components/icons/tech-stack.tsx`。
- **手写 SVG 来源**：页脚签名 SVG 当前隐藏；保留的动画由 [Hand Writing SVG Generator](https://hand-writing-svg-generator.void.app/) 生成。

## 目录结构

```
app/
├── root.tsx              # 根布局：字体加载、Navbar + Outlet + Footer、错误边界
├── routes.ts             # 路由配置
├── app.css               # Tailwind v4 入口 + 设计令牌（含暗色变量）
├── entry.server.tsx      # SSR 渲染入口
├── routes/               # 页面：home / blog / blog-detail / tweets / inspiration / flashcards
├── components/           # UI 组件：navbar、footer、work、companies、work-with-me 等
└── lib/                  # 工具与数据：posts（文章数据）、utils、motion-config、format-post-date
workers/app.ts            # Cloudflare Workers 请求处理入口
wrangler.jsonc            # Cloudflare 部署配置
vite.config.ts            # Vite + cloudflareDevProxy + tailwindcss + reactRouter
```

> 路径别名 `~` 指向 `app/`，例如 `import { cn } from "~/lib/utils"`。

## 本地开发

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务器（默认 http://localhost:5173）
npm run typecheck  # 类型检查（cf-typegen + react-router typegen + tsc）
npm run build      # 生产构建，产出 build/client 与 build/server
```

## 部署到 Cloudflare Workers

```bash
npm run preview    # 本地用 wrangler 跑 Workers 运行时预览
npm run deploy     # 构建并部署到 Cloudflare Workers
```

## 关于文章内容

文章内容放在 `content/blog/*.mdx`，每篇文章通过 frontmatter 提供 `title`、`publishedAt`、`summary` 和可选 `slug`。
`app/lib/posts.ts` 会在构建时加载这些 MDX 文件，并为 `/blog` 与 `/blog/:slug` 提供文章列表和详情内容。

文章里可以直接写带语言标记的代码块：

````mdx
```ts
export async function loader() {
  return { message: "hello" };
}
```
````

代码高亮在 `vite.config.ts` 的 MDX `rehypePlugins` 中配置，当前使用 Shiki 的 `github-light` / `github-dark` 双主题。
