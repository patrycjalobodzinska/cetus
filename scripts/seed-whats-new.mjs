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

const reel = (id, captionPl, captionEn) => ({
  _key: _key(),
  _type: "reel",
  url: `https://www.facebook.com/reel/${id}/`,
  caption: captionPl ? ls(captionPl, captionEn) : undefined,
});

const doc = {
  _id: "whatsNew",
  _type: "whatsNew",
  title: ls("Co u nas", "What's new"),
  description: lt(
    "Zobacz nasze najnowsze materiały wideo prosto z Facebooka.",
    "Check out our latest videos straight from Facebook.",
  ),
  // Najnowsze na górze
  reels: [
    reel("990463803768200"),
    reel("786250697810751"),
    reel("2171191370337211"),
  ],
};

client
  .createOrReplace(doc)
  .then(() => {
    console.log("✅ Seeded whatsNew with", doc.reels.length, "reels");
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  });
