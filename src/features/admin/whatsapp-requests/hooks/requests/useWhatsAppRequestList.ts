import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { whatsappRequestApi, WhatsAppRequestFilters } from '../../api/whatsappRequestApi';
import { ApiClientError } from '@src/api/client';
import { whatsappRequestQueryKeys } from './useWhatsAppRequestKeys';

export const useGetWhatsAppRequests = (
  filters?: WhatsAppRequestFilters,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: whatsappRequestQueryKeys.list(filters),
    queryFn: () => whatsappRequestApi.getRequests(filters),
    staleTime: 30 * 1000,
    ...options,
  });
};
