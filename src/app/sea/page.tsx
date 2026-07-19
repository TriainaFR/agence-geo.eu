import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { CollectionJsonLd } from "@/components/CollectionJsonLd";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "SEA",
  description:
    "Publicité en ligne : comparatifs et guides pour choisir une agence SEA (Google Ads, Meta, LinkedIn).",
  alternates: { canonical: "/sea" },
};

export default function SeaPage() {
  const posts = getPostsByCategory("sea");

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <CollectionJsonLd
        path="/sea"
        name="SEA"
        description="Publicité en ligne : comparatifs et guides pour choisir une agence SEA (Google Ads, Meta, LinkedIn)."
        posts={posts}
      />
      <div className="mb-10">
        <h1 className="font-display text-4xl font-medium tracking-tight">SEA</h1>
        <p className="mt-2 max-w-xl text-muted">
          Publicité en ligne : gestion de campagnes Google Ads, Meta et
          LinkedIn, et comparatifs d&apos;agences.
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
