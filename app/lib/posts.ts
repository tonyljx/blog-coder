export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  content: ContentBlock[];
};

/** Static sample posts (sorted newest-first at read time). */
const posts: BlogPost[] = [
  {
    slug: "minimal-portfolio-that-gets-you-hired",
    title: "A minimal portfolio template that gets you hired",
    publishedAt: "2026-04-18",
    summary:
      "Why a single, quiet page often beats a flashy multi-section site — and how to build one with React Router and Tailwind.",
    content: [
      {
        type: "p",
        text: "Most developer portfolios try to do too much. Carousels, parallax heroes, a dozen nav links — and somewhere underneath it all, the three things a hiring manager actually wants to see. A minimal portfolio flips that priority: it leads with substance and trims everything that isn't pulling its weight.",
      },
      {
        type: "h2",
        text: "What actually matters",
      },
      {
        type: "ul",
        items: [
          "A one-line answer to “who are you and what do you do?”",
          "Two or three things you're proud of, with links that work.",
          "A frictionless way to reach you.",
        ],
      },
      {
        type: "p",
        text: "Everything else is decoration. The page you're reading this on is built exactly that way — a single column, generous whitespace, and a typeface that gets out of the way. The whole thing is React Router on the server with Tailwind for styling, which keeps the payload tiny and the first paint instant.",
      },
      {
        type: "p",
        text: "This is placeholder copy for now — but the structure is real. Swap in your own words and you've got a site you can ship in an afternoon.",
      },
    ],
  },
  {
    slug: "ace-the-javascript-interview",
    title: "Ace the JavaScript interview",
    publishedAt: "2026-02-09",
    summary:
      "The handful of topics that come up in almost every front-end interview, and how to talk about them with confidence.",
    content: [
      {
        type: "p",
        text: "Interviews rarely test obscure trivia. They test whether you understand the few mechanics that the whole language rests on. Get comfortable explaining these out loud and most questions become variations on a theme.",
      },
      {
        type: "h2",
        text: "The short list",
      },
      {
        type: "ul",
        items: [
          "Closures: why a returned function still remembers its scope.",
          "The event loop: how promises and timers actually get scheduled.",
          "this: how it's decided at call time, not at definition time.",
          "Prototypes: what really happens on a property lookup.",
        ],
      },
      {
        type: "p",
        text: "Practice narrating your reasoning, not just reciting the answer. An interviewer learns far more from “here's how I'd reason about it” than from a memorised definition.",
      },
      {
        type: "p",
        text: "Placeholder article — the full write-up with runnable examples is coming soon.",
      },
    ],
  },
  {
    slug: "building-a-blogging-platform-with-react-router",
    title: "How I'd build a Medium-style blog with React Router",
    publishedAt: "2025-12-22",
    summary:
      "A tour of the moving parts behind a small publishing platform: routing, content loading, and rendering, without reaching for a heavy framework.",
    content: [
      {
        type: "p",
        text: "You don't need a CMS to publish writing on the web. With React Router's framework mode you get server rendering, nested routes, and data loaders out of the box — which is most of what a blogging platform is under the hood.",
      },
      {
        type: "h2",
        text: "The three pieces",
      },
      {
        type: "ul",
        items: [
          "A route that lists posts (this page's /blog index).",
          "A dynamic /blog/:slug route with a loader that fetches one post.",
          "A content source — start with a typed array, graduate to MDX later.",
        ],
      },
      {
        type: "p",
        text: "Because the loader runs on the server, the reader gets fully-rendered HTML and search engines see real content. When you're ready for rich formatting, MDX slots in without changing the routing shape at all.",
      },
      {
        type: "p",
        text: "This post is a placeholder while the real implementation notes get written up.",
      },
    ],
  },
  {
    slug: "top-5-resources-i-keep-coming-back-to",
    title: "Top 5 resources I keep coming back to",
    publishedAt: "2025-10-30",
    summary:
      "The references that have earned a permanent spot in my bookmarks bar over the years.",
    content: [
      {
        type: "p",
        text: "Tools change fast, but a few resources stay useful no matter what's trending. These are the ones I reopen most often.",
      },
      {
        type: "ul",
        items: [
          "MDN — still the most reliable reference for anything web platform.",
          "The React Router docs — concise and example-first.",
          "The Tailwind docs — searchable, with every utility one keystroke away.",
          "A good type-checking habit — TypeScript catches the boring bugs.",
          "Reading other people's source — the fastest way to learn taste.",
        ],
      },
      {
        type: "p",
        text: "Placeholder copy — the annotated version with links and notes is on the way.",
      },
    ],
  },
  {
    slug: "how-to-freelance-as-a-web-developer",
    title: "How to freelance as a web developer — a practical guide",
    publishedAt: "2025-08-14",
    summary:
      "Getting the first client is the hard part. Some honest notes on starting out without a network.",
    content: [
      {
        type: "p",
        text: "Freelancing looks glamorous from the outside and feels like cold-emailing from the inside, at least at first. The work is real; finding the work is the actual skill.",
      },
      {
        type: "h2",
        text: "Where first clients come from",
      },
      {
        type: "ul",
        items: [
          "People who already know you — tell them what you're doing.",
          "Small businesses with visibly broken websites.",
          "Communities where you've been genuinely helpful first.",
        ],
      },
      {
        type: "p",
        text: "Charge for outcomes, not hours, as soon as you can describe the outcome. And write everything down — a one-page scope saves a dozen awkward conversations later.",
      },
      {
        type: "p",
        text: "Placeholder article. The longer version, with templates, is coming soon.",
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
