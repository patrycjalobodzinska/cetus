import { createClient } from "@sanity/client";
import fs from "node:fs";
import https from "node:https";

// Node 16 nie ma globalnego fetch – pobieramy obrazek przez https z obsługą redirectów.
function download(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error("Too many redirects"));
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return resolve(download(res.headers.location, redirects + 1));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

const envFile = fs.readFileSync(".env.local", "utf8");
const env = Object.fromEntries(
  envFile
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [k, ...v] = line.split("=");
      return [k.trim(), v.join("=").trim().replace(/^"(.*)"$/, "$1")];
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

const block = (text, style = "normal", marks = []) => ({
  _type: "block",
  _key: _key(),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: _key(), text, marks }],
});

async function uploadImage(url, filename) {
  try {
    console.log(`  ↑ uploading ${filename}…`);
    const buf = await download(url);
    const asset = await client.assets.upload("image", buf, { filename });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (err) {
    console.warn(`  ⚠ image upload failed (${filename}): ${err.message} — pomijam okładkę`);
    return undefined;
  }
}

async function uploadLocalImage(path, filename) {
  try {
    console.log(`  ↑ uploading ${filename} (local)…`);
    const buf = fs.readFileSync(path);
    const asset = await client.assets.upload("image", buf, { filename });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (err) {
    console.warn(`  ⚠ local image upload failed (${filename}): ${err.message} — pomijam okładkę`);
    return undefined;
  }
}

const heroSection = (image, title, category, excerpt) => ({
  _key: _key(),
  _type: "bpHeroSection",
  variant: "centered",
  title,
  category,
  excerpt,
  ...(image ? { image } : {}),
});

const richText = (contentPl, contentEn) => ({
  _key: _key(),
  _type: "bpRichTextSection",
  variant: "standard",
  contentPl,
  contentEn,
});

const listSection = (variant, sectionTitle, items) => ({
  _key: _key(),
  _type: "bpListSection",
  variant,
  sectionTitle,
  items,
});

const callout = (tone, title, body) => ({
  _key: _key(),
  _type: "bpCalloutSection",
  tone,
  title,
  body,
});

const gallerySection = (variant, sectionTitle, images, altPl, altEn) => ({
  _key: _key(),
  _type: "bpGallerySection",
  variant,
  sectionTitle,
  items: (images || []).filter(Boolean).map((image, i) => ({
    _key: _key(),
    image,
    alt: ls(`${altPl} — zdjęcie ${i + 1}`, `${altEn} — photo ${i + 1}`),
  })),
});

const cta = (variant, heading, description, buttonLabel, buttonHref, blank = false) => ({
  _key: _key(),
  _type: "bpCtaSection",
  variant,
  heading,
  description,
  buttonLabel,
  buttonHref,
  ...(blank ? { blank: true } : {}),
});

const buttonSection = (
  buttonLabel,
  buttonHref,
  { variant = "primary", align = "center", blank = true, image } = {},
) => ({
  _key: _key(),
  _type: "bpButtonSection",
  variant,
  align,
  buttonLabel,
  buttonHref,
  blank,
  ...(image ? { image } : {}),
});

// ─── articles ────────────────────────────────────────────────────────────────

function cetusElevate(cover, logo) {
  const TITLE_PL = "Cetus Elevate – pomagamy wejść do IT tym, którzy na to zasługują";
  const TITLE_EN = "Cetus Elevate – helping the people who deserve it break into IT";
  const EXCERPT_PL =
    "Cetus Elevate to inicjatywa CetusPro, której celem jest aktywne wspieranie zdolnych ludzi w budowaniu kariery w branży IT. Wierzymy, że talent nie potrzebuje szczęścia – potrzebuje szansy.";
  const EXCERPT_EN =
    "Cetus Elevate is a CetusPro initiative dedicated to actively supporting talented people in building a career in IT. We believe talent doesn't need luck – it needs a chance.";

  return {
    _id: "blogPost-cetus-elevate",
    _type: "blogPost",
    title: ls(TITLE_PL, TITLE_EN),
    slug: { _type: "slug", current: "cetus-elevate" },
    excerpt: lt(EXCERPT_PL, EXCERPT_EN),
    ...(cover ? { coverImage: cover } : {}),
    category: ls("Inicjatywa", "Initiative"),
    publishedAt: "2026-06-16T09:00:00.000Z",
    author: { name: "CetusPro", role: ls("Zespół CetusPro", "CetusPro Team") },
    tags: ["cetus-elevate", "kariera", "it", "edukacja"],
    sections: [
      heroSection(cover, ls(TITLE_PL, TITLE_EN), ls("Inicjatywa CetusPro", "CetusPro initiative"), lt(EXCERPT_PL, EXCERPT_EN)),
      richText(
        [
          block("Zaczynaliśmy tak samo, jak Ty", "h2"),
          block(
            "CetusPro to firma technologiczna z Rzeszowa. Tworzymy oprogramowanie dla biznesu, ale naszą prawdziwą dumą jest to, skąd pochodzi nasz zespół. Wielu naszych pracowników to byli studenci i stażyści, którzy przyszli do nas z zerowym doświadczeniem komercyjnym. Widzieliśmy, jak talent zamienia się w zawodowca, gdy dostanie właściwą szansę i kierunek.",
          ),
          block(
            "Cetus Elevate to nasz sposób na systemowe dawanie tej szansy kolejnym osobom – bez teorii oderwanej od praktyki, za to z realnymi projektami, mentoringiem i kontaktem z firmą, która naprawdę buduje produkty.",
          ),
        ],
        [
          block("We started exactly where you are", "h2"),
          block(
            "CetusPro is a technology company from Rzeszów. We build software for business, but our real pride is where our team comes from. Many of our people were once students and interns who joined us with zero commercial experience. We watched talent turn into professionals once given the right chance and direction.",
          ),
          block(
            "Cetus Elevate is how we give that chance to the next people in a structured way – no theory detached from practice, but real projects, mentoring and contact with a company that actually ships products.",
          ),
        ],
      ),
      buttonSection(
        ls("Wejdź na elevate.cetuspro.com", "Open elevate.cetuspro.com"),
        "https://elevate.cetuspro.com/",
        { image: logo },
      ),
      listSection(
        "checklist",
        ls("Inicjatywy w ramach Cetus Elevate", "What Cetus Elevate offers"),
        lsa(
          [
            "Mentoring 1:1 – 6 miesięcy pracy projektowej z dedykowanym mentorem, jeden na jeden",
            "Hackathon Vibe The Future – 48 godzin realnej pracy zespołowej i prawdziwy start kariery",
            "Staże i praktyki wakacyjne – realna rekrutacja, prawdziwe zadania, case study na koniec",
            "Partnerstwa z uczelniami i szkołami technicznymi z całego Podkarpacia",
          ],
          [
            "1:1 mentoring – 6 months of project work with a dedicated one-on-one mentor",
            "Vibe The Future hackathon – 48 hours of real teamwork and a genuine career kickstart",
            "Summer internships – real recruitment, real tasks, a case study at the end",
            "Partnerships with universities and technical schools across the Podkarpacie region",
          ],
        ),
      ),
      callout(
        "info",
        ls("Co osiągnęliśmy do tej pory", "What we've achieved so far"),
        lt(
          "Ponad 200 studentów i uczniów objętych działaniami w 2024 roku, 8+ uczelni i szkół partnerskich oraz 6 aktywnych mentorów. Mierzymy sukces Twoim sukcesem – naszym celem nie jest certyfikat, tylko Twoja praca albo własna firma.",
          "Over 200 students reached in 2024, 8+ partner schools and universities, and 6 active mentors. We measure success by your success – our goal isn't a certificate, it's your job or your own company.",
        ),
      ),
      cta(
        "banner",
        ls("Poznaj Cetus Elevate", "Discover Cetus Elevate"),
        lt(
          "Sprawdź wszystkie inicjatywy, poznaj mentorów i dołącz do programu, który realnie otwiera drzwi do branży IT.",
          "Explore all the initiatives, meet the mentors and join a program that genuinely opens doors into the IT industry.",
        ),
        ls("Odwiedź Cetus Elevate", "Visit Cetus Elevate"),
        "https://elevate.cetuspro.com/",
        true,
      ),
    ],
    seoTitle: ls(
      "Cetus Elevate – wejdź do IT z CetusPro",
      "Cetus Elevate – break into IT with CetusPro",
    ),
    seoDescription: lt(EXCERPT_PL, EXCERPT_EN),
  };
}

function vibeTheFuture(cover, logo, gallery) {
  const TITLE_PL = "Vibe The Future 2026 – 24-godzinny hackathon, w którym liczy się przyszłość";
  const TITLE_EN = "Vibe The Future 2026 – a 24-hour hackathon where the future takes shape";
  const EXCERPT_PL =
    "VibeTheFuture to nasz autorski hackathon w ramach Cetus Elevate. Wiosenna edycja 2026 odbyła się 23–24 maja na Uniwersytecie Rzeszowskim – 24 godziny intensywnej pracy, realne wyzwania i nagroda główna 4 000 zł.";
  const EXCERPT_EN =
    "VibeTheFuture is our original hackathon under the Cetus Elevate umbrella. The Spring 2026 edition took place on 23–24 May at the University of Rzeszów – 24 hours of intense work, real challenges and a 4,000 PLN grand prize.";

  return {
    _id: "blogPost-vibe-the-future",
    _type: "blogPost",
    title: ls(TITLE_PL, TITLE_EN),
    slug: { _type: "slug", current: "vibe-the-future" },
    excerpt: lt(EXCERPT_PL, EXCERPT_EN),
    ...(cover ? { coverImage: cover } : {}),
    category: ls("Hackathon", "Hackathon"),
    publishedAt: "2026-06-17T09:00:00.000Z",
    author: { name: "CetusPro", role: ls("Zespół CetusPro", "CetusPro Team") },
    tags: ["vibe-the-future", "hackathon", "cetus-elevate", "wydarzenie"],
    sections: [
      heroSection(cover, ls(TITLE_PL, TITLE_EN), ls("VibeTheFuture 2026 · Wiosna", "VibeTheFuture 2026 · Spring"), lt(EXCERPT_PL, EXCERPT_EN)),
      richText(
        [
          block(
            "Vibe The Future to wydarzenie, w którym uczestnicy w ciągu jednej doby zamieniają pomysł w działający prototyp. To nie są ćwiczenia z podręcznika – to praca w warunkach zbliżonych do prawdziwego projektu IT, z mentorami u boku i jasno postawionym wyzwaniem.",
          ),
          block(
            "Wiosenna edycja 2026 odbyła się 23–24 maja na Uniwersytecie Rzeszowskim. Partnerem merytorycznym wyzwania był LOT Aircraft Maintenance Services.",
          ),
        ],
        [
          block(
            "Vibe The Future is an event where participants turn an idea into a working prototype within a single day. This isn't a textbook exercise – it's work under conditions close to a real IT project, with mentors at your side and a clearly defined challenge.",
          ),
          block(
            "The Spring 2026 edition took place on 23–24 May at the University of Rzeszów. The challenge's expert partner was LOT Aircraft Maintenance Services.",
          ),
        ],
      ),
      buttonSection(
        ls("Zobacz stronę wydarzenia", "Visit the event site"),
        "https://vibethelimit.pl/",
        { image: logo },
      ),
      listSection(
        "numbered",
        ls("Edycja Wiosna 2026 w liczbach", "Spring 2026 edition by the numbers"),
        lsa(
          [
            "80 zgłoszonych uczestników",
            "40 zakwalifikowanych do rywalizacji",
            "24 godziny nieprzerwanej pracy zespołowej",
            "1 nagroda główna o wartości 4 000 zł",
            "Partner merytoryczny: LOT Aircraft Maintenance Services",
          ],
          [
            "80 applicants",
            "40 qualified to compete",
            "24 hours of non-stop teamwork",
            "1 grand prize worth 4,000 PLN",
            "Expert partner: LOT Aircraft Maintenance Services",
          ],
        ),
      ),
      callout(
        "success",
        ls("Nagroda główna: 4 000 zł", "Grand prize: 4,000 PLN"),
        lt(
          "Najlepszy zespół nie tylko otrzymał nagrodę finansową, ale przede wszystkim realne portfolio i kontakt z firmami, które szukają takich ludzi. To często pierwszy krok przed pierwszym CV.",
          "The best team didn't just win prize money – above all they walked away with a real portfolio and contact with companies looking for exactly these people. It's often the first step before a first CV.",
        ),
      ),
      gallerySection(
        "masonry",
        ls("Tak wyglądał Vibe The Future", "Inside Vibe The Future"),
        gallery,
        "Vibe The Future — hackathon CetusPro",
        "Vibe The Future — CetusPro hackathon",
      ),
      cta(
        "banner",
        ls("Chcesz wziąć udział w kolejnej edycji?", "Want to join the next edition?"),
        lt(
          "Wszystkie szczegóły, agenda i rejestracja czekają na oficjalnej stronie wydarzenia.",
          "All the details, agenda and registration are waiting on the official event site.",
        ),
        ls("Wejdź na stronę wydarzenia", "Open the event site"),
        "https://vibethelimit.pl/",
        true,
      ),
    ],
    seoTitle: ls(
      "Vibe The Future 2026 – hackathon CetusPro w Rzeszowie",
      "Vibe The Future 2026 – CetusPro hackathon in Rzeszów",
    ),
    seoDescription: lt(EXCERPT_PL, EXCERPT_EN),
  };
}

function cetusAcademy(cover) {
  const TITLE_PL = "Cetus Academy – dzielimy się wiedzą i kształcimy przyszłych specjalistów";
  const TITLE_EN = "Cetus Academy – sharing knowledge and shaping future specialists";
  const EXCERPT_PL =
    "Cetus Academy to program edukacyjny CetusPro, w którym dzielimy się praktyczną wiedzą z zakresu tworzenia nowoczesnego oprogramowania – poprzez szkolenia, warsztaty i mentoring oparte na realnych projektach.";
  const EXCERPT_EN =
    "Cetus Academy is CetusPro's educational program where we share hands-on knowledge of building modern software – through training, workshops and mentoring grounded in real projects.";

  return {
    _id: "blogPost-cetus-academy",
    _type: "blogPost",
    title: ls(TITLE_PL, TITLE_EN),
    slug: { _type: "slug", current: "cetus-academy" },
    excerpt: lt(EXCERPT_PL, EXCERPT_EN),
    ...(cover ? { coverImage: cover } : {}),
    category: ls("Edukacja", "Education"),
    publishedAt: "2026-06-15T09:00:00.000Z",
    author: { name: "CetusPro", role: ls("Zespół CetusPro", "CetusPro Team") },
    tags: ["cetus-academy", "edukacja", "szkolenia", "mentoring"],
    sections: [
      heroSection(cover, ls(TITLE_PL, TITLE_EN), ls("Edukacja", "Education"), lt(EXCERPT_PL, EXCERPT_EN)),
      richText(
        [
          block(
            "Najlepszą wiedzą jest ta, którą da się od razu zastosować. W Cetus Academy uczymy tak, jak sami pracujemy na co dzień – na realnych przykładach, z naciskiem na dobre praktyki i samodzielność.",
          ),
          block(
            "Program łączy szkolenia, warsztaty i mentoring. Zamiast suchej teorii pokazujemy, jak powstaje nowoczesne oprogramowanie: od pomysłu, przez projekt, po wdrożenie i utrzymanie.",
          ),
        ],
        [
          block(
            "The best knowledge is the kind you can apply right away. At Cetus Academy we teach the way we work every day – on real examples, with an emphasis on good practices and independence.",
          ),
          block(
            "The program combines training, workshops and mentoring. Instead of dry theory we show how modern software actually comes to life: from idea, through design, to deployment and maintenance.",
          ),
        ],
      ),
      listSection(
        "checklist",
        ls("Co znajdziesz w Cetus Academy", "What you'll find in Cetus Academy"),
        lsa(
          [
            "Praktyczne warsztaty prowadzone przez doświadczonych programistów",
            "Szkolenia z nowoczesnych technologii webowych i mobilnych",
            "Mentoring i indywidualne wsparcie w rozwoju",
            "Dzielenie się wiedzą z prawdziwych projektów CetusPro",
          ],
          [
            "Hands-on workshops led by experienced developers",
            "Training in modern web and mobile technologies",
            "Mentoring and individual support for your growth",
            "Knowledge shared from real CetusPro projects",
          ],
        ),
      ),
      cta(
        "banner",
        ls("Chcesz dowiedzieć się więcej?", "Want to learn more?"),
        lt(
          "Napisz do nas – opowiemy, jak dołączyć do Cetus Academy i wspólnie zaplanujemy Twoją ścieżkę rozwoju.",
          "Get in touch – we'll tell you how to join Cetus Academy and plan your growth path together.",
        ),
        ls("Napisz do nas", "Contact us"),
        "/kontakt",
      ),
    ],
    seoTitle: ls(
      "Cetus Academy – szkolenia i mentoring IT od CetusPro",
      "Cetus Academy – IT training and mentoring by CetusPro",
    ),
    seoDescription: lt(EXCERPT_PL, EXCERPT_EN),
  };
}

// ─── run ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("→ Uploading cover images + logos…");
  const [elevateCover, vibeCover, academyCover, elevateLogo, vibeLogo] = await Promise.all([
    uploadImage(
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
      "cetus-elevate-cover.jpg",
    ),
    // Vibe = ten hackathon (Product Challenge) — zdjęcie główne z wydarzenia.
    uploadLocalImage("scripts/seed-assets/vibe/5.jpeg", "vibe-the-future-cover.jpeg"),
    uploadImage(
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
      "cetus-academy-cover.jpg",
    ),
    uploadLocalImage("public/cetus-elevate-logo.png", "cetus-elevate-logo.png"),
    uploadLocalImage("public/vibe-the-future-logo.png", "vibe-the-future-logo.png"),
  ]);

  console.log("→ Uploading Vibe gallery…");
  // 6..23 bez 21 (21 == 5, czyli zdjęcie główne — nie powtarzamy go w galerii).
  const vibeGalleryNums = Array.from({ length: 18 }, (_, i) => i + 6).filter((n) => n !== 21);
  const vibeGallery = await Promise.all(
    vibeGalleryNums.map((n) =>
      uploadLocalImage(`scripts/seed-assets/vibe/${n}.jpeg`, `vibe-gallery-${n}.jpeg`),
    ),
  );

  const docs = [
    cetusElevate(elevateCover, elevateLogo),
    vibeTheFuture(vibeCover, vibeLogo, vibeGallery),
    cetusAcademy(academyCover),
  ];

  console.log("→ Writing documents…");
  for (const doc of docs) {
    const result = await client.createOrReplace(doc);
    console.log("  ✓ " + result._id);
  }
  console.log(`✅ Seeded ${docs.length} aktualności (Co u nas).`);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
