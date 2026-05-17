import { useState, useCallback } from 'react';
import type { CardPaymentFormData } from './useCardPayment';

export const useCardPaymentSubmission = (
  onSubmit: (data: CardPaymentFormData) => Promise<void>,
  validateAll: () => boolean,
  formData: CardPaymentFormData,
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = useCallback(async () => {
    if (!validateAll()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit, validateAll]);

  return {
    isSubmitting,
    submit,
  };
};
