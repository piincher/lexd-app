import { useCallback } from 'react';
import { Alert } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';
import { useUpdateAirwayBillStatus, useDeleteAirwayBill } from '../../../hooks/useAirwayBills';
import { AirwayBillStatus } from '../../../types';

export const useAirwayBillDetailActions = (
  airwayBillId: string,
  navigation: NativeStackNavigationProp<RootStackParamList>,
  closeMenu: () => void
) => {
  const updateStatusMutation = useUpdateAirwayBillStatus();
  const deleteMutation = useDeleteAirwayBill();

  const handleStatusChange = useCallback(
    async (newStatus: AirwayBillStatus) => {
      closeMenu();
      try {
        await updateStatusMutation.mutateAsync({ id: airwayBillId, status: newStatus });
      } catch {
        Alert.alert('Erreur', 'Impossible de mettre à jour le statut');
      }
    },
    [airwayBillId, updateStatusMutation, closeMenu]
  );

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Suppression définitive',
      'Supprimer définitivement cet AWB ? Les sacs cargo seront supprimés et les marchandises seront détachées/remises en entrepôt.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer définitivement',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMutation.mutateAsync({ id: airwayBillId, hardDelete: true });
              navigation.goBack();
            } catch {
              Alert.alert('Erreur', 'Impossible de supprimer définitivement cet AWB');
            }
          },
        },
      ]
    );
  }, [airwayBillId, deleteMutation, navigation]);

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleAssignPress = useCallback(
    () => navigation.navigate('AssignAirwayGoods', { airwayBillId }),
    [navigation, airwayBillId]
  );

  return {
    handleStatusChange,
    handleDelete,
    handleBack,
    handleAssignPress,
    isUpdatingStatus: updateStatusMutation.isPending,
  };
};
