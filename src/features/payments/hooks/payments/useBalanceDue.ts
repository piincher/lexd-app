import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import paymentApi from '../../api/paymentApi';
import type { BalanceDueResponse } from '../../types';
import { PAYMENT_KEYS } from './paymentKeys';

export const useBalanceDue = (options?: UseQueryOptions<BalanceDueResponse, Error>) => {
  return useQuery<BalanceDueResponse, Error>({
    queryKey: PAYMENT_KEYS.balanceDue(),
    queryFn: paymentApi.getBalanceDue,
    ...options,
  });
};
