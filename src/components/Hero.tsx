"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-float-slow absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="animate-float-slower absolute top-10 right-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted"
        >
          Comparatifs & classements d&apos;agences en France
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          Comprendre et choisir la bonne agence, sans filtre
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-base text-muted"
        >
          Le guide des agences <strong className="text-foreground">SEO</strong> ·{" "}
          <strong className="text-foreground">GEO</strong> ·{" "}
          <strong className="text-foreground">SEA</strong>
        </motion.p>
      </div>
    </section>
  );
}
