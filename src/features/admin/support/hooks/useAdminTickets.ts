import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminTicketApi } from '../api';
import type { AdminTicket, AdminTicketFilters, AdminTicketStatus } from '../types';
import { ApiClientError } from '@src/api/client';

export const adminTicketQueryKeys = {
  all: ['adminTickets'] as const,
  lists: () => [...adminTicketQueryKeys.all, 'list'] as const,
  list: (filters?: AdminTicketFilters) => [...adminTicketQueryKeys.lists(), filters || {}] as const,
  details: () => [...adminTicketQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...adminTicketQueryKeys.details(), id] as const,
};

export const useAdminTickets = (filters?: AdminTicketFilters) =>
  useQuery({
    queryKey: adminTicketQueryKeys.list(filters),
    queryFn: async () => {
      const response = await adminTicketApi.getTickets(filters);
      return response.data.data;
    },
    staleTime: 60 * 1000,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

export const useAdminTicket = (ticketId: string) =>
  useQuery<AdminTicket, ApiClientError>({
    queryKey: adminTicketQueryKeys.detail(ticketId),
    queryFn: async () => {
      const response = await adminTicketApi.getTicketById(ticketId);
      return response.data.data.ticket;
    },
    enabled: !!ticketId,
    staleTime: 60 * 1000,
  });

export const useAdminTicketReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ticketId, message }: { ticketId: string; message: string }) => {
      const response = await adminTicketApi.replyToTicket(ticketId, message);
      return response.data.data.ticket;
    },
    onSuccess: (ticket, variables) => {
      queryClient.setQueryData(adminTicketQueryKeys.detail(variables.ticketId), ticket);
      queryClient.invalidateQueries({ queryKey: adminTicketQueryKeys.lists() });
    },
  });
};

export const useAdminTicketStatusUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      ticketId,
      status,
      note,
    }: {
      ticketId: string;
      status: AdminTicketStatus;
      note?: string;
    }) => {
      const response = await adminTicketApi.updateStatus(ticketId, status, note);
      return response.data.data.ticket;
    },
    onSuccess: (ticket, variables) => {
      queryClient.setQueryData(adminTicketQueryKeys.detail(variables.ticketId), ticket);
      queryClient.invalidateQueries({ queryKey: adminTicketQueryKeys.lists() });
    },
  });
};
