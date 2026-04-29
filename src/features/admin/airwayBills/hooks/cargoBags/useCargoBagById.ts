import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { cargoBagService } from '../../services/CargoBagService';
import { ApiClientError } from '@src/api/client';
import { cargoBagQueryKeys } from './queryKeys';

type CargoBagDetailQueryResponse = Awaited<ReturnType<typeof cargoBagService.getById>>;

export const useGetCargoBagById = (
  id: string | undefined,
  options?: UseQueryOptions<CargoBagDetailQueryResponse, ApiClientError>
) => {
  return useQuery({
    queryKey: cargoBagQueryKeys.detail(id || ''),
    queryFn: () => cargoBagService.getById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
