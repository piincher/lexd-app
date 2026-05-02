import { useState, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@src/navigations/type';
import { useGetAirwayBillById, useGetUnassignedAirGoods, useAssignGoodsToAirwayBill } from '../../hooks/useAirwayBills';
import {
  useGetCargoBagsByAwb,
  useGetCargoBagEligibleGoods,
  useCreateCargoBag,
  useAddGoodsToCargoBag,
} from '../../hooks/useCargoBags';
import type { AirwayBillGoods } from '../../types';

interface AssignmentFailure {
  goodsId?: string;
  error?: string;
}

export const useAssignGoodsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'AssignAirwayGoods'>>();
  const { airwayBillId, cargoBagId } = route.params;

  const { data: airwayBillData, isLoading: isLoadingAwb } = useGetAirwayBillById(airwayBillId);
  const { data: goodsData, isLoading: isLoadingUnassigned } = useGetUnassignedAirGoods();
  const { data: cargoBagsData, isLoading: isLoadingBags } = useGetCargoBagsByAwb(airwayBillId);
  const assignMutation = useAssignGoodsToAirwayBill();
  const assignToBagMutation = useAddGoodsToCargoBag();
  const createBagMutation = useCreateCargoBag();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedBagId, setSelectedBagId] = useState<string | null>(cargoBagId || null);
  const [createBagVisible, setCreateBagVisible] = useState(false);
  const { data: eligibleGoodsData, isLoading: isLoadingEligibleGoods } =
    useGetCargoBagEligibleGoods(selectedBagId);

  const airwayBill = airwayBillData?.data?.airwayBill;
  const unassignedGoodsList = useMemo(() => goodsData?.data?.goods || [], [goodsData]);
  const cargoBags = cargoBagsData?.data?.cargoBags || [];
  const capacityWeight = airwayBill?.capacityWeight || 0;
  const currentTotalWeight = airwayBill?.totalWeight || 0;

  const goodsList: AirwayBillGoods[] = useMemo(() => {
    if (selectedBagId) {
      return eligibleGoodsData?.data?.goods || [];
    }
    return unassignedGoodsList;
  }, [selectedBagId, eligibleGoodsData, unassignedGoodsList]);

  const isLoading = selectedBagId ? isLoadingEligibleGoods || isLoadingAwb : isLoadingUnassigned;

  const totalSelectedWeight = useMemo(() => {
    return goodsList.filter((g) => selectedIds.includes(g._id)).reduce((sum, g) => sum + (g.weight || 0), 0);
  }, [selectedIds, goodsList]);

  const isOverCapacity = capacityWeight > 0 && currentTotalWeight + totalSelectedWeight > capacityWeight;

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }, []);

  // Clear selections when switching between AWB direct and bag assignment
  const handleSelectBag = useCallback((bagId: string | null) => {
    setSelectedBagId(bagId);
    setSelectedIds([]);
  }, []);

  const handleAssign = async () => {
    if (selectedIds.length === 0) { Alert.alert('Erreur', 'Veuillez sélectionner au moins une marchandise'); return; }
    if (selectedBagId) {
      try {
        const response = await assignToBagMutation.mutateAsync({ id: selectedBagId, input: { goodsIds: selectedIds }, awbId: airwayBillId });
        const payload = response as { data?: { results?: { failed?: AssignmentFailure[]; success?: string[] } } };
        const failed = payload?.data?.results?.failed || [];
        const successCount = payload?.data?.results?.success?.length || 0;

        if (successCount === 0) {
          const errorMessage = failed.map((f) => f.error).filter(Boolean).join('\n');
          Alert.alert('Erreur', errorMessage || 'Aucune marchandise n\'a pu être assignée au sac');
          return;
        }

        if (failed.length > 0) {
          const errorMessage = failed.map((f) => f.error).filter(Boolean).join('\n');
          Alert.alert(
            'Assignation partielle',
            `${successCount} marchandise(s) assignée(s).\n${failed.length} échec(s):\n${errorMessage}`
          );
        } else {
          Alert.alert('Succès', `${successCount} marchandise(s) assignée(s) au sac`);
        }
        navigation.goBack();
      } catch (error: unknown) {
        Alert.alert('Erreur', error instanceof Error ? error.message : 'Échec de l\'assignation au sac');
      }
    } else {
      try {
        await assignMutation.mutateAsync({ id: airwayBillId, input: { goodsIds: selectedIds } });
        Alert.alert('Succès', `${selectedIds.length} marchandise(s) assignée(s)`);
        navigation.goBack();
      } catch (error: unknown) {
        Alert.alert('Erreur', error instanceof Error ? error.message : 'Échec de l\'assignation');
      }
    }
  };

  const handleCreateBag = async (notes: string) => {
    try {
      const result = await createBagMutation.mutateAsync({ awbId: airwayBillId, notes });
      const newBagId = result?.data?.cargoBag?._id;
      if (newBagId) setSelectedBagId(newBagId);
      setCreateBagVisible(false);
    } catch {
      Alert.alert('Erreur', 'Impossible de créer le sac de cargo');
    }
  };

  return {
    navigation, airwayBillId, airwayBill, goodsList, cargoBags, isLoading, isLoadingBags,
    selectedIds, selectedBagId, setSelectedBagId: handleSelectBag, totalSelectedWeight, isOverCapacity,
    capacityWeight, currentTotalWeight, toggleSelection, handleAssign, assignMutation,
    assignToBagMutation, createBagVisible, setCreateBagVisible, handleCreateBag, createBagMutation,
  };
};
