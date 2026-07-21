import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

const BASE_URL = "https://agence-geo.eu";
const PAGE_URL = `${BASE_URL}/contact`;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Agence-Geo.eu via notre formulaire : signalez une erreur sur une fiche agence, proposez un sujet ou posez une question sur notre méthodologie de classement SEO, GEO et SEA.",
  alternates: { canonical: "/contact" },
};

const REASONS = [
  {
    title: "Signaler une erreur",
    description:
      "Une information inexacte ou obsolète sur une fiche agence ? Indiquez-nous la page concernée, on vérifie et on corrige.",
  },
  {
    title: "Proposer un sujet",
    description:
      "Un angle, une question de terrain ou un comparatif qui manque à nos guides SEO, GEO et SEA.",
  },
  {
    title: "Questions sur la méthodologie",
    description:
      "Nos critères de notation sont publics. Une précision sur la grille ou sur une évaluation ? Écrivez-nous.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${PAGE_URL}#contactpage`,
      url: PAGE_URL,
      name: "Contact — Agence-Geo.eu",
      description:
        "Contactez Agence-Geo.eu via notre formulaire : signalez une erreur sur une fiche agence, proposez un sujet ou posez une question sur notre méthodologie de classement SEO, GEO et SEA.",
      inLanguage: "fr",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      mainEntity: { "@id": `${BASE_URL}/#organization` },
    },
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
      contactPoint: {
        "@type": "ContactPoint",
        "@id": `${PAGE_URL}#contactpoint`,
        contactType: "Customer Service",
        url: PAGE_URL,
        availableLanguage: "fr",
        areaServed: "FR",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Contact", item: PAGE_URL },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-muted">
          <ol className="flex flex-wrap items-center justify-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              Contact
            </li>
          </ol>
        </nav>

        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Écrivez-nous
          </p>
          <h1 className="font-display mt-6 text-4xl font-medium italic tracking-tight sm:text-5xl">
            Contact
          </h1>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-[3px] w-10 bg-foreground"
          />
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Une question sur un classement, une erreur à signaler ou un sujet à
            nous proposer ? Remplissez le formulaire, nous répondons à chaque
            message.
          </p>
        </div>

        <div className="relative mt-12">
          <ContactForm />
        </div>

        <div className="mt-16 grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="flex flex-col gap-3 px-6 py-8 text-center"
            >
              <strong className="font-display text-lg font-medium tracking-tight">
                {reason.title}
              </strong>
              <span className="text-sm leading-relaxed text-muted">
                {reason.description}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          Pour en savoir plus sur notre méthode de notation, consultez{" "}
          <Link
            href="/notre-histoire-objectif"
            className="font-medium text-accent decoration-accent/40 underline-offset-4 hover:underline"
          >
            notre histoire & notre objectif
          </Link>
          .
        </p>
      </section>
    </>
  );
}
