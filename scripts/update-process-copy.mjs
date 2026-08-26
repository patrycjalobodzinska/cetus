// Synchronizuje copy sekcji procesu w Sanity ze stanem w messages/*.json
// i usuwa nieużywane pole `question` (nigdy nie było renderowane).
import { createClient } from "@sanity/client";
import fs from "node:fs";

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split("\n").filter(Boolean).map((l) => {
    const [k, ...v] = l.split("=");
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

const pl = JSON.parse(fs.readFileSync("messages/pl.json", "utf8")).home.process;
const en = JSON.parse(fs.readFileSync("messages/en.json", "utf8")).home.process;

const ls = (key) => ({ _type: "localeString", pl: pl[key], en: en[key] });
const lt = (key) => ({ _type: "localeText", pl: pl[key], en: en[key] });
const stepLs = (k, f) => ({ _type: "localeString", pl: pl.steps[k][f], en: en.steps[k][f] });
const stepLt = (k, f) => ({ _type: "localeText", pl: pl.steps[k][f], en: en.steps[k][f] });

const PS_ID = "e73c35f2-9f38-4611-aaad-eecc85a12430";
// kolejność kroków w dokumencie odpowiada kolejności kluczy w messages
const KEYS = ["1a82c984bd81", "b61cee0871ed", "d036437ef828", "60a4deb3daf5", "056ac984f754"];
const NAMES = ["audit", "roadmap", "management", "acceptance", "maintenance"];

let patch = client.patch(PS_ID).set({ title: ls("title"), description: lt("description") });

KEYS.forEach((key, i) => {
  const n = NAMES[i];
  patch = patch
    .set({
      [`steps[_key=="${key}"].stepLabel`]: stepLs(n, "stepLabel"),
      [`steps[_key=="${key}"].title`]: stepLs(n, "title"),
      [`steps[_key=="${key}"].description`]: stepLt(n, "description"),
    })
    .unset([`steps[_key=="${key}"].question`]);
});

await patch.commit();
console.log("processSection: copy zsynchronizowane, pole `question` usunięte");
