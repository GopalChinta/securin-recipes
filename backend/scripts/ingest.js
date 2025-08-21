import 'dotenv/config';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { pool } from '../src/db/pool.js';
import { toNullableNumber } from '../src/utils/parse.js';
(async () => {
    const jsonPath = resolve(process.cwd(), 'data', 'recipes.json');
    const raw = readFileSync(jsonPath, 'utf-8');
    const items = JSON.parse(raw);
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
    }
    finally {
        client.release();
        process.exit(0);
    }
})();
