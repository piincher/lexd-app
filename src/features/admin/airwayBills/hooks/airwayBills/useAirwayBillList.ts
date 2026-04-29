import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { airwayBillService } from '../../services/AirwayBillService';
import { AirwayBillFilters } from '../../types';
import { ApiClientError } from '@src/api/client';
import { airwayBillQueryKeys } from './queryKeys';

type AirwayBillListResponse = Awaited<ReturnType<typeof airwayBillService.getAll>>;

export const useGetAllAirwayBills = (
  filters?: AirwayBillFilters,
  options?: UseQueryOptions<AirwayBillListResponse, ApiClientError>
) => {
  return useQuery({
    queryKey: airwayBillQueryKeys.list(filters),
    queryFn: () => airwayBillService.getAll(filters),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
