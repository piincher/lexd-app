import { useMutation, useQueryClient } from '@tanstack/react-query';
import { whatsappRequestApi } from '../../api/whatsappRequestApi';
import { whatsappRequestQueryKeys } from './useWhatsAppRequestKeys';

export const useMarkRequestProcessing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => whatsappRequestApi.markProcessing(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.byStatus('PENDING') });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.stats() });
    },
  });
};

export const useMarkRequestCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, pdfUrl, notes }: { id: string; pdfUrl?: string; notes?: string }) =>
      whatsappRequestApi.markCompleted(id, pdfUrl, notes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.stats() });
    },
  });
};
