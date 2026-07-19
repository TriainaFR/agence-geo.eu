export const AUTHOR = {
  name: "Evelyne Brois",
  slug: "evelyne-brois",
  path: "/auteurs/evelyne-brois",
  jobTitle: "Rédactrice, spécialiste SEO & GEO",
  linkedin: "https://www.linkedin.com/in/evelyne-brois-37b5a1408/",
} as const;

const BASE_URL = "https://agence-geo.eu";

export const AUTHOR_URL = `${BASE_URL}${AUTHOR.path}`;

/** Nœud Person réutilisé dans les JSON-LD Article du site. */
export function authorJsonLd() {
  return {
    "@type": "Person",
    "@id": `${AUTHOR_URL}#person`,
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle,
    url: AUTHOR_URL,
    sameAs: [AUTHOR.linkedin],
    worksFor: { "@type": "Organization", name: "Agence-Geo.eu" },
  };
}
