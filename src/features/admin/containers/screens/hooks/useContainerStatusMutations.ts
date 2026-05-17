import { useCallback } from 'react';
import { Alert } from 'react-native';
import { ContainerStatus, CONTAINER_STATUS_LABELS } from '../../types';
import { Goods } from '../../../goods/types';
import { useUpdateContainerStatus, useMarkReadyForPickup, useMarkGoodsDelivered, useMarkContainerDelivered } from '../../hooks';
import { ContainerDialogsState } from './useContainerDialogs';
import { MAX_CBM, MAX_WEIGHT } from './utils';

const CAPACITY_CHECK_STATUSES: ContainerStatus[] = ['LOADED','GATE_IN_FULL','LOADED_ON_VESSEL','IN_TRANSIT','ARRIVED','DISCHARGED','READY_FOR_PICKUP'];

export const useContainerStatusMutations = (
  containerId: string, container: any, goodsList: Goods[],
  capacityValue: number, maxCapacity: number, isAirContainer: boolean, totalWeight: number,
  dialogs: ContainerDialogsState,
) => {
  const updateStatus = useUpdateContainerStatus();
  const markReady = useMarkReadyForPickup();
  const markGoodsDelivered = useMarkGoodsDelivered();
  const markContainerDelivered = useMarkContainerDelivered();

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
    const doMark = async () => { try { await markContainerDelivered.mutateAsync(containerId); dialogs.setShowDeliveredDialog(false); Alert.alert('Succès', 'Container marqué comme livré'); } catch (error: any) { Alert.alert('Erreur', error?.response?.data?.message || error?.message || 'Impossible de marquer le container comme livré'); } };
    if (goodsList.length === 0) { Alert.alert('Attention', 'Ce container est vide. Marquer un container vide comme livré est inhabituel. Continuer ?', [{ text: 'Annuler', style: 'cancel' }, { text: 'Continuer', style: 'destructive', onPress: doMark }]); return; }
    await doMark();
  }, [containerId, goodsList, dialogs, markContainerDelivered]);

  const handleMarkGoodsDelivered = useCallback((goodsId: string) => {
    Alert.alert('Confirmer la livraison', 'Marquer cette marchandise comme livrée ?', [{ text: 'Annuler', style: 'cancel' }, { text: 'Marquer Livré', onPress: async () => { try { await markGoodsDelivered.mutateAsync(goodsId); Alert.alert('Succès', 'Marchandise marquée comme livrée'); } catch { Alert.alert('Erreur', 'Impossible de marquer la marchandise'); } } }]);
  }, [markGoodsDelivered]);

  return {
    updateStatusMutation: updateStatus, markReadyForPickupMutation: markReady, markGoodsDeliveredMutation: markGoodsDelivered, markContainerDeliveredMutation: markContainerDelivered,
    handleUpdateStatus, confirmMarkReadyForPickup, confirmMarkDelivered, handleMarkGoodsDelivered,
  };
};
