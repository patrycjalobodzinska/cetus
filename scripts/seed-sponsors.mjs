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

const CACHE =
  "/Users/patrycjalobodzinska/.claude/image-cache/3cc1d49e-eb98-403c-9c68-733b5a473972";

const sponsors = [
  {
    _id: "sponsor-ziomki-rzeszow",
    name: ls("Akademia Piłkarska Ziomki Rzeszów", "Ziomki Rzeszów Football Academy"),
    category: ls("Klub piłkarski", "Football club"),
    link: "https://www.ziomki.eu/",
    logoFile: `${CACHE}/1.png`,
    logoName: "ziomki-rzeszow-logo.png",
    darkBackground: false,
    order: 1,
  },
  {
    _id: "sponsor-eryk-kuter",
    name: ls("Eryk Kuter", "Eryk Kuter"),
    category: ls("Sport", "Athlete"),
    link: "https://erykkuter.pl/",
    logoFile: `${CACHE}/2.png`,
    logoName: "eryk-kuter-logo.png",
    darkBackground: true,
    order: 2,
  },
];

async function run() {
  for (const s of sponsors) {
    const asset = await client.assets.upload("image", fs.readFileSync(s.logoFile), {
      filename: s.logoName,
    });
    const doc = {
      _id: s._id,
      _type: "sponsor",
      name: s.name,
      category: s.category,
      link: s.link,
      darkBackground: s.darkBackground,
      order: s.order,
      logo: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      },
    };
    await client.createOrReplace(doc);
    console.log(`✅ Seeded sponsor: ${s.name.pl}`);
  }
}

run().catch((err) => {
  console.error("❌ Seeding failed:", err.message);
  process.exit(1);
});
