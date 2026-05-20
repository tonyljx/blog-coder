declare module "*.mdx" {
  export const frontmatter: {
    title: string;
    publishedAt: string;
    summary: string;
    slug?: string;
  };
}
