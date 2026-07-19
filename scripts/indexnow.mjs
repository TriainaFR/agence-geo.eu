#!/usr/bin/env node
// Soumission des URLs à IndexNow (Bing, Yandex, et autres moteurs participants).
//
// IndexNow prévient instantanément les moteurs qu'une page a été créée, mise à
// jour ou supprimée, au lieu d'attendre le prochain crawl. Bing alimentant
// ChatGPT Search et Copilot, c'est aussi un levier de visibilité IA (GEO).
//
// Usage :
//   node scripts/indexnow.mjs                      # soumet toutes les URLs du sitemap
//   node scripts/indexnow.mjs <url> [<url> ...]    # soumet des URLs précises
//   node scripts/indexnow.mjs --dry-run            # affiche la charge utile, n'envoie rien
//
// Prérequis (une fois le site en ligne sur HOST) :
//   - le fichier <KEY>.txt doit être accessible à KEY_LOCATION (déjà dans public/) ;
//   - chaque URL soumise doit renvoyer un 200.
// Tant que le domaine n'est pas déployé, utilisez --dry-run pour vérifier.

const HOST = "agence-geo.eu";
const BASE_URL = `https://${HOST}`;
const KEY = "508b1294cad2967473d65f2c7f680e23";
const KEY_LOCATION = `${BASE_URL}/${KEY}.txt`;
// Endpoint Bing IndexNow (partagé avec les autres moteurs du protocole).
const ENDPOINT = "https://www.bing.com/indexnow";
const SITEMAP_URL = process.env.SITEMAP_URL || `${BASE_URL}/sitemap.xml`;

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const explicitUrls = args.filter((a) => a.startsWith("http"));

async function urlsFromSitemap() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Échec de récupération du sitemap : ${res.status} ${SITEMAP_URL}`);
  }
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const urlList = explicitUrls.length ? explicitUrls : await urlsFromSitemap();

if (!urlList.length) {
  console.error("Aucune URL à soumettre.");
  process.exit(1);
}

const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };

console.log(`IndexNow → ${ENDPOINT}`);
console.log(`Host : ${HOST}`);
console.log(`Clé  : ${KEY_LOCATION}`);
console.log(`${urlList.length} URL(s) :`);
urlList.forEach((u) => console.log("  " + u));

if (dryRun) {
  console.log("\n--dry-run : rien n'a été envoyé.");
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

console.log(`\nRéponse : ${res.status} ${res.statusText}`);
const body = await res.text();
if (body) console.log(body);

// 200 = accepté · 202 = accepté, validation de la clé en cours.
if (![200, 202].includes(res.status)) {
  console.error(
    "\nÉchec. Vérifiez que le site est en ligne, que " +
      KEY_LOCATION +
      " renvoie la clé, et que les URLs renvoient un 200."
  );
  process.exit(1);
}

console.log("\nOK — URLs soumises à IndexNow.");
