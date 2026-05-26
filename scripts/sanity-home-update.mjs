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

const HERO_ID = "5d3487f4-42ed-4d50-90f0-8ea81d675081";
const OFFER_ID = "4811eea1-e571-4be7-8911-db41c38449b3";
const PROCESS_ID = "e73c35f2-9f38-4611-aaad-eecc85a12430";

const heroDescriptionPl =
  "Tworzymy nowoczesne oprogramowanie, które realnie pomaga firmom się rozwijać. Doradzamy, budujemy i wspieramy aplikacje webowe, mobilne oraz rozwiązania AI - od pomysłu, przez projektowanie UX/UI, po wdrożenie i długofalowy rozwój. Specjalizujemy się w projektach, które porządkują procesy, skracają czas operacji i zapewniają przewagę konkurencyjną na rynku.";

const heroDescriptionEn =
  "We create modern software that helps companies grow. We advise, build and support web applications, mobile apps and AI solutions - from the initial idea through UX/UI design to implementation and long-term development. We specialize in projects that organize processes, shorten operations and provide measurable competitive advantage.";

const offerDescriptionPl =
  "Kompleksowe rozwiązania IT dostosowane do potrzeb Twojego biznesu. Tworzymy nowoczesne aplikacje webowe i mobilne, projektujemy interfejsy UX/UI, wdrażamy rozwiązania AI, cybersecurity oraz transformację technologiczną. Każdy projekt prowadzimy od analizy i strategii, przez development i wdrożenie, po wsparcie techniczne - tak, aby oprogramowanie realnie pomagało firmom się rozwijać i osiągać cele biznesowe.";

const offerDescriptionEn =
  "Comprehensive IT solutions tailored to your business needs. We create modern web and mobile applications, design UX/UI interfaces, implement AI, cybersecurity and technological transformation. We lead each project from analysis and strategy, through development and implementation, to technical support - so that software truly helps companies grow and achieve their business goals.";

const processDescriptionPl =
  "Tworzymy nowoczesne oprogramowanie w ustrukturyzowanym, przewidywalnym procesie. Od audytu, przez projektowanie i development, po wdrożenie i wsparcie - każdy etap porządkuje działania i dowozi mierzalne efekty, które realnie pomagają firmom się rozwijać.";

const processDescriptionEn =
  "We create modern software in a structured, predictable process. From audit, through design and development, to implementation and support - each stage organizes activities and delivers measurable results that truly help companies grow.";

const tx = client.transaction();

tx.patch(HERO_ID, {
  set: {
    "description.pl": heroDescriptionPl,
    "description.en": heroDescriptionEn,
    "titleHighlight.pl": "oprogramowanie,",
    "titleAfterHighlight.pl": "które pomaga",
  },
});

tx.patch(OFFER_ID, {
  set: {
    "description.pl": offerDescriptionPl,
    "description.en": offerDescriptionEn,
  },
});

tx.patch(PROCESS_ID, {
  set: {
    description: {
      _type: "localeText",
      pl: processDescriptionPl,
      en: processDescriptionEn,
    },
  },
});

const result = await tx.commit();
console.log(
  "OK:",
  result.results.map((r) => `${r.id}: ${r.operation}`).join(", "),
);
