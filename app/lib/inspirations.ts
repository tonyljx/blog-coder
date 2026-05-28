import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";

export type Inspiration = {
  slug: string;
  title: string;
  publishedAt: string;
  Component: ComponentType<MDXProps>;
};

type InspirationModule = {
  default: ComponentType<MDXProps>;
  frontmatter: {
    title: string;
    publishedAt: string;
    slug?: string;
  };
};

const modules = import.meta.glob<InspirationModule>(
  "../../content/inspirations/*.mdx",
  { eager: true },
);

function getSlug(path: string, explicitSlug?: string) {
  if (explicitSlug) return explicitSlug;

  const fileName = path.split("/").pop();
  if (!fileName) {
    throw new Error(`Unable to infer inspiration slug from path: ${path}`);
  }

  return fileName.replace(/\.mdx$/, "");
}

function createInspiration(
  path: string,
  module: InspirationModule,
): Inspiration {
  const { frontmatter } = module;

  if (!frontmatter?.title || !frontmatter.publishedAt) {
    throw new Error(
      `Inspiration ${path} is missing title or publishedAt frontmatter.`,
    );
  }

  return {
    slug: getSlug(path, frontmatter.slug),
    title: frontmatter.title,
    publishedAt: frontmatter.publishedAt,
    Component: module.default,
  };
}

const inspirations = Object.entries(modules).map(([path, module]) =>
  createInspiration(path, module),
);

export function getAllInspirations(): Inspiration[] {
  return [...inspirations].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
