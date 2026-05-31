import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";

export type BlogPostMeta = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
};

export type BlogPost = BlogPostMeta & {
  Component: ComponentType<MDXProps>;
};

type BlogPostModule = {
  default: ComponentType<MDXProps>;
  frontmatter: Omit<BlogPostMeta, "slug"> & {
    slug?: string;
  };
};

const postModules = import.meta.glob<BlogPostModule>(
  "../../content/blog/*.{md,mdx}",
  { eager: true },
);

function getSlug(path: string, explicitSlug?: string) {
  if (explicitSlug) return explicitSlug;

  const fileName = path.split("/").pop();
  if (!fileName) {
    throw new Error(`Unable to infer blog post slug from path: ${path}`);
  }

  return fileName.replace(/\.mdx?$/, "");
}

function createPost(path: string, module: BlogPostModule): BlogPost {
  const { frontmatter } = module;

  if (!frontmatter?.title || !frontmatter.publishedAt || !frontmatter.summary) {
    throw new Error(
      `Blog post ${path} is missing title, publishedAt, or summary frontmatter.`,
    );
  }

  return {
    slug: getSlug(path, frontmatter.slug),
    title: frontmatter.title,
    publishedAt: frontmatter.publishedAt,
    summary: frontmatter.summary,
    Component: module.default,
  };
}

const posts = Object.entries(postModules).map(([path, module]) =>
  createPost(path, module),
);

function toMeta({ Component: _Component, ...post }: BlogPost): BlogPostMeta {
  return post;
}

export function getAllPosts(): BlogPostMeta[] {
  return [...posts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .map(toMeta);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
