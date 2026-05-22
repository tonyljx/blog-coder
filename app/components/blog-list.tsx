import { Link } from "react-router";
import { Subheading } from "./subheading";
import { formatPostDate } from "~/lib/format-post-date";
import type { BlogPostMeta } from "~/lib/posts";

export const BlogList = ({ posts }: { posts: BlogPostMeta[] }) => {
  return (
    <section className="flex flex-col gap-4">
      <Subheading>Writing</Subheading>
      {posts.slice(0, 3).map((post) => (
        <Link
          to={`/blog/${post.slug}`}
          key={post.slug}
          viewTransition
          className="group flex items-center justify-between gap-20 transition-colors duration-200 md:gap-20"
        >
          <span className="text-foreground group-hover:text-primary truncate">
            {post.title}
          </span>
          <span className="text-foreground/50 group-hover:text-primary shrink-0 font-mono text-xs font-light">
            {formatPostDate(post.publishedAt)}
          </span>
        </Link>
      ))}
    </section>
  );
};
