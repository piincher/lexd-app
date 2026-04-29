import { useMutation, useQueryClient } from '@tanstack/react-query';
import { whatsappRequestApi, GeneratePdfInput } from '../../api/whatsappRequestApi';
import { whatsappRequestQueryKeys } from './useWhatsAppRequestKeys';

export const useGeneratePdf = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data?: GeneratePdfInput }) =>
      whatsappRequestApi.generatePdf(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.detail(variables.id) });
    },
  });
};
