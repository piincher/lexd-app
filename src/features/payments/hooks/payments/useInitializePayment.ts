import { useMutation, useQueryClient } from '@tanstack/react-query';
import paymentApi from '../../api/paymentApi';
import type { InitializePaymentRequest, InitializePaymentResponse } from '../../types';
import { PAYMENT_KEYS } from './paymentKeys';

export const useInitializePayment = () => {
  const queryClient = useQueryClient();

  return useMutation<InitializePaymentResponse, Error, InitializePaymentRequest>({
    mutationFn: paymentApi.initializePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.history() });
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.balanceDue() });
    },
  });
};
