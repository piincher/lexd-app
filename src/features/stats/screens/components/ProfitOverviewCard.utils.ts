export const fmtProfitAmount = (amount: number): string => {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(2)}M F`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K F`;
  return `${amount.toFixed(0)} F`;
};
