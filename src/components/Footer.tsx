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

        <div className="mt-6 flex flex-col items-start justify-between gap-4 text-sm text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Agence-Geo.eu — Tous droits réservés.</p>
          <div className="flex gap-4">
            <span>Mentions légales</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
