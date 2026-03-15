/**
 * useGoodsDetailScreen - Hook for GoodsDetailScreen logic
 * SRP: Encapsulate all screen-level business logic
 */

import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useGetAllContainers } from '@src/features/admin/containers/hooks';
import { useGoodsDetail } from './useGoodsDetail';
import { useGoodsAssignment } from './useGoodsAssignment';
import { useGoodsStatus } from './useGoodsStatus';
import { useDeleteGoods } from './useGoods';

export const useGoodsDetailScreen = (goodsId: string) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const { data, isLoading, refetch } = useGoodsDetail(goodsId);
  const { data: containersData } = useGetAllContainers({ status: ['BOOKED', 'LOADING'] });
  const deleteMutation = useDeleteGoods();

  const {
    selectedContainerId,
    setSelectedContainerId,
    assignToContainer,
    isAssigning,
  } = useGoodsAssignment({
    onSuccess: () => {
      Alert.alert('Succès', 'Marchandise assignée au container');
      setDialogVisible(false);
      refetch();
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error?.message || "Impossible d'assigner la marchandise");
    },
  });

  const { updateStatus } = useGoodsStatus({ onSuccess: refetch });

  const containers = Array.isArray(containersData?.data)
    ? containersData?.data
    : containersData?.data?.containers || [];

  const goods = data?.data?.goods || data?.data;
  const client = goods && typeof goods.clientId === 'object' ? goods.clientId : null;
  const container = goods && typeof goods.containerId === 'object' ? goods.containerId : null;
  const canAssign = goods?.status === 'RECEIVED_AT_WAREHOUSE' && !container;

  const handleDelete = useCallback(() => {
    if (!goods) return;
    Alert.alert(
      'Confirmer la suppression',
      `Êtes-vous sûr de vouloir supprimer ${goods.goodsId} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => deleteMutation.mutate({ id: goods._id }) },
      ]
    );
  }, [goods, deleteMutation]);

  const handleAssignPress = useCallback(() => {
    if (containers.length === 0) {
      Alert.alert('Aucun container disponible', "Veuillez d'abord créer un container.");
      return;
    }
    setDialogVisible(true);
  }, [containers.length]);

  const handleAssign = useCallback(() => {
    if (selectedContainerId && goods) {
      assignToContainer(goods._id, selectedContainerId);
    }
  }, [selectedContainerId, goods, assignToContainer]);

  return {
    goods,
    client,
    container,
    canAssign,
    containers,
    isLoading,
    dialogVisible,
    setDialogVisible,
    selectedContainerId,
    setSelectedContainerId,
    isAssigning,
    handleDelete,
    handleAssignPress,
    handleAssign,
    updateStatus,
  };
};
