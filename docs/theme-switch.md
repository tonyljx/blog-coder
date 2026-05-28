# Theme Switch（日间 / 夜间模式切换）

> 状态：实施中 · v0.3.0 · 2026-05-28
>
> 目标：在导航栏右侧加一个三态主题切换（System / Light / Dark），整体配套要做到"看起来用心"——图标平滑过渡、整页颜色随圆形扩散刷新、不闪屏、跟随系统、记忆偏好。

---

## 1. 目标与约束

### 必须满足

1. **三态**：System（跟随 OS）、Light、Dark。
2. **不闪屏（No FOUC）**：用户在 Dark 偏好下打开页面，绝不能先看到一帧白色再变黑。
3. **跟随系统**：System 模式下，macOS 在傍晚自动切到 Dark 时，页面应实时变化（不需要刷新）。
4. **记忆偏好**：用户手动选过 Light / Dark 后，下次打开记住这个选择；选 System 后清除偏好。
5. **动效**：
   - 点击时整页主题用 View Transitions API **从点击位置画圆扩散**。
   - 触发按钮图标在 resolved theme 变化时**渐变切换**（不是直接跳变）。
6. **降级安全**：不支持 View Transitions 的浏览器（旧 Safari、Firefox）自动瞬切，不报错。
7. **可访问性**：键盘可达、`aria-label` 跟随主题、`prefers-reduced-motion` 关掉圆形扩散。

### 非目标（本次不做）

- Mermaid 图随主题切换（硬编码 `theme: "neutral"`，留作后续）。
- 系统级主题色调（accent color）切换。
- 多主题（紫色、棕色等），只做 light / dark 二分。

---

## 2. 当前底子

- `app/app.css` 已有完整 `.dark` 变量（含 Shiki 代码块 dark 配色），但**没人切换**这个 class
- View Transitions API **已经在用**了（路由切换有 fade `::view-transition-old/new(root)`），主题切换需要和它**共存不打架**
- 已有动画工具：`motion`、`gsap` + `@gsap/react`、`@tabler/icons-react`
- 没有 `next-themes`、`@radix-ui`、`shadcn/ui` 等"成品"依赖

---

## 3. 可选方案

### 3.1 动效层

| 方案 | 描述 | 代表 | 评价 |
|---|---|---|---|
| **A. View Transitions 圆形扩散** | 用 `document.startViewTransition` + CSS `clip-path: circle()` 关键帧，从点击坐标扩散整页 | Tailwind v4 docs、Theo t3.chat、Vercel demos | **招牌动作**，浏览器原生，0 依赖 |
| B. 整页 CSS color transition | 关键变量加 `transition: background-color 200ms` | 大量博客 | 滚动时会拖后腿；和 A 互斥 |
| C. 无动效 | 瞬切 | 简单站点 | 单调，浪费已经搭好的 view-transitions 基建 |

### 3.2 触发按钮形态

| 方案 | 描述 | 评价 |
|---|---|---|
| **B1. 单图标按钮 + 下拉菜单** | 按钮显示当前 resolved 主题图标（☀ / 🌙），点开 dropdown 选 System / Light / Dark | **shadcn ModeToggle、Vercel、Linear 同款**。三态可见、icon 有 morph 空间 |
| B2. 三段式 pill | ☀ / 🖥 / 🌙 三个图标常驻一个 pill，active 背景滑动 | 状态一眼可见，但占地大；icon 不会 morph |
| B3. 循环按钮 | 单按钮，点一次循环 System → Light → Dark | 最小化 UI，但用户不能直接跳到目标状态 |

### 3.3 状态持久化 / SSR

| 方案 | 描述 | 评价 |
|---|---|---|
| α. Cookie + SSR loader | 根 loader 读 cookie，服务端就给 `<html class="dark">` | 无闪屏，但需要在 loader 里串 cookie，且服务端不知道首次访问者的 `prefers-color-scheme` |
| **β. localStorage + 阻塞 inline script** | `<head>` 里一段同步脚本，React 接管前读 localStorage + matchMedia 设置 `<html>` class | **next-themes 同款**，业界标配，无闪屏，配合 `suppressHydrationWarning` |
| γ. 两者结合 | 有 cookie 优先，没有走 inline script | 完美但代码量翻倍 |

---

## 4. 选型与理由

### 选定组合：**A + B1 + β**

