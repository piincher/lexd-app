import { useState, useEffect, useCallback, useRef } from 'react';
import type { CardDetails } from '../types';
import { useCardPaymentValidation } from './useCardPaymentValidation';

export const useCardPaymentForm = (
  onCardChange: (card: CardDetails, isValid: boolean) => void,
  onUseSavedCard?: (cardId: string) => void
) => {
  const { detectCardBrand, validateCardNumber, validateExpiry, validateCvv, formatCardNumber } =
    useCardPaymentValidation();

  const [card, setCard] = useState<CardDetails>({
    number: '', expiryMonth: '', expiryYear: '', cvv: '', holderName: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CardDetails, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CardDetails, boolean>>>({});
  const [cardBrand, setCardBrand] = useState<string>('default');
  const [showCvv, setShowCvv] = useState(false);
  const [selectedSavedCard, setSelectedSavedCard] = useState<string | null>(null);
  const [saveCard, setSaveCard] = useState(false);

  const onCardChangeRef = useRef(onCardChange);
  onCardChangeRef.current = onCardChange;

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
  }, [card.expiryMonth, cardBrand, validateCardNumber, validateExpiry, validateCvv]);

  const validateAll = useCallback((): boolean => {
    const validations = {
      number: validateCardNumber(card.number),
      expiryMonth: !!card.expiryMonth,
      expiryYear: validateExpiry(card.expiryMonth, card.expiryYear),
      cvv: validateCvv(card.cvv, cardBrand),
      holderName: card.holderName.length >= 3,
    };
    return Object.values(validations).every(Boolean);
  }, [card, cardBrand, validateCardNumber, validateExpiry, validateCvv]);

  useEffect(() => {
    onCardChangeRef.current(card, validateAll());
  }, [card, validateAll]);

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
    setSelectedSavedCard(cardId);
    onUseSavedCard?.(cardId);
  };

  return {
    card, errors, touched, cardBrand, showCvv, selectedSavedCard, saveCard,
    setShowCvv, setSaveCard, setTouched, setSelectedSavedCard,
    handleNumberChange, handleMonthChange, handleYearChange, handleCvvChange, handleNameChange, handleSavedCardSelect,
  };
};
