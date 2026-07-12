import { useCallback, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClientError } from '@src/shared/api/client';
import {
  fetchShippingMarkClients,
  regenerateClientShippingMark,
  sendBulkShippingMarkWhatsApp,
  type ClientListFilters,
} from '../api/shippingMarkAdminApi';
import { useShippingMarkSelection } from './useShippingMarkSelection';
import { useShippingMarkGeneration } from './useShippingMarkGeneration';

const CLIENTS_QUERY_KEY = 'shipping-mark-clients';

export const useShippingMarksAdmin = (initialQuery?: string) => {
  const [filters, setFilters] = useState<ClientListFilters>({ page: 1, limit: 20, q: initialQuery });
  const queryClient = useQueryClient();

  useEffect(() => {
    setFilters((current) => ({ ...current, page: 1, q: initialQuery }));
  }, [initialQuery]);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: [CLIENTS_QUERY_KEY, filters],
    queryFn: () => fetchShippingMarkClients(filters),
    select: (response) => ({
      clients: response.data.data,
      pagination: response.data.pagination,
    }),
    staleTime: 30 * 1000,
  });

  const regenerateMutation = useMutation({
    mutationFn: regenerateClientShippingMark,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [CLIENTS_QUERY_KEY] }),
  });

  const bulkSendMutation = useMutation({
    mutationFn: sendBulkShippingMarkWhatsApp,
  });
  const selection = useShippingMarkSelection(data?.clients ?? []);
  const generation = useShippingMarkGeneration();
  const { clearSelection } = selection;

  useEffect(() => clearSelection(), [clearSelection, initialQuery]);

  const updateSearch = useCallback((q: string) => {
    clearSelection();
    setFilters((prev) => ({ ...prev, q, page: 1 }));
  }, [clearSelection]);

  const goToPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  return {
    clients: data?.clients ?? [],
    pagination: data?.pagination,
    isLoading,
    isFetching,
    isError,
    errorMessage: error instanceof ApiClientError
      ? error.getUserMessage()
      : 'Le service des marques est temporairement indisponible.',
    refetch,
    filters,
    ...selection,
    searchQuery: filters.q,
    updateSearch,
    goToPage,
    regenerateMark: regenerateMutation.mutateAsync,
    isRegenerating: regenerateMutation.isPending,
    sendBulkWhatsApp: bulkSendMutation.mutateAsync,
    isSendingBulk: bulkSendMutation.isPending,
    sendingClientIds: bulkSendMutation.isPending ? bulkSendMutation.variables?.userIds ?? [] : [],
    bulkResult: bulkSendMutation.data,
    ...generation,
    regeneratingClientId: regenerateMutation.isPending ? regenerateMutation.variables : undefined,
  };
};
