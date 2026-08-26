/**
 * Seed krótkiego, biznesowego case study Winopasja do Sanity.
 *
 * Treść zgodna z oficjalnym case study (2023), zrzuty z katalogu public/winopasja.
 * Stawiamy na krótką i zwięzłą treść - jedna sekcja = jeden ekran.
 *
 * Uruchomienie:
 *   node scripts/seed-winopasja.mjs
 *   node scripts/seed-winopasja.mjs --no-images   (pomija upload zrzutów)
 */

import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync, existsSync, statSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve, join, basename, extname } from "path";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Konfiguracja ─────────────────────────────────────────────────────────────

const envFile = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
const env = {};
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, "");
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-06-07",
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const SKIP_IMAGES = process.argv.includes("--no-images");

/** Istniejący dokument case study - nadpisujemy, żeby nie tworzyć duplikatów. */
const DOC_ID = "75d0c321-7e84-4364-b112-21ebf2d8e136";
const LEGACY_IDS = ["caseStudy-winopasja"];
const SHOTS_DIR = resolve(__dirname, "../public/winopasja");

// ─── Pomocniki lokalizacji ────────────────────────────────────────────────────

const ls = (pl, en) => ({ _type: "localeString", pl, en });
const lt = (pl, en) => ({ _type: "localeText", pl, en });
const lsa = (pl, en) => ({ _type: "localeStringArray", pl, en });

// ─── Upload zrzutów ───────────────────────────────────────────────────────────

const CACHE_PATH = resolve(__dirname, ".winopasja-assets.json");
const uploadCache = new Map(
  existsSync(CACHE_PATH) ? Object.entries(JSON.parse(readFileSync(CACHE_PATH, "utf-8"))) : [],
);
const persistCache = () =>
  writeFileSync(CACHE_PATH, JSON.stringify(Object.fromEntries(uploadCache), null, 2) + "\n");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function uploadShot(file) {
  const filePath = join(SHOTS_DIR, file);
  if (!existsSync(filePath)) {
    console.warn(`   ⚠️  brak pliku: ${file}`);
    return undefined;
  }
  const cacheKey = `${filePath}:${statSync(filePath).mtimeMs}`;
  if (uploadCache.has(cacheKey)) return uploadCache.get(cacheKey);

  const buffer = await sharp(filePath).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  const filename = `winopasja-${basename(file, extname(file)).toLowerCase().replace(/[^a-z0-9]+/gi, "-")}.webp`;

  let lastError;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const asset = await client.assets.upload("image", buffer, { filename });
      uploadCache.set(cacheKey, asset._id);
      persistCache();
      return asset._id;
    } catch (error) {
      lastError = error;
      console.warn(`   ↻ ponawiam ${filename} (${attempt}/4): ${error.message}`);
      await sleep(attempt * 2000);
    }
  }
  throw lastError;
}

const imageField = (ref) =>
  ref ? { _type: "image", asset: { _type: "reference", _ref: ref } } : undefined;

// ─── Galeria „Zobacz efekt” ─────────────────────────────────────────────────

const GALLERY = [
  { file: "marketplace.jpg", caption: ls("Marketplace - katalog win", "Marketplace - wine catalogue") },
  { file: "panel-winiarni.jpg", caption: ls("Panel winiarni", "Winery panel") },
  { file: "panel-klienta.jpg", caption: ls("Panel klienta", "Customer panel") },
  { file: "vms.jpg", caption: ls("VMS - produkcja wina", "VMS - wine production") },
  { file: "logistyka.jpg", caption: ls("Logistyka i pakowanie", "Logistics and packing") },
  { file: "admin.jpg", caption: ls("Panel administracyjny", "Admin panel") },
];

// ─── Budowa dokumentu ─────────────────────────────────────────────────────────

