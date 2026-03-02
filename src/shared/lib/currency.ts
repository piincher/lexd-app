/**
 * Currency formatting utilities
 */

/**
 * Format amount in FCFA (West African CFA franc)
 */
export const formatCurrency = (amount: number): string => {
  if (amount === undefined || amount === null) return '0 FCFA';
  
  return amount.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

/**
 * Format amount without currency symbol
 */
export const formatAmount = (amount: number): string => {
  if (amount === undefined || amount === null) return '0';
  
  return amount.toLocaleString('fr-FR');
};

/**
 * Parse formatted amount back to number
 */
export const parseAmount = (formattedAmount: string): number => {
  const cleaned = formattedAmount.replace(/[^\d,-]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};
