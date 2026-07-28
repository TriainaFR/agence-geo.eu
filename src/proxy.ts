import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Négociation de contenu Markdown.
 *
 * Un agent qui envoie `Accept: text/markdown` reçoit la version Markdown de la
 * page, à la même URL : la réécriture vers `/md/...` est interne, l'agent ne
 * voit ni redirection ni URL parallèle à indexer. Les navigateurs, qui
 * demandent `text/html`, continuent de recevoir le HTML.
 */
export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/markdown")) return NextResponse.next();

  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/md" : `/md${pathname}`;

  const response = NextResponse.rewrite(url);
  // La réponse dépend de l'en-tête Accept : indispensable pour les caches.
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: [
    "/",
    "/blog",
    "/blog/:slug",
    "/seo",
    "/geo",
    "/sea",
    "/localisation",
  ],
};
