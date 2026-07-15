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
        className="mx-auto max-w-6xl px-6 py-20 sm:py-24"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr] md:gap-16">
          <div className="flex items-start gap-3 md:flex-col md:gap-4">
            <span
              aria-hidden="true"
              className="font-display text-sm italic text-accent"
            >
              01
            </span>
            <h2
              id="positioning-title"
              className="font-display text-2xl font-medium tracking-tight sm:text-3xl"
            >
              Notre mission
            </h2>
          </div>
          <div className="border-l-2 border-accent/30 pl-6 sm:pl-8">
            <p className="text-lg leading-relaxed sm:text-xl">
              Analyses, comparatifs et actualités sur le{" "}
              <strong>référencement naturel</strong>, l&apos;
              <strong>optimisation pour les moteurs génératifs</strong> (GEO),
              et les <strong>agences par région</strong>.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Nous vous aidons à évaluer sérieusement les prestataires en
              marketing digital, sans parti pris commercial. Nos classements et
              guides sont basés sur des critères objectifs et des retours
              d&apos;expérience vérifiés.
            </p>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="mx-auto max-w-6xl px-6">
        <hr className="border-ink-rule" />
      </div>

      {/* Classements */}
      <section
        aria-labelledby="rankings-title"
        className="mx-auto max-w-6xl px-6 py-20 sm:py-24"
      >
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span
            aria-hidden="true"
            className="font-display text-sm italic text-accent"
          >
            02
          </span>
          <h2
            id="rankings-title"
            className="font-display text-2xl font-medium tracking-tight sm:text-3xl"
          >
            Classements et comparatifs
          </h2>
        </div>

        <h3 className="mt-12 text-xs font-medium uppercase tracking-[0.2em] text-muted">
          Par spécialité
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {SPECIALITES.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              title={`Consulter le classement des ${item.title.toLowerCase()}`}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10"
            >
              <span
                aria-hidden="true"
                className="font-display absolute -right-2 -top-5 select-none text-7xl font-semibold italic text-accent/[0.07] transition-transform duration-500 group-hover:scale-110"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <item.icon size={20} />
              </span>
              <strong className="font-display text-xl font-medium tracking-tight">
                <span className="link-sweep">{item.title}</span>
              </strong>
              <span className="text-sm leading-relaxed text-muted">
                {item.description}
              </span>
              <span
                aria-hidden="true"
                className="mt-auto text-sm text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              >
                →
              </span>
            </Link>
          ))}
        </div>

        <h3 className="mt-14 text-xs font-medium uppercase tracking-[0.2em] text-muted">
          Par localisation
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {LOCALISATIONS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              title={item.description}
              className="group flex items-start gap-5 rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 dark:text-amber-400">
                <MapPin size={20} />
              </span>
              <span className="flex flex-col gap-1.5">
                <strong className="font-display text-xl font-medium tracking-tight">
                  <span className="link-sweep">{item.title}</span>
                </strong>
                <span className="text-sm leading-relaxed text-muted">
                  {item.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div aria-hidden="true" className="mx-auto max-w-6xl px-6">
        <hr className="border-ink-rule" />
      </div>

      {/* Derniers articles */}
      <section
        aria-labelledby="articles-title"
        className="mx-auto max-w-6xl px-6 py-20 sm:py-24"
      >
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-3 sm:gap-4">
            <span
              aria-hidden="true"
              className="font-display text-sm italic text-accent"
            >
              03
            </span>
            <h2
              id="articles-title"
              className="font-display text-2xl font-medium tracking-tight sm:text-3xl"
            >
              Derniers articles
            </h2>
          </div>
          <Link
            href="/blog"
            title="Consulter tous les articles"
            className="link-sweep text-sm font-medium text-accent"
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
