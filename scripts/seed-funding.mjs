import { createClient } from "@sanity/client";
import fs from "node:fs";

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

const ls = (pl, en) => ({ _type: "localeString", pl: pl || "", en: en || pl || "" });
const lt = (pl, en) => ({ _type: "localeText", pl: pl || "", en: en || pl || "" });

// UWAGA: dokument tworzony jest jako NIEOPUBLIKOWANY (enabled: false) i z pustymi
// kwotami. Uzupelnij tytul projektu, program, wartosc i wklad UE danymi z UMOWY
// o dofinansowanie oraz wgraj oficjalne zestawienie znakow, a nastepnie zaznacz
// "Opublikowane" w Sanity Studio.
const doc = {
  _id: "funding",
  _type: "funding",
  enabled: false,
  heading: ls("Fundusze Europejskie", "European Funds"),
  intro: lt(
    "CetusPro realizuje projekty wspolfinansowane ze srodkow Unii Europejskiej.",
    "CetusPro carries out projects co-financed by the European Union.",
  ),
  hashtags: "#FunduszeUE #FunduszeEuropejskie",
  projects: [
    {
      _type: "fundingProject",
      _key: "project-1",
      name: ls("", ""),
      programName: ls("", ""),
      fund: ls("", ""),
      contractNumber: "",
      objective: lt("", ""),
      effects: lt("", ""),
      projectValue: "",
      euContribution: "",
    },
  ],
};

const res = await client.createOrReplace(doc);
console.log("Seeded funding doc:", res._id, "(enabled:", res.enabled + ")");
console.log(
  "Uzupelnij dane z umowy o dofinansowanie w Studio, wgraj zestawienie znakow i zaznacz 'Opublikowane'.",
);
