"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NAV_ITEMS = [
  { href: "/seo", label: "SEO" },
  { href: "/geo", label: "GEO" },
  { href: "/sea", label: "SEA" },
  { href: "/localisation", label: "Par localisation" },
  { href: "/notre-histoire-objectif", label: "Notre histoire" },
  { href: "/contact", label: "Contact" },
];

function NavLinks({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active =
          pathname === item.href || pathname?.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "whitespace-nowrap text-xs font-medium uppercase tracking-[0.18em] transition-colors",
              compact
                ? active
                  ? "text-background"
                  : "text-background/60 hover:text-background"
                : active
                  ? "text-accent"
                  : "text-foreground/70 hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="border-b border-border bg-surface">
        {/* Utility bar */}
        <div className="bg-foreground py-1.5 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-background">
          Comparatif SEO · GEO · SEA
        </div>

        {/* Masthead */}
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-6 py-6 sm:py-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-border sm:h-11 sm:w-11">
              <Image
                src="/logo-96.png"
                alt="Logo Agence-Geo.eu"
                width={40}
                height={40}
                unoptimized
              />
            </span>
            <span className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Agence-Geo<span className="italic text-accent">.eu</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav
          aria-label="Navigation principale"
          className="border-t border-border"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-start gap-7 overflow-x-auto px-6 py-3.5 sm:justify-center">
            <NavLinks />
          </div>
        </nav>
      </header>

      {/* Compact sticky bar, revealed on scroll */}
      <div
        aria-hidden={!scrolled}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 bg-foreground shadow-lg transition-transform duration-300",
          scrolled ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
          <Link
            href="/"
            className="font-display shrink-0 text-lg font-medium tracking-tight text-background"
            tabIndex={scrolled ? 0 : -1}
          >
            Agence-Geo<span className="italic">.eu</span>
          </Link>
          <nav
            aria-label="Navigation compacte"
            className="flex items-center gap-6 overflow-x-auto"
          >
            <NavLinks compact />
          </nav>
        </div>
      </div>
    </>
  );
}
