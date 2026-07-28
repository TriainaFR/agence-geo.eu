const BASE_URL = "https://agence-geo.eu";

export const dynamic = "force-static";

/**
 * Préférences d'usage du contenu, format Content Signals.
 * https://contentsignals.org — brouillon IETF.
 *
 * search    : indexation par les moteurs de recherche classiques.
 * ai-input  : réutilisation comme source dans une réponse générée (RAG).
 *             C'est le signal qui gouverne les citations dans ChatGPT,
 *             Perplexity ou les AI Overviews — le cœur du GEO, donc « yes ».
 * ai-train  : entraînement de modèles. Refusé : céder le contenu aux poids
 *             d'un modèle n'apporte aucune citation en retour.
 */
const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=no";

/**
 * Crawlers IA autorisés explicitement. Un groupe robots.txt ne s'applique
 * qu'au user-agent le plus spécifique qui correspond : ces agents sont donc
 * regroupés pour que le Content-Signal les atteigne aussi, sinon seul le
 * groupe « * » le porterait et ils ne le verraient jamais.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "DuckAssistBot",
  "MistralAI-User",
  "meta-externalagent",
  "Amazonbot",
  "cohere-ai",
  "CCBot",
];

export function GET() {
  const body = [
    "# Agence-Geo.eu",
    "# Préférences d'usage du contenu : https://contentsignals.org",
    "",
    "User-agent: *",
    `Content-Signal: ${CONTENT_SIGNAL}`,
    "Allow: /",
    "",
    "# Crawlers IA : accès autorisé, mêmes préférences d'usage.",
    ...AI_CRAWLERS.map((bot) => `User-agent: ${bot}`),
    `Content-Signal: ${CONTENT_SIGNAL}`,
    "Allow: /",
    "",
    `Sitemap: ${BASE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
