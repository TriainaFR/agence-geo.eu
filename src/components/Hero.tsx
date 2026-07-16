"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CATEGORY_LABELS, type PostMeta } from "@/lib/categories";

const ease = [0.22, 1, 0.36, 1] as const;

type FeaturedPost = Pick<
  PostMeta,
  "slug" | "title" | "description" | "category" | "cover" | "city"
>;

export function Hero({ featured }: { featured: FeaturedPost }) {
  return (
    <section className="border-b border-border">
      {/* Masthead editorial */}
      <div className="mx-auto max-w-4xl px-6 pb-12 pt-14 text-center sm:pt-16">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
        >
          Comparatifs & classements d&apos;agences en France
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="font-display mx-auto mt-6 max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl"
        >
          Comprendre et choisir la bonne agence,{" "}
          <em className="text-accent">sans filtre</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
          className="mt-6 text-base text-muted sm:text-lg"
        >
          Le guide des agences{" "}
          <strong className="font-semibold text-foreground">SEO</strong> ·{" "}
          <strong className="font-semibold text-foreground">GEO</strong> ·{" "}
          <strong className="font-semibold text-foreground">SEA</strong>
        </motion.p>
      </div>

      {/* Featured article, plein écran façon magazine */}
      <Link
        href={`/blog/${featured.slug}`}
        title="Lire l'article à la une"
        className="group relative block overflow-hidden"
      >
        <div className="relative aspect-[4/3] w-full sm:aspect-[21/9]">
          {featured.cover ? (
            <Image
              src={featured.cover}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-accent-soft" />
          )}

          {/* Cercle éditorial */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.4 }}
              className="flex aspect-square w-[min(82vw,300px)] flex-col items-center justify-center gap-4 rounded-full bg-black/55 px-8 text-center backdrop-blur-[2px] transition-colors duration-500 group-hover:bg-black/65 sm:w-[420px] sm:px-14"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/85">
                {CATEGORY_LABELS[featured.category]}
                {featured.city ? ` · ${featured.city}` : ""}
              </span>
              <span className="font-display text-xl font-medium leading-snug text-white sm:text-3xl">
                {featured.title}
              </span>
              <span
                aria-hidden="true"
                className="block h-[3px] w-8 bg-white/80 transition-all duration-500 group-hover:w-14"
              />
            </motion.div>
          </div>
        </div>
      </Link>

      {/* Chapô de l'article à la une */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.55 }}
        className="mx-auto max-w-2xl px-6 py-10 text-center text-base font-medium leading-relaxed sm:text-lg"
      >
        {featured.description}
      </motion.p>
    </section>
  );
}
