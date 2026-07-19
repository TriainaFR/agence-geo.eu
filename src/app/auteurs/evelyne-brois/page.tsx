import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllPosts } from "@/lib/posts";
import { AUTHOR, AUTHOR_URL, authorJsonLd } from "@/lib/author";

const BASE_URL = "https://agence-geo.eu";

export const metadata: Metadata = {
  title: `${AUTHOR.name} — ${AUTHOR.jobTitle}`,
  description: `Articles, comparatifs et guides signés ${AUTHOR.name}, rédactrice et spécialiste SEO & GEO d'Agence-Geo.eu.`,
  alternates: { canonical: AUTHOR.path },
};

export default function AuthorPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${AUTHOR_URL}#profilepage`,
        url: AUTHOR_URL,
        name: `${AUTHOR.name} — ${AUTHOR.jobTitle}`,
        inLanguage: "fr",
        mainEntity: {
          ...authorJsonLd(),
          description: `Rédactrice et spécialiste SEO & GEO, ${AUTHOR.name} signe les comparatifs d'agences et les guides d'Agence-Geo.eu.`,
          knowsAbout: [
            "SEO",
            "GEO",
            "Generative Engine Optimization",
            "Référencement IA",
            "SEA",
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: AUTHOR.name, item: AUTHOR_URL },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-muted">
          <ol className="flex flex-wrap items-center justify-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {AUTHOR.name}
            </li>
          </ol>
        </nav>

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Autrice
          </p>
          <h1 className="font-display mt-6 text-4xl font-medium italic tracking-tight sm:text-5xl">
            {AUTHOR.name}
          </h1>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-[3px] w-10 bg-foreground"
          />
          <p className="mt-8 text-base leading-relaxed text-muted sm:text-lg">
            {AUTHOR.jobTitle}. Evelyne signe les comparatifs d&apos;agences et
            les guides SEO, GEO et SEA publiés sur Agence-Geo.eu, en
            appliquant la grille de critères documentée du site à chaque
            analyse.
          </p>
          <a
            href={AUTHOR.linkedin}
            rel="external noopener me"
            target="_blank"
            className="group mt-8 inline-flex items-center gap-2.5 border border-foreground px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
            </svg>
            LinkedIn
          </a>
        </div>

        <div className="mt-20">
          <div className="text-center">
            <h2 className="font-display text-3xl font-medium italic tracking-tight sm:text-4xl">
              Ses articles
            </h2>
            <span
              aria-hidden="true"
              className="mx-auto mt-6 block h-[3px] w-10 bg-foreground"
            />
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <ArticleCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
