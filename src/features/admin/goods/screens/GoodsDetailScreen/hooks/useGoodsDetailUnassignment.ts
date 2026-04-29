import { useCallback } from 'react';
import { Alert } from 'react-native';

export const useGoodsDetailUnassignment = (data: any) => {
  const { goods, refetch, removeAirwayBillMutation, airwayBill } = data;

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

  return { handleUnassignFromAirwayBill };
};
