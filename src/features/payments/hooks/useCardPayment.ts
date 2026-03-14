/**
 * Card Payment Hook
 * Manages card payment form state and validation
 */

import { useState, useCallback } from 'react';
import { validateCardNumber, validateExpiry, validateCVV, validateCardHolder } from '../utils/PaymentValidation';

export interface CardPaymentFormData {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardHolder: string;
}

export interface CardPaymentErrors {
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  cardHolder?: string;
}

export const useCardPayment = (onSubmit: (data: CardPaymentFormData) => Promise<void>) => {
  const [formData, setFormData] = useState<CardPaymentFormData>({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardHolder: '',
  });

  const [errors, setErrors] = useState<CardPaymentErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

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

  const updateField = useCallback((name: keyof CardPaymentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors((prev) => {
      const newErrors = { ...prev, [name]: error };
      // Check if all fields are valid
      const hasErrors = Object.values(newErrors).some((e) => e !== undefined) ||
        !formData.cardNumber || !formData.expiry || !formData.cvv || !formData.cardHolder;
      setIsValid(!hasErrors);
      return newErrors;
    });
  }, [formData, validateField]);

  const validateAll = useCallback((): boolean => {
    const newErrors: CardPaymentErrors = {
      cardNumber: validateCardNumber(formData.cardNumber),
      expiry: validateExpiry(formData.expiry),
      cvv: validateCVV(formData.cvv),
      cardHolder: validateCardHolder(formData.cardHolder),
    };
    setErrors(newErrors);
    const valid = !Object.values(newErrors).some((e) => e !== undefined);
    setIsValid(valid);
    return valid;
  }, [formData]);

  const submit = useCallback(async () => {
    if (!validateAll()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit, validateAll]);

  const reset = useCallback(() => {
    setFormData({
      cardNumber: '',
      expiry: '',
      cvv: '',
      cardHolder: '',
    });
    setErrors({});
    setIsValid(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    isValid,
    updateField,
    submit,
    reset,
  };
};
