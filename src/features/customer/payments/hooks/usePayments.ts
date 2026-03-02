/**
 * Payment Hooks
 * TanStack Query hooks for payment operations
 */

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { paymentApi } from '../api/paymentApi';
import {
  Payment,
  PaymentStatus,
  PaymentFilters,
  InitiatePaymentRequest,
  UnpaidGoods,
  PaymentIntent,
} from '../types';
import { ApiClientError } from '@src/api/client';
import { ApiResponse } from '../api/types';

// ============================================
// QUERY KEYS - Centralized cache management
// ============================================

export const paymentQueryKeys = {
  all: ['payments'] as const,
  balanceDue: () => [...paymentQueryKeys.all, 'balance-due'] as const,
  paymentHistory: () => [...paymentQueryKeys.all, 'history'] as const,
  paymentHistoryFiltered: (filters: PaymentFilters | undefined) =>
    [...paymentQueryKeys.paymentHistory(), filters] as const,
  paymentDetail: (id: string) => [...paymentQueryKeys.all, 'detail', id] as const,
} as const;

// ============================================
// READ HOOKS
// ============================================

/**
 * Hook to get customer's balance due and unpaid goods
 */
export const useGetBalanceDue = (
  options?: UseQueryOptions<
    { totalBalanceDue: number; currency: string; unpaidGoods: UnpaidGoods[] },
    ApiClientError
  >
) => {
  return useQuery({
    queryKey: paymentQueryKeys.balanceDue(),
    queryFn: async () => {
      const response = await paymentApi.getBalanceDue();
      return response.data.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute - balance can change frequently
    ...options,
  });
};

/**
 * Hook to get customer's payment history
 * @param filters Optional filters for status and date range
 */
export const useGetPaymentHistory = (
  filters?: PaymentFilters,
  options?: UseQueryOptions<Payment[], ApiClientError>
) => {
  return useQuery({
    queryKey: paymentQueryKeys.paymentHistoryFiltered(filters),
    queryFn: async () => {
      const response = await paymentApi.getPaymentHistory({
        status: filters?.status,
        startDate: filters?.startDate,
        endDate: filters?.endDate,
      });
      return response.data.data.payments;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Hook to verify payment status (for polling)
 * @param paymentId The payment ID to verify
 * @param enabled Whether to enable the query (for conditional polling)
 */
export const useVerifyPayment = (
  paymentId: string | undefined,
  options?: UseQueryOptions<
    { payment: Payment; status: PaymentStatus },
    ApiClientError
  >
) => {
  return useQuery({
    queryKey: paymentQueryKeys.paymentDetail(paymentId || ''),
    queryFn: async () => {
      const response = await paymentApi.verifyPayment(paymentId!);
      return response.data.data;
    },
    enabled: !!paymentId,
    refetchInterval: (query) => {
      // Poll every 3 seconds while payment is pending
      const data = query.state.data;
      if (data?.status === 'PENDING') {
        return 3000;
      }
      return false;
    },
    staleTime: 0,
    ...options,
  });
};

// ============================================
// MUTATION HOOKS
// ============================================

/**
 * Hook to initiate a payment
 * Invalidates balance due query on success
 */
export const useInitiatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InitiatePaymentRequest): Promise<PaymentIntent> => {
      const response = await paymentApi.initiatePayment(data);
      return response.data.data.payment;
    },
    onSuccess: () => {
      // Invalidate balance due to refresh after payment
      queryClient.invalidateQueries({ queryKey: paymentQueryKeys.balanceDue() });
    },
  });
};

/**
 * Hook to retry a failed payment
 */
export const useRetryPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentId: string): Promise<PaymentIntent> => {
      const response = await paymentApi.retryPayment(paymentId);
      return response.data.data.payment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentQueryKeys.balanceDue() });
      queryClient.invalidateQueries({ queryKey: paymentQueryKeys.paymentHistory() });
    },
  });
};

/**
 * Hook to download payment receipt
 */
export const useDownloadReceipt = () => {
  return useMutation({
    mutationFn: async (paymentId: string): Promise<string> => {
      const response = await paymentApi.downloadReceipt(paymentId);
      return response.data.data.receiptUrl;
    },
  });
};

// ============================================
// INVALIDATION HELPERS
// ============================================

/**
 * Hook to get invalidation functions
 */
export const usePaymentInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateBalanceDue = () => {
    queryClient.invalidateQueries({
      queryKey: paymentQueryKeys.balanceDue(),
    });
  };

  const invalidatePaymentHistory = () => {
    queryClient.invalidateQueries({
      queryKey: paymentQueryKeys.paymentHistory(),
    });
  };

  const invalidateAllPayments = () => {
    queryClient.invalidateQueries({
      queryKey: paymentQueryKeys.all,
    });
  };

  return {
    invalidateBalanceDue,
    invalidatePaymentHistory,
    invalidateAllPayments,
    queryClient,
  };
};

// ============================================
// UTILITY HOOKS
// ============================================

/**
 * Hook for payment polling with timeout
 * Automatically stops polling after payment is no longer pending or timeout reached
 */
export const usePaymentPolling = (
  paymentId: string | undefined,
  timeoutMs: number = 5 * 60 * 1000 // 5 minutes default timeout
) => {
  const { data, isLoading, error } = useVerifyPayment(paymentId, {
    refetchInterval: (query) => {
      const data = query.state.data;
      const startTime = query.state.dataUpdatedAt;
      const elapsed = Date.now() - startTime;

      // Stop polling if timeout reached
      if (elapsed > timeoutMs) {
        return false;
      }

      // Continue polling while pending
      if (data?.status === 'PENDING') {
        return 3000;
      }

      return false;
    },
  });

  const isPolling = isLoading && data?.status === 'PENDING';
  const isComplete = data?.status === 'COMPLETED' || data?.status === 'FAILED';

  return {
    payment: data?.payment,
    status: data?.status,
    isLoading,
    isPolling,
    isComplete,
    error,
  };
};
