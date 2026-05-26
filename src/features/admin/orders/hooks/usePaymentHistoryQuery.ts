import { Alert } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPaymentHistory, backfillPayments } from '@src/api/payment';

export const usePaymentHistoryQuery = (orderId: string) => {
  const queryClient = useQueryClient();

  const { data: payments, isLoading, error, refetch } = useQuery({
    queryKey: ['paymentHistory', orderId],
    queryFn: () => getPaymentHistory(orderId),
    enabled: !!orderId,
  });

  const { mutate: runBackfill, isPending: isBackfilling } = useMutation({
    mutationFn: () => backfillPayments(orderId),
    onSuccess: (data: any) => {
      Alert.alert('Synchronisation terminée', `${data.created} paiements synchronisés, ${data.receiptsGenerated} reçus générés.`);
      queryClient.invalidateQueries({ queryKey: ['paymentHistory', orderId] });
      refetch();
    },
    onError: (err: any) => {
      Alert.alert('Erreur', err?.message || 'La synchronisation a échoué.');
    },
  });

  const hasMissingReceipts = payments?.some((p: any) => !p.receiptUrl || (typeof p.receiptUrl === 'string' && p.receiptUrl.includes('error=generation_failed'))) || false;
  const totalPaid = payments?.reduce((sum: number, p: any) => sum + (p.amount || 0), 0) || 0;

  return { payments, isLoading, error, refetch, runBackfill, isBackfilling, hasMissingReceipts, totalPaid };
};
