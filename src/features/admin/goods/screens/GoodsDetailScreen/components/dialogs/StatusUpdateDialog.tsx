// StatusUpdateDialog - Dialog for updating goods status
// Uses native Alert for simple status updates

import { Alert } from 'react-native';
import { GoodsStatus } from '../../../../types';

interface StatusUpdateDialogProps {
  currentStatus: GoodsStatus;
  onStatusChange: (status: GoodsStatus) => void;
}

const AVAILABLE_STATUSES: { value: GoodsStatus; label: string }[] = [
  { value: 'RECEIVED_AT_WAREHOUSE', label: 'En Entrepôt' },
  { value: 'ASSIGNED_TO_CONTAINER', label: 'Assigné au Container' },
  { value: 'LOADED_IN_CONTAINER', label: 'Chargé' },
  { value: 'IN_TRANSIT', label: 'En Transit' },
  { value: 'ARRIVED_DESTINATION', label: 'Arrivé à Destination' },
  { value: 'READY_FOR_PICKUP', label: 'Prêt pour Retrait' },
  { value: 'DELIVERED', label: 'Livré' },
];

export const showStatusUpdateDialog = ({
  currentStatus,
  onStatusChange,
}: StatusUpdateDialogProps): void => {
  const options = AVAILABLE_STATUSES
    .filter((s) => s.value !== currentStatus)
    .map((status) => ({
      text: status.label,
      onPress: () => onStatusChange(status.value),
    }));

  Alert.alert(
    'Mettre à jour le statut',
    'Sélectionner un nouveau statut',
    [
      { text: 'Annuler', style: 'cancel' },
      ...options,
    ]
  );
};
