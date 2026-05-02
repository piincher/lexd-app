import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { cargoBagService } from '../../services/CargoBagService';
import { ApiClientError } from '@src/api/client';
import { cargoBagQueryKeys } from './queryKeys';

type CargoBagListQueryResponse = Awaited<ReturnType<typeof cargoBagService.getAll>>;
type CargoBagEligibleGoodsQueryResponse = Awaited<ReturnType<typeof cargoBagService.getEligibleGoods>>;

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

export const useGetCargoBagEligibleGoods = (
  cargoBagId: string | null | undefined,
  options?: UseQueryOptions<CargoBagEligibleGoodsQueryResponse, ApiClientError>
) => {
  return useQuery({
    queryKey: cargoBagQueryKeys.eligibleGoods(cargoBagId || ''),
    queryFn: () => cargoBagService.getEligibleGoods(cargoBagId!),
    enabled: !!cargoBagId,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};
