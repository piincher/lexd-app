/**
 * Shared AirwayBill Hooks
 * Cross-feature airway bill hooks using direct API calls
 * to maintain cache compatibility with feature-local hooks
 */

import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { apiClientV2, apiRequest } from '@src/api/client';
import { ApiClientError } from '@src/api/client';

const BASE_URL = '/airway-bills';

export const airwayBillQueryKeys = {
  all: ['airwayBills'] as const,
  lists: () => [...airwayBillQueryKeys.all, 'list'] as const,
  list: (filters: any | undefined) =>
    [...airwayBillQueryKeys.lists(), filters] as const,
  details: () => [...airwayBillQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...airwayBillQueryKeys.details(), id] as const,
  unassignedGoods: () => [...airwayBillQueryKeys.all, 'unassigned-goods'] as const,
};

export const useGetAllAirwayBills = (
  filters?: any,
  options?: UseQueryOptions<any, ApiClientError>
) => {
  return useQuery({
    queryKey: airwayBillQueryKeys.list(filters),
    queryFn: () => apiRequest.get(apiClientV2, BASE_URL, { params: filters }),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useAssignGoodsToAirwayBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: { goodsIds: string[] } }) =>
      apiRequest.post(apiClientV2, `${BASE_URL}/${id}/goods`, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.unassignedGoods() });
    },
  });
};

export const useRemoveGoodsFromAirwayBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, goodsId }: { id: string; goodsId: string }) =>
      apiRequest.delete(apiClientV2, `${BASE_URL}/${id}/goods/${goodsId}`),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.unassignedGoods() });
    },
  });
};