async function buildCaseStudy() {
  console.log("Przygotowanie zrzutów...");
  const shots = {};
  if (!SKIP_IMAGES) {
    for (const file of ["marketplace.jpg", "panel-winiarni.jpg", "mobile.jpg"]) {
      shots[file] = await uploadShot(file);
    }
  }

  const galleryImages = [];
  if (!SKIP_IMAGES) {
    for (const [i, g] of GALLERY.entries()) {
      const ref = await uploadShot(g.file);
      if (ref) {
        galleryImages.push({
          _key: `gal-${i + 1}`,
          _type: "image",
          asset: { _type: "reference", _ref: ref },
          caption: g.caption,
        });
      }
    }
    console.log(`   ✓ galeria: ${galleryImages.length} zrzutów`);
  }

  const coverRef = shots["marketplace.jpg"];

  return {
    _type: "caseStudy",
    _id: DOC_ID,
    title: ls("Winopasja", "Winopasja"),
    slug: { _type: "slug", current: "winopasja" },
    category: ls("Marketplace e-commerce", "E-commerce marketplace"),
    description: lt(
      "Pierwszy system, w którym winiarnia prowadzi sprzedaż i zarządza całą winnicą w jednym miejscu.",
      "The first system where a winery runs its sales and manages the whole vineyard in one place.",
    ),
    solution: lt(
      "1000+ zamówień, 400+ transakcji i 40+ winiarni gotowych do sprzedaży 24/7 - przy zerowej inwestycji winiarni w technologię.",
      "1000+ orders, 400+ transactions and 40+ wineries ready to sell 24/7 - with zero winery investment in technology.",
    ),
    ...(coverRef ? { image: imageField(coverRef) } : {}),
    sections: [
      // 1. Hero
      {
        _key: "hero",
        _type: "csHeroSection",
        category: ls("Case study · Winopasja", "Case study · Winopasja"),
        title: ls(
          "Pierwszy system, w którym prowadzisz winiarnię i sprzedajesz wino",
          "The first system where you run a winery and sell wine",
        ),
        summary: lt(
          "Jedna platforma łącząca zarządzanie winnicą ze sprzedażą online - koniec arkuszy, mailowych zamówień i osobnych narzędzi.",
          "One platform joining vineyard management with online sales - no more spreadsheets, email orders and scattered tools.",
        ),
        meta: [
          { _key: "m1", label: ls("Branża", "Industry"), value: ls("Wino / E-commerce", "Wine / E-commerce") },
          { _key: "m2", label: ls("Rok", "Year"), value: ls("2023", "2023") },
          {
            _key: "m3",
            label: ls("Zakres", "Scope"),
            value: ls("Strategia · Architektura · Wdrożenie", "Strategy · Architecture · Delivery"),
          },
        ],
        buttonLabel: ls("Podobny projekt? Porozmawiajmy", "A similar project? Let's talk"),
        buttonHref: "/kontakt",
        ...(shots["marketplace.jpg"] ? { webImage: imageField(shots["marketplace.jpg"]) } : {}),
        ...(shots["mobile.jpg"] ? { phoneImage: imageField(shots["mobile.jpg"]) } : {}),
      },

      // 2. Realizacja - ekrany + karty wartości
      {
        _key: "features",
        _type: "csFeaturesSection",
        eyebrow: ls("Realizacja", "Delivery"),
        heading: ls("Co zmieniło wdrożenie", "What the rollout changed"),
        ...(shots["marketplace.jpg"] ? { screenA: imageField(shots["marketplace.jpg"]) } : {}),
        ...(shots["panel-winiarni.jpg"] ? { screenB: imageField(shots["panel-winiarni.jpg"]) } : {}),
        items: [
          {
            _key: "f1",
            icon: "ShoppingBag",
            title: ls("Zarządzaj winiarnią i sprzedawaj w jednym systemie", "Run the winery and sell in one system"),
            text: lt(
              "Pierwsza platforma, która łączy prowadzenie winnicy ze sprzedażą wina online.",
              "The first platform joining vineyard operations with online wine sales.",
            ),
          },
          {
            _key: "f2",
            icon: "Settings",
            title: ls("Sprzedaż online bez własnego sklepu", "Online sales without your own store"),
            text: lt(
              "Winiarnia rusza ze sprzedażą od ręki, na gotowej platformie - bez zespołu IT.",
              "A winery starts selling right away on a ready platform - with no IT team.",
            ),
          },
          {
            _key: "f3",
            icon: "User",
            title: ls("Kupujący zamawiają prosto od winiarni", "Buyers order straight from the winery"),
            text: lt(
              "Prosty koszyk, płatność i dostawa - wino trafia z winnicy na stół klienta.",
              "A simple cart, payment and delivery - wine goes from the vineyard to the customer's table.",
            ),
          },
          {
            _key: "f4",
            icon: "LayoutDashboard",
            title: ls("Cały biznes z jednego panelu", "The whole business from one panel"),
            text: lt(
              "Oferta, magazyn, zamówienia, ceny i analityka - wszystko w jednym miejscu.",
              "Offering, warehouse, orders, prices and analytics - all in one place.",
            ),
          },
        ],
      },

      // 3. Metryki
      {
        _key: "metrics",
        _type: "csMetricsSection",
        items: [
          { _key: "n1", icon: "ShoppingBag", value: "1000+", label: ls("zarejestrowanych zamówień", "registered orders") },
          { _key: "n2", icon: "TrendingUp", value: "400+", label: ls("transakcji od startu", "transactions since launch") },
          { _key: "n3", icon: "Users", value: "40+", label: ls("winiarni sprzedających 24/7", "wineries selling 24/7") },
          { _key: "n4", icon: "ShieldCheck", value: "0 zł", label: ls("inwestycji winiarni w technologię", "winery investment in tech") },
        ],
      },

      // 4. O projekcie
      {
        _key: "about",
        _type: "csAboutSection",
        eyebrow: ls("O projekcie", "About"),
        heading: ls("Jeden system dla całej winiarni", "One system for the whole winery"),
        paragraphs: lsa(
          [
            "Winopasja to pierwsza platforma, na której winiarnia prowadzi sprzedaż i zarządza całą winnicą w jednym miejscu - zamiast arkuszy, mailowych zamówień i osobnych narzędzi.",
            "Klienci kupują wino prosto od producentów, a winiarnie ruszają online od ręki - bez własnego sklepu i bez zespołu IT. Cały biznes, od oferty po wysyłkę i analitykę, prowadzą z jednego panelu.",
          ],
          [
            "Winopasja is the first platform where a winery runs its sales and manages the whole vineyard in one place - instead of spreadsheets, email orders and scattered tools.",
            "Customers buy wine straight from producers, and wineries go online right away - with no store of their own and no IT team. They run the entire business, from offering to shipping and analytics, from a single panel.",
          ],
        ),
      },

      // 5. Wyzwanie / Rozwiązanie / Efekt
      {
        _key: "outcome",
        _type: "csOutcomeSection",
        items: [
          {
            _key: "o1",
            tag: ls("Wyzwanie", "Challenge"),
            text: lt(
              "Winiarnie chciały sprzedawać online, ale nie miały jak - i traciły czas na ręczną obsługę biznesu.",
              "Wineries wanted to sell online but had no way to - and lost time on manual operations.",
            ),
            points: lsa(
              ["Sprzedaż tylko offline", "Zamówienia w mailach i arkuszach", "Brak jednego miejsca na biznes"],
              ["Offline sales only", "Orders in emails and spreadsheets", "No single place for the business"],
            ),
          },
          {
            _key: "o2",
            tag: ls("Rozwiązanie", "Solution"),
            text: lt(
              "Jeden system, w którym winiarnia sprzedaje wino i prowadzi całą winnicę - bez własnego sklepu i IT.",
              "One system where a winery sells wine and runs the whole vineyard - with no own store or IT.",
            ),
            points: lsa(
              ["Sprzedaż online od ręki", "Zamówienia, ceny i magazyn w panelu", "Kupujący zamawiają prosto od winiarni"],
              ["Online sales right away", "Orders, prices and stock in one panel", "Buyers order straight from the winery"],
            ),
          },
          {
            _key: "o3",
            tag: ls("Efekt", "Result"),
            text: lt(
              "Winiarnie zaczynają sprzedawać online od razu i prowadzą cały biznes z jednego miejsca.",
              "Wineries start selling online immediately and run the whole business from one place.",
            ),
            points: lsa(
              ["Nowy kanał sprzedaży", "Mniej pracy ręcznej", "Łatwe skalowanie oferty"],
              ["A new sales channel", "Less manual work", "Easy to scale the offering"],
            ),
          },
        ],
      },

      // 6. Zakres
      {
        _key: "scope",
        _type: "csScopeSection",
        eyebrow: ls("Zakres", "Scope"),
        heading: ls("Co dostarczyliśmy", "What we delivered"),
        items: [
          { _key: "s1", text: ls("Marketplace sprzedaży wina", "Wine sales marketplace") },
          { _key: "s2", text: ls("Panel winiarni (sprzedawcy)", "Winery panel (seller)") },
          { _key: "s3", text: ls("Panel klienta końcowego", "End customer panel") },
          { _key: "s4", text: ls("Panel administracyjny", "Admin panel") },
          { _key: "s5", text: ls("Logistyka, płatności i fakturowanie", "Logistics, payments and invoicing") },
          { _key: "s6", text: ls("Moduły enoturystyki i promocji", "Enotourism and promotion modules") },
        ],
      },

      // 7. Galeria
      {
        _key: "gallery",
        _type: "csGallerySection",
        eyebrow: ls("Produkt", "Product"),
        heading: ls("Zobacz efekt", "See the result"),
        ...(galleryImages.length ? { images: galleryImages } : {}),
      },

      // 8. Technologie
      {
        _key: "tech",
        _type: "csTechSection",
        items: [
          { _key: "t1", name: "Next.js" },
          { _key: "t2", name: "NestJS" },
          { _key: "t3", name: "React Native" },
          { _key: "t4", name: "PostgreSQL" },
          { _key: "t5", name: "Prisma" },
          { _key: "t6", name: "Cloudflare" },
          { _key: "t7", name: "PayNow" },
          { _key: "t8", name: "Furgonetka" },
        ],
      },
    ],
  };
}

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("Seed case study Winopasja (krótka wersja)");
  console.log(`Projekt: ${env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${env.NEXT_PUBLIC_SANITY_DATASET}`);
  if (SKIP_IMAGES) console.log("Tryb --no-images: zrzuty pominięte.");

  try {
    const caseStudy = await buildCaseStudy();
    const result = await client.createOrReplace(caseStudy);

    const stale = [`drafts.${DOC_ID}`, ...LEGACY_IDS];
    for (const id of stale) {
      if (await client.getDocument(id)) {
        await client.delete(id);
        console.log(`   🧹 usunięto duplikat/wersję roboczą: ${id}`);
      }
    }

    console.log(`✅ Zapisano: ${result._id}`);
    console.log(`   Sekcje: ${caseStudy.sections.length}`);
    console.log(`   URL: /case-studies/winopasja`);
  } catch (error) {
    console.error("❌ Błąd seeda:", error.message);
    if (error.statusCode === 403) {
      console.error("   Token nie ma uprawnień do zapisu. Wygeneruj token Editor na sanity.io/manage.");
    }
    process.exitCode = 1;
  }
}

seed();
