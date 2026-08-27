/**
 * Seed case study Artinside do Sanity.
 *
 * Treść zgodna z oficjalnym case study (wersja 1.0, sierpień 2026), projekt
 * zrealizowany w lipcu 2022. Zrzuty z katalogu public/artinside.
 * Ta sama konwencja co seed-winopasja.mjs - jedna sekcja = jeden ekran treści.
 *
 * Uruchomienie:
 *   node scripts/seed-artinside.mjs
 *   node scripts/seed-artinside.mjs --no-images   (pomija upload zrzutów)
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

const DOC_ID = "caseStudy-artinside";
const SHOTS_DIR = resolve(__dirname, "../public/artinside");

// ─── Pomocniki lokalizacji ────────────────────────────────────────────────────

const ls = (pl, en) => ({ _type: "localeString", pl, en });
const lt = (pl, en) => ({ _type: "localeText", pl, en });
const lsa = (pl, en) => ({ _type: "localeStringArray", pl, en });

// ─── Upload zrzutów ───────────────────────────────────────────────────────────

const CACHE_PATH = resolve(__dirname, ".artinside-assets.json");
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

  const buffer = await sharp(filePath)
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
  const filename = `artinside-${basename(file, extname(file)).toLowerCase().replace(/[^a-z0-9]+/gi, "-")}.webp`;

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

// ─── Galeria „Zobacz efekt” ──────────────────────────────────────────────────

const GALLERY = [
  {
    file: "strona-glowna.jpg",
    caption: ls("Strona główna - praca dnia", "Home page - artwork of the day"),
  },
  { file: "galeria.jpg", caption: ls("Galeria z filtrami", "Gallery with filters") },
  { file: "artysci.jpg", caption: ls("Profile 147 artystów", "Profiles of 147 artists") },
  { file: "promocje.jpg", caption: ls("Katalog promocji", "Promotions catalogue") },
];

// ─── Budowa dokumentu ─────────────────────────────────────────────────────────

async function buildCaseStudy() {
  console.log("Przygotowanie zrzutów...");
  const shots = {};
  if (!SKIP_IMAGES) {
    for (const file of ["galeria.jpg", "strona-glowna.jpg", "promocje.jpg", "mobile.jpg"]) {
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

  const coverRef = shots["galeria.jpg"];

  return {
    _type: "caseStudy",
    _id: DOC_ID,
    title: ls("Artinside", "Artinside"),
    slug: { _type: "slug", current: "artinside" },
    category: ls("Galeria sztuki online", "Online art gallery"),
    description: lt(
      "Galeria sztuki online, która z 20-letniego systemu stała się szybką platformą gotową na rozwój sprzedaży.",
      "An online art gallery that went from a 20-year-old system to a fast platform ready to grow sales.",
    ),
    solution: lt(
      "Czas otwarcia galerii spadł z ok. 20 sekund do ułamka sekundy - około 40 razy szybciej. Na nową platformę przeszło 4 000 obrazów, 147 artystów i 512 kont klientów.",
      "Gallery load time fell from about 20 seconds to a fraction of a second - roughly 40 times faster. 4,000 artworks, 147 artists and 512 customer accounts moved to the new platform.",
    ),
    ...(coverRef ? { image: imageField(coverRef) } : {}),
    sections: [
      // 1. Hero
      {
        _key: "hero",
        _type: "csHeroSection",
        category: ls("Case study · Artinside", "Case study · Artinside"),
        title: ls(
          "Galeria, która otwiera się w ułamku sekundy, nie w dwadzieścia",
          "A gallery that opens in a fraction of a second, not twenty",
        ),
        summary: lt(
          "Dwie dekady bez opieki technologicznej zamknęły platformę na jakąkolwiek zmianę. Przepisaliśmy ją od podstaw, zachowując oprawę i logikę sprzedaży, którą znali klienci.",
          "Two decades without technical care had closed the platform to any change. We rewrote it from the ground up, keeping the look and the sales logic its customers already knew.",
        ),
        meta: [
          {
            _key: "m1",
            label: ls("Branża", "Industry"),
            value: ls("Sztuka / E-commerce", "Art / E-commerce"),
          },
          { _key: "m2", label: ls("Rok", "Year"), value: ls("2022", "2022") },
          {
            _key: "m3",
            label: ls("Model", "Model"),
            value: ls("B2C - sprzedaż obrazów", "B2C - artwork sales"),
          },
          {
            _key: "m4",
            label: ls("Zakres", "Scope"),
            value: ls("Analiza · Przepisanie · Wdrożenie", "Analysis · Rewrite · Delivery"),
          },
        ],
        buttonLabel: ls("Macie stary system? Porozmawiajmy", "Stuck with an old system? Let's talk"),
        buttonHref: "/kontakt",
        ...(shots["strona-glowna.jpg"] ? { webImage: imageField(shots["strona-glowna.jpg"]) } : {}),
        ...(shots["mobile.jpg"] ? { phoneImage: imageField(shots["mobile.jpg"]) } : {}),
      },

      // 2. Realizacja - ekrany + karty wartości
      {
        _key: "features",
        _type: "csFeaturesSection",
        eyebrow: ls("Realizacja", "Delivery"),
        heading: ls("Co zmieniło przepisanie systemu", "What the rewrite changed"),
        ...(shots["galeria.jpg"] ? { screenA: imageField(shots["galeria.jpg"]) } : {}),
        ...(shots["promocje.jpg"] ? { screenB: imageField(shots["promocje.jpg"]) } : {}),
        items: [
          {
            _key: "f1",
            icon: "TrendingUp",
            title: ls("Galeria otwiera się natychmiast", "The gallery opens instantly"),
            text: lt(
              "Czas ładowania kolekcji spadł z ok. 20 sekund do ułamka sekundy. Obrazy otwierają się od razu, a przewijanie jest płynne.",
              "Collection load time fell from about 20 seconds to a fraction of a second. Artworks open at once and scrolling is smooth.",
            ),
          },
          {
            _key: "f2",
            icon: "Users",
            title: ls("Obrazy i artyści na pierwszym planie", "Artworks and artists up front"),
            text: lt(
              "Katalog 4 000 prac z pełnym opisem, profile 147 artystów, wyszukiwanie po kategoriach, motywach i kolorach oraz dokładne powiększanie obrazów.",
              "A catalogue of 4,000 works with full descriptions, profiles of 147 artists, search by category, motif and colour, and precise artwork zoom.",
            ),
          },
          {
            _key: "f3",
            icon: "ShoppingCart",
            title: ls("Zamówienie z potwierdzeniem dostępności", "Orders with availability confirmation"),
            text: lt(
              "Obraz widoczny w galerii nie zawsze jest wolny - mógł zostać sprzedany przez artystę. Każde zamówienie przechodzi przez potwierdzenie właściciela, a status widać na każdym etapie.",
              "An artwork shown in the gallery is not always available - the artist may have sold it. Every order passes through the owner's confirmation, and its status is visible at each step.",
            ),
          },
          {
            _key: "f4",
            icon: "Tag",
            title: ls("Marketing bez udziału programistów", "Marketing without developers"),
            text: lt(
              "Promocje, newsletter, banery i lista prac polecanych - właściciel prowadzi komunikację i eksponuje wybrane prace samodzielnie.",
              "Promotions, newsletter, banners and a featured-works list - the owner runs communication and highlights selected works on their own.",
            ),
          },
        ],
      },

      // 3. Metryki
      {
        _key: "metrics",
        _type: "csMetricsSection",
        items: [
          {
            _key: "n1",
            icon: "TrendingUp",
            value: "~40×",
            label: ls("szybsze otwarcie galerii", "faster gallery load"),
          },
          {
            _key: "n2",
            icon: "Sparkles",
            value: "20 s → <1 s",
            label: ls("czas ładowania kolekcji", "collection load time"),
          },
          {
            _key: "n3",
            icon: "Database",
            value: "~4 000",
            label: ls("obrazów 147 artystów", "artworks by 147 artists"),
          },
          {
            _key: "n4",
            icon: "Users",
            value: "512",
            label: ls("kont klientów przeniesionych", "customer accounts migrated"),
          },
        ],
      },

      // 4. O projekcie
      {
        _key: "about",
        _type: "csAboutSection",
        eyebrow: ls("O projekcie", "About"),
        heading: ls("Ten sam interfejs, zupełnie nowy produkt", "The same interface, an entirely new product"),
        paragraphs: lsa(
          [
            "Artinside to internetowa galeria i marketplace sztuki, w którym kolekcjonerzy kupują prace uznanych artystów. Platforma działała od ponad dwóch dekad i to był zarazem jej największy problem: zbudowana na początku lat 2000, przez lata bez opieki technologicznej, bez kontaktu z pierwotnymi twórcami i bez dokumentacji.",
            "Dla biznesu opartego na prezentowaniu sztuki było to kosztowne w najbardziej dosłowny sposób. Otwarcie galerii trwało nawet 20 sekund - dużo, gdy ktoś przychodzi oglądać obrazy warte kilkanaście, a czasem kilkadziesiąt tysięcy złotych. Właściciel nie mógł też dodać nowych funkcji ani lepiej wypozycjonować oferty w Google.",
            "Zamiast dokładać kolejne łatki, rozłożyliśmy system do fundamentów, zrozumieliśmy każdy element procesu sprzedaży i napisaliśmy platformę na nowo - na współczesnym, wspieranym stacku. Interfejs, który znali stali klienci, pozostał bez zmian; zmieniliśmy to, co pod spodem.",
            "Świadomie zrezygnowaliśmy z integracji płatności i kuriera. Przy niewielkiej liczbie zamówień i dużych gabarytach obrazów właściciel obsługuje przelew i wysyłkę samodzielnie - było to tańsze i szybsze do uruchomienia niż budowa tych modułów.",
          ],
          [
            "Artinside is an online gallery and art marketplace where collectors buy works by established artists. The platform had been running for over two decades, and that was also its biggest problem: built in the early 2000s, it went years without technical care, with no contact with its original authors and no documentation.",
            "For a business built on presenting art, this was costly in the most literal sense. Opening the gallery took up to 20 seconds - a long time for someone who came to look at paintings worth tens of thousands of zloty. The owner also could not add new features or position the offering better in Google.",
            "Instead of adding more patches, we took the system apart down to its foundations, understood every step of the sales process and wrote the platform anew - on a modern, supported stack. The interface regular customers knew stayed as it was; we changed what sat underneath.",
            "We deliberately skipped payment and courier integrations. With a modest order volume and large artwork formats, the owner handles bank transfers and shipping personally - cheaper and faster to launch than building those modules.",
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
              "Biznes stał na przestarzałej, powolnej aplikacji, której nie dało się już ani naprawić, ani rozbudować.",
              "The business ran on an outdated, slow application that could no longer be fixed or extended.",
            ),
            points: lsa(
              [
                "Otwarcie galerii nawet 20 sekund",
                "Niewspierany framework, brak dokumentacji",
                "Brak możliwości dodania nowych funkcji",
              ],
              [
                "Gallery took up to 20 seconds to open",
                "Unsupported framework, no documentation",
                "No way to add new features",
              ],
            ),
          },
          {
            _key: "o2",
            tag: ls("Rozwiązanie", "Solution"),
            text: lt(
              "Pełne przepisanie aplikacji na wspierany stack, przy zachowaniu znanej klientom oprawy i logiki sprzedaży.",
              "A full rewrite onto a supported stack, keeping the look and sales logic customers already knew.",
            ),
            points: lsa(
              [
                "Dekompozycja i analiza starego systemu",
                "Galeria, profile artystów i proces zamówienia od nowa",
                "Moduły marketingowe i optymalizacja pod wyszukiwarki",
              ],
              [
                "Decomposition and analysis of the old system",
                "Gallery, artist profiles and order flow rebuilt",
                "Marketing modules and search optimisation",
              ],
            ),
          },
          {
            _key: "o3",
            tag: ls("Efekt", "Result"),
            text: lt(
              "Galeria wygląda znajomo, ale działa jak nowy produkt - i można ją rozwijać razem z biznesem.",
              "The gallery looks familiar but works like a new product - and it can grow with the business.",
            ),
            points: lsa(
              [
                "Około 40 razy krótszy czas otwarcia galerii",
                "Nowe narzędzia marketingowe: promocje, newsletter, banery",
                "Lepsza widoczność prac w Google",
              ],
              [
                "Gallery opens roughly 40 times faster",
                "New marketing tools: promotions, newsletter, banners",
                "Better visibility of works in Google",
              ],
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
          {
            _key: "s1",
            text: ls(
              "Dekompozycja i analiza nieudokumentowanego systemu",
              "Decomposition and analysis of an undocumented system",
            ),
          },
          {
            _key: "s2",
            text: ls("Przepisanie platformy na wspierany stack", "Platform rewrite onto a supported stack"),
          },
          { _key: "s3", text: ls("Galeria sztuki i profile artystów", "Art gallery and artist profiles") },
          {
            _key: "s4",
            text: ls(
              "Proces zamówienia z potwierdzaniem dostępności",
              "Order flow with availability confirmation",
            ),
          },
          {
            _key: "s5",
            text: ls("Panel administracyjny i panel klienta", "Admin panel and customer panel"),
          },
          {
            _key: "s6",
            text: ls(
              "Moduły marketingowe: promocje, newsletter, banery, top lista",
              "Marketing modules: promotions, newsletter, banners, featured list",
            ),
          },
          {
            _key: "s7",
            text: ls(
              "Optymalizacja pod wyszukiwarki: feed produktowy i analityka",
              "Search optimisation: product feed and analytics",
            ),
          },
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
          { _key: "t1", name: "ASP.NET MVC" },
          { _key: "t2", name: ".NET 6" },
          { _key: "t3", name: "PostgreSQL" },
          { _key: "t4", name: "Azure Blob Storage" },
          { _key: "t5", name: "Google Analytics" },
          { _key: "t6", name: "Feed produktowy XML" },
        ],
      },
    ],
  };
}

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("Seed case study Artinside");
  console.log(`Projekt: ${env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${env.NEXT_PUBLIC_SANITY_DATASET}`);
  if (SKIP_IMAGES) console.log("Tryb --no-images: zrzuty pominięte.");

  try {
    const caseStudy = await buildCaseStudy();
    const result = await client.createOrReplace(caseStudy);

    const draftId = `drafts.${DOC_ID}`;
    if (await client.getDocument(draftId)) {
      await client.delete(draftId);
      console.log(`   🧹 usunięto wersję roboczą: ${draftId}`);
    }

    console.log(`✅ Zapisano: ${result._id}`);
    console.log(`   Sekcje: ${caseStudy.sections.length}`);
    console.log(`   URL: /case-studies/artinside`);
  } catch (error) {
    console.error("❌ Błąd seeda:", error.message);
    if (error.statusCode === 403) {
      console.error("   Token nie ma uprawnień do zapisu. Wygeneruj token Editor na sanity.io/manage.");
    }
    process.exitCode = 1;
  }
}

seed();
