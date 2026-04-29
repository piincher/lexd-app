import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { whatsappRequestApi } from '../../api/whatsappRequestApi';
import { ApiClientError } from '@src/api/client';
import { whatsappRequestQueryKeys } from './useWhatsAppRequestKeys';

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
