import { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useGetAllContainers } from '@src/features/admin/containers/hooks/useContainers';
import { useUpdateGoodsStatus, useVoidGoods } from '../../../hooks';
import { useAssignGoodsToContainer } from '../../../hooks/useGoods';

export const useGoodsBulkActions = (goods: any[], onRefresh?: () => Promise<void>) => {
  const [selectedGoodsIds, setSelectedGoodsIds] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [containerPickerVisible, setContainerPickerVisible] = useState(false);
  const [statusPickerVisible, setStatusPickerVisible] = useState(false);

  const toggleSelectGoods = useCallback((id: string) => {
    setSelectedGoodsIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const toggleSelectAllGoods = useCallback(() => {
    const ids = goods.map((g) => g._id).filter(Boolean);
    setSelectedGoodsIds((prev) => (prev.length === ids.length ? [] : ids));
  }, [goods]);

  const exitSelectionMode = useCallback(() => {
    setIsSelectionMode(false);
    setSelectedGoodsIds([]);
  }, []);

  const { data: containersData } = useGetAllContainers();
  const containers = useMemo(() => {
    const responseData = containersData?.data;
    return Array.isArray(responseData)
      ? responseData
      : responseData?.containers || [];
  }, [containersData]);

  const { mutate: assignToContainer, isPending: isAssigning } = useAssignGoodsToContainer();
  const { mutate: updateGoodsStatus, isPending: isUpdatingStatus } = useUpdateGoodsStatus();
  const { mutate: voidGoods, isPending: isVoiding } = useVoidGoods();

  const isBulkPending = isAssigning || isUpdatingStatus || isVoiding;

  const handleAssignContainer = useCallback(
    (containerId: string) => {
      assignToContainer(
        { containerId, goodsIds: selectedGoodsIds },
        {
          onSuccess: () => {
            exitSelectionMode();
            onRefresh?.();
          },
          onError: (err: any) => {
            Alert.alert('Erreur', err?.message || 'Failed to assign goods');
          },
        }
      );
    },
    [assignToContainer, selectedGoodsIds, exitSelectionMode, onRefresh]
  );

  const handleChangeStatus = useCallback(
    (status: string) => {
      let completed = 0;
      let errors = 0;
      selectedGoodsIds.forEach((id) => {
        updateGoodsStatus(
          { id, status },
          {
            onSuccess: () => {
              completed++;
              if (completed + errors === selectedGoodsIds.length) {
                exitSelectionMode();
                onRefresh?.();
              }
            },
            onError: () => {
              errors++;
              if (completed + errors === selectedGoodsIds.length) {
                if (errors > 0) {
                  Alert.alert('Erreur', `${errors} mise(s) à jour ont échoué`);
                }
                exitSelectionMode();
                onRefresh?.();
              }
            },
          }
        );
      });
    },
    [selectedGoodsIds, updateGoodsStatus, exitSelectionMode, onRefresh]
  );

  const handleVoidGoods = useCallback(() => {
    Alert.alert(
      'Annuler les marchandises',
      `Annuler ${selectedGoodsIds.length} marchandise(s) sélectionnée(s) ?`,
      [
        { text: 'Retour', style: 'cancel' },
        {
          text: 'Confirmer',
          style: 'destructive',
          onPress: () => {
            // TODO: replace with batch void when endpoint is ready
            let completed = 0;
            let errors = 0;
            selectedGoodsIds.forEach((id) => {
              voidGoods(
                { id, reason: 'BULK_VOID' },
                {
                  onSuccess: () => {
                    completed++;
                    if (completed + errors === selectedGoodsIds.length) {
                      exitSelectionMode();
                      onRefresh?.();
                    }
                  },
                  onError: () => {
                    errors++;
                    if (completed + errors === selectedGoodsIds.length) {
                      if (errors > 0) {
                        Alert.alert('Erreur', `${errors} annulation(s) ont échoué`);
                      }
                      exitSelectionMode();
                      onRefresh?.();
                    }
                  },
                }
              );
            });
          },
        },
      ]
    );
  }, [selectedGoodsIds, voidGoods, exitSelectionMode, onRefresh]);

  const containerOptions = useMemo(
    () =>
      containers.map((c: any) => ({
        label: c.virtualContainerNumber || c.containerNumber || c._id,
        value: c._id,
      })),
    [containers]
  );

  const statusOptions = useMemo(
    () => [
      { label: 'Recu au depot', value: 'RECEIVED_AT_WAREHOUSE' },
      { label: 'Colis préparé', value: 'PACKED' },
      { label: 'Assigne au conteneur', value: 'ASSIGNED_TO_CONTAINER' },
      { label: 'Charge dans conteneur', value: 'LOADED_IN_CONTAINER' },
      { label: 'En transit', value: 'IN_TRANSIT' },
      { label: 'Arrive a destination', value: 'ARRIVED_DESTINATION' },
      { label: 'Pret pour retrait', value: 'READY_FOR_PICKUP' },
      { label: 'Livre', value: 'DELIVERED' },
    ],
    []
  );

  return {
    selectedGoodsIds,
    isSelectionMode,
    containerPickerVisible,
    statusPickerVisible,
    toggleSelectGoods,
    toggleSelectAllGoods,
    exitSelectionMode,
    setIsSelectionMode,
    setContainerPickerVisible,
    setStatusPickerVisible,
    isBulkPending,
    handleAssignContainer,
    handleChangeStatus,
    handleVoidGoods,
    containerOptions,
    statusOptions,
  };
};
