import type { Metadata } from "next";
import Link from "next/link";
import { Search, Sparkles, Megaphone, MapPin } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllPosts, CATEGORY_LABELS } from "@/lib/posts";

const BASE_URL = "https://agence-geo.eu";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const SPECIALITES = [
  {
    href: "/seo",
    title: "Agences SEO",
    description: "Référencement naturel et optimisation on-page/off-page",
    icon: Search,
  },
  {
    href: "/geo",
    title: "Agences GEO",
    description:
      "Generative Engine Optimization pour ChatGPT, Perplexity, Gemini",
    icon: Sparkles,
  },
  {
    href: "/sea",
    title: "Agences SEA",
    description: "Gestion de campagnes Google Ads, Meta, LinkedIn",
    icon: Megaphone,
  },
];

const LOCALISATIONS = [
  {
    href: "/localisation",
    title: "Agences à Paris",
    description: "Île-de-France : la plus forte concentration d'agences",
  },
  {
    href: "/localisation",
    title: "Agences à Lyon",
    description: "Auvergne-Rhône-Alpes : un pôle dynamique en région",
  },
];

function buildJsonLd(posts: ReturnType<typeof getAllPosts>) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Agence-Geo.eu",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo.png`,
          width: 512,
          height: 512,
        },
        description:
          "Comparatif et classement d'agences SEO, GEO (Generative Engine Optimization) et SEA en France",
        contactPoint: {
          "@type": "ContactPoint",
          "@id": `${BASE_URL}/#contact`,
          contactType: "Customer Service",
          email: "contact@agence-geo.eu",
          availableLanguage: "fr",
        },
        areaServed: [
          { "@type": "City", name: "Paris", addressCountry: "FR" },
          { "@type": "City", name: "Lyon", addressCountry: "FR" },
          { "@type": "Country", name: "France" },
        ],
        knowsAbout: [
          "SEO",
          "GEO",
          "Generative Engine Optimization",
          "SEA",
          "Marketing Digital",
          "Référencement Naturel",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Agence-Geo.eu",
        description: "Comparatif et classement d'agences SEO, GEO, SEA en France",
        inLanguage: "fr",
        publisher: { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: `${BASE_URL}/`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${BASE_URL}/#classements`,
        name: "Classements d'agences par catégorie",
        description:
          "Listes complètes d'agences SEO, GEO et SEA classées par spécialité et localisation",
        itemListElement: [
          ...SPECIALITES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Classement ${s.title.toLowerCase()}`,
            url: `${BASE_URL}${s.href}`,
            description: s.description,
          })),
          ...LOCALISATIONS.map((l, i) => ({
            "@type": "ListItem",
            position: SPECIALITES.length + i + 1,
            name: l.title,
            url: `${BASE_URL}${l.href}`,
            description: l.description,
          })),
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${BASE_URL}/#articles`,
        name: "Derniers articles",
        description: "Articles et guides sur le SEO, GEO et SEA",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: posts.map((post, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "BlogPosting",
              "@id": `${BASE_URL}/blog/${post.slug}`,
              url: `${BASE_URL}/blog/${post.slug}`,
              mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
              headline: post.title,
              description: post.description,
              ...(post.cover ? { image: `${BASE_URL}${post.cover}` } : {}),
              datePublished: post.date,
              dateModified: post.date,
              author: { "@type": "Organization", name: "Agence-Geo.eu" },
              publisher: { "@id": `${BASE_URL}/#organization` },
              keywords: post.tags.join(", "),
              articleSection: CATEGORY_LABELS[post.category],
              inLanguage: "fr",
            },
          })),
        },
      },
    ],
  };
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="text-center">
      <h2
        id={id}
        className="font-display text-3xl font-medium italic tracking-tight sm:text-4xl"
      >
        {children}
      </h2>
      <span
        aria-hidden="true"
        className="mx-auto mt-6 block h-[3px] w-10 bg-foreground"
      />
    </div>
  );
}

export default function Home() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 6);
  const jsonLd = buildJsonLd(posts);
  const featured = {
    slug: latestPosts[0].slug,
    title: latestPosts[0].title,
    description: latestPosts[0].description,
    category: latestPosts[0].category,
    cover: latestPosts[0].cover,
    city: latestPosts[0].city,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero featured={featured} />

      {/* Mission */}
      <section
        aria-labelledby="positioning-title"
        className="mx-auto max-w-6xl px-6 py-20 sm:py-24"
      >
        <SectionTitle id="positioning-title">Notre mission</SectionTitle>
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-lg leading-relaxed sm:text-xl">
            Analyses, comparatifs et actualités sur le{" "}
            <strong>référencement naturel</strong>, l&apos;
            <strong>optimisation pour les moteurs génératifs</strong> (GEO), et
            les <strong>agences par région</strong>.
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            Nous vous aidons à évaluer sérieusement les prestataires en
            marketing digital, sans parti pris commercial. Nos classements et
            guides sont basés sur des critères objectifs et des retours
            d&apos;expérience vérifiés.
          </p>
        </div>
      </section>

      {/* Classements */}
      <section
        aria-labelledby="rankings-title"
        className="border-y border-border bg-surface py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle id="rankings-title">
            Classements et comparatifs
          </SectionTitle>

          <h3 className="mt-14 text-center text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Par spécialité
          </h3>
          <div className="mt-6 grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {SPECIALITES.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={`Consulter le classement des ${item.title.toLowerCase()}`}
                className="group flex flex-col items-center gap-4 px-6 py-10 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/25 text-foreground transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
                  <item.icon size={20} />
                </span>
                <strong className="font-display text-xl font-medium tracking-tight decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                  {item.title}
                </strong>
                <span className="max-w-[26ch] text-sm leading-relaxed text-muted">
                  {item.description}
                </span>
              </Link>
            ))}
          </div>

          <h3 className="mt-14 text-center text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Par localisation
          </h3>
          <div className="mt-6 grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {LOCALISATIONS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                title={item.description}
                className="group flex flex-col items-center gap-4 px-6 py-10 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/25 text-foreground transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
                  <MapPin size={20} />
                </span>
                <strong className="font-display text-xl font-medium tracking-tight decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                  {item.title}
                </strong>
                <span className="max-w-[30ch] text-sm leading-relaxed text-muted">
                  {item.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Derniers articles */}
      <section
        aria-labelledby="articles-title"
        className="mx-auto max-w-6xl px-6 py-20 sm:py-24"
      >
        <SectionTitle id="articles-title">Derniers articles</SectionTitle>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, i) => (
            <ArticleCard key={post.slug} post={post} index={i} />
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/blog"
            title="Consulter tous les articles"
            className="inline-block border border-foreground px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            Voir tous les articles →
          </Link>
        </div>
      </section>
    </>
  );
}
