import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Agence-Geo.eu.",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="font-display text-4xl font-medium tracking-tight">
        Mentions légales
      </h1>
      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
        <h2>Éditeur du site</h2>
        <p>
          Agence-Geo.eu — comparatif d&apos;agences SEO, GEO et SEA.
          <br />
          Contact : contact@agence-geo.eu
        </p>
        <h2>Hébergement</h2>
        <p>Railway Corp. — https://railway.app</p>
        <h2>Méthodologie éditoriale</h2>
        <p>
          Nos classements et guides s&apos;appuient sur des critères
          objectifs (méthodologie, outils, cas clients vérifiables) et une
          veille continue du marché du SEO, du GEO et du SEA.
        </p>
        <p className="text-sm text-muted">
          [À compléter : raison sociale, adresse, directeur de la publication,
          numéro SIREN/SIRET.]
        </p>
      </div>
    </section>
  );
}
