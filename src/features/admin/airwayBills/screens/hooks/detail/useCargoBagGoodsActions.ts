import { useCallback } from 'react';
import { Alert } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';
import { useRemoveGoodsFromCargoBag } from '../../../hooks/useCargoBags';

export const useCargoBagGoodsActions = (
  cargoBagId: string,
  airwayBillId: string,
  navigation: NativeStackNavigationProp<RootStackParamList>,
  selectedRemoveIds: string[],
  setRemoveMode: (value: boolean) => void,
  setSelectedRemoveIds: (ids: string[]) => void,
  refetch: () => void
) => {
  const removeGoodsMutation = useRemoveGoodsFromCargoBag();

  const handleConfirmRemove = useCallback(() => {
    if (selectedRemoveIds.length === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner au moins une marchandise');
      return;
    }
    Alert.alert(
      'Confirmer le retrait',
      `Retirer ${selectedRemoveIds.length} marchandise(s) de ce sac ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Retirer',
          style: 'destructive',
          onPress: async () => {
            try {
              for (const goodsId of selectedRemoveIds) {
                await removeGoodsMutation.mutateAsync({ id: cargoBagId, goodsId, awbId: airwayBillId });
              }
              setRemoveMode(false);
              setSelectedRemoveIds([]);
              refetch();
            } catch {
              Alert.alert('Erreur', 'Impossible de retirer certaines marchandises');
            }
          },
        },
      ]
    );
  }, [selectedRemoveIds, cargoBagId, airwayBillId, removeGoodsMutation, setRemoveMode, setSelectedRemoveIds, refetch]);

  const handleAddGoods = useCallback(() => {
    navigation.navigate('AssignAirwayGoods', { airwayBillId, cargoBagId });
  }, [navigation, airwayBillId, cargoBagId]);

  return {
    handleConfirmRemove,
    handleAddGoods,
    isRemoving: removeGoodsMutation.isPending,
  };
};
