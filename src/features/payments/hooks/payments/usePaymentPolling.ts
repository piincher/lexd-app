import { useState, useEffect, useRef } from 'react';
import paymentApi from '../../api/paymentApi';
import type { VerifyPaymentResponse } from '../../types';

export const usePaymentPolling = (
  provider: string | null,
  transactionId: string | null,
  options?: {
    maxAttempts?: number;
    intervalMs?: number;
    onSuccess?: () => void;
    onFailure?: () => void;
    onTimeout?: () => void;
  }
) => {
  const [status, setStatus] = useState<'idle' | 'polling' | 'success' | 'failed' | 'timeout'>('idle');
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState<VerifyPaymentResponse | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const attemptsRef = useRef(0);

  const {
    maxAttempts = 30,
    intervalMs = 2000,
    onSuccess,
    onFailure,
    onTimeout,
  } = options ?? {};

  const clearPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startPolling = () => {
    if (!provider || !transactionId) return;
    if (intervalRef.current) return;

    setStatus('polling');
    attemptsRef.current = 0;
    setAttempts(0);

    intervalRef.current = setInterval(async () => {
      attemptsRef.current += 1;
      setAttempts(attemptsRef.current);

      try {
        const data = await paymentApi.verifyPayment({ provider, transactionId });
        setResult(data);

        if (data.status === 'COMPLETED') {
          clearPolling();
          setStatus('success');
          onSuccess?.();
        } else if (data.status === 'FAILED' || data.status === 'CANCELLED') {
          clearPolling();
          setStatus('failed');
          onFailure?.();
        } else if (attemptsRef.current >= maxAttempts) {
          clearPolling();
          setStatus('timeout');
          onTimeout?.();
        }
      } catch (error) {
        console.error('Polling error:', error);
        if (attemptsRef.current >= maxAttempts) {
          clearPolling();
          setStatus('timeout');
          onTimeout?.();
        }
      }
    }, intervalMs);
  };

  const stopPolling = () => {
    clearPolling();
    setStatus('idle');
  };

  useEffect(() => {
    return () => {
      clearPolling();
    };
  }, []);

  return {
    status,
    attempts,
    result,
    startPolling,
    stopPolling,
    isPolling: status === 'polling',
  };
};
