import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchShippingMarkClients,
  regenerateClientShippingMark,
  sendBulkShippingMarkWhatsApp,
  type ClientListFilters,
} from '../api/shippingMarkAdminApi';

const CLIENTS_QUERY_KEY = 'shipping-mark-clients';

export const useShippingMarksAdmin = (initialQuery?: string) => {
  const [filters, setFilters] = useState<ClientListFilters>({ page: 1, limit: 20, q: initialQuery });
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
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

  const updateSearch = (q: string) => {
    setFilters((prev) => ({ ...prev, q, page: 1 }));
  };

  const goToPage = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const toggleClientSelection = (
    selected: Set<string>,
    clientId: string,
  ): Set<string> => {
    const next = new Set(selected);
    if (next.has(clientId)) next.delete(clientId);
    else next.add(clientId);
    return next;
  };

  return {
    clients: data?.clients ?? [],
    pagination: data?.pagination,
    isLoading,
    isFetching,
    isError,
    refetch,
    filters,
    searchQuery: filters.q,
    updateSearch,
    goToPage,
    regenerateMark: regenerateMutation.mutateAsync,
    isRegenerating: regenerateMutation.isPending,
    sendBulkWhatsApp: bulkSendMutation.mutateAsync,
    isSendingBulk: bulkSendMutation.isPending,
    bulkResult: bulkSendMutation.data,
    toggleClientSelection,
  };
};
