/**
 * useClientOrder Hook
 * Query hook for GET /api/v1/orders/:id/client-view
 */

import { useQuery } from '@tanstack/react-query';
import { clientOrdersApi, ClientOrderView } from '../api/clientOrdersApi';

const queryKeys = {
  all: ['clientOrder'] as const,
  detail: (id: string) => [...queryKeys.all, id] as const,
};

interface UseClientOrderReturn {
  data: ClientOrderView | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useClientOrder = (orderId: string | undefined): UseClientOrderReturn => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.detail(orderId || ''),
    queryFn: () => clientOrdersApi.getClientOrder(orderId!),
    enabled: !!orderId,
    staleTime: 2 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
};

export type { ClientOrderView };
