import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "SEO",
  description:
    "Guides, critères et actualités pour comprendre et choisir une agence SEO.",
  alternates: { canonical: "/seo" },
};

export default function SeoPage() {
  const posts = getPostsByCategory("seo");

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-medium tracking-tight">SEO</h1>
        <p className="mt-2 max-w-xl text-muted">
          Référencement naturel : critères de choix, méthodologie et
          comparatifs d&apos;agences.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <ArticleCard key={post.slug} post={post} index={i} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-muted">Aucun article publié pour le moment.</p>
      )}
    </section>
  );
}
