import { useMutation } from '@tanstack/react-query';
import paymentApi from '../../api/paymentApi';
import type { BalanceDueResponse } from '../../types';

export const useCalculateBalanceForGoods = () => {
  return useMutation<BalanceDueResponse, Error, string[]>({
    mutationFn: paymentApi.calculateBalanceForGoods,
  });
};
