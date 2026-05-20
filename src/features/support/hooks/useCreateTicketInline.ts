import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTicket } from '../api/ticketApi';
import type { CreateTicketRequest } from '../api/ticketApi';

const TICKETS_PREVIEW_KEY = 'tickets-preview';

export function useCreateTicketInline() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateTicketRequest) => createTicket(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TICKETS_PREVIEW_KEY] });
    },
  });

  return {
    createTicket: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
