import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketApi } from '../api/ticketApi';
import { CreateTicketInput } from '../types';
import { ticketQueryKeys } from './useTicketQueries';

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
      queryClient.invalidateQueries({ queryKey: ticketQueryKeys.lists() });
    },
  });
};

export const useAddMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ticketId, message }: { ticketId: string; message: string }) => {
      const response = await ticketApi.addMessage(ticketId, message);
      return response.data.data.message;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketQueryKeys.detail(variables.ticketId) });
    },
  });
};

export const useRateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ticketId, rating }: { ticketId: string; rating: number }) => {
      const response = await ticketApi.rateTicket(ticketId, rating);
      return response.data.data.ticket;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketQueryKeys.detail(variables.ticketId) });
      queryClient.invalidateQueries({ queryKey: ticketQueryKeys.lists() });
    },
  });
};

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
