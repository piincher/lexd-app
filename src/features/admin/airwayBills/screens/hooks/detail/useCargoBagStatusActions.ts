import { useCallback } from 'react';
import { Alert } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';
import {
  useUpdateCargoBagStatus,
  useUpdateCargoBagWaypoint,
  useDeleteCargoBag,
} from '../../../hooks/useCargoBags';
import { CargoBagStatus, AirwayBillWaypointStatus } from '../../../types';
import { buildWaypointUpdateInput } from './buildWaypointUpdateInput';

export const useCargoBagStatusActions = (
  cargoBagId: string,
  airwayBillId: string,
  navigation: NativeStackNavigationProp<RootStackParamList>,
  setStatusMenuVisible: (value: boolean) => void,
  refetch: () => void,
  refetchWaypoints: () => void
) => {
  const updateStatusMutation = useUpdateCargoBagStatus();
  const updateWaypointMutation = useUpdateCargoBagWaypoint();
  const deleteCargoBagMutation = useDeleteCargoBag();

  const handleChangeStatus = useCallback(
    async (newStatus: CargoBagStatus) => {
      setStatusMenuVisible(false);
      try {
        await updateStatusMutation.mutateAsync({ id: cargoBagId, status: newStatus, awbId: airwayBillId });
        refetch();
      } catch {
        Alert.alert('Erreur', 'Impossible de mettre à jour le statut du sac');
      }
    },
    [cargoBagId, airwayBillId, updateStatusMutation, setStatusMenuVisible, refetch]
  );

  const handleWaypointStatusChange = useCallback(
    async (waypointIndex: number, status: AirwayBillWaypointStatus) => {
      const input = buildWaypointUpdateInput(status);
      try {
        await updateWaypointMutation.mutateAsync({ id: cargoBagId, waypointIndex, input });
        refetchWaypoints();
      } catch {
        Alert.alert('Erreur', "Impossible de mettre à jour cette étape du sac cargo");
      }
    },
    [cargoBagId, updateWaypointMutation, refetchWaypoints]
  );

  const handleDeleteBag = useCallback(() => {
    Alert.alert(
      'Supprimer le sac',
      'Supprimer définitivement ce sac cargo ? Cette action est possible uniquement si le sac est vide et encore emballé.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCargoBagMutation.mutateAsync({ id: cargoBagId, awbId: airwayBillId });
              navigation.goBack();
            } catch {
              Alert.alert('Erreur', 'Impossible de supprimer ce sac. Vérifiez qu\'il est vide et encore emballé.');
            }
          },
        },
      ]
    );
  }, [cargoBagId, airwayBillId, deleteCargoBagMutation, navigation]);

  return {
    handleChangeStatus,
    handleWaypointStatusChange,
    handleDeleteBag,
    isUpdatingStatus: updateStatusMutation.isPending || updateWaypointMutation.isPending || deleteCargoBagMutation.isPending,
  };
};
