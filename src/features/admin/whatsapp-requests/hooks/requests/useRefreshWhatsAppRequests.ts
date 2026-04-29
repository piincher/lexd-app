import { useQueryClient } from '@tanstack/react-query';
import { whatsappRequestQueryKeys } from './useWhatsAppRequestKeys';

export const useRefreshWhatsAppRequests = () => {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.all });
  };
};
