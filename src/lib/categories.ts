export type Category = "seo" | "geo" | "sea" | "localisation";

export type FaqItem = {
  question: string;
  answer: string;
};

export type RankedItem = {
  name: string;
  url?: string;
  description?: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  /** Version courte réservée à la balise <title> (le H1 garde `title`). */
  metaTitle?: string;
  description: string;
  date: string;
  category: Category;
  tags: string[];
  cover: string;
  region?: string;
  city?: string;
  faq?: FaqItem[];
  itemList?: RankedItem[];
};

export const CATEGORY_LABELS: Record<Category, string> = {
  seo: "SEO",
  geo: "GEO",
  sea: "SEA",
  localisation: "Par localisation",
};
