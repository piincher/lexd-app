import { useQuery } from '@tanstack/react-query';
import { getMyTicketsPreview } from '../api/ticketApi';
import type { TicketPreview } from '../api/ticketApi';

const TICKETS_PREVIEW_KEY = 'tickets-preview';

export function useMyTicketsPreview(limit = 3) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [TICKETS_PREVIEW_KEY, limit],
    queryFn: () => getMyTicketsPreview(limit),
    staleTime: 2 * 60 * 1000,
  });

  return {
    tickets: data ?? [],
    isLoading,
    isError,
  };
}

export type { TicketPreview };
