/**
 * useTrackOrder Hook
 * Hook for tracking orders by order code (enabled: false by default)
 */

import { useQuery } from '@tanstack/react-query';
import { clientOrdersApi, TrackOrderResult } from '../api/clientOrdersApi';

const queryKeys = {
  all: ['trackOrder'] as const,
  byCode: (code: string) => [...queryKeys.all, code] as const,
};

interface UseTrackOrderReturn {
  data: TrackOrderResult | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useTrackOrder = (orderCode: string): UseTrackOrderReturn => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.byCode(orderCode),
    queryFn: () => clientOrdersApi.trackOrder(orderCode),
    enabled: false, // Manual trigger only
    staleTime: 0,
    retry: 1,
  });

  return {
    data,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
};

export type { TrackOrderResult };
