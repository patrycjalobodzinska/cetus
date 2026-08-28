/**
 * Seed logotypów do sekcji „Zaufali nam" (dokumenty typu `partner`).
 *
 * POCHODZENIE PLIKÓW: przy każdym wpisie zapisane w polu `source` - albo
 * adres na oficjalnej stronie firmy, albo plik dostarczony przez klienta.
 * Do repo trafiają kopie w public/partners, żeby seed był powtarzalny.
 *
 * Nadal NIE dodano firm, dla których nie ma ani pliku od klienta, ani
 * pewnego źródła: Comati, EMX Services, GreyStatistics, MHC Go,
 * MHC Mobility Spot, MobiCarClub, OnePower, Pigener, Platforma CAS, PZTri,
 * RentMe, RescueGlass, SuperParts. W wyszukiwarce wychodzą podmioty o tej
 * samej nazwie z innych branż (np. „EMX Services" w KRS to serwis maszyn
 * z Radzyn, a nie serwis stacji ładowania EV), a logo niewłaściwej firmy
 * na stronie dla decydenta to realne wprowadzenie w błąd.
 *
 * Uruchomienie:
 *   node scripts/seed-partners-logos.mjs
 *   node scripts/seed-partners-logos.mjs --dry   (bez zapisu)
 */

import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync, existsSync, statSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve, join } from "path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));

const envFile = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
const env = {};
for (const line of envFile.split("\n")) {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m) env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-06-07",
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const DRY = process.argv.includes("--dry");
const LOGOS_DIR = resolve(__dirname, "../public/partners");

const ls = (v) => ({ _type: "localeString", pl: v, en: v });

// Kolejność zaczyna się od 10, żeby nie wchodzić w drogę wpisom już
// istniejącym w CMS (Winopasja, 4mobility, Flex To Go).
//
// Zdjęte z sekcji na życzenie klienta (2026-08-28): 6moto, Sydig,
// ConnectedLife oraz SoDA - dokumenty usunięte z CMS, więc i seed ich nie
// przywraca. Pliki logo zostają w public/partners, gdyby miały wrócić.
const PARTNERS = [
  {
    id: "partner-artinside",
    name: "Artinside",
    file: "artinside.png",
    url: "https://www.artinside.pl/",
    source: "https://artinside.pl/img/Artinside logo nowe 2022png.png",
    order: 10,
  },
  {
    id: "partner-traineron",
    name: "Traineron",
    file: "traineron.png",
    url: "https://traineron.com/",
    source: "https://traineron.com/assets/logo/dark/logo_traineron.png",
    order: 11,
  },
  {
    id: "partner-spotbrowser",
    name: "SpotBrowser",
    file: "spotbrowser.png",
    url: "https://spotbrowser.com/",
    source: "https://spotbrowser.com/wp-content/uploads/2020/10/cropped-Logo-BGWhite-270x270.png",
    order: 14,
  },
  {
    id: "partner-beer-o-meter",
    name: "Beer-o-meter",
    file: "beer-o-meter.png",
    url: null,
    source: "plik od klienta (wklejony w rozmowie 2026-08-26)",
    order: 16,
  },
  {
    id: "partner-aipax",
    name: "Aipax",
    file: "aipax.png",
    url: null,
    source: "plik od klienta (wklejony w rozmowie 2026-08-26)",
    order: 17,
  },
  {
    id: "partner-aquares",
    name: "AQUARes",
    file: "aquares.png",
    url: "http://aquares.pl/",
    source:
      "http://aquares.pl/wp-content/uploads/2021/11/cropped-cropped-aquares3.png (obcięta flaga UE z lewej)",
    order: 15,
  },
];

const CACHE_PATH = resolve(__dirname, ".partners-assets.json");
const cache = new Map(
  existsSync(CACHE_PATH) ? Object.entries(JSON.parse(readFileSync(CACHE_PATH, "utf-8"))) : [],
);
const persist = () =>
  writeFileSync(CACHE_PATH, JSON.stringify(Object.fromEntries(cache), null, 2) + "\n");

// Logotypy są małe i mają przezroczystość - nie skalujemy w górę i zostajemy
// przy PNG, żeby krawędzie liter zostały ostre.
async function uploadLogo(file) {
  const path = join(LOGOS_DIR, file);
  if (!existsSync(path)) {
    console.warn(`   ⚠️  brak pliku: ${file}`);
    return undefined;
  }
  const key = `${path}:${statSync(path).mtimeMs}`;
  if (cache.has(key)) return cache.get(key);

  const buf = await sharp(path).resize({ width: 720, withoutEnlargement: true }).png().toBuffer();
  const asset = await client.assets.upload("image", buf, { filename: `partner-${file}` });
  cache.set(key, asset._id);
  persist();
  return asset._id;
}

async function seed() {
  console.log(`Seed logotypów „Zaufali nam" -> ${env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${env.NEXT_PUBLIC_SANITY_DATASET}`);
  if (DRY) console.log("Tryb --dry: bez zapisu.\n");

  for (const p of PARTNERS) {
    const ref = DRY ? undefined : await uploadLogo(p.file);
    const doc = {
      _type: "partner",
      _id: p.id,
      name: ls(p.name),
      order: p.order,
      logoTone: p.logoTone ?? "dark",
      invertColors: false,
      ...(p.url ? { url: p.url } : {}),
      ...(ref ? { logo: { _type: "image", asset: { _type: "reference", _ref: ref } } } : {}),
    };
    if (DRY) {
      console.log(`   [dry] ${p.name.padEnd(12)} <- ${p.file}`);
      continue;
    }
    await client.createOrReplace(doc);
    const draft = `drafts.${p.id}`;
    if (await client.getDocument(draft)) await client.delete(draft);
    console.log(`   ✓ ${p.name.padEnd(12)} logo=${ref ? "tak" : "BRAK"}  tlo=${p.logoTone === "light" ? "ciemne" : "jasne"}  ${p.url ?? "-"}`);
  }

  console.log(`\nGotowe: ${PARTNERS.length} partnerów.`);
}

seed().catch((e) => {
  console.error("❌", e.message);
  process.exitCode = 1;
});
