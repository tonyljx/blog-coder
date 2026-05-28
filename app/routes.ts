import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("tweets", "routes/tweets.tsx"),
  route("inspiration", "routes/inspiration.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog-detail.tsx"),
  route("resume", "routes/resume.tsx"),
  route("flashcards", "routes/flashcards.tsx"),
  route("flashcards/:projectId", "routes/flashcards-review.tsx"),
] satisfies RouteConfig;
