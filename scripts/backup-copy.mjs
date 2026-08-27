/**
 * Eksport dokumentów tekstowych z Sanity do pliku JSON.
 * Backup przed zmianami treści - przywrócenie: node scripts/restore-copy.mjs <plik>
 * Użycie: node scripts/backup-copy.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'node:fs';

const env = Object.fromEntries(
  fs.readFileSync('.env.local', 'utf8').split('\n').filter(Boolean).map((line) => {
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

const TYPES = [
  'servicePage', 'offer', 'offerStats', 'stats', 'hero', 'aboutUs', 'homepageModule',
  'faq', 'funding', 'industries', 'technologies', 'whatsNew', 'processSection', 'footer',
];

const docs = await client.fetch(`*[_type in $types]`, { types: TYPES });
const stamp = new Date().toISOString().slice(0, 10);
const file = `sanity/backups/copy-${stamp}.json`;
fs.writeFileSync(file, JSON.stringify(docs, null, 2));
console.log(`Zapisano ${docs.length} dokumentów -> ${file}`);