- **A（View Transitions 圆形扩散）**：你站已经在用 view transitions 做路由切换，复用同一套机制 0 边际成本。是 toggle 这类 feature 的"招牌动作"。降级安全。
- **B1（单按钮 + 下拉）**：用户在前两轮需求里同时提到了"图标渐变切换"和"三态"——这俩在 B2（三段 pill）下是矛盾的（pill 不会 morph 图标），在 B1 下完美兼顾：按钮上的 icon 在 resolved theme 变化时 crossfade（sun ↔ moon），下拉同时给三态可选。是 shadcn ModeToggle 的形态，已被 Vercel、Linear、Resend 等验证。
- **β（localStorage + inline script）**：React Router 7 + Cloudflare Workers 用 cookie SSR 是可行的，但需要在每个 loader 串数据。inline script 方案在所有现代 React 框架里已被验证（next-themes 用了五年），实现量 < 10 行，配合 `suppressHydrationWarning` 安全。

### 为什么不是其他组合

- **不选 B2（pill）**：用户明确说"点击的时候 icon 能以渐变的形式切换，而不是生硬地直接跳变"。pill 不会发生 icon morph，只有指示器滑动。和需求不符。
- **不选 B3（循环按钮）**：三态在循环里需要 2 次点击才能到目标，不专业。
- **不选 α/γ（cookie）**：边际收益不抵复杂度。
- **不选 B + C 叠加**：CSS color transition 会和 view transitions 打架，且滚动时会拖性能。

---

## 5. 实现方案

### 5.1 文件清单

| 类型 | 路径 | 作用 |
|---|---|---|
| 新 | `app/lib/theme.tsx` | Context + Provider + `useTheme()` hook |
| 新 | `app/lib/start-view-transition.ts` | 包装 `document.startViewTransition`，写入点击坐标 CSS 变量 |
| 新 | `app/components/theme-toggle.tsx` | UI：触发按钮 + dropdown，使用 `motion` 做 icon crossfade |
| 改 | `app/app.css` | 加 `[data-vt-type="theme"]` 作用域下的圆形扩散 keyframes |
| 改 | `app/root.tsx` | `<head>` 注入 inline FOUC 脚本；`<html suppressHydrationWarning>`；包 `<ThemeProvider>` |
| 改 | `app/components/navbar.tsx` | links 行改 `justify-between`，右侧挂 `<ThemeToggle />` |
| 改 | `app/components/work.tsx`、`work-with-me.tsx` | `bg-neutral-200` 分隔点加 `dark:bg-neutral-700`（dark 模式下不可见的修复） |
| 新 | `docs/theme-switch.md` | 本文档 |

### 5.2 状态机

```
Theme = 'system' | 'light' | 'dark'              ← 用户选择
Resolved = 'light' | 'dark'                       ← 实际应用

resolve(theme):
  if theme === 'system': return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  else: return theme

apply(resolved):
  documentElement.classList.toggle('dark', resolved === 'dark')

setTheme(next, event?):
  startThemeViewTransition(event, () => {
    if (next === 'system') localStorage.removeItem('theme')
    else localStorage.setItem('theme', next)
    apply(resolve(next))
  })

// 只在 system 模式下监听 matchMedia change
if (theme === 'system'):
  mql.addEventListener('change', () => apply(resolve('system')))
```

### 5.3 防 FOUC 的 inline 脚本

`<head>` 第一项：

```html
<script>
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || 'system';
    var resolved = theme === 'system' ? (sys ? 'dark' : 'light') : theme;
    if (resolved === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
})();
</script>
```

- 同步阻塞（不要 `defer` / `async`），在 React hydration 之前修改 `<html>` className
- `<html suppressHydrationWarning>` 避开 React 19 的属性 mismatch 警告
- localStorage 失败时静默回退到 light，不破坏页面

### 5.4 View Transitions 圆形扩散

**冲突处理**：现有 `app.css` 已经定义了 `::view-transition-new(root)` 的路由 fade 动画。我们用 `[data-vt-type="theme"]` 数据属性把主题切换的动画**作用域化**，避免覆盖路由切换。

```js
// app/lib/start-view-transition.ts
export function startThemeViewTransition(event, callback) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduced) {
    callback();
    return;
  }
  const x = event?.clientX ?? window.innerWidth / 2;
  const y = event?.clientY ?? window.innerHeight / 2;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  const root = document.documentElement;
  root.style.setProperty('--vt-x', x + 'px');
  root.style.setProperty('--vt-y', y + 'px');
  root.style.setProperty('--vt-radius', r + 'px');
  root.dataset.vtType = 'theme';

  const t = document.startViewTransition(callback);
  t.finished.finally(() => { delete root.dataset.vtType; });
}
```

