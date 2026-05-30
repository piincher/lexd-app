import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { whatsappRequestApi } from '../../api/whatsappRequestApi';
import { ApiClientError } from '@src/api/client';
import { whatsappRequestQueryKeys } from './useWhatsAppRequestKeys';

export const useGetPendingRequests = (
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: whatsappRequestQueryKeys.byStatus('PENDING'),
    queryFn: () => whatsappRequestApi.getRequests({ status: 'PENDING', limit: 50 }),
    staleTime: 15 * 1000,
    refetchInterval: 30 * 1000,
    // Polling pauses when the screen is backgrounded — perf audit.
    refetchIntervalInBackground: false,
    ...options,
  });
};
