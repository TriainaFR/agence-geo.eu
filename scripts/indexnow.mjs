#!/usr/bin/env node
// Soumission des URLs à IndexNow.
//
// IndexNow prévient instantanément les moteurs qu'une page a été créée, mise à
// jour ou supprimée, au lieu d'attendre le prochain crawl. Une seule soumission
// suffit : les moteurs participants (Bing, Yandex, Seznam, Naver…) se partagent
// les URLs reçues. Copilot n'a pas d'endpoint propre — il s'appuie sur l'index
// de Bing, donc soumettre à Bing le couvre automatiquement.
//
// Par défaut le script ne soumet que les URLs NOUVELLES ou MODIFIÉES depuis la
// dernière exécution (comparaison des <lastmod> du sitemap avec un état local),
// conformément aux Bing Webmaster Guidelines qui déconseillent les envois en
// masse répétés.
//
// Usage :
//   npm run indexnow                     # soumet uniquement ce qui a changé
//   npm run indexnow -- --all            # force la soumission de tout le sitemap
//   npm run indexnow -- --dry-run        # affiche sans rien envoyer
//   npm run indexnow <url> [<url> ...]   # soumet des URLs précises
//
// Le site doit être en ligne et <KEY>.txt accessible à KEY_LOCATION.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "agence-geo.eu";
const BASE_URL = `https://${HOST}`;
const KEY = "508b1294cad2967473d65f2c7f680e23";
const KEY_LOCATION = `${BASE_URL}/${KEY}.txt`;
// Endpoint Bing (partagé avec les autres moteurs du protocole IndexNow).
const ENDPOINT = "https://www.bing.com/indexnow";
const SITEMAP_URL = process.env.SITEMAP_URL || `${BASE_URL}/sitemap.xml`;

const STATE_FILE = join(
  dirname(fileURLToPath(import.meta.url)),
  ".indexnow-state.json"
);

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const submitAll = args.includes("--all");
const explicitUrls = args.filter((a) => a.startsWith("http"));

/** Lit le sitemap et renvoie [{ url, lastmod }]. */
async function readSitemap() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Échec de récupération du sitemap : ${res.status} ${SITEMAP_URL}`);
  }
  const xml = await res.text();
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((block) => {
    const entry = block[1];
    const url = (entry.match(/<loc>([^<]+)<\/loc>/) || [])[1]?.trim();
    const lastmod = (entry.match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1]?.trim();
    return { url, lastmod: lastmod || "" };
  }).filter((e) => e.url);
}

function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, "utf8"));
  } catch {
    return {};
  }
}

function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n");
}

let urlList;
let nextState = null;

if (explicitUrls.length) {
  urlList = explicitUrls;
} else {
  const entries = await readSitemap();
  const previous = loadState();

  if (submitAll) {
    urlList = entries.map((e) => e.url);
  } else {
    urlList = entries
      .filter((e) => previous[e.url] !== e.lastmod)
      .map((e) => e.url);
  }

  nextState = Object.fromEntries(entries.map((e) => [e.url, e.lastmod]));

  const unchanged = entries.length - urlList.length;
  if (unchanged > 0) {
    console.log(`${unchanged} URL(s) inchangée(s) depuis la dernière soumission — ignorée(s).`);
  }
}

if (!urlList.length) {
  console.log("Rien de nouveau à soumettre. (Utilisez --all pour tout renvoyer.)");
  process.exit(0);
}

const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };

console.log(`IndexNow → ${ENDPOINT}`);
console.log(`Host : ${HOST}`);
console.log(`Clé  : ${KEY_LOCATION}`);
console.log(`${urlList.length} URL(s) à soumettre :`);
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

if (nextState) saveState(nextState);

console.log("\nOK — URLs soumises à IndexNow (Bing, Copilot et moteurs partenaires).");