```css
/* app.css */
html[data-vt-type="theme"]::view-transition-old(root),
html[data-vt-type="theme"]::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
html[data-vt-type="theme"]::view-transition-old(root) { z-index: 0; }
html[data-vt-type="theme"]::view-transition-new(root) {
  z-index: 1;
  animation: theme-circle-grow 480ms cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes theme-circle-grow {
  from { clip-path: circle(0 at var(--vt-x, 50%) var(--vt-y, 50%)); }
  to   { clip-path: circle(var(--vt-radius, 150%) at var(--vt-x, 50%) var(--vt-y, 50%)); }
}
```

### 5.5 Icon morph（B1 的灵魂）

触发按钮显示 `resolvedTheme` 对应的图标。用 `motion` 的 `AnimatePresence` + `mode="wait"` 做 crossfade：

```tsx
<AnimatePresence mode="wait" initial={false}>
  <motion.span
    key={resolved}
    initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
    animate={{ opacity: 1, rotate: 0, scale: 1 }}
    exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
  >
    {resolved === 'dark' ? <IconMoon /> : <IconSun />}
  </motion.span>
</AnimatePresence>
```

下拉菜单 3 个选项 (`System` 用 `IconDeviceDesktop`)，active 项右侧加 check 标。用 `<details>` 简化 click-outside / ESC 处理。

### 5.6 SSR / Hydration

- `<html>` 加 `suppressHydrationWarning`（仅这一层）
- ThemeProvider 在客户端 mount 时读 localStorage **再次** apply 一次（防御性，inline 脚本已经做过，但 React 19 SSR 节奏需要 useEffect 同步状态）
- 服务端渲染时 `<html>` 没有 `.dark` class —— 不闪屏靠的是 inline script 在 React hydration 之前先加上 class

---

## 6. 风险与已知问题

| 问题 | 影响 | 处置 |
|---|---|---|
| **Mermaid 主题硬编码 `neutral`** | dark 模式下文章 mermaid 图配色不协调 | 本次不动，留下个 follow-up issue。理由：mermaid 主题切换需要重新渲染所有图，逻辑独立 |
| Shiki 代码块 dark 配色 | 已经在 `app.css` 配好（`.dark .shiki`），自动跟随 class | ✅ 已就绪 |
| `bg-neutral-200` 分隔点（`work.tsx`、`work-with-me.tsx`） | dark 模式下点不可见 | 加 `dark:bg-neutral-700`，本 PR 一并修 |
| `bg-white` / `text-white` 在 work-with-me 等 icon 容器上 | 是 icon-on-color 的有意设计，dark 下仍可读 | 不动 |
| 路由切换 fade + 主题切换的 view transitions 冲突 | 两者都用 `::view-transition-*(root)` | 主题切换用 `[data-vt-type="theme"]` 数据属性作用域，路由切换不受影响 |
| Cloudflare Workers SSR 阶段 `window` 不存在 | 服务端代码不能直接 `matchMedia` | inline script 只在浏览器执行；Provider 用 `useEffect` 而不是 useState initializer |

---

## 7. 验证清单

实现后逐项验证：

- [ ] 首次访问（无 localStorage）：跟随 OS，无闪屏
- [ ] 切到 Dark，刷新：仍是 Dark，无闪屏
- [ ] 切到 Light，刷新：仍是 Light
- [ ] 切到 System，刷新：跟随 OS
- [ ] System 模式下，macOS 切换主题：页面实时变化
- [ ] 点击切换：圆形从按钮位置扩散
- [ ] 触发按钮图标在主题切换时平滑 crossfade
- [ ] 键盘 Tab 能聚焦到按钮，Enter 打开下拉
- [ ] 系统偏好 reduce-motion 开启时：瞬切，无圆形扩散
- [ ] 旧浏览器（如 Firefox 老版本无 view transitions）：瞬切，不报错
- [ ] dark 模式下检查：blog detail、inspiration、flashcards、resume 都无明显违和

---

## 8. 后续可做（不在本 PR）

- Mermaid 主题跟随 light/dark
- 给 `<ThemeToggle>` 加 hover 时的 tooltip 显示当前 resolved 主题
- 在 footer 也放一个 toggle（移动端 navbar 太挤时的兜底入口）
- 提取一个通用的 `useStartViewTransition(event, cb)` hook，路由切换也能用
