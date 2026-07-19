import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = "https://agence-geo.eu";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/seo`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/geo`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/sea`, changeFrequency: "daily", priority: 0.8 },
    {
      url: `${BASE_URL}/localisation`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    { url: `${BASE_URL}/blog`, changeFrequency: "daily", priority: 0.7 },
    {
      url: `${BASE_URL}/notre-histoire-objectif`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.4 },
    {
      url: `${BASE_URL}/auteurs/evelyne-brois`,
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
