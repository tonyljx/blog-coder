import { Link } from "react-router";
import type { Route } from "./+types/blog-detail";
import Container from "~/components/container";
import { MdxContent, mdxComponents } from "~/components/mdx-content";
import { TableOfContents } from "~/components/table-of-contents";
import { formatPostDate } from "~/lib/format-post-date";
import { getPostBySlug } from "~/lib/posts";

export async function loader({ params }: Route.LoaderArgs) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  const { Component: _Component, ...postMeta } = post;
  return { post: postMeta };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Post not found" }];
  return [
    { title: `${data.post.title} – Tony Liang` },
    { name: "description", content: data.post.summary },
  ];
}

export default function BlogDetail({ loaderData }: Route.ComponentProps) {
  const post = getPostBySlug(loaderData.post.slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  const PostContent = post.Component;

  return (
    <Container className="max-w-6xl pt-6">
      <div className="grid grid-cols-1 gap-14 xl:grid-cols-[minmax(0,42rem)_15rem] xl:items-start xl:justify-center">
        <div className="min-w-0">
          <Link
            to="/blog"
            className="text-foreground/50 hover:text-primary font-mono text-xs tracking-wide uppercase transition-colors"
          >
            ← Writing
          </Link>
          <h1 className="text-foreground mt-4 text-2xl font-medium tracking-tight text-balance">
            {post.title}
          </h1>
          <p className="text-foreground/50 mt-1 font-mono text-xs">
            {formatPostDate(post.publishedAt)}
          </p>
          <p className="text-foreground/60 mt-4 text-base text-balance italic">
            {post.summary}
          </p>
          <MdxContent>
            <PostContent components={mdxComponents} />
          </MdxContent>
        </div>
        <TableOfContents />
      </div>
    </Container>
  );
}
