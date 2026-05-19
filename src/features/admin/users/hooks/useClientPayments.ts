import { useQuery } from '@tanstack/react-query';
import { getPaymentHistory } from '../../../payments/api/paymentApi';
import type { PaymentHistoryResponse } from '../../../payments/types';

export const clientPaymentsKeys = {
  all: (userId: string) => ['clientPayments', userId] as const,
};

export const useClientPayments = (userId: string) =>
  useQuery<PaymentHistoryResponse, Error>({
    queryKey: clientPaymentsKeys.all(userId),
    queryFn: async () => {
      const response = await getPaymentHistory({ userId, limit: 10 });
      return response;
    },
    enabled: !!userId,
    staleTime: 60 * 1000,
  });
