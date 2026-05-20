import { Link } from "react-router";
import type { Route } from "./+types/blog-detail";
import Container from "~/components/container";
import { formatPostDate } from "~/lib/format-post-date";
import { getPostBySlug, type ContentBlock } from "~/lib/posts";

export async function loader({ params }: Route.LoaderArgs) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return { post };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Post not found" }];
  return [
    { title: `${data.post.title} – Manu Arora` },
    { name: "description", content: data.post.summary },
  ];
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-foreground mt-8 text-lg font-medium tracking-tight">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="text-foreground/70 list-disc space-y-1.5 pl-5 text-base">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p className="text-foreground/80 text-base">{block.text}</p>;
  }
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
      <h1 className="text-foreground mt-4 text-2xl font-medium tracking-tight text-balance">
        {post.title}
      </h1>
      <p className="text-foreground/50 mt-1 font-mono text-xs">
        {formatPostDate(post.publishedAt)}
      </p>
      <p className="text-foreground/60 mt-4 text-base text-balance italic">
        {post.summary}
      </p>
      <article className="mt-8 flex flex-col gap-4">
        {post.content.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </article>
    </Container>
  );
}
