/**
 * Seed case study EMDesk (projekt EMX) do Sanity.
 *
 * Treść zgodna z oficjalnym case study (sierpień 2026), wdrożenie 22 czerwca 2026.
 * Zrzuty z katalogu public/emdesk. Ta sama konwencja co seed-winopasja.mjs
 * i seed-artinside.mjs - jedna sekcja = jeden ekran treści.
 *
 * UWAGA: link do dema na Vercelu i hasło dostępowe z PDF-a to materiał
 * wewnętrzny - świadomie nie trafiają do treści publicznej.
 *
 * Uruchomienie:
 *   node scripts/seed-emdesk.mjs
 *   node scripts/seed-emdesk.mjs --no-images   (pomija upload zrzutów)
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

const DOC_ID = "caseStudy-emdesk";
const SHOTS_DIR = resolve(__dirname, "../public/emdesk");

// ─── Pomocniki lokalizacji ────────────────────────────────────────────────────

const ls = (pl, en) => ({ _type: "localeString", pl, en });
const lt = (pl, en) => ({ _type: "localeText", pl, en });
const lsa = (pl, en) => ({ _type: "localeStringArray", pl, en });

// ─── Upload zrzutów ───────────────────────────────────────────────────────────

const CACHE_PATH = resolve(__dirname, ".emdesk-assets.json");
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
  const filename = `emdesk-${basename(file, extname(file)).toLowerCase().replace(/[^a-z0-9]+/gi, "-")}.webp`;

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
  { file: "panel.jpg", caption: ls("Panel operacyjny administratora", "Administrator's operations panel") },
  { file: "zgloszenia.jpg", caption: ls("Tablica zgłoszeń serwisowych", "Service ticket board") },
  { file: "stacje.jpg", caption: ls("Mapa i rejestr stacji", "Station map and registry") },
  { file: "dziennik-zdarzen.jpg", caption: ls("Dziennik zdarzeń", "Event log") },
];

// ─── Budowa dokumentu ─────────────────────────────────────────────────────────

async function buildCaseStudy() {
  console.log("Przygotowanie zrzutów...");
  const shots = {};
  if (!SKIP_IMAGES) {
    for (const file of ["panel.jpg", "stacje.jpg", "zgloszenia.jpg"]) {
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

  const coverRef = shots["panel.jpg"];

  return {
    _type: "caseStudy",
    _id: DOC_ID,
    title: ls("EMDesk", "EMDesk"),
    slug: { _type: "slug", current: "emdesk" },
    category: ls("Serwis stacji ładowania EV", "EV charging service"),
    description: lt(
      "System, który zamienił rozproszony serwis stacji ładowania EV w jeden, skalowalny proces cyfrowy.",
      "The system that turned a scattered EV charging service into one scalable digital process.",
    ),
    solution: lt(
      "Excele i osobne narzędzia zastąpione jednym systemem produkcyjnym - uruchomionym w około miesiąc, obsługującym ponad 100 stacji ładowania w 6 krajach.",
      "Spreadsheets and scattered tools replaced by one production system - launched in about a month, running over 100 charging stations across 6 countries.",
    ),
    ...(coverRef ? { image: imageField(coverRef) } : {}),
    sections: [
      // 1. Hero
      {
        _key: "hero",
        _type: "csHeroSection",
        category: ls("Case study · EMX Services", "Case study · EMX Services"),
        title: ls(
          "Cały serwis stacji ładowania w jednym systemie, nie w Excelu",
          "The whole charging-station service in one system, not in Excel",
        ),
        summary: lt(
          "Zgłoszenie usterki, praca serwisanta, raport, akceptacja klienta i rozliczenie - wcześniej rozproszone po arkuszach i ustnych ustaleniach. Działające MVP uruchomiliśmy w około miesiąc i rozwijamy dalej.",
          "Fault report, technician's work, service report, client sign-off and settlement - previously scattered across spreadsheets and verbal arrangements. We launched a working MVP in about a month and keep developing it.",
        ),
        meta: [
          {
            _key: "m1",
            label: ls("Branża", "Industry"),
            value: ls("Elektromobilność", "Electromobility"),
          },
          { _key: "m2", label: ls("Rok", "Year"), value: ls("2026", "2026") },
          {
            _key: "m3",
            label: ls("Model", "Model"),
            value: ls("Platforma wewnętrzna (B2B)", "Internal platform (B2B)"),
          },
          {
            _key: "m4",
            label: ls("Zakres", "Scope"),
            value: ls("Koncepcja · MVP · Rozwój", "Concept · MVP · Ongoing development"),
          },
        ],
        buttonLabel: ls(
          "Też macie proces w Excelu? Porozmawiajmy",
          "Running your process in Excel? Let's talk",
        ),
        buttonHref: "/kontakt",
        ...(shots["panel.jpg"] ? { webImage: imageField(shots["panel.jpg"]) } : {}),
      },

      // 2. Realizacja - ekrany + karty wartości
      {
        _key: "features",
        _type: "csFeaturesSection",
        eyebrow: ls("Realizacja", "Delivery"),
        heading: ls("Co zmienił jeden system", "What one system changed"),
        ...(shots["zgloszenia.jpg"] ? { screenA: imageField(shots["zgloszenia.jpg"]) } : {}),
        ...(shots["stacje.jpg"] ? { screenB: imageField(shots["stacje.jpg"]) } : {}),
        items: [
          {
            _key: "f1",
            icon: "LayoutDashboard",
            title: ls("Zgłoszenie od usterki do rozliczenia", "A ticket from fault to settlement"),
            text: lt(
              "Klient lub koordynator zgłasza usterkę, serwisant realizuje pracę i składa raport, koordynator zatwierdza, klient weryfikuje. Cały cykl w jednym przepływie, ze statusami i załącznikami.",
              "A client or coordinator reports a fault, the technician does the work and files a report, the coordinator approves it, the client verifies. The whole cycle in one flow, with statuses and attachments.",
            ),
          },
          {
            _key: "f2",
            icon: "Database",
            title: ls("Cała flota stacji na jednej mapie", "The whole station fleet on one map"),
            text: lt(
              "Rejestr stacji z mapą i pełnymi danymi technicznymi: model, numer seryjny, moc, status gwarancji i kontraktu SLA, notatki dostępowe, stacje stałe i mobilne.",
              "A station registry with a map and full technical data: model, serial number, power, warranty and SLA status, access notes, fixed and mobile stations.",
            ),
          },
          {
            _key: "f3",
            icon: "Wallet",
            title: ls("System pilnuje rozliczeń", "The system watches the settlements"),
            text: lt(
              "Każde zamknięte zgłoszenie trafia do kontroli finansowej. Administrator w każdej chwili wie, gdzie trzeba wystawić fakturę lub dokończyć rozliczenie.",
              "Every closed ticket goes to financial review. The administrator always knows where an invoice is due or a settlement is unfinished.",
            ),
          },
          {
            _key: "f4",
            icon: "Lock",
            title: ls("Każdy widzi dokładnie to, co powinien", "Everyone sees exactly what they should"),
            text: lt(
              "Hierarchia ról - od superadmina po klienta z subkontami organizacji - z dopasowanym zakresem widoku, profilami serwisantów i bezpiecznym zakładaniem konta.",
              "A role hierarchy - from superadmin to a client with organisation sub-accounts - each with a matching scope of view, technician profiles and secure account setup.",
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
            icon: "Calendar",
            value: "~1 mies.",
            label: ls("od pierwszego spotkania do produkcji", "from first meeting to production"),
          },
          {
            _key: "n2",
            icon: "Database",
            value: "100+",
            label: ls("stacji ładowania w systemie", "charging stations in the system"),
          },
          {
            _key: "n3",
            icon: "TrendingUp",
            value: "6",
            label: ls("krajów obsługiwanych od startu", "countries served from day one"),
          },
          {
            _key: "n4",
            icon: "Users",
            value: "~20",
            label: ls("serwisantów w jednym procesie", "technicians in one process"),
          },
        ],
      },

      // 4. O projekcie
      {
        _key: "about",
        _type: "csAboutSection",
        eyebrow: ls("O projekcie", "About"),
        heading: ls("Jedno źródło prawdy zamiast arkuszy", "One source of truth instead of spreadsheets"),
        paragraphs: lsa(
          [
            "EMX instaluje stacje ładowania pojazdów elektrycznych, a potem serwisuje je zdalnie i na miejscu: konfiguruje, naprawia, wykonuje przeglądy i obsługuje gwarancje. Dla klienta końcowego jakość i tempo obsługi serwisowej są całym produktem - a firma jest niewielka i chce się szybko skalować na kolejne rynki.",
            "Cały ten proces żył w Excelach i rozproszonych systemach. Wizyty serwisantów, zgłoszenia i historia napraw były porozrzucane po plikach, część zgłoszeń trzeba było ręcznie przepisywać z systemów zewnętrznych, a wiele ustaleń zapadało ustnie. Przy kilkuosobowym zespole i rosnącej liczbie stacji w kilku krajach brakowało jednego źródła prawdy.",
            "Klient stanął przed wyborem: kupić gotowy system ticketowy albo zbudować własny. Wspólnie zdecydowaliśmy o rozwiązaniu dedykowanym, bo tylko własny produkt daje pełną kontrolę nad procesem, dopasowanie do specyfiki serwisu stacji ładowania i przestrzeń na kolejne moduły. Technologia nie była tu dodatkiem do biznesu - stała się warunkiem jego skalowania.",
            "Zaprojektowaliśmy i wdrożyliśmy działające MVP, które od pierwszego dnia było systemem produkcyjnym. Pierwsza wersja powstała w około miesiąc: jeden developer na lekkim stacku Next.js i Supabase, zamiast wieloosobowego zespołu. Około jednej czwartej czasu poszło na planowanie i architekturę - i to właśnie ten wysiłek na wejściu przesądził o tempie.",
          ],
          [
            "EMX installs electric vehicle charging stations and then services them remotely and on site: configuring, repairing, running inspections and handling warranties. For the end customer, the quality and speed of that service is the entire product - and the company is small, with ambitions to scale quickly into new markets.",
            "That whole process lived in spreadsheets and scattered systems. Technician visits, tickets and repair history were spread across files, some tickets had to be retyped from external systems by hand, and many arrangements were made verbally. With a team of a few people and a growing number of stations across several countries, there was no single source of truth.",
            "The client faced a choice: buy an off-the-shelf ticketing system or build their own. Together we chose a bespoke solution, because only your own product gives full control over the process, a fit to the specifics of charging-station service, and room for further modules. Technology was not an add-on to the business here - it became the condition for scaling it.",
            "We designed and shipped a working MVP that was a production system from day one. The first version took about a month: one developer on a lightweight Next.js and Supabase stack instead of a large team. Roughly a quarter of the time went into planning and architecture - and that upfront effort is what set the pace.",
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
              "Serwis rozproszony po Excelach i osobnych systemach przestał skalować się razem z firmą.",
              "A service scattered across spreadsheets and separate systems stopped scaling with the company.",
            ),
            points: lsa(
              [
                "Zgłoszenia i wizyty serwisantów w arkuszach",
                "Koordynacja w dużej mierze ustnie, bez jednego źródła prawdy",
                "Kilkuosobowy zespół i stacje w kilku krajach jednocześnie",
              ],
              [
                "Tickets and technician visits kept in spreadsheets",
                "Coordination largely verbal, with no single source of truth",
                "A team of a few people and stations in several countries at once",
              ],
            ),
          },
          {
            _key: "o2",
            tag: ls("Rozwiązanie", "Solution"),
            text: lt(
              "Dedykowany system zamiast gotowego narzędzia - pełna kontrola nad procesem i przestrzeń na kolejne moduły.",
              "A bespoke system instead of an off-the-shelf tool - full control over the process and room for further modules.",
            ),
            points: lsa(
              [
                "Pełny cykl zgłoszenia: od usterki po rozliczenie",
                "Moduł stacji z mapą i danymi technicznymi",
                "Role, raporty serwisowe i dziennik zdarzeń",
              ],
              [
                "The full ticket cycle: from fault to settlement",
                "A station module with a map and technical data",
                "Roles, service reports and an event log",
              ],
            ),
          },
          {
            _key: "o3",
            tag: ls("Efekt", "Result"),
            text: lt(
              "Jedno źródło prawdy o całym procesie serwisowym i fundament pod wejście na kolejne rynki.",
              "One source of truth about the whole service process, and a foundation for entering new markets.",
            ),
            points: lsa(
              [
                "Produkcyjne MVP w około miesiąc",
                "100+ stacji w 6 krajach z jednego miejsca",
                "Koniec rozproszonych arkuszy",
              ],
              [
                "A production MVP in about a month",
                "100+ stations across 6 countries from one place",
                "The end of scattered spreadsheets",
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
              "System ról: superadmin, administrator, koordynator, serwisant, klient",
              "Role system: superadmin, administrator, coordinator, technician, client",
            ),
          },
          {
            _key: "s2",
            text: ls(
              "Moduł zgłoszeń ze statusami, priorytetami i załącznikami",
              "Ticket module with statuses, priorities and attachments",
            ),
          },
          {
            _key: "s3",
            text: ls(
              "Moduł stacji z mapą i pełnymi danymi technicznymi",
              "Station module with a map and full technical data",
            ),
          },
          {
            _key: "s4",
            text: ls(
              "Raporty serwisowe z podpisem serwisanta i zatwierdzaniem",
              "Service reports with technician signature and approval",
            ),
          },
          {
            _key: "s5",
            text: ls("Kontrola finansowa zamkniętych zgłoszeń", "Financial review of closed tickets"),
          },
          {
            _key: "s6",
            text: ls(
              "Dziennik zdarzeń i zarządzanie użytkownikami",
              "Event log and user management",
            ),
          },
          {
            _key: "s7",
            text: ls(
              "Słowniki modeli stacji, kalendarz i planowanie wizyt",
              "Station model dictionaries, calendar and visit planning",
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
          { _key: "t1", name: "Next.js" },
          { _key: "t2", name: "React" },
          { _key: "t3", name: "Supabase" },
          { _key: "t4", name: "PostgreSQL" },
          { _key: "t5", name: "Vercel" },
          { _key: "t6", name: "Leaflet" },
          { _key: "t7", name: "SendGrid" },
        ],
      },
    ],
  };
}

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("Seed case study EMDesk (projekt EMX)");
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
    console.log(`   URL: /case-studies/emdesk`);
  } catch (error) {
    console.error("❌ Błąd seeda:", error.message);
    if (error.statusCode === 403) {
      console.error("   Token nie ma uprawnień do zapisu. Wygeneruj token Editor na sanity.io/manage.");
    }
    process.exitCode = 1;
  }
}

seed();
