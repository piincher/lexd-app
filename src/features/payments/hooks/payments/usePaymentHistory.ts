import { useInfiniteQuery } from '@tanstack/react-query';
import paymentApi from '../../api/paymentApi';
import type { PaymentHistoryItem } from '../../types';
import { PAYMENT_KEYS } from './paymentKeys';

export const usePaymentHistory = (filters?: {
  status?: string;
  provider?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}) => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<{
    payments: PaymentHistoryItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }, Error>({
    queryKey: PAYMENT_KEYS.history(filters),
    queryFn: async ({ pageParam = 1 }) => {
      return paymentApi.getPaymentHistory({
        ...filters,
        page: pageParam as number,
        limit: filters?.limit || 20,
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.pages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const payments = data?.pages.flatMap((page) => page.payments) ?? [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    payments,
    pagination: data?.pages[data.pages.length - 1]?.pagination,
    isLoading,
    isFetchingNextPage,
    error,
    refetch,
    loadMore,
    hasNextPage: !!hasNextPage,
  };
};
