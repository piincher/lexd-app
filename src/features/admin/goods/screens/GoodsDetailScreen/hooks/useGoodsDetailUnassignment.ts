import { useCallback } from 'react';
import { Alert } from 'react-native';

export const useGoodsDetailUnassignment = (data: any) => {
  const { goods, refetch, removeAirwayBillMutation, removeContainerMutation, container, airwayBill } = data;

  const handleUnassignFromAirwayBill = useCallback(() => {
    if (!airwayBill?._id || !goods) return;
    Alert.alert(
      'Confirmer le désassignement',
      `Retirer cette marchandise de la lettre de transport ${airwayBill.awbNumber} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Retirer',
          style: 'destructive',
          onPress: () => {
            removeAirwayBillMutation.mutate(
              { id: airwayBill._id, goodsId: goods._id },
              {
                onSuccess: () => { Alert.alert('Succès', 'Marchandise retirée de la lettre de transport'); refetch(); },
                onError: (error: any) => { Alert.alert('Erreur', error?.message || 'Impossible de retirer la marchandise'); },
              },
            );
          },
        },
      ],
    );
  }, [airwayBill, goods, removeAirwayBillMutation, refetch]);

  const handleUnassignFromContainer = useCallback(() => {
    const containerId = container?._id || (typeof goods?.containerId === 'string' ? goods.containerId : goods?.containerId?._id);
    if (!containerId || !goods?._id) return;
    Alert.alert(
      'Confirmer le retrait',
      'Retirer cette marchandise du conteneur ? Elle repassera en entrepôt.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Retirer',
          style: 'destructive',
          onPress: () => {
            removeContainerMutation.mutate(
              { containerId, goodsId: goods._id },
              {
                onSuccess: () => { Alert.alert('Succès', 'Marchandise retirée du conteneur'); refetch(); },
                onError: (error: any) => { Alert.alert('Erreur', error?.message || 'Impossible de retirer la marchandise'); },
              },
            );
          },
        },
      ],
    );
  }, [container, goods, removeContainerMutation, refetch]);

  return { handleUnassignFromAirwayBill, handleUnassignFromContainer };
};
