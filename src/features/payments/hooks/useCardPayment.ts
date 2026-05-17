/**
 * Card Payment Hook
 * Manages card payment form state and validation
 */

import { useCardPaymentState } from './useCardPaymentState';
import { useCardPaymentSubmission } from './useCardPaymentSubmission';

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
  const {
    formData,
    errors,
    isValid,
    updateField,
    validateAll,
    reset,
  } = useCardPaymentState();

  const {
    isSubmitting,
    submit,
  } = useCardPaymentSubmission(onSubmit, validateAll, formData);

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
