import { useState } from 'react';
import type { InitializePaymentRequest, InitializePaymentResponse } from '../../types';
import { useInitializePayment } from './useInitializePayment';
import { useVerifyPayment } from './useVerifyPayment';
import { usePaymentPolling } from './usePaymentPolling';

export const usePaymentFlow = () => {
  const [step, setStep] = useState<'method' | 'details' | 'processing' | 'confirmation'>('method');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<InitializePaymentResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const initializeMutation = useInitializePayment();
  const verifyMutation = useVerifyPayment();
  const polling = usePaymentPolling(
    selectedProvider,
    paymentData?.providerTransactionId ?? null,
    {
      onSuccess: () => setStep('confirmation'),
      onFailure: () => setStep('confirmation'),
    }
  );

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

      if (result.providerTransactionId) {
        polling.startPolling();
      }

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
    polling.stopPolling();
  };

  const goBack = () => {
    if (step === 'details') {
      setStep('method');
      setSelectedProvider(null);
    } else if (step === 'processing') {
      polling.stopPolling();
      setStep('details');
    }
  };

  return {
    step,
    selectedProvider,
    paymentData,
    error,
    isInitializing: initializeMutation.isLoading,
    isVerifying: verifyMutation.isLoading,
    isPolling: polling.isPolling,
    pollingAttempts: polling.attempts,
    pollingStatus: polling.status,
    selectProvider,
    initializePayment,
    verifyPayment: verifyMutation.mutateAsync,
    reset,
    goBack,
  };
};
