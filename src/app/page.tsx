import Link from "next/link";
import { Search, Sparkles, Megaphone, MapPin } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllPosts, CATEGORY_LABELS } from "@/lib/posts";

const BASE_URL = "https://agence-geo.eu";

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
    href: "/blog/agence-seo-paris",
    title: "Agences à Paris",
    description: "Île-de-France : la plus forte concentration d'agences",
  },
  {
    href: "/blog/agence-seo-lyon",
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
        description:
          "Média indépendant spécialisé dans la comparaison et le classement d'agences SEO, GEO (Generative Engine Optimization) et SEA en France",
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

export default function Home() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 6);
  const jsonLd = buildJsonLd(posts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      {/* Mission */}
      <section
        aria-labelledby="positioning-title"
        className="mx-auto max-w-6xl px-6 py-14"
      >
        <h2
          id="positioning-title"
          className="text-xl font-semibold tracking-tight"
        >
          Notre mission
        </h2>
        <div className="mt-6 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <p className="text-base leading-relaxed">
            Analyses, comparatifs et actualités sur le{" "}
            <strong>référencement naturel</strong>, l&apos;
            <strong>optimisation pour les moteurs génératifs</strong> (GEO), et
            les <strong>agences par région</strong>.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
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
        className="mx-auto max-w-6xl px-6 pb-14"
      >
        <h2 id="rankings-title" className="text-xl font-semibold tracking-tight">
          Classements et comparatifs
        </h2>

        <h3 className="mt-8 text-sm font-medium uppercase tracking-wide text-muted">
          Par spécialité
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SPECIALITES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={`Consulter le classement des ${item.title.toLowerCase()}`}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
                <item.icon size={20} />
              </span>
              <strong className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                {item.title}
              </strong>
              <span className="text-sm text-muted">{item.description}</span>
            </Link>
          ))}
        </div>

        <h3 className="mt-10 text-sm font-medium uppercase tracking-wide text-muted">
          Par localisation
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {LOCALISATIONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={item.description}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 transition-transform duration-300 group-hover:scale-110 dark:text-amber-400">
                <MapPin size={20} />
              </span>
              <span className="flex flex-col gap-1">
                <strong className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {item.title}
                </strong>
                <span className="text-sm text-muted">{item.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Derniers articles */}
      <section
        aria-labelledby="articles-title"
        className="mx-auto max-w-6xl px-6 pb-14"
      >
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2
            id="articles-title"
            className="text-xl font-semibold tracking-tight"
          >
            Derniers articles
          </h2>
          <Link
            href="/blog"
            title="Consulter tous les articles"
            className="text-sm font-medium text-accent transition-colors hover:underline"
          >
            Voir tous les articles →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, i) => (
            <ArticleCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
