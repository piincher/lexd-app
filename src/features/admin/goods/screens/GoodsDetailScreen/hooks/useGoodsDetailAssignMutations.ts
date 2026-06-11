import { useCallback } from 'react';
import { Alert } from 'react-native';

export const useGoodsDetailAssignMutations = (data: any, ui: any) => {
  const { goods, refetch, assignContainerMutation, assignAirwayBillMutation } = data;
  const { selectedContainerId, selectedAirwayBillId, isCorrection, setAssignDialogVisible, setSelectedContainerId, setSelectedAirwayBillId } = ui;

  const handleAssignToContainer = useCallback(() => {
    if (!selectedContainerId) { Alert.alert('Erreur', 'Veuillez sélectionner un container'); return; }
    if (!goods) return;
    assignContainerMutation.mutate(
      { containerId: selectedContainerId, goodsIds: [goods._id], isCorrection: !!isCorrection },
      {
        onSuccess: () => { Alert.alert('Succès', 'Marchandise assignée au container'); setAssignDialogVisible(false); setSelectedContainerId(null); refetch(); },
        onError: (error: any) => { Alert.alert('Erreur', error?.message || 'Impossible d\'assigner la marchandise'); },
      },
    );
  }, [selectedContainerId, goods, isCorrection, assignContainerMutation, setAssignDialogVisible, setSelectedContainerId, refetch]);

  const handleAssignToAirwayBill = useCallback(() => {
    if (!selectedAirwayBillId) { Alert.alert('Erreur', 'Veuillez sélectionner une lettre de transport'); return; }
    if (!goods) return;
    assignAirwayBillMutation.mutate(
      { id: selectedAirwayBillId, input: { goodsIds: [goods._id] } },
      {
        onSuccess: () => { Alert.alert('Succès', 'Marchandise assignée à la lettre de transport'); setAssignDialogVisible(false); setSelectedAirwayBillId(null); refetch(); },
        onError: (error: any) => { Alert.alert('Erreur', error?.message || 'Impossible d\'assigner la marchandise'); },
      },
    );
  }, [selectedAirwayBillId, goods, assignAirwayBillMutation, setAssignDialogVisible, setSelectedAirwayBillId, refetch]);

  return { handleAssignToContainer, handleAssignToAirwayBill };
};
