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
    metaTitle: data.metaTitle,
    description: data.description,
    date: data.date,
    updated: data.updated,
    category: data.category,
    tags: data.tags ?? [],
    cover: data.cover,
    region: data.region,
    city: data.city,
    faq: data.faq,
    itemList: data.itemList,
    content,
  };
}

/**
 * Date qui gouverne l'ordre d'affichage : la dernière modification de fond si
 * l'article en a une, sa date de publication sinon. Un article rafraîchi
 * remonte donc en tête des listings, sans pour autant mentir sur sa date de
 * première publication, qui reste celle affichée et servie en `datePublished`.
 */
const sortDate = (post: PostMeta) => post.updated ?? post.date;

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map(readPostFile)
    .sort((a, b) => (sortDate(a) < sortDate(b) ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: Category): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}
