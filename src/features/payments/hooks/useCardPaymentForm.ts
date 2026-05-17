import { useEffect, useRef, useCallback } from 'react';
import type { CardDetails } from '../types';
import { useCardPaymentValidation } from './useCardPaymentValidation';
import { useCardPaymentState } from './useCardPaymentState';
import { useCardPaymentHandlers } from './useCardPaymentHandlers';

export const useCardPaymentForm = (
  onCardChange: (card: CardDetails, isValid: boolean) => void,
  onUseSavedCard?: (cardId: string) => void
) => {
  const { detectCardBrand, validateCardNumber, validateExpiry, validateCvv, formatCardNumber } =
    useCardPaymentValidation();

  const {
    card, setCard, errors, setErrors, touched, setTouched,
    cardBrand, setCardBrand, showCvv, setShowCvv,
    selectedSavedCard, setSelectedSavedCard, saveCard, setSaveCard,
  } = useCardPaymentState();

  const onCardChangeRef = useRef(onCardChange);
  onCardChangeRef.current = onCardChange;

  const validations = { detectCardBrand, validateCardNumber, validateExpiry, validateCvv, formatCardNumber };

  const {
    validateField,
    handleNumberChange, handleMonthChange, handleYearChange,
    handleCvvChange, handleNameChange, handleSavedCardSelect,
  } = useCardPaymentHandlers(
    card, setCard, setCardBrand, setErrors, cardBrand, validations, onUseSavedCard, setSelectedSavedCard
  );

  const validateAll = useCallback((): boolean => {
    const validationsResult = {
      number: validateCardNumber(card.number),
      expiryMonth: !!card.expiryMonth,
      expiryYear: validateExpiry(card.expiryMonth, card.expiryYear),
      cvv: validateCvv(card.cvv, cardBrand),
      holderName: card.holderName.length >= 3,
    };
    return Object.values(validationsResult).every(Boolean);
  }, [card, cardBrand, validateCardNumber, validateExpiry, validateCvv]);

  useEffect(() => {
    onCardChangeRef.current(card, validateAll());
  }, [card, validateAll]);

  return {
    card, errors, touched, cardBrand, showCvv, selectedSavedCard, saveCard,
    setShowCvv, setSaveCard, setTouched, setSelectedSavedCard,
    handleNumberChange, handleMonthChange, handleYearChange, handleCvvChange, handleNameChange, handleSavedCardSelect,
  };
};
