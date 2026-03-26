/**
 * useOutstandingPayments - Hook for fetching outstanding payments data
 * SRP: Data fetching and business logic ONLY (<100 lines)
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getOutstandingPayments } from '../api/dashboardApi';
import type { OutstandingPaymentsData } from '../types';

// Query keys for cache invalidation
export const outstandingPaymentsKeys = {
  all: ['outstandingPayments'] as const,
  summary: () => [...outstandingPaymentsKeys.all, 'summary'] as const,
};

/**
 * Hook to fetch outstanding payments data
 * Returns aggregated payment statistics including aging analysis and top debtors
 */
export const useOutstandingPayments = (
  options?: Omit<UseQueryOptions<OutstandingPaymentsData, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<OutstandingPaymentsData, Error>({
    queryKey: outstandingPaymentsKeys.summary(),
    queryFn: getOutstandingPayments,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
    ...options,
  });
};

export default useOutstandingPayments;
