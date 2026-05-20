import { Link } from "react-router";
import type { Route } from "./+types/blog-detail";
import Container from "~/components/container";
import { Subheading } from "~/components/subheading";
import { formatPostDate } from "~/lib/format-post-date";
import { getPostBySlug } from "~/lib/posts";

export async function loader({ params }: Route.LoaderArgs) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return { post };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data ? `${data.post.title} – Manu Arora` : "Post not found" },
  ];
}

export default function BlogDetail({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;

  return (
    <Container className="pt-6">
      <Link
        to="/blog"
        className="text-foreground/50 hover:text-primary font-mono text-xs tracking-wide uppercase transition-colors"
      >
        ← Writing
      </Link>
      <h1 className="text-foreground mt-4 text-2xl font-medium tracking-tight">
        {post.title}
      </h1>
      <p className="text-foreground/50 mt-1 font-mono text-xs">
        {formatPostDate(post.publishedAt)}
      </p>
      <div className="mt-8 flex flex-col gap-3">
        <Subheading>Draft</Subheading>
        <p className="text-foreground/70 text-base text-balance">
          Full article coming soon. This page is a placeholder for the post
          detail view.
        </p>
      </div>
    </Container>
  );
}
