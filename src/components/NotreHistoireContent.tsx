"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { FaqItem } from "@/lib/categories";

const ease = [0.22, 1, 0.36, 1] as const;

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  num,
  id,
  children,
}: {
  num: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="flex items-baseline gap-3 sm:gap-4">
      <span aria-hidden="true" className="font-display text-sm italic text-accent">
        {num}
      </span>
      <h2
        id={id}
        className="font-display text-2xl font-medium tracking-tight sm:text-3xl"
      >
        {children}
      </h2>
    </Reveal>
  );
}

export function NotreHistoireContent({
  faq,
  sources,
}: {
  faq: FaqItem[];
  sources: { href: string; label: string }[];
}) {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const watermarkY = useTransform(heroProgress, [0, 1], [0, 110]);
  const blobY = useTransform(heroProgress, [0, 1], [0, -60]);

  return (
    <article>
      {/* Reading progress bar */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
        />
      )}

      {/* Hero */}
      <section
        ref={heroRef}
        className="grain relative overflow-hidden border-b border-border"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <motion.div
            style={prefersReducedMotion ? undefined : { y: blobY }}
            className="absolute inset-0"
          >
            <div className="animate-float-slow absolute -top-28 right-[10%] h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
            <div className="animate-float-slower absolute bottom-0 left-[8%] h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
          </motion.div>
          <motion.span
            aria-hidden="true"
            style={prefersReducedMotion ? undefined : { y: watermarkY }}
            className="font-display absolute -right-10 top-1/2 -translate-y-1/2 select-none text-[14rem] font-semibold italic leading-none text-accent/[0.06] sm:text-[20rem]"
          >
            2026
          </motion.span>
        </div>

        <div className="mx-auto max-w-3xl px-6 pb-16 pt-14 sm:pb-20">
          <motion.nav
            aria-label="Fil d'Ariane"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-8 text-sm text-muted"
          >
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
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
              className="inline-block h-px w-12 origin-left bg-accent"
            />
            Le média, sa méthode, ses auteurs
          </motion.p>

          <header>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.15 }}
              className="font-display mt-6 text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl"
            >
              Notre histoire &{" "}
              <em className="text-accent">notre objectif</em>
            </motion.h1>
            <motion.time
              dateTime="2026-07-15"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 block text-sm uppercase tracking-[0.15em] text-muted"
            >
              15 juillet 2026
            </motion.time>
          </header>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        {/* TL;DR */}
        <section aria-labelledby="tldr-title" className="relative mt-[-2.5rem] sm:mt-[-3rem]">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.4 }}
            className="rounded-3xl border border-accent/20 bg-surface p-6 shadow-2xl shadow-accent/10 sm:p-9"
          >
            <h2
              id="tldr-title"
              className="font-display text-lg font-medium italic tracking-tight text-accent"
            >
              TL;DR
            </h2>
            <motion.ul
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-5 space-y-4 text-sm leading-relaxed sm:text-base"
            >
              {[
                <>
                  <strong>Agence-geo.eu</strong> est un média spécialisé, lancé
                  en 2026 par un collectif de spécialistes SEO, GEO et SEA.
                </>,
                <>
                  Notre <strong>mission</strong> : publier des classements et
                  comparatifs documentés des meilleures agences SEO, GEO et
                  référencement IA, pour aider marques et agences à choisir un
                  prestataire sans se perdre dans le marketing.
                </>,
                <>
                  Notre <strong>méthodologie</strong> repose sur des critères
                  objectifs, documentés et mis à jour régulièrement - pas sur
                  des impressions ou un simple appel commercial.
                </>,
                <>
                  Chaque agence est notée selon{" "}
                  <strong>la même grille de critères</strong>, appliquée avec
                  la même rigueur, qu&apos;elle soit une grosse structure ou
                  une petite équipe.
                </>,
                <>
                  Le site cible en priorité le marché <strong>français</strong>{" "}
                  (Paris, Lyon et au-delà), avec un focus stratégique sur le{" "}
                  <strong>GEO et le référencement IA</strong>, la partie la
                  plus mouvante du secteur en 2026.
                </>,
              ].map((item, i) => (
                <motion.li
                  key={i}
                  variants={staggerChild}
                  className="flex gap-3"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </section>

        {/* 01 — Mission */}
        <section aria-labelledby="mission-title" className="mt-20 sm:mt-24">
          <SectionHeading num="01" id="mission-title">
            Notre mission, en une phrase
          </SectionHeading>

          <Reveal delay={0.1}>
            <p className="font-display mt-8 border-l-2 border-accent/40 pl-6 text-xl font-medium leading-relaxed tracking-tight sm:pl-8 sm:text-2xl">
              On classe les agences SEO, GEO et SEA selon une grille de
              critères commune et documentée, pour que vous puissiez comparer
              sans passer par dix appels commerciaux.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="prose prose-neutral mt-8 max-w-none prose-a:text-accent dark:prose-invert">
              <p>
                C&apos;est tout. Pas de discours corporate, pas de promesse
                floue. Agence-geo.eu existe pour répondre à une question simple
                qu&apos;on s&apos;est tous posée un jour en cherchant un
                prestataire :{" "}
                <strong>
                  comment savoir si cette agence est vraiment bonne, ou juste
                  bien vendue ?
                </strong>
              </p>
              <p>
                On a construit ce site parce que cette réponse n&apos;existait
                pas de façon fiable sur le marché français. Les annuaires
                généralistes listent tout le monde sans distinction. Beaucoup
                de classements se contentent d&apos;un ordre alphabétique ou
                d&apos;une simple liste de noms. Et les avis Google, aussi
                utiles soient-ils, ne disent rien de la méthode de travail
                réelle d&apos;une agence.
              </p>
              <p>
                Notre rôle : combler ce vide avec des comparatifs documentés,
                une méthodologie publique, et des critères appliqués de la même
                façon à chaque fiche.
              </p>
            </div>
          </Reveal>
        </section>

        <Reveal className="mt-20 sm:mt-24">
          <hr className="border-ink-rule" />
        </Reveal>

        {/* 02 — Pourquoi */}
        <section aria-labelledby="pourquoi-title" className="mt-20 sm:mt-24">
          <SectionHeading num="02" id="pourquoi-title">
            Pourquoi ce site existe
          </SectionHeading>

          <Reveal delay={0.1}>
            <h3 className="mt-10 text-lg font-semibold tracking-tight">
              Le problème : un marché opaque
            </h3>
            <div className="prose prose-neutral mt-4 max-w-none dark:prose-invert">
              <p>
                Le secteur du référencement en France compte plusieurs milliers
                de structures déclarées, mais seule une fraction en est
                réellement active et compétente sur la durée. Résultat : une{" "}
                <strong>fragmentation extrême</strong> de l&apos;offre, avec
                des écarts de prix qui vont de 500 € à plus de 10 000 € par
                mois pour des prestations parfois indiscernables sur le papier.
              </p>
              <p>
                Trois symptômes reviennent sans cesse quand on discute avec des
                dirigeants qui cherchent une agence :
              </p>
            </div>
          </Reveal>

          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-6 space-y-4"
          >
            {[
              <>
                <strong className="text-foreground">
                  Les devis sont incomparables.
                </strong>{" "}
                Chaque agence structure son offre différemment (forfait, régie,
                mixte), ce qui rend la comparaison de prix quasi impossible
                sans expertise technique.
              </>,
              <>
                <strong className="text-foreground">
                  Les promesses de résultats ne sont pas vérifiables.
                </strong>{" "}
                &quot;Top 1 en 3 mois&quot; ne veut rien dire sans savoir sur
                quel mot-clé, avec quel budget de départ, et sur quel marché
                concurrentiel.
              </>,
              <>
                <strong className="text-foreground">
                  Le GEO et l&apos;IA générative brouillent encore plus les
                  pistes.
                </strong>{" "}
                Depuis l&apos;essor de ChatGPT, Perplexity et Google AI
                Overview, de nombreuses agences se rebaptisent
                &quot;spécialistes GEO&quot; du jour au lendemain, sans
                historique ni méthode vérifiable sur ce terrain encore jeune.
              </>,
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={staggerChild}
                className="rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-accent/5 sm:p-6 sm:text-base"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <Reveal delay={0.1}>
            <h3 className="mt-12 text-lg font-semibold tracking-tight">
              Pourquoi ça nous concerne particulièrement
            </h3>
            <div className="prose prose-neutral mt-4 max-w-none dark:prose-invert">
              <p>
                Le GEO (Generative Engine Optimization) est une discipline née
                fin 2023 dans la recherche académique, et le marché des agences
                qui la proposent en France est encore en formation en 2026. Ce
                flou profite aux acteurs qui savent le mieux communiquer, pas
                forcément à ceux qui savent le mieux exécuter.
              </p>
              <p>
                On a donc décidé de traiter ce sujet en priorité : c&apos;est
                la partie du marché où l&apos;opacité est la plus forte
                aujourd&apos;hui, et celle où une méthodologie rigoureuse et
                documentée a le plus de valeur.
              </p>
            </div>
          </Reveal>
        </section>

        <Reveal className="mt-20 sm:mt-24">
          <hr className="border-ink-rule" />
        </Reveal>

        {/* 03 — Qui sommes-nous */}
        <section aria-labelledby="qui-title" className="mt-20 sm:mt-24">
          <SectionHeading num="03" id="qui-title">
            Qui sommes-nous ?
          </SectionHeading>

          <Reveal delay={0.1}>
            <h3 className="mt-10 text-lg font-semibold tracking-tight">
              Un collectif d&apos;analystes spécialisés
            </h3>
            <div className="prose prose-neutral mt-4 max-w-none dark:prose-invert">
              <p>
                Agence-geo.eu est porté par un{" "}
                <strong>collectif de plusieurs personnes</strong> qui se sont
                spécialisées, chacune de son côté, dans l&apos;analyse et
                l&apos;audit d&apos;agences SEO, GEO et SEA avant de rejoindre
                ce projet commun en 2026.
              </p>
              <p>
                Notre métier, c&apos;est l&apos;analyse et la comparaison
                d&apos;offres SEO, GEO et SEA : documenter des critères,
                croiser des sources, noter des prestations selon un protocole
                écrit. C&apos;est ce travail de fond, plutôt qu&apos;un simple
                avis, qui structure chaque fiche du site.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mt-12 text-lg font-semibold tracking-tight">
              Des profils complémentaires, volontairement
            </h3>
            <div className="prose prose-neutral mt-4 max-w-none dark:prose-invert">
              <p>
                Le collectif réunit trois angles d&apos;expertise distincts,
                choisis pour se confronter les uns aux autres plutôt que pour
                se répéter :
              </p>
            </div>
          </Reveal>

          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {[
              {
                kicker: "SEO",
                text: (
                  <>
                    <strong className="text-foreground">
                      Un profil SEO senior
                    </strong>
                    , avec une pratique de terrain sur l&apos;audit technique,
                    le netlinking et le suivi de positionnement, habitué à
                    distinguer un vrai plan d&apos;action d&apos;un rapport
                    PowerPoint générique.
                  </>
                ),
              },
              {
                kicker: "SEA",
                text: (
                  <>
                    <strong className="text-foreground">
                      Un profil SEA / growth
                    </strong>
                    , issu du pilotage de budgets publicitaires en agence, qui
                    apporte un regard sur la rentabilité réelle des prestations
                    et la lecture critique des chiffres qu&apos;une agence met
                    en avant.
                  </>
                ),
              },
              {
                kicker: "GEO",
                text: (
                  <>
                    <strong className="text-foreground">
                      Un profil spécialisé GEO et IA générative
                    </strong>
                    , qui suit de près les publications académiques sur
                    l&apos;extractibilité des contenus et teste en continu la
                    visibilité des marques dans ChatGPT, Perplexity et Google
                    AI Overview.
                  </>
                ),
              },
            ].map((profile) => (
              <motion.li
                key={profile.kicker}
                variants={staggerChild}
                whileHover={
                  prefersReducedMotion ? undefined : { y: -6, rotate: -0.4 }
                }
                className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/10"
              >
                <span
                  aria-hidden="true"
                  className="font-display absolute -right-3 -top-6 select-none text-6xl font-semibold italic text-accent/[0.07]"
                >
                  {profile.kicker}
                </span>
                <p className="text-sm leading-relaxed text-muted">
                  {profile.text}
                </p>
              </motion.li>
            ))}
          </motion.ul>

          <Reveal delay={0.1}>
            <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
              <p>
                Cette diversité est volontaire : un classement d&apos;agences
                SEO écrit uniquement par des SEO a tendance à sous-évaluer le
                SEA, et inversement. En croisant les regards, on limite ce
                biais de spécialité.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mt-12 text-lg font-semibold tracking-tight">
              Basés en France, avec un ancrage Paris - Lyon
            </h3>
            <div className="prose prose-neutral mt-4 max-w-none dark:prose-invert">
              <p>
                Le collectif travaille depuis la France, avec des contributeurs
                basés à <strong>Paris</strong> et à <strong>Lyon</strong> - les
                deux places fortes du marché des agences SEO et SEA dans
                l&apos;Hexagone. Les agences analysées couvrent cependant
                l&apos;ensemble du territoire, pas uniquement ces deux
                métropoles.
              </p>
            </div>
          </Reveal>
        </section>

        <Reveal className="mt-20 sm:mt-24">
          <hr className="border-ink-rule" />
        </Reveal>

        {/* 04 — Méthodologie */}
        <section aria-labelledby="methodo-title" className="mt-20 sm:mt-24">
          <SectionHeading num="04" id="methodo-title">
            Notre méthodologie de classement
          </SectionHeading>

          <Reveal delay={0.1}>
            <h3 className="mt-10 text-lg font-semibold tracking-tight">
              Des critères objectifs, documentés publiquement
            </h3>
            <div className="prose prose-neutral mt-4 max-w-none dark:prose-invert">
              <p>
                Chaque agence évaluée est notée sur un socle de critères
                communs, appliqués de la même façon à toutes, qu&apos;elle
                soit une grosse structure parisienne ou une petite équipe en
                région :
              </p>
            </div>
          </Reveal>

          <motion.ol
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {[
              {
                title: "Preuves de résultats vérifiables",
                text: "cas clients datés, chiffres avant/après, secteur d'activité identifiable, plutôt que des témoignages génériques.",
              },
              {
                title: "Transparence de l'offre",
                text: "clarté des livrables, des délais et des modalités tarifaires, même si le prix exact varie selon le projet.",
              },
              {
                title: "Expertise technique réelle",
                text: "capacité à expliquer une méthode (audit technique, structuration sémantique, tests de citabilité IA) sans se cacher derrière du jargon marketing.",
              },
              {
                title: "Ancienneté et stabilité",
                text: "historique de l'agence, taille de l'équipe, turnover apparent des consultants.",
              },
              {
                title: "Spécificité GEO / IA",
                text: "pour les agences qui revendiquent une expertise en référencement IA, vérification concrète : outils de suivi utilisés, exemples de citations obtenues dans des réponses générées, compréhension démontrée du fonctionnement des modèles.",
              },
              {
                title: "Présence et réputation externes",
                text: "avis clients recoupés sur plusieurs plateformes, mentions presse ou professionnelles, cohérence entre le discours de l'agence et ce qu'en disent des tiers.",
              },
            ].map((criterion, i) => (
              <motion.li
                key={criterion.title}
                variants={staggerChild}
                whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
              >
                <span
                  aria-hidden="true"
                  className="font-display absolute -right-2 -top-5 select-none text-6xl font-semibold italic text-accent/[0.08]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <strong className="font-display block pr-10 text-base font-medium tracking-tight">
                  {criterion.title}
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {criterion.text}
                </p>
              </motion.li>
            ))}
          </motion.ol>

          <Reveal delay={0.1}>
            <h3 className="mt-12 text-lg font-semibold tracking-tight">
              Comment on collecte l&apos;information
            </h3>
            <div className="prose prose-neutral mt-4 max-w-none dark:prose-invert">
              <p>
                On croise plusieurs sources avant de noter une agence : le site
                de l&apos;agence lui-même, ses réalisations publiques, les
                avis clients disponibles sur des plateformes tierces, et quand
                c&apos;est possible, un échange direct avec l&apos;agence pour
                vérifier certains points flous.
              </p>
              <p>
                Aucune note n&apos;est basée sur une seule source. Si une
                information ne peut pas être recoupée, on ne l&apos;utilise
                pas dans la notation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mt-12 text-lg font-semibold tracking-tight">
              Une mise à jour régulière, pas un classement figé
            </h3>
            <div className="prose prose-neutral mt-4 max-w-none dark:prose-invert">
              <p>
                Le marché bouge vite, surtout côté GEO : une agence qui
                n&apos;avait aucune offre IA il y a un an peut avoir développé
                une vraie expertise entre-temps, et inversement. Nos
                classements sont donc <strong>révisés périodiquement</strong>,
                pas publiés une fois pour toutes en 2026 puis laissés à
                l&apos;abandon.
              </p>
              <p>
                Quand une agence change significativement d&apos;offre, ferme,
                ou change d&apos;équipe dirigeante, on met à jour la fiche
                correspondante dans les meilleurs délais après vérification.
              </p>
            </div>
          </Reveal>
        </section>

        <Reveal className="mt-20 sm:mt-24">
          <hr className="border-ink-rule" />
        </Reveal>

        {/* 05 — Engagement */}
        <section aria-labelledby="engagement-title" className="mt-20 sm:mt-24">
          <SectionHeading num="05" id="engagement-title">
            Notre engagement méthodologique
          </SectionHeading>

          <Reveal delay={0.1}>
            <h3 className="mt-10 text-lg font-semibold tracking-tight">
              Une grille appliquée avec la même rigueur, quelle que soit
              l&apos;agence
            </h3>
            <div className="prose prose-neutral mt-4 max-w-none dark:prose-invert">
              <p>
                Chaque agence évaluée passe par la même grille de critères,
                qu&apos;elle soit une structure de 50 personnes à Paris ou une
                équipe de trois personnes en région. C&apos;est cette
                constance qui donne de la valeur au classement - plus
                qu&apos;un ressenti après un simple appel commercial ou une
                plaquette bien maquettée.
              </p>
              <p>Concrètement, ça veut dire :</p>
              <ul>
                <li>
                  Les notes attribuées reposent sur les mêmes critères
                  documentés pour toutes les agences, sans exception de taille
                  ou de notoriété.
                </li>
                <li>
                  Si une page comporte un contenu commercial (test produit,
                  partenariat), le format est signalé explicitement,
                  conformément aux pratiques de transparence publicitaire
                  recommandées par l&apos;ARPP en France.
                </li>
                <li>
                  Les analyses et les classements suivent un protocole écrit,
                  réutilisé fiche après fiche, et ajusté au fil des retours
                  qu&apos;on reçoit.
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mt-12 text-lg font-semibold tracking-tight">
              Ce qu&apos;on ne fait pas
            </h3>
          </Reveal>

          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-5 space-y-3"
          >
            {[
              "On ne publie pas un format commercial sous l'apparence d'un classement neutre sans le signaler comme tel.",
              "On ne garantit à aucune agence une place minimale : chaque note découle de la grille de critères, pas d'un arrangement fait au cas par cas.",
              "On ne masque pas les points faibles d'une agence sous prétexte qu'elle est connue ou bien financée.",
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={staggerChild}
                className="flex items-start gap-4 rounded-xl border border-border bg-surface px-5 py-4 text-sm leading-relaxed text-muted sm:text-base"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-sm font-semibold text-red-500 dark:text-red-400"
                >
                  ✕
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <Reveal delay={0.1}>
            <h3 className="mt-12 text-lg font-semibold tracking-tight">
              Ce qu&apos;on fait quand on se trompe
            </h3>
            <div className="prose prose-neutral mt-4 max-w-none dark:prose-invert">
              <p>
                Une méthodologie n&apos;élimine pas le risque d&apos;erreur :
                une information mal recoupée, un changement chez une agence
                qu&apos;on n&apos;a pas détecté à temps. Quand une erreur
                factuelle nous est signalée et confirmée, on la corrige et on
                l&apos;indique sur la page concernée. La transparence sur nos
                propres limites fait partie de l&apos;engagement.
              </p>
            </div>
          </Reveal>
        </section>

        <Reveal className="mt-20 sm:mt-24">
          <hr className="border-ink-rule" />
        </Reveal>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="mt-20 sm:mt-24">
          <Reveal>
            <h2
              id="faq-title"
              className="font-display text-2xl font-medium tracking-tight sm:text-3xl"
            >
              FAQ
            </h2>
          </Reveal>
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-8 space-y-4"
          >
            {faq.map((item) => (
              <motion.details
                key={item.question}
                variants={staggerChild}
                className="group rounded-xl border border-border bg-surface p-5 shadow-sm transition-colors open:border-accent/40"
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
              </motion.details>
            ))}
          </motion.div>
        </section>

        {/* Sources */}
        <section aria-labelledby="sources-title" className="mb-24 mt-20 sm:mt-24">
          <Reveal>
            <h2
              id="sources-title"
              className="font-display text-2xl font-medium tracking-tight sm:text-3xl"
            >
              Sources utiles
            </h2>
          </Reveal>
          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-6 space-y-2 text-sm sm:text-base"
          >
            {sources.map((source) => (
              <motion.li key={source.href} variants={staggerChild}>
                <a
                  href={source.href}
                  className="link-sweep text-accent"
                >
                  {source.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </section>
      </div>
    </article>
  );
}
