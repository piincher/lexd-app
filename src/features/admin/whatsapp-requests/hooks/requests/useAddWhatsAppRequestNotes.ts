import { useMutation, useQueryClient } from '@tanstack/react-query';
import { whatsappRequestApi } from '../../api/whatsappRequestApi';
import { whatsappRequestQueryKeys } from './useWhatsAppRequestKeys';

export const useAddNotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) => whatsappRequestApi.addNotes(id, notes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.detail(variables.id) });
    },
  });
};
