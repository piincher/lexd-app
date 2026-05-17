import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useUpdateGoodsStatus, useVoidGoods } from '../../../hooks';
import { useAssignGoodsToContainer } from '../../../hooks/useGoods';
import { runBatch } from './utils';

export const useGoodsBulkMutations = (
  selectedGoodsIds: string[],
  exitSelectionMode: () => void,
  onRefresh?: () => Promise<void>,
) => {
  const [containerPickerVisible, setContainerPickerVisible] = useState(false);
  const [statusPickerVisible, setStatusPickerVisible] = useState(false);

  const { mutate: assignToContainer, isPending: isAssigning } = useAssignGoodsToContainer();
  const { mutate: updateGoodsStatus, isPending: isUpdatingStatus } = useUpdateGoodsStatus();
  const { mutate: voidGoods, isPending: isVoiding } = useVoidGoods();
  const isBulkPending = isAssigning || isUpdatingStatus || isVoiding;

  const handleAssignContainer = useCallback((containerId: string) => {
    assignToContainer(
      { containerId, goodsIds: selectedGoodsIds },
      {
        onSuccess: () => { exitSelectionMode(); onRefresh?.(); },
        onError: (err: any) => Alert.alert('Erreur', err?.message || 'Failed to assign goods'),
      },
    );
  }, [assignToContainer, selectedGoodsIds, exitSelectionMode, onRefresh]);

  const handleChangeStatus = useCallback((status: string) => {
    runBatch(selectedGoodsIds, (id, callbacks) => updateGoodsStatus({ id, status }, callbacks), (errors) => {
      if (errors > 0) Alert.alert('Erreur', `${errors} mise(s) à jour ont échoué`);
      exitSelectionMode();
      onRefresh?.();
    });
  }, [selectedGoodsIds, updateGoodsStatus, exitSelectionMode, onRefresh]);

  const handleVoidGoods = useCallback(() => {
    Alert.alert('Annuler les marchandises', `Annuler ${selectedGoodsIds.length} marchandise(s) sélectionnée(s) ?`, [
      { text: 'Retour', style: 'cancel' },
      {
        text: 'Confirmer',
        style: 'destructive',
        onPress: () => {
          runBatch(selectedGoodsIds, (id, callbacks) => voidGoods({ id, reason: 'BULK_VOID' }, callbacks), (errors) => {
            if (errors > 0) Alert.alert('Erreur', `${errors} annulation(s) ont échoué`);
            exitSelectionMode();
            onRefresh?.();
          });
        },
      },
    ]);
  }, [selectedGoodsIds, voidGoods, exitSelectionMode, onRefresh]);

  return {
    containerPickerVisible,
    setContainerPickerVisible,
    statusPickerVisible,
    setStatusPickerVisible,
    isBulkPending,
    handleAssignContainer,
    handleChangeStatus,
    handleVoidGoods,
  };
};
