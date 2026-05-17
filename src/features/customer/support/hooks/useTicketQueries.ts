import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ticketApi } from '../api/ticketApi';
import { Ticket, TicketFilters } from '../types';
import { ApiClientError } from '@src/api/client';

export const ticketQueryKeys = {
  all: ['tickets'] as const,
  lists: () => [...ticketQueryKeys.all, 'list'] as const,
  list: (filters?: TicketFilters) => [...ticketQueryKeys.lists(), filters || {}] as const,
  details: () => [...ticketQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...ticketQueryKeys.details(), id] as const,
  messages: (id: string) => [...ticketQueryKeys.detail(id), 'messages'] as const,
};

export const useGetTickets = (filters?: TicketFilters, options?: UseQueryOptions<Ticket[], ApiClientError>) => {
  return useQuery({
    queryKey: ticketQueryKeys.list(filters),
    queryFn: async () => {
      const response = await ticketApi.getTickets(filters);
      return response.data.data.tickets;
    },
    select: (data) => data,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    ...options,
  });
};

export const useGetTicket = (id: string, options?: UseQueryOptions<Ticket, ApiClientError>) => {
  return useQuery({
    queryKey: ticketQueryKeys.detail(id),
    queryFn: async () => {
      const response = await ticketApi.getTicketById(id);
      return response.data.data.ticket;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    ...options,
  });
};
