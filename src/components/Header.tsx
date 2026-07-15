"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NAV_ITEMS = [
  { href: "/seo", label: "SEO" },
  { href: "/geo", label: "GEO" },
  { href: "/localisation", label: "Par localisation" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
            AG
          </span>
          <span className="text-base font-semibold tracking-tight">
            Agence-Geo<span className="text-accent">.eu</span>
          </span>
        </Link>

        <span className="hidden shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted sm:inline-block">
          Média indépendant
        </span>

        <nav className="order-3 flex w-full items-center gap-1 overflow-x-auto rounded-full border border-border bg-background p-1 sm:order-none sm:w-auto">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex-1 whitespace-nowrap rounded-full px-3 py-1.5 text-center text-sm font-medium transition-colors sm:flex-none sm:px-4",
                  active
                    ? "bg-accent text-white shadow-sm"
                    : "text-muted hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
