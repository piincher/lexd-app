import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { getBalanceDue, type BalanceDueResponse } from '@src/shared/api/paymentApi';

const PAYMENT_KEYS = {
  balanceDue: () => ['payments', 'balance-due'] as const,
};

export const useBalanceDue = (options?: UseQueryOptions<BalanceDueResponse, Error>) => {
  return useQuery<BalanceDueResponse, Error>({
    queryKey: PAYMENT_KEYS.balanceDue(),
    queryFn: getBalanceDue,
    ...options,
  });
};
