export type Category = "seo" | "geo" | "sea" | "localisation";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: Category;
  tags: string[];
  cover: string;
  region?: string;
  city?: string;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  seo: "SEO",
  geo: "GEO",
  sea: "SEA",
  localisation: "Par localisation",
};
