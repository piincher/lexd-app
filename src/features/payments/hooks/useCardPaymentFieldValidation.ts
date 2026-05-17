import { useCallback } from 'react';
import { validateCardNumber, validateExpiry, validateCVV, validateCardHolder } from '../utils/PaymentValidation';
import type { CardPaymentFormData, CardPaymentErrors } from './useCardPayment';

export const useCardPaymentFieldValidation = () => {
  const validateField = useCallback((name: keyof CardPaymentFormData, value: string): string | undefined => {
    switch (name) {
      case 'cardNumber':
        return validateCardNumber(value);
      case 'expiry':
        return validateExpiry(value);
      case 'cvv':
        return validateCVV(value);
      case 'cardHolder':
        return validateCardHolder(value);
      default:
        return undefined;
    }
  }, []);

  const validateAllFields = useCallback((data: CardPaymentFormData): CardPaymentErrors => ({
    cardNumber: validateCardNumber(data.cardNumber),
    expiry: validateExpiry(data.expiry),
    cvv: validateCVV(data.cvv),
    cardHolder: validateCardHolder(data.cardHolder),
  }), []);

  return { validateField, validateAllFields };
};
