import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { whatsappRequestApi } from '../../api/whatsappRequestApi';
import { ApiClientError } from '@src/api/client';
import { whatsappRequestQueryKeys } from './useWhatsAppRequestKeys';

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
