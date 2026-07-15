import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Agence-Geo.eu.",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">
        Mentions légales
      </h1>
      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
        <h2>Éditeur du site</h2>
        <p>
          Agence-Geo.eu — média indépendant.
          <br />
          Contact : contact@agence-geo.eu
        </p>
        <h2>Hébergement</h2>
        <p>Railway Corp. — https://railway.app</p>
        <h2>Indépendance éditoriale</h2>
        <p>
          Agence-Geo.eu est un média indépendant. Nous ne sommes affiliés à
          aucune des agences SEO, GEO ou SEA mentionnées sur ce site, et ne
          percevons aucune commission sur les recommandations publiées.
        </p>
        <p className="text-sm text-muted">
          [À compléter : raison sociale, adresse, directeur de la publication,
          numéro SIREN/SIRET.]
        </p>
      </div>
    </section>
  );
}
