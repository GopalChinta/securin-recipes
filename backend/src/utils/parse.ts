export const toNullableNumber = (val: unknown): number | null => {
  const n = typeof val === 'number' ? val : Number(val);
  return Number.isFinite(n) ? n : null;
};
