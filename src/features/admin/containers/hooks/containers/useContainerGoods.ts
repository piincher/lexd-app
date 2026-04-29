/**
 * Container Goods & Packing List Hooks
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { containerService } from '../../services/ContainerService';
import { ApiClientError } from '../../api';
import { containerQueryKeys } from './containerQueryKeys';

export const useGetUnassignedGoods = (
  shippingMode?: string,
  options?: UseQueryOptions<any, ApiClientError>
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
  options?: UseQueryOptions<any, ApiClientError>
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
  options?: UseQueryOptions<any, ApiClientError>
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
