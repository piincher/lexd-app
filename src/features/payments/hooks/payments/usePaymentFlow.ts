import { useState } from 'react';
import type { InitializePaymentRequest, InitializePaymentResponse } from '../../types';
import { useInitializePayment } from './useInitializePayment';
import { useVerifyPayment } from './useVerifyPayment';

export const usePaymentFlow = () => {
  const [step, setStep] = useState<'method' | 'details' | 'processing' | 'confirmation'>('method');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<InitializePaymentResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const initializeMutation = useInitializePayment();
  const verifyMutation = useVerifyPayment();

  const selectProvider = (provider: string) => {
    setSelectedProvider(provider);
    setStep('details');
    setError(null);
  };

  const initializePayment = async (data: InitializePaymentRequest) => {
    try {
      setStep('processing');
      setError(null);
      const result = await initializeMutation.mutateAsync(data);
      setPaymentData(result);
      setStep('confirmation');

      return result;
    } catch (err) {
      setError(err as Error);
      setStep('details');
      throw err;
    }
  };

  const reset = () => {
    setStep('method');
    setSelectedProvider(null);
    setPaymentData(null);
    setError(null);
  };

  const goBack = () => {
    if (step === 'details') {
      setStep('method');
      setSelectedProvider(null);
    } else if (step === 'processing') {
      setStep('details');
    }
  };

  return {
    step,
    selectedProvider,
    paymentData,
    error,
    isInitializing: initializeMutation.isPending,
    isVerifying: verifyMutation.isPending,
    isPolling: false,
    pollingAttempts: 0,
    pollingStatus: 'idle' as const,
    selectProvider,
    initializePayment,
    verifyPayment: verifyMutation.mutateAsync,
    reset,
    goBack,
  };
};
