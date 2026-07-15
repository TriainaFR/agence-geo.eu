"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORY_LABELS, type PostMeta } from "@/lib/categories";

const CATEGORY_STYLES: Record<string, string> = {
  seo: "bg-accent-soft text-accent",
  geo: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  localisation: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export function ArticleCard({ post, index = 0 }: { post: PostMeta; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-accent-soft">
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-accent/20 transition-transform duration-500 group-hover:scale-110">
            {CATEGORY_LABELS[post.category]}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <span
            className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${CATEGORY_STYLES[post.category]}`}
          >
            {CATEGORY_LABELS[post.category]}
            {post.city ? ` · ${post.city}` : ""}
          </span>
          <h3 className="text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted">{post.description}</p>
          <time className="mt-auto pt-2 text-xs text-muted">
            {new Date(post.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>
      </Link>
    </motion.article>
  );
}
