import { createClient } from "@sanity/client";
import fs from "node:fs";

const envFile = fs.readFileSync(".env.local", "utf8");
const env = Object.fromEntries(
  envFile
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [k, ...v] = line.split("=");
      return [
        k.trim(),
        v.join("=").trim().replace(/^"(.*)"$/, "$1"),
      ];
    }),
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

// ─── helpers ─────────────────────────────────────────────────────────────────
const ls = (pl, en) => ({ _type: "localeString", pl, en: en || pl });
const lt = (pl, en) => ({ _type: "localeText", pl, en: en || pl });
const lsa = (pl, en) => ({ _type: "localeStringArray", pl, en: en || pl });
const _key = () => Math.random().toString(36).slice(2, 12);

async function uploadImage(url, filename) {
  console.log(`  ↑ uploading ${filename}…`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${url} (${res.status})`);
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buf, { filename });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

// Portable text block builders
const block = (text, style = "normal", marks = []) => ({
  _type: "block",
  _key: _key(),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: _key(), text, marks }],
});

const blockWithSpans = (spans, style = "normal", markDefs = []) => ({
  _type: "block",
  _key: _key(),
  style,
  markDefs,
  children: spans.map((s) => ({
    _type: "span",
    _key: _key(),
    text: s.text,
    marks: s.marks || [],
  })),
});

const listItem = (text, listItem = "bullet") => ({
  _type: "block",
  _key: _key(),
  style: "normal",
  level: 1,
  listItem,
  markDefs: [],
  children: [{ _type: "span", _key: _key(), text, marks: [] }],
});

// ─── content ─────────────────────────────────────────────────────────────────

const TITLE_PL = "Czym jest Custom Software i kiedy warto go wybrać?";
const TITLE_EN = "What is Custom Software and when should you choose it?";
const SLUG = "czym-jest-custom-software";

const EXCERPT_PL =
  "Custom software to oprogramowanie tworzone „na miarę” konkretnego biznesu. W tym artykule wyjaśniamy, czym różni się od gotowych rozwiązań SaaS, kiedy się opłaca, jak wygląda proces wdrożenia oraz jakie korzyści daje firmie w długim okresie.";
const EXCERPT_EN =
  "Custom software is software built specifically for a single business. We explain how it differs from off-the-shelf SaaS, when it pays off, what the implementation process looks like, and which long-term benefits it brings.";

async function main() {
  console.log("→ Uploading cover and inline images…");

  const coverImage = await uploadImage(
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
    "custom-software-cover.jpg",
  );

  const heroImage = await uploadImage(
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=80",
    "custom-software-hero.jpg",
  );

  const inlineImage1 = await uploadImage(
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80",
    "custom-software-team.jpg",
  );

  const galleryImg1 = await uploadImage(
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    "dashboard.jpg",
  );
  const galleryImg2 = await uploadImage(
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80",
    "meeting.jpg",
  );
  const galleryImg3 = await uploadImage(
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
    "data-visualization.jpg",
  );

  console.log("→ Building document…");

  const sections = [
    // Hero — centered z banerowym zdjęciem pod tekstem
    {
      _key: _key(),
      _type: "bpHeroSection",
      variant: "centered",
      title: ls(TITLE_PL, TITLE_EN),
      category: ls("Custom Software", "Custom Software"),
      excerpt: lt(EXCERPT_PL, EXCERPT_EN),
      image: heroImage,
    },

    // Wstęp — Rich text
    {
      _key: _key(),
      _type: "bpRichTextSection",
      variant: "standard",
      contentPl: [
        block(
          "Każdy biznes ma swoje unikalne procesy, ograniczenia i przewagi konkurencyjne. Problem zaczyna się, gdy próbujemy wcisnąć je w gotowe oprogramowanie, które było tworzone z myślą o „średnim” kliencie. Custom software (oprogramowanie dedykowane) odwraca tę logikę — to narzędzie, które dopasowujemy do firmy, nie firmę do narzędzia.",
        ),
        block("Czym dokładnie jest custom software?", "h2"),
        blockWithSpans(
          [
            {
              text: "Custom software ",
              marks: ["strong"],
            },
            {
              text: "to oprogramowanie projektowane i budowane od podstaw dla konkretnej organizacji. W odróżnieniu od rozwiązań pudełkowych (SaaS, ERP off-the-shelf) odpowiada dokładnie na te procesy, które realnie istnieją w Twojej firmie — niczego nie trzeba „obchodzić” ani upychać w pole „opis”.",
              marks: [],
            },
          ],
        ),
      ],
      contentEn: [
        block(
          "Every business has unique processes, constraints, and competitive edges. The problem starts when we try to squeeze them into generic software designed for the \"average\" customer. Custom software flips this logic — it's a tool we shape to fit the business, not the other way around.",
        ),
        block("So what exactly is custom software?", "h2"),
        blockWithSpans([
          { text: "Custom software ", marks: ["strong"] },
          {
            text: "is designed and built from scratch for a specific organization. Unlike off-the-shelf solutions (SaaS, ERP suites), it answers the actual processes that exist in your company — nothing has to be worked around or stuffed into a generic \"description\" field.",
            marks: [],
          },
        ]),
      ],
    },

    // Callout — kiedy custom ma sens
    {
      _key: _key(),
      _type: "bpCalloutSection",
      tone: "tip",
      title: ls(
        "Krótki test: czy potrzebujesz custom software?",
        "Quick test: do you need custom software?",
      ),
      body: lt(
        "Jeśli Twój zespół spędza więcej niż 5 godzin tygodniowo na ręcznym przeklejaniu danych między systemami, kopiowaniu Exceli lub omijaniu ograniczeń narzędzia, prawdopodobnie tracisz pieniądze, które zwróciłyby się na dedykowanym rozwiązaniu.",
        "If your team spends more than 5 hours a week copy-pasting data between systems, juggling spreadsheets, or working around tool limitations, you're likely losing money that custom software would recover.",
      ),
    },

    // Lista — kluczowe różnice
    {
      _key: _key(),
      _type: "bpListSection",
      variant: "checklist",
      sectionTitle: ls(
        "Co odróżnia custom software od gotowca?",
        "What sets custom software apart from off-the-shelf?",
      ),
      items: lsa(
        [
          "Pełna własność kodu i danych — bez vendor lock-in i opłat per-seat",
          "Funkcjonalność 1:1 z procesami firmy, bez kompromisów",
          "Skalowalność dopasowana do realnego ruchu i obciążenia",
          "Integracje z dowolnym systemem, który już posiadasz",
          "Bezpieczeństwo i zgodność (RODO, ISO) zaprojektowane od początku",
          "Stała ewolucja — produkt rośnie razem z biznesem",
        ],
        [
          "Full ownership of code and data — no vendor lock-in, no per-seat fees",
          "Functionality matches your processes 1:1, no compromises",
          "Scalability designed for your actual traffic and load",
          "Integrations with any system you already use",
          "Security and compliance (GDPR, ISO) built in from day one",
          "Continuous evolution — the product grows with your business",
        ],
      ),
    },

    // Cytat
    {
      _key: _key(),
      _type: "bpQuoteSection",
      variant: "centered",
      quote: lt(
        "Dobry custom software przestaje być widoczny. Po prostu działa tak, jak praca w Twojej firmie — to jego najwyższa forma.",
        "Good custom software becomes invisible. It simply works the way your company works — that's its highest form.",
      ),
      author: "Norbert Pisz",
      role: ls("CEO, CetusPro", "CEO, CetusPro"),
    },

    // Zdjęcie wide — zespół
    {
      _key: _key(),
      _type: "bpImageSection",
      variant: "wide",
      image: inlineImage1,
      caption: ls(
        "Zespół product designerów i developerów podczas warsztatu discovery.",
        "Product designers and developers during a discovery workshop.",
      ),
      alt: ls("Zespół przy warsztacie discovery", "Team at a discovery workshop"),
    },

    // Rich text — etapy wdrożenia
    {
      _key: _key(),
      _type: "bpRichTextSection",
      variant: "standard",
      contentPl: [
        block("Jak wygląda proces tworzenia custom software?", "h2"),
        block(
          "Wdrożenie dedykowanego oprogramowania nie jest skokiem w nieznane. Sprawdzona metodyka skraca ryzyko i pozwala mierzyć efekty już po kilku tygodniach.",
        ),
        block("1. Discovery i analiza biznesu", "h3"),
        block(
          "Zaczynamy od warsztatów z osobami, które codziennie wykonują pracę, jaką ma wspierać system. Mapujemy procesy, identyfikujemy „wąskie gardła” i ustalamy mierzalne cele biznesowe (np. skrócenie obsługi zamówienia z 14 do 3 minut).",
        ),
        block("2. Prototyp i walidacja", "h3"),
        block(
          "Zanim napiszemy linię kodu produkcyjnego, projektujemy interaktywny prototyp UI/UX. Testujemy go z realnymi użytkownikami i wprowadzamy korekty — to najtańszy moment na zmiany.",
        ),
        block("3. Iteracyjny development w sprintach", "h3"),
        block(
          "Pracujemy w 2-tygodniowych sprintach. Po każdym dostajesz działającą wersję produktu, którą można pokazać, dotknąć, ocenić. Priorytety mogą zmieniać się w trakcie — to elastyczność, której gotowe SaaS nie oferują.",
        ),
        block("4. Wdrożenie, monitoring i rozwój", "h3"),
        block(
          "Po uruchomieniu na produkcji obserwujemy realne użycie, mierzymy KPI i planujemy kolejne funkcjonalności. Software ewoluuje razem z biznesem.",
        ),
      ],
      contentEn: [
        block("What does the custom software process look like?", "h2"),
        block(
          "Building custom software is not a leap of faith. A proven methodology reduces risk and lets you measure results within weeks.",
        ),
        block("1. Discovery and business analysis", "h3"),
        block(
          "We start with workshops involving people who do the work the system will support every day. We map processes, identify bottlenecks, and define measurable business goals (e.g., reducing order handling from 14 to 3 minutes).",
        ),
        block("2. Prototype and validation", "h3"),
        block(
          "Before writing a single line of production code, we design an interactive UI/UX prototype. We test it with real users and iterate — this is the cheapest moment to make changes.",
        ),
        block("3. Iterative development in sprints", "h3"),
        block(
          "We work in 2-week sprints. After each one, you get a working version of the product to see, touch, and evaluate. Priorities can shift along the way — flexibility that off-the-shelf SaaS doesn't offer.",
        ),
        block("4. Deployment, monitoring, and growth", "h3"),
        block(
          "Once live, we observe real usage, measure KPIs, and plan the next features. The software evolves together with your business.",
        ),
      ],
    },

    // Galeria
    {
      _key: _key(),
      _type: "bpGallerySection",
      variant: "grid",
      sectionTitle: ls(
        "Jak wygląda dobre custom software w praktyce?",
        "What good custom software looks like in practice",
      ),
      items: [
        {
          _key: _key(),
          image: galleryImg1,
          caption: ls(
            "Dashboardy szyte na miarę KPI Twojej firmy.",
            "Dashboards tailored to your company's KPIs.",
          ),
          alt: ls("Custom dashboard", "Custom dashboard"),
        },
        {
          _key: _key(),
          image: galleryImg2,
          caption: ls(
            "Warsztaty discovery z zespołem klienta.",
            "Discovery workshops with the client team.",
          ),
          alt: ls("Warsztaty discovery", "Discovery workshop"),
        },
        {
          _key: _key(),
          image: galleryImg3,
          caption: ls(
            "Wizualizacje danych dopasowane do decyzji, które realnie podejmujesz.",
            "Data visualizations tailored to the decisions you actually make.",
          ),
          alt: ls("Wizualizacje danych", "Data visualizations"),
        },
      ],
    },

    // Callout — Warning na ryzyka
    {
      _key: _key(),
      _type: "bpCalloutSection",
      tone: "warning",
      title: ls(
        "Czego unikać w projektach custom software?",
        "Pitfalls to avoid in custom software projects",
      ),
      body: lt(
        "Największe ryzyka to: brak jasno zdefiniowanego problemu biznesowego, „złota klatka” technologii (egzotyczny stack bez społeczności), oraz wielomiesięczne fazy bez działającej wersji produktu. Sprawdzona praktyka: każde 2-3 tygodnie powinny kończyć się czymś, co da się uruchomić.",
        "The biggest risks are: lack of a clearly defined business problem, a \"golden cage\" of exotic technology with no community, and multi-month phases without a working product. Best practice: every 2-3 weeks should end with something runnable.",
      ),
    },

    // Lista numerowana — kiedy custom NIE ma sensu
    {
      _key: _key(),
      _type: "bpListSection",
      variant: "numbered",
      sectionTitle: ls(
        "Kiedy custom software NIE ma sensu?",
        "When custom software is NOT the right choice",
      ),
      items: lsa(
        [
          "Twój proces jest standardowy i identyczny jak u 1000 innych firm (np. fakturowanie B2C).",
          "Budżet nie pozwala na utrzymanie produktu (dev + DevOps + support).",
          "Potrzebujesz uruchomienia w tydzień, a nie w kwartał.",
          "Nie masz mandatu decyzyjnego ani osoby, która będzie product ownerem po stronie biznesu.",
        ],
        [
          "Your process is standard and identical to 1,000 other companies (e.g., B2C invoicing).",
          "Budget can't sustain product maintenance (dev + DevOps + support).",
          "You need to launch in a week, not a quarter.",
          "There's no decision mandate or business-side product owner.",
        ],
      ),
    },

    // Zdjęcie contained
    {
      _key: _key(),
      _type: "bpImageSection",
      variant: "contained",
      image: coverImage,
      caption: ls(
        "Sesja pair-programming nad mikroserwisem.",
        "A pair-programming session on a microservice.",
      ),
      alt: ls("Pair programming", "Pair programming"),
    },

    // Rich text — ROI
    {
      _key: _key(),
      _type: "bpRichTextSection",
      variant: "standard",
      contentPl: [
        block("Ile kosztuje custom software i kiedy się zwraca?", "h2"),
        block(
          "Realny zakres budżetów dla projektów SMB-Enterprise w Polsce: od 80 000 zł dla MVP po 500 000-2 000 000 zł dla pełnoskalowych platform. Brzmi dużo — ale licencje gotowych systemów dla 50 użytkowników to często 120-250 tys. zł rocznie, w nieskończoność.",
        ),
        block(
          "Zwrot z inwestycji liczy się zwykle w 12-24 miesiące — albo szybciej, jeśli software zastępuje pracę kilku FTE lub odblokowuje nowy kanał sprzedaży.",
        ),
      ],
      contentEn: [
        block("How much does custom software cost and when does it pay back?", "h2"),
        block(
          "Realistic budget ranges for SMB-Enterprise projects in Poland: from ~€18k for an MVP up to €100k-€450k for full-scale platforms. Sounds big — but licensing off-the-shelf systems for 50 users often costs €25-55k per year, forever.",
        ),
        block(
          "ROI typically lands in 12-24 months — or faster, if the software replaces several FTEs of work or unlocks a new sales channel.",
        ),
      ],
    },

    // CTA banner
    {
      _key: _key(),
      _type: "bpCtaSection",
      variant: "banner",
      heading: ls(
        "Zastanawiasz się, czy custom software to dobry kierunek dla Twojej firmy?",
        "Wondering if custom software is the right direction for your business?",
      ),
      description: lt(
        "Umów bezpłatną 30-minutową konsultację. Przeanalizujemy Twój przypadek, przedstawimy rekomendację (czasem to po prostu lepsza konfiguracja gotowca!) i powiemy, jakiego rzędu nakłady warto rozważyć.",
        "Book a free 30-minute consultation. We'll analyze your case, give a recommendation (sometimes it's just better configuration of an off-the-shelf tool!), and outline a realistic budget range.",
      ),
      buttonLabel: ls("Umów konsultację", "Book a consultation"),
      buttonHref: "/kontakt",
    },
  ];

  const doc = {
    _id: `blogPost-${SLUG}`,
    _type: "blogPost",
    title: ls(TITLE_PL, TITLE_EN),
    slug: { _type: "slug", current: SLUG },
    excerpt: lt(EXCERPT_PL, EXCERPT_EN),
    coverImage,
    category: ls("Custom Software", "Custom Software"),
    publishedAt: new Date().toISOString(),
    author: {
      name: "Norbert Pisz",
      role: ls("CEO, CetusPro", "CEO, CetusPro"),
    },
    tags: ["custom-software", "saas", "biznes", "wdrozenia"],
    sections,
    seoTitle: ls(
      "Czym jest Custom Software? Kompletny przewodnik — CetusPro",
      "What is Custom Software? Complete guide — CetusPro",
    ),
    seoDescription: lt(EXCERPT_PL, EXCERPT_EN),
  };

  console.log("→ Writing document blogPost-" + SLUG + "…");
  const result = await client.createOrReplace(doc);
  console.log("✓ Done: " + result._id);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
