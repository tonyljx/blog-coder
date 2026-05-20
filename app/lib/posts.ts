export type BlogPost = {
  slug: string;
  title: string;
  publishedAt: string;
};

/** Static sample posts (sorted newest-first at read time). */
const posts: BlogPost[] = [
  {
    slug: "building-a-blogging-platform-with-nextjs",
    title: "Building a blogging platform with React Router",
    publishedAt: "2026-04-18",
  },
  {
    slug: "crack-the-javascript-interview",
    title: "Crack the JavaScript interview",
    publishedAt: "2026-02-09",
  },
  {
    slug: "top-5-frontend-resources",
    title: "Top 5 front-end resources I keep coming back to",
    publishedAt: "2025-12-22",
  },
];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
