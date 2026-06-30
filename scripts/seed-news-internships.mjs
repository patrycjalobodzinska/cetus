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

// ─── article ───────────────────────────────────────────────────────────────
const SURVEY_URL = "https://tally.so/r/0QkeKQ";
const ELEVATE_URL = "https://elevate.cetuspro.com/";

function internships(cover, logo) {
  const TITLE_PL = "Staże i praktyki wakacyjne w CetusPro – aplikuj do 10 lipca";
  const TITLE_EN = "Summer internships at CetusPro – apply by 10 July";
  const EXCERPT_PL =
    "Szukasz miejsca, w którym wakacje zamienisz w realne doświadczenie w IT? Rusza rekrutacja na staże i praktyki wakacyjne w CetusPro. Wypełnij krótką ankietę – masz czas do 10 lipca.";
  const EXCERPT_EN =
    "Looking for a place to turn your summer into real IT experience? Recruitment for summer internships at CetusPro is now open. Fill in a short survey – you have until 10 July.";

  return {
    _id: "blogPost-staze-praktyki-wakacyjne-2026",
    _type: "blogPost",
    title: ls(TITLE_PL, TITLE_EN),
    slug: { _type: "slug", current: "staze-praktyki-wakacyjne-2026" },
    excerpt: lt(EXCERPT_PL, EXCERPT_EN),
    ...(cover ? { coverImage: cover } : {}),
    category: ls("Rekrutacja", "Recruitment"),
    // Najnowszy wpis – pokazuje się na górze listy "Co u nas" i w gridzie na stronie głównej.
    publishedAt: "2026-06-30T09:00:00.000Z",
    author: { name: "CetusPro", role: ls("Zespół CetusPro", "CetusPro Team") },
    tags: ["staze", "praktyki", "rekrutacja", "cetus-elevate", "wakacje"],
    sections: [
      heroSection(
        cover,
        ls(TITLE_PL, TITLE_EN),
        ls("Rekrutacja · Cetus Elevate", "Recruitment · Cetus Elevate"),
        lt(EXCERPT_PL, EXCERPT_EN),
      ),
      richText(
        [
          block("Wakacje to dobry moment, żeby wejść do IT", "h2"),
          block(
            "W CetusPro od lat stawiamy na ludzi, którzy chcą się uczyć w praktyce. Staże i praktyki wakacyjne to część inicjatywy Cetus Elevate – realna rekrutacja, prawdziwe zadania w komercyjnych projektach i mentor u boku, zamiast oderwanej od rzeczywistości teorii.",
          ),
          block(
            "Nie wymagamy komercyjnego doświadczenia. Liczy się chęć do nauki, zaangażowanie i to, że chcesz tworzyć nowoczesne oprogramowanie razem z nami.",
          ),
        ],
        [
          block("Summer is a great time to break into IT", "h2"),
          block(
            "At CetusPro we've long bet on people who want to learn by doing. Summer internships are part of the Cetus Elevate initiative – real recruitment, real tasks in commercial projects and a mentor at your side, instead of theory detached from reality.",
          ),
          block(
            "We don't require commercial experience. What matters is your willingness to learn, your commitment and that you want to build modern software together with us.",
          ),
        ],
      ),
      callout(
        "warning",
        ls("Deadline: 10 lipca", "Deadline: 10 July"),
        lt(
          "Ankietę zgłoszeniową możesz wypełnić tylko do 10 lipca. Nie czekaj na ostatnią chwilę – zajmuje kilka minut.",
          "You can fill in the application survey only until 10 July. Don't wait until the last minute – it takes just a few minutes.",
        ),
      ),
      listSection(
        "checklist",
        ls("Co Ci dajemy", "What you get"),
        lsa(
          [
            "Pracę przy realnych, komercyjnych projektach – nie nad zadaniami „do szuflady”",
            "Dedykowanego mentora i wsparcie doświadczonego zespołu",
            "Elastyczne podejście dopasowane do wakacyjnego grafiku",
            "Realną szansę na dalszą współpracę po stażu",
          ],
          [
            "Work on real, commercial projects – not throwaway exercises",
            "A dedicated mentor and the support of an experienced team",
            "A flexible approach that fits your summer schedule",
            "A genuine chance to continue working together after the internship",
          ],
        ),
      ),
      buttonSection(ls("Wypełnij ankietę", "Fill in the survey"), SURVEY_URL),
      richText(
        [
          block(
            "Wszystkie szczegóły o stażach i praktykach oraz klauzulę informacyjną RODO znajdziesz na stronie inicjatywy Cetus Elevate.",
          ),
        ],
        [
          block(
            "You'll find all the details about the internships and the GDPR privacy notice on the Cetus Elevate initiative page.",
          ),
        ],
      ),
      buttonSection(
        ls("Szczegóły i klauzula RODO", "Details and GDPR notice"),
        ELEVATE_URL,
        { variant: "secondary", image: logo },
      ),
      cta(
        "banner",
        ls("Aplikuj na staż lub praktyki", "Apply for an internship"),
        lt(
          "Wypełnij ankietę do 10 lipca i zrób pierwszy krok w stronę kariery w IT razem z CetusPro.",
          "Fill in the survey by 10 July and take your first step toward an IT career with CetusPro.",
        ),
        ls("Przejdź do ankiety", "Go to the survey"),
        SURVEY_URL,
        true,
      ),
    ],
    seoTitle: ls(
      "Staże i praktyki wakacyjne w CetusPro – aplikuj do 10 lipca",
      "Summer internships at CetusPro – apply by 10 July",
    ),
    seoDescription: lt(EXCERPT_PL, EXCERPT_EN),
  };
}

// ─── run ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("→ Uploading cover image + logo…");
  const [cover, logo] = await Promise.all([
    uploadLocalImage("public/career_2.jpg", "staze-praktyki-wakacyjne-cover.jpg"),
    uploadLocalImage("public/cetus-elevate-logo.png", "cetus-elevate-logo.png"),
  ]);

  console.log("→ Writing document…");
  const doc = internships(cover, logo);
  const result = await client.createOrReplace(doc);
  console.log("  ✓ " + result._id);
  console.log("✅ Seeded aktualność: staże i praktyki wakacyjne.");
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
