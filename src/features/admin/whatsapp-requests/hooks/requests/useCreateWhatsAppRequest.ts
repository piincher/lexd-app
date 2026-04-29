import { useMutation, useQueryClient } from '@tanstack/react-query';
import { whatsappRequestApi, CreateWhatsAppRequestInput } from '../../api/whatsappRequestApi';
import { whatsappRequestQueryKeys } from './useWhatsAppRequestKeys';

export const useCreateWhatsAppRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWhatsAppRequestInput) => whatsappRequestApi.createRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.stats() });
    },
  });
};
