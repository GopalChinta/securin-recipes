export const toNullableNumber = (val) => {
    const n = typeof val === 'number' ? val : Number(val);
    return Number.isFinite(n) ? n : null;
};
