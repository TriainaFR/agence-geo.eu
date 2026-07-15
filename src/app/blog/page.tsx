import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tous nos articles et guides sur le SEO, le GEO et le SEA : analyses, comparatifs et actualités.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="mt-2 max-w-xl text-muted">
          Tous nos articles et guides sur le SEO, le GEO et le SEA.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <ArticleCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}
