"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="grain relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-float-slow absolute -top-32 right-[8%] h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="animate-float-slower absolute bottom-0 left-[12%] h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        {/* Oversized editorial watermark */}
        <span
          aria-hidden="true"
          className="font-display absolute -right-8 top-1/2 -translate-y-1/2 select-none text-[16rem] font-semibold italic leading-none text-accent/[0.05] sm:text-[22rem]"
        >
          GEO
        </span>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="inline-block h-px w-12 origin-left bg-accent"
          />
          Comparatifs & classements d&apos;agences en France
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="font-display mt-8 max-w-3xl text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Comprendre et choisir la bonne agence,{" "}
          <em className="text-accent">sans filtre</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="mt-8 max-w-xl text-lg text-muted"
        >
          Le guide des agences{" "}
          <strong className="font-semibold text-foreground">SEO</strong> ·{" "}
          <strong className="font-semibold text-foreground">GEO</strong> ·{" "}
          <strong className="font-semibold text-foreground">SEA</strong>
        </motion.p>
      </div>
    </section>
  );
}
