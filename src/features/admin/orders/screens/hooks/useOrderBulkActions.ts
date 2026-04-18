import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useUpdateOrderStatus } from '../../hooks/useOrderManagement';

export const useOrderBulkActions = (filteredOrders: any[], refetch: () => Promise<any>) => {
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const toggleSelectOrder = useCallback((id: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const toggleSelectAllOrders = useCallback(() => {
    const ids = filteredOrders.map((o: any) => o._id).filter(Boolean);
    setSelectedOrderIds((prev) => (prev.length === ids.length ? [] : ids));
  }, [filteredOrders]);

  const exitSelectionMode = useCallback(() => {
    setIsSelectionMode(false);
    setSelectedOrderIds([]);
  }, []);

  const { mutate: batchUpdateStatus, isPending: isBatchUpdating } = useUpdateOrderStatus();

  const handleChangeOrderStatus = useCallback(() => {
    const STATUS_OPTIONS = ['Pending', 'Active', 'In Transit', 'Delivered'];
    Alert.alert(
      'Changer statut',
      `Mettre à jour ${selectedOrderIds.length} commande(s)`,
      [
        { text: 'Annuler', style: 'cancel' },
        ...STATUS_OPTIONS.map((status) => ({
          text: status,
          onPress: () => {
            batchUpdateStatus(
              { orders: selectedOrderIds, title: status },
              {
                onSuccess: () => {
                  exitSelectionMode();
                  refetch();
                },
                onError: (err: any) => {
                  Alert.alert('Erreur', err?.message || 'Failed to update statuses');
                },
              }
            );
          },
        })),
      ]
    );
  }, [selectedOrderIds, batchUpdateStatus, exitSelectionMode, refetch]);

  return {
    selectedOrderIds,
    isSelectionMode,
    setIsSelectionMode,
    toggleSelectOrder,
    toggleSelectAllOrders,
    exitSelectionMode,
    isBatchUpdating,
    handleChangeOrderStatus,
  };
};
