import { useMutation, useQueryClient } from '@tanstack/react-query';
import paymentApi from '../../api/paymentApi';
import { PAYMENT_KEYS } from './paymentKeys';

export const useCancelPayment = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: paymentApi.cancelPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.history() });
    },
  });
};
