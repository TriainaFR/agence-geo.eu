import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CATEGORY_LABELS, getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      <div className="mb-6 flex items-center gap-3 text-sm text-muted">
        <span className="rounded-full bg-accent-soft px-2.5 py-1 font-medium text-accent">
          {CATEGORY_LABELS[post.category]}
        </span>
        <time>
          {new Date(post.date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-muted">{post.description}</p>

      <div className="prose prose-neutral mt-10 max-w-none prose-headings:tracking-tight prose-a:text-accent dark:prose-invert">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
