import { useCallback } from 'react';
import type { CardDetails } from '../types';

interface ValidationFns {
  validateCardNumber: (number: string) => boolean;
  validateExpiry: (month: string, year: string) => boolean;
  validateCvv: (cvv: string, brand: string) => boolean;
  detectCardBrand: (number: string) => string;
  formatCardNumber: (value: string) => string;
}

export const useCardPaymentHandlers = (
  card: CardDetails,
  setCard: React.Dispatch<React.SetStateAction<CardDetails>>,
  setCardBrand: (brand: string) => void,
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof CardDetails, string>>>>,
  cardBrand: string,
  validations: ValidationFns,
  onUseSavedCard?: (cardId: string) => void,
  setSelectedSavedCard?: (id: string | null) => void,
) => {
  const { validateCardNumber, validateExpiry, validateCvv, detectCardBrand, formatCardNumber } = validations;

  const validateField = useCallback((field: keyof CardDetails, value: string) => {
    let error = '';
    switch (field) {
      case 'number':
        if (value && !validateCardNumber(value)) error = 'Invalid card number';
        break;
      case 'expiryMonth':
        if (value && (parseInt(value) < 1 || parseInt(value) > 12)) error = 'Invalid month';
        break;
      case 'expiryYear':
        if (value && !validateExpiry(card.expiryMonth, value)) error = 'Card expired';
        break;
      case 'cvv':
        if (value && !validateCvv(value, cardBrand)) error = `CVV must be ${cardBrand === 'amex' ? 4 : 3} digits`;
        break;
      case 'holderName':
        if (value && value.length < 3) error = 'Name is too short';
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  }, [card.expiryMonth, cardBrand, validateCardNumber, validateExpiry, validateCvv, setErrors]);

  const handleNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    setCardBrand(detectCardBrand(formatted));
    setCard(prev => ({ ...prev, number: formatted }));
    validateField('number', formatted);
  };

  const handleMonthChange = (value: string) => {
    let month = value.replace(/\D/g, '').substring(0, 2);
    if (month.length === 1 && parseInt(month) > 1) month = '0' + month;
    setCard(prev => ({ ...prev, expiryMonth: month }));
    validateField('expiryMonth', month);
  };

  const handleYearChange = (value: string) => {
    const year = value.replace(/\D/g, '').substring(0, 2);
    setCard(prev => ({ ...prev, expiryYear: year }));
    validateField('expiryYear', year);
  };

  const handleCvvChange = (value: string) => {
    const maxLength = cardBrand === 'amex' ? 4 : 3;
    const cvv = value.replace(/\D/g, '').substring(0, maxLength);
    setCard(prev => ({ ...prev, cvv }));
    validateField('cvv', cvv);
  };

  const handleNameChange = (value: string) => {
    setCard(prev => ({ ...prev, holderName: value.toUpperCase() }));
    validateField('holderName', value);
  };

  const handleSavedCardSelect = (cardId: string) => {
    setSelectedSavedCard?.(cardId);
    onUseSavedCard?.(cardId);
  };

  return {
    validateField,
    handleNumberChange,
    handleMonthChange,
    handleYearChange,
    handleCvvChange,
    handleNameChange,
    handleSavedCardSelect,
  };
};
