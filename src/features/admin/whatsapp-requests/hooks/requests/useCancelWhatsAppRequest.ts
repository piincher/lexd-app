import { useMutation, useQueryClient } from '@tanstack/react-query';
import { whatsappRequestApi } from '../../api/whatsappRequestApi';
import { whatsappRequestQueryKeys } from './useWhatsAppRequestKeys';

export const useCancelRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      whatsappRequestApi.cancelRequest(id, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.stats() });
    },
  });
};
