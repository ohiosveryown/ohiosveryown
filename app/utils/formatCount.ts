// Keeps the pill narrow: exact up to 999, then 1.2k, 12k, 1.2M.
export function formatCount(count: number) {
  if (count < 1000) return String(count)
  const [divisor, unit] = count < 1_000_000 ? [1000, 'k'] : [1_000_000, 'M']
  const value = count / divisor
  // One decimal below 10 (1.2k), none above (12k); never round up to 1000k.
  const rounded =
    value < 10 ? Math.floor(value * 10) / 10 : Math.floor(value)
  return `${rounded}${unit}`
}
