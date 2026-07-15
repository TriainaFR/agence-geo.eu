import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Classements",
    links: [
      { href: "/seo", label: "Agences SEO" },
      { href: "/geo", label: "Agences GEO" },
      { href: "/sea", label: "Agences SEA" },
      { href: "/localisation", label: "Par localisation" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "mailto:contact@agence-geo.eu", label: "Contact" },
      { href: "/mentions-legales", label: "Mentions légales" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-xl border border-border bg-accent-soft px-5 py-4 text-sm text-muted">
          <strong className="text-foreground">Agence-Geo.eu</strong> est un
          média indépendant. Nous ne sommes affiliés à aucune des agences SEO,
          GEO ou SEA mentionnées sur ce site, et ne percevons aucune
          commission sur les recommandations publiées.
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
          <section>
            <h3 className="text-sm font-semibold tracking-tight">À propos</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              <strong className="text-foreground">Agence-Geo.eu</strong> est un
              média indépendant dédié à la comparaison et l&apos;analyse
              d&apos;agences SEO, GEO et SEA en France. Nous publions des
              guides, des classements et des actualités pour aider les
              entreprises à choisir le bon prestataire en marketing digital.
            </p>
          </section>

          {FOOTER_COLUMNS.map((col) => (
            <section key={col.title}>
              <h3 className="text-sm font-semibold tracking-tight">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Agence-Geo.eu — Tous droits réservés.</p>
          <p>Média indépendant spécialisé dans le SEO, GEO et SEA.</p>
        </div>
      </div>
    </footer>
  );
}
