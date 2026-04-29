import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { cargoBagService } from '../../services/CargoBagService';
import { ApiClientError } from '@src/api/client';
import { cargoBagQueryKeys } from './queryKeys';

type CargoBagListQueryResponse = Awaited<ReturnType<typeof cargoBagService.getAll>>;

export const useGetCargoBagsByAwb = (
  awbId: string | undefined,
  options?: UseQueryOptions<CargoBagListQueryResponse, ApiClientError>
) => {
  return useQuery({
    queryKey: cargoBagQueryKeys.list(awbId),
    queryFn: () => cargoBagService.getAll(awbId),
    enabled: !!awbId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
