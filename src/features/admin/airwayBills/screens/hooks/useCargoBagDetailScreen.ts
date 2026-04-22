import { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';
import { useGetCargoBagById, useRemoveGoodsFromCargoBag, useUpdateCargoBagStatus } from '../../hooks/useCargoBags';
import { CargoBagStatus } from '../../types';

const STATUS_LABELS: Record<CargoBagStatus, string> = {
  PACKED: 'Emballé',
  CHECKED_IN: 'Enregistré',
  LOADED: 'Chargé',
  IN_TRANSIT: 'En transit',
  ARRIVED: 'Arrivé',
  CLEARED: 'Dédouané',
};

export const useCargoBagDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CargoBagDetail'>>();
  const { cargoBagId, airwayBillId } = route.params;

  const { data, isLoading, isFetching, refetch } = useGetCargoBagById(cargoBagId);
  const removeGoodsMutation = useRemoveGoodsFromCargoBag();
  const updateStatusMutation = useUpdateCargoBagStatus();

  const [statusMenuVisible, setStatusMenuVisible] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);
  const [selectedRemoveIds, setSelectedRemoveIds] = useState<string[]>([]);

  const cargoBag = data?.data?.cargoBag;
  const goodsList = useMemo(() => cargoBag?.goodsIds || [], [cargoBag]);
  const isRefreshing = isFetching && !isLoading;

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleChangeStatus = useCallback(
    async (newStatus: CargoBagStatus) => {
      setStatusMenuVisible(false);
      try {
        await updateStatusMutation.mutateAsync({ id: cargoBagId, status: newStatus });
      } catch {
        Alert.alert('Erreur', 'Impossible de mettre à jour le statut du sac');
      }
    },
    [cargoBagId, updateStatusMutation]
  );

  const handleToggleRemoveMode = useCallback(() => {
    setRemoveMode((prev) => !prev);
    setSelectedRemoveIds([]);
  }, []);

  const handleToggleRemoveSelection = useCallback((goodsId: string) => {
    setSelectedRemoveIds((prev) =>
      prev.includes(goodsId) ? prev.filter((id) => id !== goodsId) : [...prev, goodsId]
    );
  }, []);

  const handleConfirmRemove = useCallback(() => {
    if (selectedRemoveIds.length === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner au moins une marchandise');
      return;
    }
    Alert.alert(
      'Confirmer le retrait',
      `Retirer ${selectedRemoveIds.length} marchandise(s) de ce sac ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Retirer',
          style: 'destructive',
          onPress: async () => {
            try {
              for (const goodsId of selectedRemoveIds) {
                await removeGoodsMutation.mutateAsync({ id: cargoBagId, goodsId, awbId: airwayBillId });
              }
              setRemoveMode(false);
              setSelectedRemoveIds([]);
            } catch {
              Alert.alert('Erreur', 'Impossible de retirer certaines marchandises');
            }
          },
        },
      ]
    );
  }, [selectedRemoveIds, cargoBagId, removeGoodsMutation]);

  const handleAddGoods = useCallback(() => {
    navigation.navigate('AssignAirwayGoods', { airwayBillId });
  }, [navigation, airwayBillId]);

  const handleDeleteBag = useCallback(() => {
    Alert.alert('Info', 'Utilisez l\'écran AWB pour supprimer un sac vide');
  }, []);

  return {
    cargoBag,
    goodsList,
    isLoading,
    isRefreshing,
    handleRefresh,
    handleBack,
    statusMenuVisible,
    setStatusMenuVisible,
    statusLabels: STATUS_LABELS,
    handleChangeStatus,
    removeMode,
    selectedRemoveIds,
    handleToggleRemoveMode,
    handleToggleRemoveSelection,
    handleConfirmRemove,
    handleAddGoods,
    handleDeleteBag,
    isRemoving: removeGoodsMutation.isPending,
    isUpdatingStatus: updateStatusMutation.isPending,
  };
};
