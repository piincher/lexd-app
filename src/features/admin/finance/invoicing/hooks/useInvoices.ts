import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { invoiceApi } from '../api/invoiceApi';
import {
  Invoice,
  InvoiceFilters,
  CreateInvoiceInput,
  UpdateInvoiceInput,
  MarkPaidInput,
} from '../api/types';
import { ApiClientError } from '@src/api/client';

// Query keys factory
export const invoiceQueryKeys = {
  all: ['invoices'] as const,
  lists: () => [...invoiceQueryKeys.all, 'list'] as const,
  list: (filters: InvoiceFilters) => [...invoiceQueryKeys.lists(), JSON.stringify(filters)] as const,
  details: () => [...invoiceQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...invoiceQueryKeys.details(), id] as const,
  stats: () => [...invoiceQueryKeys.all, 'stats'] as const,
};

// Query hooks
export const useGetInvoices = (filters: InvoiceFilters = {}, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: invoiceQueryKeys.list(filters),
    queryFn: () => invoiceApi.getInvoices(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error instanceof ApiClientError && error.statusCode === 401) return false;
      return failureCount < 3;
    },
    networkMode: 'offlineFirst',
    ...options,
  });
};

export const useGetInvoice = (id: string | undefined, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: invoiceQueryKeys.detail(id || ''),
    queryFn: () => invoiceApi.getInvoice(id!),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useGetInvoiceStats = (options?: UseQueryOptions) => {
  return useQuery({
    queryKey: invoiceQueryKeys.stats(),
    queryFn: () => invoiceApi.getInvoiceStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Mutation hooks
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvoiceInput) => invoiceApi.createInvoice(data),
    onSuccess: () => {
      // Invalidate all invoice lists
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.stats() });
    },
  });
};

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInvoiceInput }) =>
      invoiceApi.updateInvoice(id, data),
    onSuccess: (data, variables) => {
      // Update the specific invoice cache
      queryClient.setQueryData(invoiceQueryKeys.detail(variables.id), data);
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.stats() });
    },
  });
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => invoiceApi.deleteInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.stats() });
    },
  });
};

export const useSendInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => invoiceApi.sendInvoice(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(invoiceQueryKeys.detail(id), data);
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.stats() });
    },
  });
};

export const useCancelInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      invoiceApi.cancelInvoice(id, reason),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(invoiceQueryKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.stats() });
    },
  });
};

export const useMarkInvoicePaid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: MarkPaidInput }) =>
      invoiceApi.markPaid(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(invoiceQueryKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.stats() });
    },
  });
};

export const usePreviewInvoice = () => {
  return useMutation({
    mutationFn: (data: CreateInvoiceInput) => invoiceApi.previewInvoice(data),
  });
};

export const useDownloadInvoicePdf = () => {
  return useMutation({
    mutationFn: (id: string) => invoiceApi.downloadInvoicePdf(id),
  });
};
