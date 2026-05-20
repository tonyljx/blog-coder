import type { MetaFunction } from "react-router";
import Container from "~/components/container";
import { Header } from "~/components/header";
import { Work } from "~/components/work";
import { DottedSeparator } from "~/components/separator";
import { Companies } from "~/components/companies";
import { BlogList } from "~/components/blog-list";
import { WorkWithMe } from "~/components/work-with-me";
import { getAllPosts } from "~/lib/posts";

export const meta: MetaFunction = () => [
  { title: "Manu Arora" },
  {
    name: "description",
    content:
      "Engineer, backend developer who enjoys writing frontend and building interesting tools.",
  },
];

export default function Home() {
  const posts = getAllPosts();

  return (
    <Container>
      <Header />
      <DottedSeparator className="my-10" />
      <Work />
      <DottedSeparator className="my-10" />
      <Companies />
      <DottedSeparator className="my-10" />
      <WorkWithMe />
      <DottedSeparator className="my-10" />
      <BlogList posts={posts} />
      <DottedSeparator className="my-10" />
    </Container>
  );
}
