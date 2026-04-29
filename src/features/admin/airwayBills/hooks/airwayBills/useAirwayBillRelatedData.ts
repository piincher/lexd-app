import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { airwayBillService } from '../../services/AirwayBillService';
import { AirwayBillConsignee } from '../../types';
import { ApiClientError } from '@src/api/client';
import { airwayBillQueryKeys } from './queryKeys';

type UnassignedAirGoodsResponse = Awaited<ReturnType<typeof airwayBillService.getUnassignedGoods>>;
type AirCargoRoutesResponse = Awaited<ReturnType<typeof airwayBillService.getRouteOptions>>;

export const useGetUnassignedAirGoods = (
  options?: UseQueryOptions<UnassignedAirGoodsResponse, ApiClientError>
) => {
  return useQuery({
    queryKey: airwayBillQueryKeys.unassignedGoods(),
    queryFn: () => airwayBillService.getUnassignedGoods(),
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useSearchAirwayBillConsignees = (search: string) => {
  return useQuery<AirwayBillConsignee[], ApiClientError>({
    queryKey: airwayBillQueryKeys.consignees(search),
    queryFn: async () => {
      const response = await airwayBillService.searchConsignees(search);
      const data = response.data;
      return Array.isArray(data) ? data : data?.consignees || [];
    },
    staleTime: 2 * 60 * 1000,
  });
};

export const useGetAirCargoRouteOptions = (
  options?: UseQueryOptions<AirCargoRoutesResponse, ApiClientError>
) => {
  return useQuery({
    queryKey: airwayBillQueryKeys.routes(),
    queryFn: () => airwayBillService.getRouteOptions(),
    staleTime: 30 * 60 * 1000,
    ...options,
  });
};
