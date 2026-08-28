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
        v
          .join("=")
          .trim()
          .replace(/^"(.*)"$/, "$1"),
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

const ls = (pl, en) => ({
  _type: "localeString",
  pl: pl || "",
  en: en || pl || "",
});
const lt = (pl, en) => ({
  _type: "localeText",
  pl: pl || "",
  en: en || pl || "",
});
const _key = () => Math.random().toString(36).slice(2, 10);

const doc = {
  _id: "rollUpPage",
  _type: "rollUpPage",

  heroTitle: ls("Technologia, która napędza", "Technology that powers"),
  heroTitleHighlight: ls("Twój biznes", "your business"),
  heroDescription: lt(
    "Dedykowane systemy IT dla MŚP oraz korporacji.",
    "Dedicated IT systems for SMBs and enterprises.",
  ),
  stats: [
    { _key: _key(), value: "40", label: ls("specjalistów", "specialists") },
    {
      _key: _key(),
      value: "6",
      label: ls("lat doświadczenia", "years of experience"),
    },
    { _key: _key(), value: "60", label: ls("wdrożeń", "deployments") },
  ],

  sectionTitle: ls("Z czym do nas", "What brings you"),
  sectionTitleHighlight: ls("przychodzisz?", "here?"),
  sectionSubtitle: ls(
    "Rozwiń, żeby zobaczyć, co dla Ciebie mamy.",
    "Expand to see what we have for you.",
  ),

  businessTitle: ls(
    "Szukam firmy IT dla mojego biznesu",
    "I am looking for an IT partner for my business",
  ),
  businessSubtitle: ls(
    "Aplikacje, systemy, AI, cyberbezpieczeństwo",
    "Apps, systems, AI, cybersecurity",
  ),
  businessDescription: lt(
    "Projektujemy i wdrażamy dedykowane systemy. Wybierz usługę albo napisz do nas - pomożemy dobrać rozwiązanie.",
    "We design and deliver dedicated systems. Pick a service or reach out - we will help you find the right fit.",
  ),
  businessServices: [
    {
      _key: _key(),
      title: ls("Aplikacje webowe", "Web applications"),
      description: ls(
        "Nowoczesne systemy webowe szyte na miarę.",
        "Tailored modern web systems.",
      ),
      icon: "code",
      link: "/oferta/aplikacje-webowe",
    },
    {
      _key: _key(),
      title: ls("Aplikacje mobilne", "Mobile applications"),
      description: ls(
        "iOS, Android oraz rozwiązania cross-platform.",
        "iOS, Android and cross-platform solutions.",
      ),
      icon: "smartphone",
      link: "/oferta/aplikacje-mobilne",
    },
    {
      _key: _key(),
      title: ls("AI i automatyzacja procesów", "AI and process automation"),
      description: ls(
        "Wdrożenia AI i automatyzacja powtarzalnych zadań.",
        "AI deployments and automation of repetitive tasks.",
      ),
      icon: "brain",
      link: "/oferta/aI-i-automatyzacja-procesow",
    },
    {
      _key: _key(),
      title: ls("Projektowanie systemów", "Systems design"),
      description: ls(
        "Architektura i integracje dla MŚP oraz korporacji.",
        "Architecture and integrations for SMBs and enterprises.",
      ),
      icon: "network",
      // transformacja technologiczna zdjęta z oferty (2026-08-28)
      link: "/oferta/aplikacje-webowe",
    },
    {
      _key: _key(),
      title: ls("Cyberbezpieczeństwo i DevOps", "Cybersecurity and DevOps"),
      description: ls(
        "Bezpieczeństwo, AWS/Azure, CI/CD i monitoring.",
        "Security, AWS/Azure, CI/CD and monitoring.",
      ),
      icon: "shield",
      link: "/oferta/cybersecurity",
    },
  ],
  businessPrimaryButtonText: ls("Skontaktuj się z nami", "Contact us"),
  businessPrimaryButtonLink: "/kontakt",
  businessSecondaryButtonText: ls("Zobacz pełną ofertę", "See full offer"),
  businessSecondaryButtonLink: "/oferta",

  careerTitle: ls(
    "Szukam miejsca na rozwój kariery",
    "I am looking for a place to grow my career",
  ),
  careerSubtitle: ls(
    "Akademia, staże, praca w zespole 40+ osób",
    "Academy, internships, work in a 40+ team",
  ),
  careerDescription: lt(
    "Akademia, praktyki, staże oraz pełnoetatowe role w zespole ponad 40 specjalistów.",
    "Academy, internships and full-time roles in a team of 40+ specialists.",
  ),
  careerBullets: [
    ls("Program Elevate i ścieżki rozwoju", "Elevate program and growth paths"),
    ls(
      "Mentoring oraz realne projekty komercyjne",
      "Mentoring and real commercial projects",
    ),
    ls(
      "Backend .NET, Frontend Next.js, Mobile, DevOps, QA",
      "Backend .NET, Frontend Next.js, Mobile, DevOps, QA",
    ),
  ],
  careerCtaText: ls("Zobacz więcej", "See more"),
  careerCtaLink: "https://elevate.cetuspro.com/",

  trustedLabel: ls("Zaufali nam", "Trusted by"),
  trustedDisplayMode: "text",
  trustedClients: ls(
    "FM Logistic · TÜV NORD · Flex To Go · MHC Mobility · Helpbox 365",
    "FM Logistic · TÜV NORD · Flex To Go · MHC Mobility · Helpbox 365",
  ),
  trustedCards: [
    { _key: _key(), name: "FM Logistic" },
    { _key: _key(), name: "TÜV NORD" },
    { _key: _key(), name: "Flex To Go" },
    { _key: _key(), name: "MHC Mobility" },
    { _key: _key(), name: "Helpbox 365" },
  ],
};

async function main() {
  console.log(
    `Seeding rollUpPage to dataset "${env.NEXT_PUBLIC_SANITY_DATASET}"...`,
  );
  const result = await client.createOrReplace(doc);
  console.log("OK:", result._id);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
