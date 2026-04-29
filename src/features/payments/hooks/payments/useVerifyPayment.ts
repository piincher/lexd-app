import { useMutation, useQueryClient } from '@tanstack/react-query';
import paymentApi from '../../api/paymentApi';
import type { VerifyPaymentRequest, VerifyPaymentResponse } from '../../types';
import { PAYMENT_KEYS } from './paymentKeys';

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation<VerifyPaymentResponse, Error, VerifyPaymentRequest>({
    mutationFn: paymentApi.verifyPayment,
    onSuccess: (data) => {
      if (data.status === 'COMPLETED' || data.status === 'FAILED') {
        queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.history() });
        queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.balanceDue() });
      }
    },
  });
};
