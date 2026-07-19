import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CATEGORY_LABELS, getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

const BASE_URL = "https://agence-geo.eu";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${BASE_URL}/blog/${post.slug}`;
  const image =
    post.cover && /\.(jpe?g|png|webp)$/i.test(post.cover)
      ? `${BASE_URL}${post.cover}`
      : `${BASE_URL}/og-default.png`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.date,
      images: [{ url: image, width: 1600, height: 900, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

function buildJsonLd(post: NonNullable<ReturnType<typeof getPostBySlug>>) {
  const url = `${BASE_URL}/blog/${post.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.description,
      ...(post.cover ? { image: `${BASE_URL}${post.cover}` } : {}),
      author: { "@type": "Organization", name: "Agence-Geo.eu" },
      publisher: {
        "@type": "Organization",
        name: "Agence-Geo.eu",
        logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
      },
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: url,
      inLanguage: "fr",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: CATEGORY_LABELS[post.category],
          item: `${BASE_URL}/${post.category}`,
        },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  if (post.itemList && post.itemList.length > 0) {
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#classement`,
      itemListElement: post.itemList.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        ...(item.url ? { url: item.url } : {}),
      })),
    });
  }

  if (post.faq && post.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = buildJsonLd(post);

  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-6 flex items-center gap-3 text-sm text-muted">
        <span className="rounded-full bg-accent-soft px-2.5 py-1 font-medium text-accent">
          {CATEGORY_LABELS[post.category]}
        </span>
        <time>
          {new Date(post.date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </div>
      <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-muted">{post.description}</p>

      {post.cover && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
          <Image src={post.cover} alt="" fill className="object-cover" priority />
        </div>
      )}

      <div className="prose prose-neutral mt-10 max-w-none prose-headings:tracking-tight prose-a:text-accent dark:prose-invert">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}
