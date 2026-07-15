"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CATEGORY_LABELS, type PostMeta } from "@/lib/categories";

const CATEGORY_STYLES: Record<string, string> = {
  seo: "bg-surface/90 text-accent",
  geo: "bg-surface/90 text-emerald-600 dark:text-emerald-400",
  sea: "bg-surface/90 text-sky-600 dark:text-sky-400",
  localisation: "bg-surface/90 text-amber-600 dark:text-amber-400",
};

export function ArticleCard({ post, index = 0 }: { post: PostMeta; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-accent-soft">
          {post.cover ? (
            <Image
              src={post.cover}
              alt=""
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div className="font-display absolute inset-0 flex items-center justify-center text-4xl font-semibold italic text-accent/20 transition-transform duration-500 group-hover:scale-110">
              {CATEGORY_LABELS[post.category]}
            </div>
          )}
          <span
            className={`absolute left-4 top-4 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-md ${CATEGORY_STYLES[post.category]}`}
          >
            {CATEGORY_LABELS[post.category]}
            {post.city ? ` · ${post.city}` : ""}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="font-display text-xl font-medium leading-snug tracking-tight">
            <span className="link-sweep">{post.title}</span>
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {post.description}
          </p>
          <div className="mt-auto flex items-center justify-between pt-3">
            <time className="text-xs uppercase tracking-[0.15em] text-muted">
              {new Date(post.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span
              aria-hidden="true"
              className="text-sm text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
