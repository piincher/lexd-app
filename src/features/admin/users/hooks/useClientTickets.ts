import { useQuery } from '@tanstack/react-query';
import { adminTicketApi } from '../../support/api';
import type { AdminTicketsResponse } from '../../support/types';

export const clientTicketsKeys = {
  all: (userId: string) => ['clientTickets', userId] as const,
};

export const useClientTickets = (userId: string) =>
  useQuery<AdminTicketsResponse, Error>({
    queryKey: clientTicketsKeys.all(userId),
    queryFn: async () => {
      const response = await adminTicketApi.getTickets({ userId, limit: 10 });
      return response.data.data;
    },
    enabled: !!userId,
    staleTime: 60 * 1000,
  });
