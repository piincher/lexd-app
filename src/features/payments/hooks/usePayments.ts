import { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import paymentApi from '../api/paymentApi';
import type {
  InitializePaymentRequest,
  InitializePaymentResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
  TopUpRequest,
  PaymentProviderInfo,
  PaymentHistoryItem,
  BalanceDueResponse,
} from '../types';

// Query keys
const PAYMENT_KEYS = {
  all: ['payments'] as const,
  history: (filters?: Record<string, any>) => [...PAYMENT_KEYS.all, 'history', filters] as const,
  providers: (country?: string, currency?: string) => [...PAYMENT_KEYS.all, 'providers', country, currency] as const,
  balanceDue: () => [...PAYMENT_KEYS.all, 'balanceDue'] as const,
  details: (id: string) => [...PAYMENT_KEYS.all, 'details', id] as const,
};

/**
 * Hook to fetch available payment providers
 */
export const usePaymentProviders = (country?: string, currency?: string) => {
  return useQuery<{ providers: PaymentProviderInfo[] }, Error>({
    queryKey: PAYMENT_KEYS.providers(country, currency),
    queryFn: () => paymentApi.getPaymentProviders(country, currency),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to initialize a payment
 */
export const useInitializePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation<InitializePaymentResponse, Error, InitializePaymentRequest>({
    mutationFn: paymentApi.initializePayment,
    onSuccess: (data) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.history() });
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.balanceDue() });
    },
  });
};

/**
 * Hook to verify payment status
 */
export const useVerifyPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation<VerifyPaymentResponse, Error, VerifyPaymentRequest>({
    mutationFn: paymentApi.verifyPayment,
    onSuccess: (data) => {
      if (data.status === 'COMPLETED' || data.status === 'FAILED') {
        queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.history() });
        queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.balanceDue() });
      }
    },
  });
};

/**
 * Hook to get payment history with pagination
 */
export const usePaymentHistory = (filters?: {
  status?: string;
  provider?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}) => {
  const { data, isLoading, error, refetch, fetchNextPage, hasNextPage } = useQuery<{
    payments: PaymentHistoryItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }, Error>({
    queryKey: PAYMENT_KEYS.history(filters),
    queryFn: () => paymentApi.getPaymentHistory(filters),
    keepPreviousData: true,
  });

  const loadMore = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage?.();
    }
  };

  return {
    payments: data?.payments ?? [],
    pagination: data?.pagination,
    isLoading,
    error,
    refetch,
    loadMore,
    hasNextPage: !!hasNextPage,
  };
};

/**
 * Hook to get balance due
 */
export const useBalanceDue = (options?: UseQueryOptions<BalanceDueResponse, Error>) => {
  return useQuery<BalanceDueResponse, Error>({
    queryKey: PAYMENT_KEYS.balanceDue(),
    queryFn: paymentApi.getBalanceDue,
    ...options,
  });
};

/**
 * Hook to calculate balance for specific goods
 */
export const useCalculateBalanceForGoods = () => {
  return useMutation<BalanceDueResponse, Error, string[]>({
    mutationFn: paymentApi.calculateBalanceForGoods,
  });
};

/**
 * Hook to top up balance
 */
export const useTopUpBalance = () => {
  const queryClient = useQueryClient();
  
  return useMutation<InitializePaymentResponse, Error, TopUpRequest>({
    mutationFn: paymentApi.topUpBalance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.history() });
    },
  });
};

/**
 * Hook to cancel a payment
 */
export const useCancelPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: paymentApi.cancelPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.history() });
    },
  });
};

/**
 * Hook to poll payment status with automatic retries
 */
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

/**
 * Hook to manage the complete payment flow
 */
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
      
      // Start polling for status
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

// Export all hooks
export default {
  usePaymentProviders,
  useInitializePayment,
  useVerifyPayment,
  usePaymentHistory,
  useBalanceDue,
  useCalculateBalanceForGoods,
  useTopUpBalance,
  useCancelPayment,
  usePaymentPolling,
  usePaymentFlow,
};
