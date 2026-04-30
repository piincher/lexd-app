/**
 * Analytics Formatting Hooks
 * Utility hooks for formatting analytics values
 */

export const useFormatCurrency = () => {
  return (amount: number, currency = 'XOF') => {
    if (amount === undefined || amount === null) return '-';

    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
};

export const useFormatNumber = () => {
  return (num: number, decimals = 0) => {
    if (num === undefined || num === null) return '-';

    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };
};

export const useFormatPercentage = () => {
  return (value: number, decimals = 1) => {
    if (value === undefined || value === null) return '-';

    return `${value.toFixed(decimals)}%`;
  };
};

export const useCompactNumberFormat = () => {
  return (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`;
    }
    return amount.toLocaleString('fr-FR');
  };
};

export const useTrendIndicator = () => {
  return (value: number) => {
    if (value > 0) return { icon: 'trending-up', color: '#10B981', text: `+${value.toFixed(1)}%` };
    if (value < 0) return { icon: 'trending-down', color: '#EF4444', text: `${value.toFixed(1)}%` };
    return { icon: 'trending-neutral', color: '#6B7280', text: '0%' };
  };
};
