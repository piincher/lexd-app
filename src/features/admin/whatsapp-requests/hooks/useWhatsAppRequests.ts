/**
 * WhatsApp Request Hooks - React Query hooks for WhatsApp request management
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import {
  whatsappRequestApi,
  WhatsAppRequest,
  CreateWhatsAppRequestInput,
  WhatsAppRequestFilters,
  GeneratePdfInput,
  SearchCustomerInput,
  WhatsAppRequestStatus,
} from '../api/whatsappRequestApi';
import { ApiClientError } from '@src/api/client';

// ============================================
// QUERY KEYS
// ============================================

export const whatsappRequestQueryKeys = {
  all: ['whatsapp-requests'] as const,
  lists: () => [...whatsappRequestQueryKeys.all, 'list'] as const,
  list: (filters: WhatsAppRequestFilters | undefined) =>
    [...whatsappRequestQueryKeys.lists(), filters] as const,
  details: () => [...whatsappRequestQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...whatsappRequestQueryKeys.details(), id] as const,
  byStatus: (status: WhatsAppRequestStatus) => [...whatsappRequestQueryKeys.all, 'status', status] as const,
  stats: () => [...whatsappRequestQueryKeys.all, 'stats'] as const,
  customerSearch: (phone: string) => [...whatsappRequestQueryKeys.all, 'customer', phone] as const,
};

// ============================================
// READ HOOKS
// ============================================

export const useGetWhatsAppRequests = (
  filters?: WhatsAppRequestFilters,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: whatsappRequestQueryKeys.list(filters),
    queryFn: () => whatsappRequestApi.getRequests(filters),
    staleTime: 30 * 1000, // 30 seconds - more frequent updates for real-time feel
    ...options,
  });
};

export const useGetWhatsAppRequestById = (
  id: string | undefined,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: whatsappRequestQueryKeys.detail(id || ''),
    queryFn: () => whatsappRequestApi.getRequestById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
    ...options,
  });
};

export const useGetPendingRequests = (
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: whatsappRequestQueryKeys.byStatus('PENDING'),
    queryFn: () => whatsappRequestApi.getRequests({ status: 'PENDING', limit: 50 }),
    staleTime: 15 * 1000, // Frequent updates for pending requests
    refetchInterval: 30 * 1000, // Auto-refetch every 30 seconds
    ...options,
  });
};

export const useGetWhatsAppStats = (
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: whatsappRequestQueryKeys.stats(),
    queryFn: () => whatsappRequestApi.getStats(),
    staleTime: 60 * 1000,
    ...options,
  });
};

// ============================================
// MUTATION HOOKS
// ============================================

export const useCreateWhatsAppRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWhatsAppRequestInput) => whatsappRequestApi.createRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.stats() });
    },
  });
};

export const useMarkRequestProcessing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => whatsappRequestApi.markProcessing(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.byStatus('PENDING') });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.stats() });
    },
  });
};

export const useMarkRequestCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, pdfUrl, notes }: { id: string; pdfUrl?: string; notes?: string }) =>
      whatsappRequestApi.markCompleted(id, pdfUrl, notes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.stats() });
    },
  });
};

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

export const useSearchCustomer = () => {
  return useMutation({
    mutationFn: (data: SearchCustomerInput) => whatsappRequestApi.searchCustomer(data),
  });
};

export const useAddNotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) => whatsappRequestApi.addNotes(id, notes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.detail(variables.id) });
    },
  });
};

export const useCancelRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      whatsappRequestApi.cancelRequest(id, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.stats() });
    },
  });
};

// ============================================
// UTILITY HOOKS
// ============================================

export const useWhatsAppRequestStats = () => {
  const { data: statsData } = useGetWhatsAppStats();
  const { data: pendingData } = useGetPendingRequests();

  const stats = (() => {
    const overview = statsData?.overview || {};
    const pendingRequests = pendingData?.requests || [];

    return {
      // Queue stats
      pending: statsData?.currentQueue?.pending || 0,
      processing: statsData?.currentQueue?.processing || 0,
      total: statsData?.currentQueue?.total || 0,

      // Status breakdown
      completed: overview?.COMPLETED?.total || 0,
      failed: overview?.FAILED?.total || 0,
      cancelled: overview?.CANCELLED?.total || 0,

      // Type breakdown
      packingList: overview?.PENDING?.byType?.PACKING_LIST?.count || 0,
      loadingList: overview?.PENDING?.byType?.LOADING_LIST?.count || 0,
      tracking: overview?.PENDING?.byType?.TRACKING?.count || 0,

      // Oldest pending request
      oldestPending: pendingRequests.length > 0
        ? new Date(pendingRequests[0].requestedAt)
        : null,
    };
  })();

  return stats;
};

export const useRefreshWhatsAppRequests = () => {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.all });
  };
};
