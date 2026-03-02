/**
 * Ticket Hooks
 * TanStack Query hooks for ticket data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { ticketApi } from '../api/ticketApi';
import { Ticket, TicketStatus, CreateTicketInput, AddMessageInput, RateTicketInput } from '../types';
import { ApiClientError } from '@src/api/client';

// Query keys factory
export const ticketQueryKeys = {
  all: ['tickets'] as const,
  lists: () => [...ticketQueryKeys.all, 'list'] as const,
  list: (status?: string) => [...ticketQueryKeys.lists(), status || 'ALL'] as const,
  details: () => [...ticketQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...ticketQueryKeys.details(), id] as const,
  messages: (id: string) => [...ticketQueryKeys.detail(id), 'messages'] as const,
};

// Polling interval for real-time updates (30 seconds)
const POLLING_INTERVAL = 30000;

/**
 * Hook to fetch all tickets with optional status filter
 */
export const useGetTickets = (status?: string, options?: UseQueryOptions<Ticket[], ApiClientError>) => {
  return useQuery({
    queryKey: ticketQueryKeys.list(status),
    queryFn: async () => {
      const response = await ticketApi.getTickets(status);
      return response.data.data.tickets;
    },
    select: (data) => data,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: POLLING_INTERVAL, // Real-time polling
    ...options,
  });
};

/**
 * Hook to fetch a specific ticket by ID
 */
export const useGetTicket = (id: string, options?: UseQueryOptions<Ticket, ApiClientError>) => {
  return useQuery({
    queryKey: ticketQueryKeys.detail(id),
    queryFn: async () => {
      const response = await ticketApi.getTicketById(id);
      return response.data.data.ticket;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: POLLING_INTERVAL, // Real-time polling for messages
    ...options,
  });
};

/**
 * Hook to create a new ticket
 */
export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTicketInput) => {
      const response = await ticketApi.createTicket({
        type: data.type,
        subject: data.subject,
        description: data.description,
        relatedGoodsId: data.relatedGoodsId,
        relatedOrderId: data.relatedOrderId,
      });
      return response.data.data.ticket;
    },
    onSuccess: () => {
      // Invalidate all ticket lists
      queryClient.invalidateQueries({ queryKey: ticketQueryKeys.lists() });
    },
  });
};

/**
 * Hook to add a message to a ticket
 */
export const useAddMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ticketId, message }: { ticketId: string; message: string }) => {
      const response = await ticketApi.addMessage(ticketId, message);
      return response.data.data.message;
    },
    onSuccess: (_, variables) => {
      // Invalidate the specific ticket to refresh messages
      queryClient.invalidateQueries({ queryKey: ticketQueryKeys.detail(variables.ticketId) });
    },
  });
};

/**
 * Hook to rate a resolved ticket
 */
export const useRateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ticketId, rating }: { ticketId: string; rating: number }) => {
      const response = await ticketApi.rateTicket(ticketId, rating);
      return response.data.data.ticket;
    },
    onSuccess: (_, variables) => {
      // Invalidate the specific ticket and all lists
      queryClient.invalidateQueries({ queryKey: ticketQueryKeys.detail(variables.ticketId) });
      queryClient.invalidateQueries({ queryKey: ticketQueryKeys.lists() });
    },
  });
};

/**
 * Hook to upload an attachment
 */
export const useUploadAttachment = () => {
  return useMutation({
    mutationFn: async ({
      file,
      onProgress,
    }: {
      file: { uri: string; name: string; type: string };
      onProgress?: (progress: number) => void;
    }) => {
      const response = await ticketApi.uploadAttachment(file, onProgress);
      return response.data.url;
    },
  });
};
