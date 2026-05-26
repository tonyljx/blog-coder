export type CardStatus = "unseen" | "forgot" | "remembered" | "mastered";

export interface FlashCard {
  id: string;
  question: string;
  answer?: string;
  hint?: string;
}

export interface FlashProject {
  id: string;
  title: string;
  description: string;
  /** Low-chroma oklch ink color used as a tiny accent (serial number, top band).
   *  Chosen at ~0.55 lightness so it reads on both cream and charcoal surfaces. */
  ink: string;
  cards: FlashCard[];
}

export const flashProjects: FlashProject[] = [
  {
    id: "react-hooks",
    title: "React Hooks 基础",
    description: "useState 到 useTransition，React 18+ Hook 的速记卡。",
    ink: "oklch(0.52 0.14 250)",
    cards: [
      {
        id: "rh-1",
        question: "useState 的 setter，传函数和传值有什么本质差别？",
        hint: "考虑闭包与连续更新",
      },
      {
        id: "rh-2",
        question: "useEffect 的清理函数在哪几个时刻会被调用？",
      },
      {
        id: "rh-3",
        question: "useMemo 和 useCallback 的差别仅仅是返回值类型吗？",
      },
      {
        id: "rh-4",
        question: "useRef 的 .current 发生改变会触发组件重渲染吗？为什么？",
      },
      {
        id: "rh-5",
        question: "useTransition 在什么场景下能消除明显的输入卡顿？",
      },
    ],
  },
  {
    id: "ts-tricks",
    title: "TypeScript 进阶",
    description: "条件类型、模板字面量、泛型推断 — 又爱又恨的那些特性。",
    ink: "oklch(0.52 0.13 320)",
    cards: [
      {
        id: "ts-1",
        question: "infer 关键字在条件类型里到底做了什么？",
        hint: "想想 ReturnType<T> 是怎么写出来的",
      },
      {
        id: "ts-2",
        question: "Partial<T> 和 Required<T> 是如何用 mapped type 实现的？",
      },
      {
        id: "ts-3",
        question: "as const 应用在对象字面量上会发生什么？",
      },
      {
        id: "ts-4",
        question: "interface 和 type 的本质差别有哪些？什么场景必须用哪个？",
      },
      {
        id: "ts-5",
        question: "never 在分布式条件类型里扮演什么角色？",
      },
      {
        id: "ts-6",
        question: '模板字面量类型如何把 "on${EventName}" 这类字符串构造出来？',
      },
    ],
  },
  {
    id: "gsap-core",
    title: "GSAP 动画核心",
    description: "gsap.to / timeline / easing — 让动画讲得通的几个关键概念。",
    ink: "oklch(0.50 0.11 160)",
    cards: [
      {
        id: "g-1",
        question: "gsap.to 和 gsap.from 的差别？什么场景下该用哪个？",
      },
      {
        id: "g-2",
        question: 'timeline 的 position parameter 写 "<0.2" 和 "-=0.2" 有什么不同？',
      },
      {
        id: "g-3",
        question: "为什么 power3.inOut 比 linear 更接近自然加速感？",
      },
      {
        id: "g-4",
        question: "在 React 严格模式下，为什么应该用 useGSAP 而不是裸 useEffect？",
      },
      {
        id: "g-5",
        question: "stagger 的对象配置（{ amount, from, grid }）和数字配置区别在哪？",
      },
    ],
  },
];

export const getProject = (id: string) =>
  flashProjects.find((p) => p.id === id);
