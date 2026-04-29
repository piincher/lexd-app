import { useState, useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import type { PaymentProvider, CardDetails } from '../types';

export const usePaymentScreenForm = () => {
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardValid, setCardValid] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardDetails | null>(null);

  const handleProviderSelect = useCallback((provider: PaymentProvider) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedProvider(provider);
    setPhoneNumber('');
    setCardValid(false);
  }, []);

  const handleCardChange = useCallback((card: CardDetails, isValid: boolean) => {
    setCardDetails(card);
    setCardValid(isValid);
  }, []);

  const getPaymentDetails = useCallback(() => {
    switch (selectedProvider) {
      case 'ORANGE_MONEY':
      case 'WAVE':
        return { phoneNumber };
      case 'STRIPE':
      case 'CARD':
        return { cardDetails };
      default:
        return {};
    }
  }, [selectedProvider, phoneNumber, cardDetails]);

  const isStepValid = useCallback(() => {
    if (!selectedProvider) return false;
    switch (selectedProvider) {
      case 'ORANGE_MONEY':
        return phoneNumber.length === 10 && phoneNumber.startsWith('0');
      case 'WAVE':
        return true;
      case 'STRIPE':
      case 'CARD':
        return cardValid;
      default:
        return false;
    }
  }, [selectedProvider, phoneNumber, cardValid]);

  return {
    selectedProvider,
    setSelectedProvider,
    phoneNumber,
    setPhoneNumber,
    cardValid,
    cardDetails,
    handleProviderSelect,
    handleCardChange,
    getPaymentDetails,
    isStepValid,
  };
};
