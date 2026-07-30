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
  /** Date de première publication. Ne bouge jamais après la mise en ligne. */
  date: string;
  /**
   * Date de dernière modification de fond, si le contenu a changé après la
   * publication. Alimente `dateModified` et le `lastmod` du sitemap ; à ne pas
   * renseigner pour une correction de forme.
   */
  updated?: string;
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
