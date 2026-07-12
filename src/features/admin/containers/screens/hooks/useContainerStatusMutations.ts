import { useCallback } from 'react';
import { Alert } from 'react-native';
import { Container, ContainerStatus, CONTAINER_STATUS_LABELS } from '../../types';
import { Goods } from '../../../goods/types';
import { useUpdateContainerStatus, useMarkReadyForPickup, useMarkGoodsDelivered, useMarkContainerDelivered, useArchiveContainer, useUnarchiveContainer } from '../../hooks';
import { ContainerDialogsState } from './useContainerDialogs';
import { MAX_CBM, MAX_WEIGHT } from './utils';

const CAPACITY_CHECK_STATUSES: ContainerStatus[] = ['LOADED','GATE_IN_FULL','LOADED_ON_VESSEL','IN_TRANSIT','ARRIVED','DISCHARGED','READY_FOR_PICKUP'];

const getErrorMessage = (error: unknown, fallback: string) =>
  (error as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ||
  (error as Error)?.message ||
  fallback;
export const useContainerStatusMutations = (
  containerId: string, container: Container | undefined, goodsList: Goods[],
  capacityValue: number, maxCapacity: number, isAirContainer: boolean, totalWeight: number,
  dialogs: ContainerDialogsState,
) => {
  const updateStatus = useUpdateContainerStatus();
  const markReady = useMarkReadyForPickup();
  const markGoodsDelivered = useMarkGoodsDelivered();
  const markContainerDelivered = useMarkContainerDelivered();
  const archiveContainer = useArchiveContainer();
  const unarchiveContainer = useUnarchiveContainer();
  const handleUpdateStatus = useCallback(async (newStatus: ContainerStatus) => {
    dialogs.setStatusMenuVisible(false);
    if (newStatus === container?.status) return;
    const doUpdate = async () => { try { await updateStatus.mutateAsync({ id: containerId, data: { status: newStatus } }); Alert.alert('Succès', `Statut mis à jour: ${CONTAINER_STATUS_LABELS[newStatus]}`); } catch { Alert.alert('Erreur', 'Impossible de mettre à jour le statut'); } };
    const checkCapacity = () => { if (!CAPACITY_CHECK_STATUSES.includes(newStatus)) { doUpdate(); return; } if (goodsList.length === 0) { Alert.alert('Attention', 'Ce container est vide. Impossible de passer au statut ' + CONTAINER_STATUS_LABELS[newStatus] + '.'); return; } if (capacityValue > maxCapacity) { Alert.alert('Alerte Capacité', `${isAirContainer ? 'Poids' : 'CBM'} du container (${capacityValue.toFixed(1)}) dépasse le maximum (${maxCapacity}). Voulez-vous continuer ?`, [{ text: 'Annuler', style: 'cancel' }, { text: 'Continuer', style: 'destructive', onPress: doUpdate }]); return; } doUpdate(); };
    Alert.alert('Confirmer le changement de statut', `Passer le container de "${CONTAINER_STATUS_LABELS[container!.status]}" à "${CONTAINER_STATUS_LABELS[newStatus]}" ?`, [{ text: 'Annuler', style: 'cancel' }, { text: 'Confirmer', onPress: checkCapacity }]);
  }, [containerId, container, goodsList, capacityValue, maxCapacity, isAirContainer, dialogs, updateStatus]);

  const confirmMarkReadyForPickup = useCallback(async () => {
    const doMark = async () => { try { await markReady.mutateAsync(containerId); dialogs.setShowReadyForPickupDialog(false); Alert.alert('Succès', 'Container marqué comme prêt pour le retrait'); } catch { Alert.alert('Erreur', 'Impossible de marquer le container'); } };
    if (capacityValue > maxCapacity) { Alert.alert('Alerte Capacité', isAirContainer ? `Poids du container (${totalWeight.toFixed(1)}kg) dépasse le maximum (${MAX_WEIGHT}kg). Continuer quand même ?` : `CBM du container (${capacityValue.toFixed(1)}m³) dépasse le maximum (${MAX_CBM}m³). Continuer quand même ?`, [{ text: 'Annuler', style: 'cancel' }, { text: 'Continuer', style: 'destructive', onPress: doMark }]); return; }
    await doMark();
  }, [containerId, capacityValue, maxCapacity, isAirContainer, totalWeight, dialogs, markReady]);

  const confirmMarkDelivered = useCallback(async () => {
    const doMark = async () => { try { await markContainerDelivered.mutateAsync(containerId); dialogs.setShowDeliveredDialog(false); Alert.alert('Succès', 'Container marqué comme livré'); } catch (error: unknown) { Alert.alert('Erreur', getErrorMessage(error, 'Impossible de marquer le container comme livré')); } };
    if (goodsList.length === 0) { Alert.alert('Attention', 'Ce container est vide. Marquer un container vide comme livré est inhabituel. Continuer ?', [{ text: 'Annuler', style: 'cancel' }, { text: 'Continuer', style: 'destructive', onPress: doMark }]); return; }
    await doMark();
  }, [containerId, goodsList, dialogs, markContainerDelivered]);

  const handleMarkGoodsDelivered = useCallback((goodsId: string) => {
    Alert.alert('Confirmer la livraison', 'Marquer cette marchandise comme livrée ?', [{ text: 'Annuler', style: 'cancel' }, { text: 'Marquer Livré', onPress: async () => { try { await markGoodsDelivered.mutateAsync(goodsId); Alert.alert('Succès', 'Marchandise marquée comme livrée'); } catch { Alert.alert('Erreur', 'Impossible de marquer la marchandise'); } } }]);
  }, [markGoodsDelivered]);

  const confirmArchiveContainer = useCallback(async () => {
    Alert.alert(
      'Archiver le container',
      'Ce container livré sera retiré de la liste active et restera visible dans Archives. Continuer ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Archiver',
          style: 'destructive',
          onPress: async () => {
            try {
              await archiveContainer.mutateAsync(containerId);
              Alert.alert('Succès', 'Container archivé');
            } catch (error: unknown) {
              Alert.alert('Erreur', getErrorMessage(error, 'Impossible d\'archiver le container'));
            }
          },
        },
      ],
    );
  }, [containerId, archiveContainer]);

  const confirmUnarchiveContainer = useCallback(async () => {
    Alert.alert(
      'Désarchiver le container',
      'Ce container reviendra dans la liste active. Continuer ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Désarchiver',
          onPress: async () => {
            try {
              await unarchiveContainer.mutateAsync(containerId);
              Alert.alert('Succès', 'Container désarchivé');
            } catch (error: unknown) {
              Alert.alert('Erreur', getErrorMessage(error, 'Impossible de désarchiver le container'));
            }
          },
        },
      ],
    );
  }, [containerId, unarchiveContainer]);

  return {
    updateStatusMutation: updateStatus, markReadyForPickupMutation: markReady, markGoodsDeliveredMutation: markGoodsDelivered, markContainerDeliveredMutation: markContainerDelivered,
    archiveContainerMutation: archiveContainer, unarchiveContainerMutation: unarchiveContainer,
    handleUpdateStatus, confirmMarkReadyForPickup, confirmMarkDelivered, handleMarkGoodsDelivered,
    confirmArchiveContainer, confirmUnarchiveContainer,
  };
};
