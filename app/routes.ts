import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("tweets", "routes/tweets.tsx"),
  route("inspiration", "routes/inspiration.tsx"),
  route("blog", "routes/blog.tsx"),
  route("sponsor", "routes/sponsor.tsx"),
] satisfies RouteConfig;
