const parseOpValue = (raw) => {
    if (!raw)
        return null;
    const m = raw.match(/(>=|<=|>|<|=)\s*([\d.]+)/);
    if (!m)
        return null;
    return { op: m[1], value: Number(m[2]) };
};
export function buildSearchQuery(q) {
    const where = [];
    const params = [];
    let i = 1;
    if (q.title) {
        where.push(`title ILIKE $${i++}`);
        params.push(`%${q.title}%`);
    }
    if (q.cuisine) {
        where.push(`cuisine = $${i++}`);
        params.push(q.cuisine);
    }
    const rating = parseOpValue(q.rating);
    if (rating) {
        where.push(`rating ${rating.op} $${i++}`);
        params.push(rating.value);
    }
    const total = parseOpValue(q.total_time);
    if (total) {
        where.push(`total_time ${total.op} $${i++}`);
        params.push(total.value);
    }
    const cal = parseOpValue(q.calories);
    if (cal) {
        where.push(`(nutrients->>'calories') ~ '^[0-9]+' AND (CAST(regexp_replace(nutrients->>'calories','[^0-9.]','','g') AS numeric)) ${cal.op} $${i++}`);
        params.push(cal.value);
    }
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
    return { whereSql, params };
}
