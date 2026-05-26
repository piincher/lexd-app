import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useUpdateGoodsStatus, useVoidGoods } from '../../../hooks';
import { useAssignGoodsToContainer, useBatchHardDeleteGoods } from '../../../hooks/useGoods';
import { runBatch } from './utils';

// Mirror of BULK_HARD_DELETE_MAX in GoodsController.js — reject before the request so the
// user sees a clear message instead of a 400 response.
const BULK_HARD_DELETE_MAX = 500;

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
  const { mutate: batchHardDelete, isPending: isHardDeleting } = useBatchHardDeleteGoods();
  const isBulkPending = isAssigning || isUpdatingStatus || isVoiding || isHardDeleting;

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

  // Permanent removal. Two-step confirm because the action is irreversible and cascades:
  // the backend resyncs orders/invoices/payments/containers/AWBs in one transaction.
  const handleHardDeleteGoods = useCallback(() => {
    const count = selectedGoodsIds.length;
    if (count === 0) return;

    if (count > BULK_HARD_DELETE_MAX) {
      Alert.alert(
        'Sélection trop large',
        `La suppression définitive est limitée à ${BULK_HARD_DELETE_MAX} marchandises par opération. Vous en avez sélectionné ${count}. Réduisez votre sélection.`,
      );
      return;
    }

    Alert.alert(
      'Supprimer définitivement',
      `Vous allez supprimer ${count} marchandise(s) de façon permanente.\n\n` +
        'Cette action est irréversible. Les commandes, factures, paiements et conteneurs liés seront mis à jour automatiquement.\n\n' +
        'Continuer ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer définitivement',
          style: 'destructive',
          onPress: () => {
            batchHardDelete(
              { goodsIds: selectedGoodsIds, reason: 'BULK_ADMIN_HARD_DELETE' },
              {
                onSuccess: (result: any) => {
                  const data = result?.data ?? result;
                  const deletedCount = data?.deletedCount ?? count;
                  const cleanup = data?.cleanup;
                  const detail = cleanup
                    ? `\n\nNettoyage :\n• ${cleanup.containers || 0} conteneur(s)\n• ${cleanup.airwayBills || 0} lettre(s) de transport\n• ${cleanup.orders || 0} commande(s)\n• ${cleanup.invoices || 0} facture(s)\n• ${cleanup.payments || 0} paiement(s)`
                    : '';
                  Alert.alert('Suppression réussie', `${deletedCount} marchandise(s) supprimée(s) définitivement.${detail}`);
                  exitSelectionMode();
                  onRefresh?.();
                },
                onError: (err: any) => {
                  Alert.alert('Erreur', err?.response?.data?.message || err?.message || 'La suppression a échoué');
                },
              },
            );
          },
        },
      ],
    );
  }, [selectedGoodsIds, batchHardDelete, exitSelectionMode, onRefresh]);

  return {
    containerPickerVisible,
    setContainerPickerVisible,
    statusPickerVisible,
    setStatusPickerVisible,
    isBulkPending,
    handleAssignContainer,
    handleChangeStatus,
    handleVoidGoods,
    handleHardDeleteGoods,
  };
};
