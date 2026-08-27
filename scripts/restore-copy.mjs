/**
 * Przywraca treść z pliku backupu utworzonego przez scripts/backup-copy.mjs.
 * Użycie: node scripts/restore-copy.mjs sanity/backups/copy-2026-08-26.json
 */
import { createClient } from '@sanity/client';
import fs from 'node:fs';

const file = process.argv[2];
if (!file) {
  console.error('Podaj plik backupu, np. sanity/backups/copy-2026-08-26.json');
  process.exit(1);
}

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

const docs = JSON.parse(fs.readFileSync(file, 'utf8'));
let tx = client.transaction();
for (const doc of docs) tx = tx.createOrReplace(doc);
await tx.commit();
console.log(`Przywrócono ${docs.length} dokumentów z ${file}`);
