import { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useGetUnassignedGoods, containerQueryKeys } from '../../../hooks';
import { Goods } from '../../../../goods/types';
import { useAssignGoodsContainer } from './useAssignGoodsContainer';
import { useAssignGoodsFilter } from './useAssignGoodsFilter';
import { useAssignGoodsSelection } from './useAssignGoodsSelection';
import { useAssignGoodsMutation } from './useAssignGoodsMutation';
import type { UseAssignGoodsScreenReturn, NavigationProp } from './useAssignGoodsScreen.types';

export const useAssignGoodsScreen = (): UseAssignGoodsScreenReturn => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  const { containerId } = route.params as { containerId: string };
  const [searchQuery, setSearchQuery] = useState('');

  const {
    container,
    isLoadingContainer,
    containerError,
    isAirContainer,
    containerStatus,
    isAssignable,
    maxCapacity,
    currentContainerCBM,
  } = useAssignGoodsContainer(containerId);

  const {
    data: unassignedGoodsData,
    isLoading: isLoadingGoods,
    isRefetching,
    refetch,
    error: goodsError,
  } = useGetUnassignedGoods(container?.shippingMode);

  const unassignedGoods: Goods[] =
    unassignedGoodsData?.data?.goods || unassignedGoodsData?.data || [];

  const { filteredGoods } = useAssignGoodsFilter(unassignedGoods, container, searchQuery);

  const {
    selectedGoods,
    totalSelectedCBM,
    isOverCapacity,
    toggleSelection,
    toggleSelectAll,
  } = useAssignGoodsSelection(filteredGoods, unassignedGoods, isAirContainer, currentContainerCBM, maxCapacity);

  const { assignMutation, handleAssign } = useAssignGoodsMutation(
    containerId,
    selectedGoods,
    isAssignable,
    isOverCapacity,
    containerStatus,
    navigation,
  );

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: containerQueryKeys.unassignedGoods() });
    await refetch();
  };

  return {
    containerId,
    container,
    unassignedGoods,
    selectedGoods,
    searchQuery,
    isLoading: isLoadingContainer || isLoadingGoods,
    isRefetching,
    error: containerError || goodsError,
    isAssignable,
    filteredGoods,
    currentContainerCBM,
    totalSelectedCBM,
    isOverCapacity,
    isAirContainer,
    maxCapacity,
    assignMutation,
    toggleSelection,
    toggleSelectAll,
    handleAssign,
    handleRefresh,
    setSearchQuery,
    navigation,
  };
};
