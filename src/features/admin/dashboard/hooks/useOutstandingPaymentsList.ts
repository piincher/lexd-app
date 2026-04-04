/**
 * useOutstandingPaymentsList - Hook for fetching paginated outstanding payments
 * SRP: Data fetching and business logic ONLY
 */

import { useState, useCallback } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { getOutstandingPaymentsList } from '../api/dashboardApi';
import type { OutstandingPaymentsListData } from '../types';

export const outstandingPaymentsListKeys = {
  all: ['outstandingPaymentsList'] as const,
  list: (filters: { page: number; limit: number; status?: string; search?: string }) =>
    [...outstandingPaymentsListKeys.all, filters] as const,
};

export const useOutstandingPaymentsList = (
  options?: Omit<UseQueryOptions<OutstandingPaymentsListData, Error>, 'queryKey' | 'queryFn'>
) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState('');

  const { data, isLoading, isRefetching, refetch, error } = useQuery<OutstandingPaymentsListData, Error>({
    queryKey: outstandingPaymentsListKeys.list({ page, limit, status, search }),
    queryFn: () => getOutstandingPaymentsList(page, limit, status, search || undefined),
    staleTime: 2 * 60 * 1000,
    ...options,
  });

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: outstandingPaymentsListKeys.all });
    await refetch();
  }, [queryClient, refetch]);

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((newStatus?: string) => {
    setStatus(newStatus);
    setPage(1);
  }, []);

  const handleNextPage = useCallback(() => {
    if (data && page < data.pagination.pages) {
      setPage((p) => p + 1);
    }
  }, [data, page]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  }, [page]);

  return {
    items: data?.items || [],
    pagination: data?.pagination,
    isLoading,
    isRefetching,
    error,
    page,
    limit,
    status,
    search,
    handleRefresh,
    handleSearch,
    handleStatusChange,
    handleNextPage,
    handlePrevPage,
    setPage,
  };
};

export default useOutstandingPaymentsList;
