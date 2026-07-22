import type { MetadataRoute } from "next";
import type { Category } from "@/lib/categories";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";

const BASE_URL = "https://agence-geo.eu";

// Dernière modification réelle des pages éditoriales qui ne listent pas
// d'articles. À mettre à jour quand on en modifie le contenu.
const NOTRE_HISTOIRE_UPDATED = "2026-07-19";
const CONTACT_UPDATED = "2026-07-22";
// Les pages de catégorie encore sans article ont été modifiées à l'ajout
// de leur JSON-LD CollectionPage.
const EMPTY_CATEGORY_UPDATED = "2026-07-19";

/** Date la plus récente d'une liste de dates ISO, sinon la valeur de repli. */
function latest(dates: string[], fallback: string): string {
  return dates.length ? [...dates].sort().at(-1)! : fallback;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // Les pages de listing changent réellement dès qu'un article est publié :
  // leur lastmod suit donc la date du contenu le plus récent qu'elles affichent.
  const latestOverall = latest(
    posts.map((p) => p.date),
    EMPTY_CATEGORY_UPDATED
  );
  const categoryLastMod = (category: Category) =>
    latest(
      getPostsByCategory(category).map((p) => p.date),
      EMPTY_CATEGORY_UPDATED
    );

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: latestOverall,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/seo`,
      lastModified: categoryLastMod("seo"),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/geo`,
      lastModified: categoryLastMod("geo"),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sea`,
      lastModified: categoryLastMod("sea"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/localisation`,
      lastModified: categoryLastMod("localisation"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: latestOverall,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/notre-histoire-objectif`,
      lastModified: NOTRE_HISTOIRE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: CONTACT_UPDATED,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      // La page autrice liste ses articles : elle change avec eux.
      url: `${BASE_URL}/auteurs/evelyne-brois`,
      lastModified: latestOverall,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
