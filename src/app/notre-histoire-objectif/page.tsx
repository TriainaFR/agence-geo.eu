import type { Metadata } from "next";
import Link from "next/link";

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
    <article className="mx-auto max-w-3xl px-6 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-accent">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            Notre histoire & notre objectif
          </li>
        </ol>
      </nav>

      <header>
        <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
          Notre histoire & notre objectif
        </h1>
        <time
          dateTime="2026-07-15"
          className="mt-4 block text-sm text-muted"
        >
          15 juillet 2026
        </time>
      </header>

      <section aria-labelledby="tldr-title" className="mt-10">
        <div className="rounded-2xl border border-border bg-accent-soft p-6 sm:p-8">
          <h2 id="tldr-title" className="text-lg font-semibold tracking-tight">
            TL;DR
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed sm:text-base">
            <li>
              <strong>Agence-geo.eu</strong> est un média spécialisé, lancé en
              2026 par un collectif de spécialistes SEO, GEO et SEA.
            </li>
            <li>
              Notre <strong>mission</strong> : publier des classements et
              comparatifs documentés des meilleures agences SEO, GEO et
              référencement IA, pour aider marques et agences à choisir un
              prestataire sans se perdre dans le marketing.
            </li>
            <li>
              Notre <strong>méthodologie</strong> repose sur des critères
              objectifs, documentés et mis à jour régulièrement - pas sur des
              impressions ou un simple appel commercial.
            </li>
            <li>
              Chaque agence est notée selon{" "}
              <strong>la même grille de critères</strong>, appliquée avec la
              même rigueur, qu&apos;elle soit une grosse structure ou une
              petite équipe.
            </li>
            <li>
              Le site cible en priorité le marché <strong>français</strong>{" "}
              (Paris, Lyon et au-delà), avec un focus stratégique sur le{" "}
              <strong>GEO et le référencement IA</strong>, la partie la plus
              mouvante du secteur en 2026.
            </li>
          </ul>
        </div>
      </section>

      <div className="prose prose-neutral mt-12 max-w-none prose-headings:tracking-tight prose-a:text-accent dark:prose-invert">
        <section aria-labelledby="mission-title">
          <h2 id="mission-title">Notre mission, en une phrase</h2>
          <p>
            On classe les agences SEO, GEO et SEA selon une grille de critères
            commune et documentée, pour que vous puissiez comparer sans passer
            par dix appels commerciaux.
          </p>
          <p>
            C&apos;est tout. Pas de discours corporate, pas de promesse floue.
            Agence-geo.eu existe pour répondre à une question simple
            qu&apos;on s&apos;est tous posée un jour en cherchant un
            prestataire :{" "}
            <strong>
              comment savoir si cette agence est vraiment bonne, ou juste bien
              vendue ?
            </strong>
          </p>
          <p>
            On a construit ce site parce que cette réponse n&apos;existait pas
            de façon fiable sur le marché français. Les annuaires généralistes
            listent tout le monde sans distinction. Beaucoup de classements se
            contentent d&apos;un ordre alphabétique ou d&apos;une simple liste
            de noms. Et les avis Google, aussi utiles soient-ils, ne disent
            rien de la méthode de travail réelle d&apos;une agence.
          </p>
          <p>
            Notre rôle : combler ce vide avec des comparatifs documentés, une
            méthodologie publique, et des critères appliqués de la même façon
            à chaque fiche.
          </p>
        </section>

        <section aria-labelledby="pourquoi-title">
          <h2 id="pourquoi-title">Pourquoi ce site existe</h2>

          <h3>Le problème : un marché opaque</h3>
          <p>
            Le secteur du référencement en France compte plusieurs milliers de
            structures déclarées, mais seule une fraction en est réellement
            active et compétente sur la durée. Résultat : une{" "}
            <strong>fragmentation extrême</strong> de l&apos;offre, avec des
            écarts de prix qui vont de 500 € à plus de 10 000 € par mois pour
            des prestations parfois indiscernables sur le papier.
          </p>
          <p>
            Trois symptômes reviennent sans cesse quand on discute avec des
            dirigeants qui cherchent une agence :
          </p>
          <ul>
            <li>
              <strong>Les devis sont incomparables.</strong> Chaque agence
              structure son offre différemment (forfait, régie, mixte), ce qui
              rend la comparaison de prix quasi impossible sans expertise
              technique.
            </li>
            <li>
              <strong>
                Les promesses de résultats ne sont pas vérifiables.
              </strong>{" "}
              &quot;Top 1 en 3 mois&quot; ne veut rien dire sans savoir sur
              quel mot-clé, avec quel budget de départ, et sur quel marché
              concurrentiel.
            </li>
            <li>
              <strong>
                Le GEO et l&apos;IA générative brouillent encore plus les
                pistes.
              </strong>{" "}
              Depuis l&apos;essor de ChatGPT, Perplexity et Google AI
              Overview, de nombreuses agences se rebaptisent &quot;spécialistes
              GEO&quot; du jour au lendemain, sans historique ni méthode
              vérifiable sur ce terrain encore jeune.
            </li>
          </ul>

          <h3>Pourquoi ça nous concerne particulièrement</h3>
          <p>
            Le GEO (Generative Engine Optimization) est une discipline née fin
            2023 dans la recherche académique, et le marché des agences qui la
            proposent en France est encore en formation en 2026. Ce flou
            profite aux acteurs qui savent le mieux communiquer, pas forcément
            à ceux qui savent le mieux exécuter.
          </p>
          <p>
            On a donc décidé de traiter ce sujet en priorité : c&apos;est la
            partie du marché où l&apos;opacité est la plus forte
            aujourd&apos;hui, et celle où une méthodologie rigoureuse et
            documentée a le plus de valeur.
          </p>
        </section>

        <section aria-labelledby="qui-title">
          <h2 id="qui-title">Qui sommes-nous ?</h2>

          <h3>Un collectif d&apos;analystes spécialisés</h3>
          <p>
            Agence-geo.eu est porté par un{" "}
            <strong>collectif de plusieurs personnes</strong> qui se sont
            spécialisées, chacune de son côté, dans l&apos;analyse et
            l&apos;audit d&apos;agences SEO, GEO et SEA avant de rejoindre ce
            projet commun en 2026.
          </p>
          <p>
            Notre métier, c&apos;est l&apos;analyse et la comparaison
            d&apos;offres SEO, GEO et SEA : documenter des critères, croiser
            des sources, noter des prestations selon un protocole écrit.
            C&apos;est ce travail de fond, plutôt qu&apos;un simple avis, qui
            structure chaque fiche du site.
          </p>

          <h3>Des profils complémentaires, volontairement</h3>
          <p>
            Le collectif réunit trois angles d&apos;expertise distincts,
            choisis pour se confronter les uns aux autres plutôt que pour se
            répéter :
          </p>
          <ul>
            <li>
              <strong>Un profil SEO senior</strong>, avec une pratique de
              terrain sur l&apos;audit technique, le netlinking et le suivi de
              positionnement, habitué à distinguer un vrai plan d&apos;action
              d&apos;un rapport PowerPoint générique.
            </li>
            <li>
              <strong>Un profil SEA / growth</strong>, issu du pilotage de
              budgets publicitaires en agence, qui apporte un regard sur la
              rentabilité réelle des prestations et la lecture critique des
              chiffres qu&apos;une agence met en avant.
            </li>
            <li>
              <strong>Un profil spécialisé GEO et IA générative</strong>, qui
              suit de près les publications académiques sur
              l&apos;extractibilité des contenus et teste en continu la
              visibilité des marques dans ChatGPT, Perplexity et Google AI
              Overview.
            </li>
          </ul>
          <p>
            Cette diversité est volontaire : un classement d&apos;agences SEO
            écrit uniquement par des SEO a tendance à sous-évaluer le SEA, et
            inversement. En croisant les regards, on limite ce biais de
            spécialité.
          </p>

          <h3>Basés en France, avec un ancrage Paris - Lyon</h3>
          <p>
            Le collectif travaille depuis la France, avec des contributeurs
            basés à <strong>Paris</strong> et à <strong>Lyon</strong> - les
            deux places fortes du marché des agences SEO et SEA dans
            l&apos;Hexagone. Les agences analysées couvrent cependant
            l&apos;ensemble du territoire, pas uniquement ces deux métropoles.
          </p>
        </section>

        <section aria-labelledby="methodo-title">
          <h2 id="methodo-title">Notre méthodologie de classement</h2>

          <h3>Des critères objectifs, documentés publiquement</h3>
          <p>
            Chaque agence évaluée est notée sur un socle de critères communs,
            appliqués de la même façon à toutes, qu&apos;elle soit une grosse
            structure parisienne ou une petite équipe en région :
          </p>
          <ol>
            <li>
              <strong>Preuves de résultats vérifiables</strong> - cas clients
              datés, chiffres avant/après, secteur d&apos;activité
              identifiable, plutôt que des témoignages génériques.
            </li>
            <li>
              <strong>Transparence de l&apos;offre</strong> - clarté des
              livrables, des délais et des modalités tarifaires, même si le
              prix exact varie selon le projet.
            </li>
            <li>
              <strong>Expertise technique réelle</strong> - capacité à
              expliquer une méthode (audit technique, structuration
              sémantique, tests de citabilité IA) sans se cacher derrière du
              jargon marketing.
            </li>
            <li>
              <strong>Ancienneté et stabilité</strong> - historique de
              l&apos;agence, taille de l&apos;équipe, turnover apparent des
              consultants.
            </li>
            <li>
              <strong>Spécificité GEO / IA</strong> - pour les agences qui
              revendiquent une expertise en référencement IA, vérification
              concrète : outils de suivi utilisés, exemples de citations
              obtenues dans des réponses générées, compréhension démontrée du
              fonctionnement des modèles.
            </li>
            <li>
              <strong>Présence et réputation externes</strong> - avis clients
              recoupés sur plusieurs plateformes, mentions presse ou
              professionnelles, cohérence entre le discours de l&apos;agence
              et ce qu&apos;en disent des tiers.
            </li>
          </ol>

          <h3>Comment on collecte l&apos;information</h3>
          <p>
            On croise plusieurs sources avant de noter une agence : le site de
            l&apos;agence lui-même, ses réalisations publiques, les avis
            clients disponibles sur des plateformes tierces, et quand
            c&apos;est possible, un échange direct avec l&apos;agence pour
            vérifier certains points flous.
          </p>
          <p>
            Aucune note n&apos;est basée sur une seule source. Si une
            information ne peut pas être recoupée, on ne l&apos;utilise pas
            dans la notation.
          </p>

          <h3>Une mise à jour régulière, pas un classement figé</h3>
          <p>
            Le marché bouge vite, surtout côté GEO : une agence qui
            n&apos;avait aucune offre IA il y a un an peut avoir développé une
            vraie expertise entre-temps, et inversement. Nos classements sont
            donc <strong>révisés périodiquement</strong>, pas publiés une fois
            pour toutes en 2026 puis laissés à l&apos;abandon.
          </p>
          <p>
            Quand une agence change significativement d&apos;offre, ferme, ou
            change d&apos;équipe dirigeante, on met à jour la fiche
            correspondante dans les meilleurs délais après vérification.
          </p>
        </section>

        <section aria-labelledby="engagement-title">
          <h2 id="engagement-title">Notre engagement méthodologique</h2>

          <h3>
            Une grille appliquée avec la même rigueur, quelle que soit
            l&apos;agence
          </h3>
          <p>
            Chaque agence évaluée passe par la même grille de critères,
            qu&apos;elle soit une structure de 50 personnes à Paris ou une
            équipe de trois personnes en région. C&apos;est cette constance
            qui donne de la valeur au classement - plus qu&apos;un ressenti
            après un simple appel commercial ou une plaquette bien maquettée.
          </p>
          <p>Concrètement, ça veut dire :</p>
          <ul>
            <li>
              Les notes attribuées reposent sur les mêmes critères documentés
              pour toutes les agences, sans exception de taille ou de
              notoriété.
            </li>
            <li>
              Si une page comporte un contenu commercial (test produit,
              partenariat), le format est signalé explicitement, conformément
              aux pratiques de transparence publicitaire recommandées par
              l&apos;ARPP en France.
            </li>
            <li>
              Les analyses et les classements suivent un protocole écrit,
              réutilisé fiche après fiche, et ajusté au fil des retours
              qu&apos;on reçoit.
            </li>
          </ul>

          <h3>Ce qu&apos;on ne fait pas</h3>
          <ul>
            <li>
              On ne publie pas un format commercial sous l&apos;apparence
              d&apos;un classement neutre sans le signaler comme tel.
            </li>
            <li>
              On ne garantit à aucune agence une place minimale : chaque note
              découle de la grille de critères, pas d&apos;un arrangement fait
              au cas par cas.
            </li>
            <li>
              On ne masque pas les points faibles d&apos;une agence sous
              prétexte qu&apos;elle est connue ou bien financée.
            </li>
          </ul>

          <h3>Ce qu&apos;on fait quand on se trompe</h3>
          <p>
            Une méthodologie n&apos;élimine pas le risque d&apos;erreur : une
            information mal recoupée, un changement chez une agence
            qu&apos;on n&apos;a pas détecté à temps. Quand une erreur
            factuelle nous est signalée et confirmée, on la corrige et on
            l&apos;indique sur la page concernée. La transparence sur nos
            propres limites fait partie de l&apos;engagement.
          </p>
        </section>
      </div>

      <section aria-labelledby="faq-title" className="mt-12">
        <h2 id="faq-title" className="text-2xl font-semibold tracking-tight">
          FAQ
        </h2>
        <div className="mt-6 space-y-4">
          {FAQ.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-border bg-surface p-5 transition-colors open:border-accent/40"
            >
              <summary className="cursor-pointer list-none text-base font-medium marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="text-muted transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="sources-title" className="mt-12">
        <h2
          id="sources-title"
          className="text-2xl font-semibold tracking-tight"
        >
          Sources utiles
        </h2>
        <ul className="mt-4 space-y-2 text-sm sm:text-base">
          {SOURCES.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                className="text-accent underline-offset-4 hover:underline"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
