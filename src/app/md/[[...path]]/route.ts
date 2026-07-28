import { markdownForPath } from "@/lib/markdown";

/**
 * Version Markdown des pages, servie à la même URL par réécriture depuis
 * `src/proxy.ts` quand un agent envoie `Accept: text/markdown`.
 *
 * Ces URLs `/md/...` ne sont ni listées dans le sitemap ni indexables : elles
 * dupliqueraient le contenu réel et gaspilleraient du budget de crawl.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params;
  const pathname = "/" + (path ?? []).join("/");
  const markdown = markdownForPath(pathname);

  if (!markdown) {
    return new Response("Not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=0, must-revalidate",
      Vary: "Accept",
    },
  });
}
