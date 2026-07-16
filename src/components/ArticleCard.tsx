"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CATEGORY_LABELS, type PostMeta } from "@/lib/categories";

export function ArticleCard({ post, index = 0 }: { post: PostMeta; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
        <div className="relative aspect-[16/9] overflow-hidden bg-accent-soft">
          {post.cover ? (
            <Image
              src={post.cover}
              alt=""
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div className="font-display absolute inset-0 flex items-center justify-center text-4xl font-semibold italic text-accent/20">
              {CATEGORY_LABELS[post.category]}
            </div>
          )}
          <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap bg-foreground px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-background">
            {CATEGORY_LABELS[post.category]}
            {post.city ? ` · ${post.city}` : ""}
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-3 px-4 pb-2 pt-6 text-center">
          <h3 className="font-display text-xl font-medium leading-snug tracking-tight decoration-accent decoration-2 underline-offset-4 transition-colors group-hover:underline">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {post.description}
          </p>
          <time className="mt-auto pt-2 text-[11px] uppercase tracking-[0.18em] text-muted">
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
