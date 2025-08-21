import 'dotenv/config';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { pool } from '../src/db/pool.js';
import { toNullableNumber } from '../src/utils/parse.js';

type Recipe = {
  cuisine?: string;
  title: string;
  rating?: number | string;
  total_time?: number | string;
  prep_time?: number | string;
  cook_time?: number | string;
  description?: string;
  nutrients?: Record<string, string>;
  serves?: string;
};

(async () => {
  const jsonPath = resolve(process.cwd(), 'data', 'recipes.json');
  const raw = readFileSync(jsonPath, 'utf-8');
  const items: Recipe[] = JSON.parse(raw);

  const insertSql = `
    INSERT INTO recipes (cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    ON CONFLICT DO NOTHING
  `;
  const client = await pool.connect();
  try {
    for (const r of items) {
      const rating = toNullableNumber(r.rating);
      const prep = toNullableNumber(r.prep_time);
      const cook = toNullableNumber(r.cook_time);
      const total = toNullableNumber(r.total_time);

      await client.query(insertSql, [
        r.cuisine ?? null,
        r.title,
        rating,
        prep,
        cook,
        total,
        r.description ?? null,
        r.nutrients ?? null,
        r.serves ?? null
      ]);
    }
    console.log(`Inserted ${items.length} recipes (NaN handled as NULL).`);
  } finally {
    client.release();
    process.exit(0);
  }
})();
