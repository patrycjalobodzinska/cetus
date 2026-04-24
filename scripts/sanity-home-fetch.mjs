import { createClient } from '@sanity/client';
import fs from 'node:fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(
  envFile
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [k, ...v] = line.split('=');
      return [k.trim(), v.join('=').trim().replace(/^"(.*)"$/, '$1')];
    })
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const docs = await client.fetch(
  `{
    "hero": *[_type == "hero"][0],
    "offer": *[_type == "offer"][0]{_id, title, titleHighlight, description, buttonText, "projectCount": count(projects)},
    "process": *[_type == "processSection"][0]{_id, title, description, "stepsCount": count(steps)},
    "homepageModules": *[_type == "homepageModules"][0]{_id, title, description, "modulesCount": count(modules)},
    "faq": *[_type == "faq"][0]{_id, title, description, "itemsCount": count(items)}
  }`
);

console.log(JSON.stringify(docs, null, 2));
