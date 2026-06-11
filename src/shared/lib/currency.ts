/**
 * Currency formatting utilities
 */

/**
 * Coerce a possibly-string value to a finite number, or null if unparseable.
 * Several backend financial fields (priceTotal, unitPrice, …) are stored as
 * strings, so formatters must accept `number | string` and never emit "NaN".
 */
const toFiniteNumber = (value: number | string | null | undefined): number | null => {
  if (value === undefined || value === null || value === '') return null;
  const n = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(n) ? n : null;
};

/**
 * Format amount in FCFA (West African CFA franc)
 */
export const formatCurrency = (amount: number | string | null | undefined): string => {
  const n = toFiniteNumber(amount);
  if (n === null) return '0 FCFA';

  return n.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

/**
 * Format amount without currency symbol
 */
export const formatAmount = (amount: number | string | null | undefined): string => {
  const n = toFiniteNumber(amount);
  if (n === null) return '0';

  return n.toLocaleString('fr-FR');
};

/**
 * Parse formatted amount back to number
 */
export const parseAmount = (formattedAmount: string): number => {
  const cleaned = formattedAmount.replace(/[^\d,-]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};
