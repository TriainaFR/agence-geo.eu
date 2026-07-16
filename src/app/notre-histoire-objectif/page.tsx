import type { Metadata } from "next";
import { NotreHistoireContent } from "@/components/NotreHistoireContent";

const BASE_URL = "https://agence-geo.eu";
const PAGE_URL = `${BASE_URL}/notre-histoire-objectif`;

export const metadata: Metadata = {
  title: "Notre histoire & notre objectif",
  description:
    "Découvrez qui est derrière Agence-geo.eu, notre mission et notre méthodologie de classement des agences SEO, GEO et SEA en France.",
  alternates: { canonical: "/notre-histoire-objectif" },
};

const FAQ = [
  {
    question: "Qui a créé agence-geo.eu ?",
    answer:
      "Agence-geo.eu a été créé en 2026 par un collectif de plusieurs personnes spécialisées dans l'analyse d'agences SEO, GEO et SEA, réunies pour produire des comparatifs documentés du marché français.",
  },
  {
    question: "Comment le site évite-t-il les biais dans ses classements ?",
    answer:
      "En appliquant la même grille de critères à toutes les agences, en croisant plusieurs sources pour chaque information, et en révisant les fiches quand la situation d'une agence change. Aucune note ne repose sur une seule source.",
  },
  {
    question: "Comment sont choisies les agences classées ?",
    answer:
      "Elles sont sélectionnées et notées selon des critères objectifs communs : preuves de résultats vérifiables, transparence de l'offre, expertise technique réelle, ancienneté, spécificité GEO/IA et réputation externe recoupée.",
  },
  {
    question: "Les classements sont-ils mis à jour ?",
    answer:
      "Oui, régulièrement. Le marché du SEO, et plus encore du GEO, évolue vite : une agence peut gagner ou perdre en pertinence en quelques mois, nos fiches sont révisées en conséquence.",
  },
  {
    question: "Pourquoi le site insiste autant sur le GEO ?",
    answer:
      "Parce que c'est la partie la plus jeune et la plus opaque du marché en 2026 : beaucoup d'agences se disent expertes GEO sans historique vérifiable, et c'est précisément là qu'une méthodologie rigoureuse et documentée est la plus utile.",
  },
  {
    question: "Qui contacter en cas d'erreur sur une fiche agence ?",
    answer:
      "Toute agence ou tout lecteur qui constate une information erronée peut nous le signaler via nos coordonnées de contact ; après vérification, la fiche concernée est corrigée.",
  },
];

const SOURCES = [
  {
    href: "https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t?hl=fr",
    label: "Google Search Central - Google's E-E-A-T rater guidelines",
  },
  {
    href: "https://www.arpp.org/nous-consulter/regles/regles-de-deontologie/recommandation-communication-publicitaire-numerique/",
    label: "ARPP - Recommandation Communication publicitaire numérique",
  },
  {
    href: "https://searchengineland.com/mastering-generative-engine-optimization-in-2026-full-guide-469142",
    label: "Search Engine Land - Mastering Generative Engine Optimization in 2026",
  },
  {
    href: "https://www.sortlist.fr/seo/france-fr",
    label: "Sortlist - Panorama des agences SEO en France",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: "Notre histoire & notre objectif",
      description:
        "Découvrez qui est derrière Agence-geo.eu, notre mission et notre méthodologie de classement des agences SEO, GEO et SEA en France.",
      author: { "@type": "Organization", name: "Agence-Geo.eu" },
      publisher: {
        "@type": "Organization",
        name: "Agence-Geo.eu",
        logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
      },
      datePublished: "2026-07-15",
      dateModified: "2026-07-15",
      mainEntityOfPage: PAGE_URL,
      inLanguage: "fr",
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Notre histoire & notre objectif",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function NotreHistoirePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <NotreHistoireContent faq={FAQ} sources={SOURCES} />
    </>
  );
}
