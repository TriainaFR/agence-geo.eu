import { CATEGORY_LABELS, getAllPosts, getPostsByCategory, getPostBySlug, type Category, type Post } from "@/lib/posts";
import { AUTHOR } from "@/lib/author";

const BASE_URL = "https://agence-geo.eu";

/**
 * Rend le corps MDX en Markdown lisible par un agent : les composants
 * éditoriaux de `src/components/mdx.tsx` n'ont pas d'équivalent Markdown,
 * on les remplace par leur contenu, en gardant le libellé porteur de sens.
 */
function mdxToMarkdown(source: string): string {
  return (
    source
      // <Card n="01" title="Technique">texte</Card> → sous-titre + texte
      .replace(
        /<Card\s+n="[^"]*"\s+title="([^"]*)"\s*>([\s\S]*?)<\/Card>/g,
        (_m, title: string, body: string) => `**${title}** — ${body.trim()}\n`
      )
      // <Q q="Question ?">réponse</Q> → question en gras + réponse
      .replace(
        /<Q\s+q="([^"]*)"\s*>([\s\S]*?)<\/Q>/g,
        (_m, q: string, body: string) => `**${q}**\n${body.trim()}\n`
      )
      // <Data figure="78 %">commentaire</Data> → chiffre + commentaire
      .replace(
        /<Data\s+figure="([^"]*)"[^>]*>([\s\S]*?)<\/Data>/g,
        (_m, figure: string, body: string) => `**${figure}** — ${body.trim()}\n`
      )
      // <About name="Triaina">texte</About>
      .replace(
        /<About\s+name="([^"]*)"\s*>([\s\S]*?)<\/About>/g,
        (_m, name: string, body: string) => `**À propos de ${name}** — ${body.trim()}\n`
      )
      // <Cta title="…" href="…" action="…">texte</Cta>
      .replace(
        /<Cta\s+title="([^"]*)"\s+href="([^"]*)"\s+action="([^"]*)"\s*>([\s\S]*?)<\/Cta>/g,
        (_m, title: string, href: string, action: string, body: string) =>
          `**${title}** — ${body.trim()} [${action}](${href})\n`
      )
      // <Bref>, <Cards>, <Faq> : conteneurs sans contenu propre
      .replace(/<\/?(?:Bref|Cards|Faq)(?:\s[^>]*)?>/g, "")
      // Liens internes relatifs → absolus, un agent n'a pas de contexte de page
      .replace(/\]\((\/[^)]*)\)/g, `](${BASE_URL}$1)`)
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

function postToMarkdown(post: Post): string {
  const date = new Date(post.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const head = [
    `# ${post.title}`,
    ``,
    `> ${post.description}`,
    ``,
    `${CATEGORY_LABELS[post.category]} · Publié le ${date} · Par ${AUTHOR.name}, ${AUTHOR.jobTitle}`,
    `Source : ${BASE_URL}/blog/${post.slug}`,
    ``,
  ];

  const faq = post.faq?.length
    ? [
        ``,
        `## Questions fréquentes`,
        ``,
        ...post.faq.flatMap((f) => [`**${f.question}**`, ``, f.answer, ``]),
      ]
    : [];

  return [...head, mdxToMarkdown(post.content), ...faq].join("\n").trim() + "\n";
}

function listToMarkdown(title: string, intro: string, posts: Post[]): string {
  const lines = [
    `# ${title}`,
    ``,
    `> ${intro}`,
    ``,
    `${posts.length} article${posts.length > 1 ? "s" : ""}. Contenus signés ${AUTHOR.name}, ${AUTHOR.jobTitle}.`,
    ``,
  ];

  for (const p of posts) {
    lines.push(
      `## ${p.title}`,
      ``,
      p.description,
      ``,
      `${BASE_URL}/blog/${p.slug}`,
      ``
    );
  }

  lines.push(
    `---`,
    ``,
    `Index complet du site : ${BASE_URL}/llms.txt`,
    ``
  );

  return lines.join("\n");
}

const CATEGORY_INTROS: Record<Category, string> = {
  seo: "Référencement naturel : guides, critères de choix et comparatifs d'agences.",
  geo: "Generative Engine Optimization : visibilité dans ChatGPT, Perplexity, Gemini et Google AI Overviews.",
  sea: "Publicité en ligne : Google Ads, Meta, LinkedIn.",
  localisation: "Agences par région et par ville en France.",
};

/**
 * Version Markdown d'une page du site, ou `null` si la page n'en a pas —
 * l'appelant sert alors le HTML normalement.
 */
export function markdownForPath(pathname: string): string | null {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (path === "/" || path === "/blog") {
    return listToMarkdown(
      "Agence-Geo.eu",
      "Comparatifs et classements d'agences SEO, GEO et SEA en France.",
      getAllPosts()
    );
  }

  const category = path.slice(1) as Category;
  if (category in CATEGORY_INTROS) {
    return listToMarkdown(
      `Agence-Geo.eu — ${CATEGORY_LABELS[category]}`,
      CATEGORY_INTROS[category],
      getPostsByCategory(category)
    );
  }

  const match = path.match(/^\/blog\/([^/]+)$/);
  if (match) {
    const post = getPostBySlug(match[1]);
    return post ? postToMarkdown(post) : null;
  }

  return null;
}
