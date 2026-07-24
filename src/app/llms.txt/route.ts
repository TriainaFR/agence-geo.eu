import { getAllPosts } from "@/lib/posts";
import { AUTHOR, AUTHOR_URL } from "@/lib/author";

const BASE_URL = "https://agence-geo.eu";

// Fichier statique régénéré au build, comme le sitemap.
export const dynamic = "force-static";

/**
 * /llms.txt — index du site en Markdown à destination des IA génératives.
 * Format : https://llmstxt.org
 * Généré depuis les articles, donc toujours à jour après publication.
 */
export function GET() {
  const posts = getAllPosts();

  // Les comparatifs portent un classement d'agences (itemList) ; les autres
  // articles sont des guides.
  const comparatifs = posts.filter((p) => p.itemList?.length);
  const guides = posts.filter((p) => !p.itemList?.length);

  const line = (title: string, path: string, description: string) =>
    `- [${title}](${BASE_URL}${path}): ${description}`;

  const sections = [
    `# Agence-Geo.eu`,
    ``,
    `> Comparatifs et classements d'agences SEO, GEO (Generative Engine Optimization) et SEA en France.`,
    ``,
    `Agence-Geo.eu publie des comparatifs d'agences et des guides sur le référencement naturel et l'optimisation pour les moteurs génératifs (ChatGPT, Perplexity, Google AI Overviews).`,
    ``,
    // Minuscule sur la première lettre uniquement, pour ne pas casser « SEO & GEO ».
    `Tous les contenus sont signés par ${AUTHOR.name}, ${
      AUTHOR.jobTitle.charAt(0).toLowerCase() + AUTHOR.jobTitle.slice(1)
    }. Les classements appliquent une grille de critères documentée et publique : preuves de résultats vérifiables, transparence de l'offre, expertise technique, ancienneté, spécificité GEO/IA et réputation externe.`,
    ``,
    `Langue : français. Marché couvert : France.`,
  ];

  if (comparatifs.length) {
    sections.push(
      ``,
      `## Comparatifs et classements d'agences`,
      ``,
      ...comparatifs.map((p) =>
        line(p.title, `/blog/${p.slug}`, p.description)
      )
    );
  }

  if (guides.length) {
    sections.push(
      ``,
      `## Guides SEO, GEO et référencement IA`,
      ``,
      ...guides.map((p) => line(p.title, `/blog/${p.slug}`, p.description))
    );
  }

  sections.push(
    ``,
    `## Rubriques`,
    ``,
    line("SEO", "/seo", "Référencement naturel : guides, critères de choix et comparatifs d'agences."),
    line("GEO", "/geo", "Generative Engine Optimization : visibilité dans ChatGPT, Perplexity, Gemini et Google AI Overviews."),
    line("SEA", "/sea", "Publicité en ligne : Google Ads, Meta, LinkedIn."),
    line("Par localisation", "/localisation", "Agences par région et par ville en France."),
    line("Blog", "/blog", "Tous les articles et guides du site."),
    ``,
    `## À propos`,
    ``,
    line(
      "Notre histoire & notre objectif",
      "/notre-histoire-objectif",
      "Qui édite le site, sa mission et la méthodologie de classement appliquée à chaque agence."
    ),
    `- [${AUTHOR.name}](${AUTHOR_URL}): ${AUTHOR.jobTitle}, autrice des contenus du site. LinkedIn : ${AUTHOR.linkedin}`,
    line("Contact", "/contact", "Formulaire de contact : signaler une erreur, proposer un sujet, poser une question sur la méthodologie."),
    line("Mentions légales", "/mentions-legales", "Éditeur, hébergement et méthodologie éditoriale."),
    ``
  );

  return new Response(sections.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
