import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { CollectionJsonLd } from "@/components/CollectionJsonLd";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Par localisation",
  description:
    "Trouvez une agence SEO, GEO ou SEA près de chez vous : panorama par région et par ville.",
  alternates: { canonical: "/localisation" },
};

export default function LocalisationPage() {
  const posts = getPostsByCategory("localisation");

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <CollectionJsonLd
        path="/localisation"
        name="Par localisation"
        description="Trouvez une agence SEO, GEO ou SEA près de chez vous : panorama par région et par ville."
        posts={posts}
      />
      <div className="mb-10">
        <h1 className="font-display text-4xl font-medium tracking-tight">
          Par localisation
        </h1>
        <p className="mt-2 max-w-xl text-muted">
          Panorama des agences par région et par ville, pour trouver un
          partenaire proche de vous.
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
