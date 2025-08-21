import { pool } from '../db/pool.js';
import { buildSearchQuery } from '../utils/buildSearchQuery.js';
export async function getAll(req, res) {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 10));
    const offset = (page - 1) * limit;
    const totalSql = 'SELECT COUNT(*)::int AS c FROM recipes';
    const listSql = `
    SELECT id, title, cuisine, rating, prep_time, cook_time, total_time, description, nutrients, serves
    FROM recipes
    ORDER BY rating DESC NULLS LAST, id ASC
    LIMIT $1 OFFSET $2
  `;
    const client = await pool.connect();
    try {
        const total = (await client.query(totalSql)).rows[0].c;
        const data = (await client.query(listSql, [limit, offset])).rows;
        res.json({ page, limit, total, data });
    }
    finally {
        client.release();
    }
}
export async function search(req, res) {
    const { whereSql, params } = buildSearchQuery({
        title: req.query.title,
        cuisine: req.query.cuisine,
        rating: req.query.rating,
        total_time: req.query.total_time,
        calories: req.query.calories
    });
    const sql = `
    SELECT id, title, cuisine, rating, prep_time, cook_time, total_time, description, nutrients, serves
    FROM recipes
    ${whereSql}
    ORDER BY rating DESC NULLS LAST, id ASC
    LIMIT 100
  `;
    const { rows } = await pool.query(sql, params);
    res.json({ data: rows });
}
