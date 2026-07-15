import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type Category, type PostMeta } from "@/lib/categories";

export { CATEGORY_LABELS, type Category, type PostMeta } from "@/lib/categories";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

export type Post = PostMeta & { content: string };

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const filePath = path.join(POSTS_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    tags: data.tags ?? [],
    cover: data.cover,
    region: data.region,
    city: data.city,
    content,
  };
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map(readPostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: Category): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}
