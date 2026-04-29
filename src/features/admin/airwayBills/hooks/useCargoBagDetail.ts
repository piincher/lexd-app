import { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';
import {
  useGetCargoBagById,
  useGetCargoBagWaypoints,
  useRemoveGoodsFromCargoBag,
  useUpdateCargoBagStatus,
  useDeleteCargoBag,
} from './useCargoBags';
import { AirwayBillGoods, CargoBagStatus } from '../types';
import { CARGO_BAG_STATUS_LABELS } from '../constants';

export const useCargoBagDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CargoBagDetail'>>();
  const { cargoBagId, airwayBillId } = route.params;
  const { data, isLoading, isFetching, refetch } = useGetCargoBagById(cargoBagId);
  const { data: waypointData, refetch: refetchWaypoints } = useGetCargoBagWaypoints(cargoBagId);
  const removeGoodsMutation = useRemoveGoodsFromCargoBag();
  const updateStatusMutation = useUpdateCargoBagStatus();
  const deleteCargoBagMutation = useDeleteCargoBag();
  const [statusMenuVisible, setStatusMenuVisible] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);
  const [selectedRemoveIds, setSelectedRemoveIds] = useState<string[]>([]);
  const cargoBag = data?.data?.cargoBag;
  const waypointPayload = waypointData?.data;
  const goodsList = useMemo(() => (cargoBag?.goodsIds || []).filter((g): g is AirwayBillGoods => typeof g !== 'string'), [cargoBag]);
  const isRefreshing = isFetching && !isLoading;
  const handleBack = useCallback(() => navigation.goBack(), [navigation]);
  const handleRefresh = useCallback(() => { refetch(); refetchWaypoints(); }, [refetch, refetchWaypoints]);
  const handleChangeStatus = useCallback(async (newStatus: CargoBagStatus) => {
    setStatusMenuVisible(false);
    try { await updateStatusMutation.mutateAsync({ id: cargoBagId, status: newStatus, awbId: airwayBillId }); }
    catch { Alert.alert('Erreur', 'Impossible de mettre à jour le statut du sac'); }
  }, [cargoBagId, airwayBillId, updateStatusMutation]);
  const handleToggleRemoveMode = useCallback(() => { setRemoveMode(p => !p); setSelectedRemoveIds([]); }, []);
  const handleToggleRemoveSelection = useCallback((goodsId: string) => {
    setSelectedRemoveIds(prev => prev.includes(goodsId) ? prev.filter(id => id !== goodsId) : [...prev, goodsId]);
  }, []);
  const handleConfirmRemove = useCallback(() => {
    if (!selectedRemoveIds.length) { Alert.alert('Erreur', 'Veuillez sélectionner au moins une marchandise'); return; }
    Alert.alert('Confirmer le retrait', `Retirer ${selectedRemoveIds.length} marchandise(s) de ce sac ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Retirer', style: 'destructive', onPress: async () => {
        try { for (const goodsId of selectedRemoveIds) { await removeGoodsMutation.mutateAsync({ id: cargoBagId, goodsId, awbId: airwayBillId }); } setRemoveMode(false); setSelectedRemoveIds([]); }
        catch { Alert.alert('Erreur', 'Impossible de retirer certaines marchandises'); }
      }},
    ]);
  }, [selectedRemoveIds, cargoBagId, airwayBillId, removeGoodsMutation]);
  const handleAddGoods = useCallback(() => { navigation.navigate('AssignAirwayGoods', { airwayBillId, cargoBagId }); }, [navigation, airwayBillId, cargoBagId]);
  const handleDeleteBag = useCallback(() => {
    Alert.alert('Supprimer le sac', 'Supprimer définitivement ce sac cargo ? Cette action est possible uniquement si le sac est vide et encore emballé.', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: async () => {
        try { await deleteCargoBagMutation.mutateAsync({ id: cargoBagId, awbId: airwayBillId }); navigation.goBack(); }
        catch { Alert.alert('Erreur', 'Impossible de supprimer ce sac. Vérifiez qu\'il est vide et encore emballé.'); }
      }},
    ]);
  }, [cargoBagId, airwayBillId, deleteCargoBagMutation, navigation]);
  return {
    cargoBag, waypointPayload, goodsList, isLoading, isRefreshing, handleRefresh, handleBack,
    statusMenuVisible, setStatusMenuVisible, statusLabels: CARGO_BAG_STATUS_LABELS,
    handleChangeStatus, removeMode, selectedRemoveIds, handleToggleRemoveMode,
    handleToggleRemoveSelection, handleConfirmRemove, handleAddGoods, handleDeleteBag,
    isRemoving: removeGoodsMutation.isPending,
    isUpdatingStatus: updateStatusMutation.isPending || deleteCargoBagMutation.isPending,
  };
};
