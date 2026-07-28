import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Agence-Geo.eu.",
  alternates: { canonical: "/mentions-legales" },
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
          Le site Agence-Geo.eu est édité par :
          <br />
          <strong>TRIAINA</strong>, société par actions simplifiée (SAS)
          <br />
          Siège social : 60 rue François Ier, 75008 Paris, France
          <br />
          RCS Paris 999 402 654 — SIRET (siège) : 999 402 654 00019
          <br />
          TVA intracommunautaire : FR54999402654
          <br />
          Courriel : contact@agence-geo.eu
        </p>

        <h2>Directeur de la publication</h2>
        <p>Lucas Lecoq-Pellizzon, président.</p>

        <h2>Hébergeur</h2>
        <p>
          Railway Corporation
          <br />
          548 Market St PMB 68956, San Francisco, CA 94104, États-Unis
          <br />
          <a href="https://railway.com" rel="noopener noreferrer" target="_blank">
            railway.com
          </a>
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, classements, méthodologies et éléments graphiques publiés
          sur Agence-Geo.eu sont protégés par le droit d&apos;auteur. Toute
          reproduction ou réutilisation, totale ou partielle, est soumise à
          autorisation préalable, à l&apos;exception des courtes citations
          accompagnées d&apos;un lien vers la page source.
        </p>
        <p>
          Les noms et marques des agences citées appartiennent à leurs
          détenteurs respectifs. Leur mention relève de l&apos;analyse
          éditoriale et n&apos;implique aucun partenariat, sauf indication
          contraire sur la page concernée.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Le site ne dépose aucun cookie de mesure d&apos;audience ni traceur
          publicitaire.
        </p>
        <p>
          Le formulaire de contact collecte un nom, une adresse e-mail, un objet
          et un message, acheminés par le service EmailJS vers la boîte de
          réception de l&apos;éditeur. Ces données servent uniquement à répondre
          à la demande, ne sont ni cédées ni revendues, et sont conservées le
          temps nécessaire au traitement de l&apos;échange.
        </p>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
          rectification, d&apos;effacement, d&apos;opposition et de portabilité
          sur ces données. Pour l&apos;exercer, écrivez à
          contact@agence-geo.eu. Vous pouvez également introduire une
          réclamation auprès de la CNIL.
        </p>

        <h2>Méthodologie éditoriale</h2>
        <p>
          Nos classements et guides s&apos;appuient sur des critères objectifs
          (méthodologie, outils, cas clients vérifiables) et une veille continue
          du marché du SEO, du GEO et du SEA.
        </p>

        <p className="text-sm text-muted">Dernière mise à jour : 28 juillet 2026.</p>
      </div>
    </section>
  );
}
