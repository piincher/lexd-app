import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyPointLedger } from '../api/rewardApi';

export const pointLedgerQueryKeys = {
  all: ['rewards', 'ledger'] as const,
  me: (limit = 20) => [...pointLedgerQueryKeys.all, 'me', limit] as const,
};

export const useMyPointLedger = (limit = 20) =>
  useInfiniteQuery({
    queryKey: pointLedgerQueryKeys.me(limit),
    queryFn: ({ pageParam }) => getMyPointLedger(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.pages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
  });
