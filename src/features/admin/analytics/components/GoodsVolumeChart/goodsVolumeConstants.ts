import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
  RECEIVED_AT_WAREHOUSE: { label: 'Reçu', color: '#3B82F6', icon: 'warehouse' },
  ASSIGNED_TO_CONTAINER: { label: 'Assigné', color: '#8B5CF6', icon: 'package-variant-closed' },
  LOADED_IN_CONTAINER: { label: 'Chargé', color: '#F59E0B', icon: 'truck-delivery' },
  IN_TRANSIT: { label: 'En Transit', color: '#06B6D4', icon: 'ferry' },
  ARRIVED_DESTINATION: { label: 'Arrivé', color: '#10B981', icon: 'map-marker-check' },
  READY_FOR_PICKUP: { label: 'À Retirer', color: '#EC4899', icon: 'clock-outline' },
  DELIVERED: { label: 'Livré', color: '#22C55E', icon: 'check-circle' },
};

export const shippingModeColors: Record<string, string> = {
  SEA: '#1E40AF',
  AIR: '#7C3AED',
  UNASSIGNED: '#9CA3AF',
};

export type ViewMode = 'status' | 'shipping' | 'trend';

export const tabs = [
  { key: 'status' as ViewMode, label: 'Statut', icon: 'tag-outline' },
  { key: 'shipping' as ViewMode, label: 'Transport', icon: 'ferry' },
  { key: 'trend' as ViewMode, label: 'Tendance', icon: 'chart-line' },
];
