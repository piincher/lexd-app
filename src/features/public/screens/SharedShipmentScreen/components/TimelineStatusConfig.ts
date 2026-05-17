import { useAppTheme } from '@src/providers/ThemeProvider';

export const STATUS_ICONS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: 'package-variant',
  PACKED: 'package-variant-closed',
  ASSIGNED_TO_CONTAINER: 'ferry',
  LOADED_IN_CONTAINER: 'ferry',
  IN_TRANSIT: 'truck-fast',
  ARRIVED_DESTINATION: 'map-marker-check',
  READY_FOR_PICKUP: 'store-check',
  DELIVERED: 'check-circle',
  BOOKED: 'book-check',
  LOADING: 'loading',
  LOADED: 'ferry',
  ARRIVED: 'map-marker-check',
  DISCHARGED: 'download',
  received: 'package-variant',
  in_container: 'ferry',
  shipped: 'ferry',
  pending: 'clock-outline',
};

export const STATUS_LABELS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: 'Reçu à l\'entrepôt',
  PACKED: 'Emballé',
  ASSIGNED_TO_CONTAINER: 'Assigné',
  LOADED_IN_CONTAINER: 'Chargé',
  IN_TRANSIT: 'En Transit',
  ARRIVED_DESTINATION: 'Arrivé',
  READY_FOR_PICKUP: 'Prêt pour retrait',
  DELIVERED: 'Livré',
  BOOKED: 'Réservé',
  LOADING: 'Chargement',
  LOADED: 'Chargé',
  ARRIVED: 'Arrivé',
  DISCHARGED: 'Déchargé',
  received: 'Reçu',
  in_container: 'En Container',
  shipped: 'Expédié',
  pending: 'En Attente',
};

export const getStatusColor = (status: string, colors: any) => {
  switch (status) {
    case 'RECEIVED_AT_WAREHOUSE':
    case 'BOOKED':
    case 'received':
      return colors.status.info;
    case 'PACKED':
    case 'ASSIGNED_TO_CONTAINER':
    case 'LOADING':
    case 'in_container':
      return colors.status.info;
    case 'LOADED_IN_CONTAINER':
    case 'LOADED':
    case 'shipped':
      return colors.status.info;
    case 'IN_TRANSIT':
      return colors.status.warning;
    case 'ARRIVED_DESTINATION':
    case 'ARRIVED':
    case 'DISCHARGED':
    case 'READY_FOR_PICKUP':
    case 'DELIVERED':
      return colors.status.success;
    case 'pending':
      return colors.text.secondary;
    default:
      return colors.text.secondary;
  }
};

export const getStatusConfig = (status: string, colors: any) => ({
  color: getStatusColor(status, colors),
  icon: STATUS_ICONS[status] || 'help-circle',
  label: STATUS_LABELS[status] || status,
});
