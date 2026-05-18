import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useGetContainerById, containerQueryKeys } from '../../hooks';
import { waypointQueryKeys } from '../../hooks/useWaypoints';
import { Container } from '../../types';
import { useContainerDialogs } from './useContainerDialogs';
import { useContainerStatusMutations } from './useContainerStatusMutations';
import { useContainerGoodsMutations } from './useContainerGoodsMutations';
import { useContainerNavigation } from './useContainerNavigation';
import { getGoodsList, getCapacityInfo, getContainerStatusInfo, normalizeCbmProfit, extractConsignee } from './utils';

export type ContainerDetailScreenState = ReturnType<typeof useContainerDetailScreen>;

export const useContainerDetailScreen = () => {
  const route = useRoute();
  const queryClient = useQueryClient();
  const { containerId } = route.params as { containerId: string };
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dialogs = useContainerDialogs();

  const { data: containerResponse, isLoading, isRefetching, refetch, error: containerError } = useGetContainerById(containerId);
  const container: Container | undefined = containerResponse?.data?.container || containerResponse?.data;
  const goodsList = getGoodsList(container);
  const { isAirContainer, totalWeight, capacityValue, maxCapacity, fillPercentage, fillColor } = getCapacityInfo(container, goodsList);
  const { statusColor, statusLabel, currentStatusIndex } = getContainerStatusInfo(container);
  const cbmProfit = normalizeCbmProfit(containerResponse, goodsList);
  const consignee = extractConsignee(container);

  const status = useContainerStatusMutations(containerId, container, goodsList, capacityValue, maxCapacity, isAirContainer, totalWeight, dialogs);
  const goods = useContainerGoodsMutations(containerId, goodsList, dialogs);
  const nav = useContainerNavigation(containerId, goodsList);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: containerQueryKeys.detail(containerId) });
    await queryClient.invalidateQueries({ queryKey: waypointQueryKeys.list(containerId) });
    await refetch();
    setIsRefreshing(false);
  };

  const canMarkReadyForPickup = container?.status === 'ARRIVED' || container?.status === 'DISCHARGED';
  const canMarkDelivered = container?.status === 'READY_FOR_PICKUP';

  return {
    containerId,
    container,
    goodsList,
    cbmProfit,
    isLoading,
    isRefetching,
    isRefreshing,
    containerError,
    ...status,
    ...goods,
    ...nav,
    ...dialogs,
    fillPercentage,
    fillColor,
    statusColor,
    statusLabel,
    currentStatusIndex,
    isAirContainer,
    capacityValue,
    maxCapacity,
    canMarkReadyForPickup,
    canMarkDelivered,
    handleRefresh,
    consignee,
  };
};
