import { useQuery } from '@tanstack/react-query';
import paymentApi from '../../api/paymentApi';
import type { PaymentHistoryItem } from '../../types';
import { PAYMENT_KEYS } from './paymentKeys';

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
