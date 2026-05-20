import { useCallback } from 'react';
import { Alert } from 'react-native';

type GoodsDetailManagementData = {
  goods?: { _id: string } | null;
  goodsId: string;
  deleteMutation: {
    mutate: (
      variables: { id: string; permanent?: boolean },
      options?: { onSuccess?: () => void },
    ) => void;
  };
  updateStatusMutation: {
    mutate: (variables: { id: string; status: string }) => void;
  };
};

type GoodsDetailNavigation = {
  goBack: () => void;
  navigate: (screen: never, params: never) => void;
};

export const useGoodsDetailManagementActions = (data: GoodsDetailManagementData, navigation: GoodsDetailNavigation) => {
  const { goods, deleteMutation, updateStatusMutation, goodsId } = data;

  const handleDelete = useCallback(() => {
    if (!goods) return;
    Alert.alert('Suppression définitive', 'Cette action supprimera définitivement la marchandise et la retirera des conteneurs, lettres de transport, factures et paiements liés. Cette action est irréversible.', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer définitivement',
        style: 'destructive',
        onPress: () => {
          deleteMutation.mutate(
            { id: goods._id, permanent: true },
            { onSuccess: () => navigation.goBack() },
          );
        },
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
