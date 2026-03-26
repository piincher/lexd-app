import { useInfiniteQuery } from '@tanstack/react-query';
import paymentApi from '../api/paymentApi';
import type { PaymentHistoryFilters, PaymentHistoryItem } from '../types';

const PAYMENT_HISTORY_KEY = 'myPaymentHistory';

export const useMyPaymentHistory = (filters?: PaymentHistoryFilters) => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery<{
    payments: PaymentHistoryItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }, Error>({
    queryKey: [PAYMENT_HISTORY_KEY, filters],
    queryFn: async ({ pageParam = 1 }) => {
      return paymentApi.getMyPaymentHistory({
        ...filters,
        page: pageParam as number,
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.pages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
  });

  const payments = data?.pages.flatMap((page) => page.payments) ?? [];

  return {
    payments,
    isLoading,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
  };
};
