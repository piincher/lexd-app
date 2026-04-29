import { useMutation, useQueryClient } from '@tanstack/react-query';
import paymentApi from '../../api/paymentApi';
import type { InitializePaymentResponse, TopUpRequest } from '../../types';
import { PAYMENT_KEYS } from './paymentKeys';

export const useTopUpBalance = () => {
  const queryClient = useQueryClient();

  return useMutation<InitializePaymentResponse, Error, TopUpRequest>({
    mutationFn: paymentApi.topUpBalance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.history() });
    },
  });
};
