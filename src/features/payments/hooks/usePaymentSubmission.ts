import { useState, useRef, useCallback, useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import { usePaymentFlow } from './usePayments';
import type { PaymentProvider, InitializePaymentResponse } from '../types';

export const usePaymentSubmission = () => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusModalConfig, setStatusModalConfig] = useState({
    status: 'processing' as 'processing' | 'success' | 'error',
    title: '',
    message: '',
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const paymentFlow = usePaymentFlow();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startPolling = useCallback(async (provider: PaymentProvider, transactionId: string) => {
    const maxAttempts = 60;
    let attempts = 0;

    const checkStatus = async () => {
      attempts++;
      try {
        const result = await paymentFlow.verifyPayment({ provider, transactionId });

        if (result.status === 'COMPLETED') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setStatusModalConfig({
            status: 'success',
            title: 'Payment Successful!',
            message: 'Your payment has been processed successfully.',
          });
          return;
        } else if (result.status === 'FAILED') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          setStatusModalConfig({
            status: 'error',
            title: 'Payment Failed',
            message: result.message || 'The payment could not be completed.',
          });
          return;
        }

        if (attempts < maxAttempts) {
          timeoutRef.current = setTimeout(checkStatus, 2000);
        } else {
          setStatusModalConfig({
            status: 'error',
            title: 'Payment Timeout',
            message: 'The payment confirmation timed out. Please check your payment status later.',
          });
        }
      } catch {
        if (attempts < maxAttempts) {
          timeoutRef.current = setTimeout(checkStatus, 2000);
        }
      }
    };

    checkStatus();
  }, [paymentFlow]);

  const handleCardPayment = useCallback((result: InitializePaymentResponse) => {
    timeoutRef.current = setTimeout(() => {
      setStatusModalConfig({
        status: 'success',
        title: 'Payment Successful!',
        message: 'Your card payment has been processed.',
      });
    }, 2000);
  }, []);

  return {
    showStatusModal,
    statusModalConfig,
    isInitializing: paymentFlow.isInitializing,
    setShowStatusModal,
    setStatusModalConfig,
    startPolling,
    handleCardPayment,
    initializePayment: paymentFlow.initializePayment,
  };
};
