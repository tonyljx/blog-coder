import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import Container from "~/components/container";
import { Subheading } from "~/components/subheading";
import { formatPostDate } from "~/lib/format-post-date";
import { getAllPosts } from "~/lib/posts";

export const meta: MetaFunction = () => [{ title: "Blog – Manu Arora" }];

export default function Blog() {
  const posts = getAllPosts();

  return (
    <Container className="pt-6">
      <Subheading>Writing</Subheading>
      <div className="mt-4 flex flex-col gap-4">
        {posts.map((post) => (
          <Link
            to={`/blog/${post.slug}`}
            key={post.slug}
            className="group flex items-center justify-between gap-20 transition-colors duration-200"
          >
            <span className="text-foreground group-hover:text-primary truncate">
              {post.title}
            </span>
            <span className="text-foreground/50 group-hover:text-primary shrink-0 font-mono text-xs font-light">
              {formatPostDate(post.publishedAt)}
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
