import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { invoiceApi } from '../api/invoiceApi';
import { Invoice, InvoiceFilters, InvoicesListResponse } from '../api/types';
import { ApiClientError } from '@src/api/client';

// Query keys factory
export const invoiceQueryKeys = {
  all: ['my-invoices'] as const,
  lists: () => [...invoiceQueryKeys.all, 'list'] as const,
  list: (filters: InvoiceFilters) => [...invoiceQueryKeys.lists(), JSON.stringify(filters)] as const,
  details: () => [...invoiceQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...invoiceQueryKeys.details(), id] as const,
};

// Query hooks
export const useGetMyInvoices = (filters: InvoiceFilters = {}, options?: UseQueryOptions) => {
  return useQuery<InvoicesListResponse, Error>({
    queryKey: invoiceQueryKeys.list(filters),
    queryFn: () => invoiceApi.getMyInvoices(filters),
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
  return useQuery<Invoice, Error>({
    queryKey: invoiceQueryKeys.detail(id || ''),
    queryFn: () => invoiceApi.getInvoice(id!),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

// Mutation hooks
export const usePayInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      id, 
      paymentData 
    }: { 
      id: string; 
      paymentData: { paymentMethod: string; paymentReference?: string };
    }) => invoiceApi.payInvoice(id, paymentData),
    onSuccess: (data, variables) => {
      // Update the specific invoice cache
      queryClient.setQueryData(invoiceQueryKeys.detail(variables.id), data);
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.lists() });
    },
  });
};

export const useDownloadInvoicePdf = () => {
  return useMutation({
    mutationFn: (id: string) => invoiceApi.downloadInvoicePdf(id),
  });
};

export const useShareInvoice = () => {
  return useMutation({
    mutationFn: (id: string) => invoiceApi.shareInvoice(id),
  });
};
