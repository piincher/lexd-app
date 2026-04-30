import { useCallback } from 'react';

export const CARD_BRAND_CONFIG: Record<string, { icon: string; color: string; label: string }> = {
  visa: { icon: 'credit-card', color: '#1A1F71', label: 'Visa' },
  mastercard: { icon: 'credit-card', color: '#EB001B', label: 'Mastercard' },
  amex: { icon: 'credit-card', color: '#006FCF', label: 'American Express' },
  discover: { icon: 'credit-card', color: '#FF6000', label: 'Discover' },
};

export const useCardPaymentValidation = () => {
  const detectCardBrand = useCallback((number: string): string => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';
    return 'default';
  }, []);

  const validateCardNumber = useCallback((number: string): boolean => {
    const cleaned = number.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cleaned)) return false;

    let sum = 0;
    let isEven = false;
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  }, []);

  const validateExpiry = useCallback((month: string, year: string): boolean => {
    if (!month || !year) return false;
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    const expYear = parseInt(year, 10);
    const expMonth = parseInt(month, 10);

    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    if (expMonth < 1 || expMonth > 12) return false;
    return true;
  }, []);

  const validateCvv = useCallback((cvv: string, brand: string): boolean => {
    const length = brand === 'amex' ? 4 : 3;
    return new RegExp(`^\\d{${length}}$`).test(cvv);
  }, []);

  const formatCardNumber = useCallback((value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ').substring(0, 19) : cleaned;
  }, []);

  return {
    detectCardBrand,
    validateCardNumber,
    validateExpiry,
    validateCvv,
    formatCardNumber,
  };
};
