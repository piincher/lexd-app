import { useState, useCallback } from 'react';
import { useCardPaymentFieldValidation } from './useCardPaymentFieldValidation';
import type { CardPaymentFormData, CardPaymentErrors } from './useCardPayment';

const initialFormData: CardPaymentFormData = {
  cardNumber: '',
  expiry: '',
  cvv: '',
  cardHolder: '',
};

export const useCardPaymentState = () => {
  const [formData, setFormData] = useState<CardPaymentFormData>(initialFormData);
  const [errors, setErrors] = useState<CardPaymentErrors>({});
  const [isValid, setIsValid] = useState(false);
  const { validateField, validateAllFields } = useCardPaymentFieldValidation();

  const updateField = useCallback((name: keyof CardPaymentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors((prev) => {
      const newErrors = { ...prev, [name]: error };
      const hasErrors = Object.values(newErrors).some((e) => e !== undefined) ||
        !formData.cardNumber || !formData.expiry || !formData.cvv || !formData.cardHolder;
      setIsValid(!hasErrors);
      return newErrors;
    });
  }, [formData, validateField]);

  const validateAll = useCallback((): boolean => {
    const newErrors = validateAllFields(formData);
    setErrors(newErrors);
    const valid = !Object.values(newErrors).some((e) => e !== undefined);
    setIsValid(valid);
    return valid;
  }, [formData, validateAllFields]);

  const reset = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setIsValid(false);
  }, []);

  return {
    formData,
    errors,
    isValid,
    updateField,
    validateAll,
    reset,
  };
};
