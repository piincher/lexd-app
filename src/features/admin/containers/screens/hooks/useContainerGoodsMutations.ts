import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Goods } from '../../../goods/types';
import { useRemoveGoodsFromContainer, useDeleteContainer, useReconcileContainer } from '../../hooks';
import { ContainerDialogsState } from './useContainerDialogs';

export const useContainerGoodsMutations = (
  containerId: string,
  goodsList: Goods[],
  dialogs: ContainerDialogsState,
) => {
  const navigation = useNavigation();
  const removeGoods = useRemoveGoodsFromContainer();
  const deleteContainer = useDeleteContainer();
  const reconcile = useReconcileContainer();

  const confirmRemoveGoods = useCallback(async () => {
    if (!dialogs.selectedGoodsId) return;
    try {
      await removeGoods.mutateAsync({ containerId, goodsId: dialogs.selectedGoodsId });
      dialogs.setShowRemoveGoodsDialog(false);
      dialogs.setSelectedGoodsId(null);
      Alert.alert('Succès', 'Marchandise retirée');
    } catch {
      Alert.alert('Erreur', 'Impossible de retirer la marchandise');
    }
  }, [containerId, dialogs, removeGoods]);

  const handleDeleteContainer = useCallback(() => {
    if (goodsList.length > 0) { Alert.alert('Impossible', 'Veuillez d\'abord retirer toutes les marchandises.'); return; }
    dialogs.setShowDeleteDialog(true);
  }, [goodsList, dialogs]);

  const confirmDeleteContainer = useCallback(async () => {
    try {
      await deleteContainer.mutateAsync(containerId);
      dialogs.setShowDeleteDialog(false);
      navigation.navigate('ContainerList' as never);
    } catch (error: any) {
      Alert.alert('Impossible de supprimer', error?.response?.data?.message || error?.message || 'Une erreur est survenue');
    }
  }, [containerId, dialogs, deleteContainer, navigation]);

  const handleReconcile = useCallback(async (agentCBM: number, agentUnitCost?: number) => {
    try {
      await reconcile.mutateAsync({ containerId, agentCBM, agentUnitCost });
      dialogs.setShowReconcileModal(false);
      Alert.alert('Succès', 'Container réconcilié avec succès');
    } catch (error: any) {
      Alert.alert('Erreur', error?.response?.data?.message || 'Impossible de réconcilier le container');
    }
  }, [containerId, dialogs, reconcile]);

  return {
    removeGoodsMutation: removeGoods,
    deleteContainerMutation: deleteContainer,
    reconcileMutation: reconcile,
    confirmRemoveGoods,
    handleDeleteContainer,
    confirmDeleteContainer,
    handleReconcile,
  };
};
