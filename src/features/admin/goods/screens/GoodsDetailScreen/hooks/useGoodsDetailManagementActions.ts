import { useCallback } from 'react';
import { Alert } from 'react-native';

export const useGoodsDetailManagementActions = (data: any, navigation: any) => {
  const { goods, deleteMutation, updateStatusMutation, goodsId } = data;

  const handleDelete = useCallback(() => {
    if (!goods) return;
    Alert.alert('Confirmer la suppression', 'Êtes-vous sûr de vouloir supprimer cette marchandise ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => { deleteMutation.mutate({ id: goods._id }, { onSuccess: () => navigation.goBack() }); },
      },
    ]);
  }, [goods, deleteMutation, navigation]);

  const handleStatusUpdate = useCallback((status: string) => {
    if (!goods) return;
    Alert.alert('Confirmer le changement de statut', `Passer cette marchandise au statut "${status}" ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Confirmer', onPress: () => updateStatusMutation.mutate({ id: goods._id, status }) },
    ]);
  }, [goods, updateStatusMutation]);

  const handleShareQR = useCallback(() => { Alert.alert('Info', 'Partage du QR code à implémenter'); }, []);
  const handleNavigateToEdit = useCallback(() => { navigation.navigate('EditGoods' as never, { goodsId } as never); }, [navigation, goodsId]);
  const handleGoBack = useCallback(() => { navigation.goBack(); }, [navigation]);

  return { handleDelete, handleStatusUpdate, handleShareQR, handleNavigateToEdit, handleGoBack };
};
