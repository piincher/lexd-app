/**
 * Container Goods & Packing List Hooks
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { containerService } from '../../services/ContainerService';
import { ApiClientError } from '../../api';
import { containerQueryKeys } from './containerQueryKeys';

type UnassignedGoodsResponse = Awaited<ReturnType<typeof containerService.getUnassignedGoods>>;
type ClientAllocationsResponse = Awaited<ReturnType<typeof containerService.getClientAllocations>>;
type PackingListResponse = Awaited<ReturnType<typeof containerService.generatePackingList>>;
type QueryOptions<TData> = Omit<
  UseQueryOptions<TData, ApiClientError, TData, readonly unknown[]>,
  'queryKey' | 'queryFn'
>;

export const useGetUnassignedGoods = (
  shippingMode?: string,
  options?: QueryOptions<UnassignedGoodsResponse>
) => {
  return useQuery({
    queryKey: containerQueryKeys.unassignedGoods(shippingMode),
    queryFn: () => containerService.getUnassignedGoods(shippingMode),
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useGetClientAllocations = (
  containerId: string | undefined,
  options?: QueryOptions<ClientAllocationsResponse>
) => {
  return useQuery({
    queryKey: [
      ...containerQueryKeys.detail(containerId || ''),
      'client-allocations',
    ],
    queryFn: () => containerService.getClientAllocations(containerId!),
    enabled: !!containerId,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useGetPackingList = (
  containerId: string | undefined,
  options?: QueryOptions<PackingListResponse>
) => {
  return useQuery({
    queryKey: containerQueryKeys.packingList(containerId || ''),
    queryFn: () => containerService.generatePackingList(containerId!),
    enabled: !!containerId,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

export const useReconcileContainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      containerId,
      agentCBM,
      agentUnitCost,
    }: {
      containerId: string;
      agentCBM: number;
      agentUnitCost?: number;
    }) =>
      containerService.reconcileContainer(
        containerId,
        agentCBM,
        agentUnitCost
      ),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.detail(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.lists(),
      });
    },
  });
};
