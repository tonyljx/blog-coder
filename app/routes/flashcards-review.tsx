import { IconArrowLeft } from "@tabler/icons-react";
import type { MetaFunction } from "react-router";
import { Link, Navigate, useParams } from "react-router";
import Container from "~/components/container";
import { FlashcardStack } from "~/components/flashcards/flashcard-stack";
import { getProject } from "~/lib/flashcard-data";

export const meta: MetaFunction = () => [{ title: "复习中 – Flashcards" }];

export default function FlashcardsReview() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProject(projectId) : undefined;

  if (!project) return <Navigate to="/flashcards" replace />;

  return (
    <Container className="pt-6 pb-12">
      <Link
        to="/flashcards"
        viewTransition
        className="text-foreground/40 hover:text-foreground/70 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase transition"
      >
        <IconArrowLeft className="size-3.5" />
        返回项目
      </Link>
      <h2 className="text-foreground mt-3 text-xl font-medium tracking-tight">
        {project.title}
      </h2>
      <p className="text-foreground/60 mt-1 text-sm">{project.description}</p>
      <div className="mt-8">
        <FlashcardStack key={project.id} project={project} />
      </div>
    </Container>
  );
}
