import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRemoveGoodsFromContainer, useDeleteContainer, useReconcileContainer } from '../../hooks';
import { ContainerDialogsState } from './useContainerDialogs';

type MutationError = {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
};

const getMutationErrorMessage = (error: unknown, fallback: string): string => {
  if (!error || typeof error !== 'object') return fallback;
  const mutationError = error as MutationError;
  return mutationError.response?.data?.message || mutationError.message || fallback;
};

export const useContainerGoodsMutations = (
  containerId: string,
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
    dialogs.setShowDeleteDialog(true);
  }, [dialogs]);

  const confirmDeleteContainer = useCallback(async () => {
    try {
      const response = await deleteContainer.mutateAsync(containerId);
      const releasedGoodsCount = response.data?.releasedGoodsCount || 0;
      dialogs.setShowDeleteDialog(false);
      // Delay navigation to let the Dialog dismiss animation complete on Android
      setTimeout(() => {
        navigation.navigate('ContainerList' as never);
        Alert.alert(
          'Succès',
          releasedGoodsCount > 0
            ? `${releasedGoodsCount} marchandise(s) renvoyée(s) aux non assignées. Container supprimé.`
            : 'Container supprimé.'
        );
      }, 300);
    } catch (error: unknown) {
      dialogs.setShowDeleteDialog(false);
      Alert.alert(
        'Impossible de supprimer',
        getMutationErrorMessage(error, 'Une erreur est survenue')
      );
    }
  }, [containerId, dialogs, deleteContainer, navigation]);

  const handleReconcile = useCallback(async (agentCBM: number, agentUnitCost?: number) => {
    try {
      await reconcile.mutateAsync({ containerId, agentCBM, agentUnitCost });
      dialogs.setShowReconcileModal(false);
      Alert.alert('Succès', 'Container réconcilié avec succès');
    } catch (error: unknown) {
      Alert.alert(
        'Erreur',
        getMutationErrorMessage(error, 'Impossible de réconcilier le container')
      );
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
