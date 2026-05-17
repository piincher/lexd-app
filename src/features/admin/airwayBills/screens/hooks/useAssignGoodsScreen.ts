import { useState, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@src/navigations/type';
import { useAssignGoodsData } from './useAssignGoodsData';
import { useGoodsSelection } from './useGoodsSelection';
import { useAssignGoodsActions } from './useAssignGoodsActions';

export const useAssignGoodsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'AssignAirwayGoods'>>();
  const { cargoBagId } = route.params;

  const [selectedBagId, setSelectedBagId] = useState<string | null>(cargoBagId || null);

  const {
    airwayBillId,
    airwayBill,
    goodsList,
    cargoBags,
    isLoading,
    isLoadingBags,
    capacityWeight,
    currentTotalWeight,
  } = useAssignGoodsData(selectedBagId);

  const {
    selectedIds,
    createBagVisible,
    setCreateBagVisible,
    totalSelectedWeight,
    toggleSelection,
    clearSelection,
  } = useGoodsSelection(goodsList);

  const isOverCapacity = capacityWeight > 0 && currentTotalWeight + totalSelectedWeight > capacityWeight;

  const handleSelectBag = useCallback((bagId: string | null) => {
    setSelectedBagId(bagId);
    clearSelection();
  }, [clearSelection]);

  const { handleAssign, handleCreateBag, assignMutation, assignToBagMutation, createBagMutation } =
    useAssignGoodsActions(airwayBillId);

  const handleCreateBagWithState = useCallback(async (notes: string) => {
    await handleCreateBag(notes, (newBagId) => {
      setSelectedBagId(newBagId);
      setCreateBagVisible(false);
    });
  }, [handleCreateBag, setCreateBagVisible]);

  return {
    navigation,
    airwayBillId,
    airwayBill,
    goodsList,
    cargoBags,
    isLoading,
    isLoadingBags,
    selectedIds,
    selectedBagId,
    setSelectedBagId: handleSelectBag,
    totalSelectedWeight,
    isOverCapacity,
    capacityWeight,
    currentTotalWeight,
    toggleSelection,
    handleAssign: () => handleAssign(selectedIds, selectedBagId),
    assignMutation,
    assignToBagMutation,
    createBagVisible,
    setCreateBagVisible,
    handleCreateBag: handleCreateBagWithState,
    createBagMutation,
  };
};
