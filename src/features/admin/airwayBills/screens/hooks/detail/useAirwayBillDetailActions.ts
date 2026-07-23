import { useCallback } from 'react';
import { Alert } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';
import { useUpdateAirwayBillStatus, useDeleteAirwayBill, useUpdateAirwayBillWaypoint } from '../../../hooks/useAirwayBills';
import { ApiClientError } from '@src/api/client';
import { AirwayBillStatus, AirwayBillWaypointStatus } from '../../../types';

export const useAirwayBillDetailActions = (
  airwayBillId: string,
  navigation: NativeStackNavigationProp<RootStackParamList>,
  closeMenu: () => void
) => {
  const updateStatusMutation = useUpdateAirwayBillStatus();
  const updateWaypointMutation = useUpdateAirwayBillWaypoint();
  const deleteMutation = useDeleteAirwayBill();

  const handleStatusChange = useCallback(
    async (newStatus: AirwayBillStatus) => {
      closeMenu();
      try {
        await updateStatusMutation.mutateAsync({ id: airwayBillId, status: newStatus });
      } catch (error) {
        console.error('[AWB] status update failed:', error);
        const message =
          error instanceof ApiClientError
            ? `${error.getUserMessage()}${error.code ? ` (${error.code})` : ''}`
            : error instanceof Error
              ? error.message
              : 'Impossible de mettre à jour le statut';
        Alert.alert('Erreur', message);
      }
    },
    [airwayBillId, updateStatusMutation, closeMenu]
  );

  const handleDelete = useCallback(() => {
    closeMenu();
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
  }, [airwayBillId, deleteMutation, navigation, closeMenu]);

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleAssignPress = useCallback(
    () => navigation.navigate('AssignAirwayGoods', { airwayBillId }),
    [navigation, airwayBillId]
  );

  const handleWaypointStatusChange = useCallback(
    async (waypointIndex: number, status: AirwayBillWaypointStatus) => {
      const now = new Date().toISOString();
      const input = {
        status,
        ...(status === 'IN_PROGRESS' ? { actualDeparture: now } : {}),
        ...(status === 'COMPLETED' ? { actualArrival: now } : {}),
        ...(status === 'DELAYED' ? { notes: "Retard signalé par l'équipe opérationnelle" } : {}),
      };

      try {
        await updateWaypointMutation.mutateAsync({ id: airwayBillId, waypointIndex, input });
      } catch {
        Alert.alert('Erreur', "Impossible de mettre à jour cette étape de l'itinéraire");
      }
    },
    [airwayBillId, updateWaypointMutation]
  );

  return {
    handleStatusChange,
    handleWaypointStatusChange,
    handleDelete,
    handleBack,
    handleAssignPress,
    isUpdatingStatus: updateStatusMutation.isPending || updateWaypointMutation.isPending,
  };
};
