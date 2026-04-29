import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { airwayBillService } from '../../services/AirwayBillService';
import { ApiClientError } from '@src/api/client';
import { airwayBillQueryKeys } from './queryKeys';

type AirwayBillDetailResponse = Awaited<ReturnType<typeof airwayBillService.getById>>;

export const useGetAirwayBillById = (
  id: string | undefined,
  options?: UseQueryOptions<AirwayBillDetailResponse, ApiClientError>
) => {
  return useQuery({
    queryKey: airwayBillQueryKeys.detail(id || ''),
    queryFn: () => airwayBillService.getById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
