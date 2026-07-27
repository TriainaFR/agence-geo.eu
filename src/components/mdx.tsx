import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Composants éditoriaux disponibles dans les articles MDX.
 * Chaque bloc porte `not-prose` : la mise en forme vient d'ici, pas du plugin
 * typography, pour rester lisible en thème clair comme en thème sombre.
 */

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
      {children}
    </span>
  );
}

/** Encadré de synthèse en tête de section (« En bref »). */
export function Bref({
  title = "En bref",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="not-prose my-8 border-l-2 border-accent bg-accent-soft px-5 py-4">
      <Label>{title}</Label>
      <div className="mt-2 space-y-3 text-[0.975rem] leading-relaxed text-foreground [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-medium">
        {children}
      </div>
    </aside>
  );
}

/** Chiffre propriétaire mis en avant à côté de son commentaire. */
export function Data({
  figure,
  label = "Donnée propriétaire",
  children,
}: {
  figure: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <aside className="not-prose my-10 flex flex-col gap-4 border border-border bg-surface p-6 sm:flex-row sm:items-center sm:gap-7">
      <div className="shrink-0">
        <div className="font-display text-4xl font-medium leading-none tracking-tight text-accent sm:text-5xl">
          {figure}
        </div>
        <div className="mt-2">
          <Label>{label}</Label>
        </div>
      </div>
      <div className="space-y-3 text-[0.95rem] leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-medium [&_strong]:text-foreground">
        {children}
      </div>
    </aside>
  );
}

/** Grille de cartes numérotées (les piliers d'une méthode, les étapes…). */
export function Cards({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {children}
    </div>
  );
}

export function Card({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col border border-border bg-surface p-5">
      <span className="font-display text-2xl font-medium leading-none text-accent/60">
        {n}
      </span>
      <h3 className="mt-3 font-display text-lg font-medium leading-snug tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
    </div>
  );
}

/** Liste de questions/réponses, rendue en <dl> pour la sémantique. */
export function Faq({ children }: { children: ReactNode }) {
  return (
    <dl className="not-prose my-8 divide-y divide-border border-y border-border">
      {children}
    </dl>
  );
}

export function Q({
  q,
  children,
}: {
  q: string;
  children: ReactNode;
}) {
  return (
    <div className="py-5">
      <dt className="font-display text-lg font-medium leading-snug tracking-tight">
        {q}
      </dt>
      <dd className="mt-2 space-y-3 text-[0.95rem] leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-medium [&_strong]:text-foreground">
        {children}
      </dd>
    </div>
  );
}

/** Appel à l'action en fin d'article. */
export function Cta({
  title,
  href,
  action,
  children,
}: {
  title: string;
  href: string;
  action: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  const cls =
    "mt-5 inline-block border border-background/30 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-background hover:text-foreground";

  return (
    <aside className="not-prose my-10 bg-foreground px-6 py-8 text-center text-background">
      <p className="font-display text-xl font-medium tracking-tight sm:text-2xl">
        {title}
      </p>
      <div className="mx-auto mt-3 max-w-lg text-[0.95rem] leading-relaxed text-background/75">
        {children}
      </div>
      {external ? (
        <a href={href} rel="noopener noreferrer" target="_blank" className={cls}>
          {action}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {action}
        </Link>
      )}
    </aside>
  );
}

/** Encart de présentation d'un acteur cité dans l'article. */
export function About({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <aside className="not-prose my-8 border-l-2 border-ink-rule bg-surface px-5 py-4">
      <Label>À propos de {name}</Label>
      <div className="mt-2 space-y-3 text-[0.9rem] leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-medium [&_strong]:text-foreground">
        {children}
      </div>
    </aside>
  );
}

/** Les tableaux larges défilent au lieu de déborder sur mobile. */
function Table(props: React.ComponentProps<"table">) {
  return (
    <div className="-mx-6 my-8 overflow-x-auto px-6">
      <table {...props} className="my-0 min-w-[38rem] text-[0.9rem]" />
    </div>
  );
}

export const mdxComponents = {
  Bref,
  Data,
  Cards,
  Card,
  Faq,
  Q,
  Cta,
  About,
  table: Table,
};
