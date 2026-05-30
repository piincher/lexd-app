import { useState, useRef, useCallback, useEffect } from 'react';
import { usePaymentFlow } from './usePayments';
import type { InitializePaymentResponse } from '../types';

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

  const handleCardPayment = useCallback((_result: InitializePaymentResponse) => {
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
    handleCardPayment,
    initializePayment: paymentFlow.initializePayment,
  };
};
