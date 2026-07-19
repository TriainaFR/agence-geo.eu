import type { PostMeta } from "@/lib/categories";

const BASE_URL = "https://agence-geo.eu";

/**
 * JSON-LD CollectionPage + BreadcrumbList pour les pages de listing
 * (catégories et index du blog).
 */
export function CollectionJsonLd({
  path,
  name,
  description,
  posts,
}: {
  path: string;
  name: string;
  description: string;
  posts: PostMeta[];
}) {
  const url = `${BASE_URL}${path}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        url,
        name,
        description,
        inLanguage: "fr",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        ...(posts.length
          ? {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: posts.map((post, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  url: `${BASE_URL}/blog/${post.slug}`,
                  name: post.title,
                })),
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name, item: url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
