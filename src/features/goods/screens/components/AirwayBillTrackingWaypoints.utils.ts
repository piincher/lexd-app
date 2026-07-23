import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import type { TrackingWaypoint } from '../../api/types';

type WaypointStatus = TrackingWaypoint['status'];
export type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export const STATUS_LABELS: Record<WaypointStatus, string> = {
  PENDING: 'En attente',
  IN_PROGRESS: 'En transit',
  COMPLETED: 'Terminé',
  DELAYED: 'Retardé',
  CANCELLED: 'Annulé',
};

const ICONS = {
  AIR: 'airplane',
  CUSTOMS: 'shield-check',
  WAREHOUSE: 'warehouse',
  ROAD: 'truck',
  CONTAINER: 'package-variant-closed',
} as const;

export const SEGMENT_LABELS = {
  AIR: 'Aérien',
  CUSTOMS: 'Douane',
  WAREHOUSE: 'Entrepôt',
  ROAD: 'Route',
  CONTAINER: 'Transfert container',
} as const;

export const getWaypointIcon = (waypoint: TrackingWaypoint) => {
  const iconAliases: Record<string, string> = {
    'airplane-outline': 'airplane',
    business: 'warehouse',
    'business-outline': 'warehouse',
    'shield-checkmark': 'shield-check',
    'shield-checkmark-outline': 'shield-check',
    cube: 'package-variant-closed',
  };
  if (waypoint.icon) return iconAliases[waypoint.icon] || waypoint.icon;
  if (waypoint.segmentType === 'AIR' && (waypoint.actualArrival || waypoint.airDetails?.actualArrival)) return 'airplane-landing';
  if (waypoint.segmentType === 'AIR' && (waypoint.actualDeparture || waypoint.airDetails?.actualDeparture || waypoint.order <= 1)) return 'airplane-takeoff';
  return ICONS[waypoint.segmentType] || 'map-marker';
};

export const translateDescription = (description?: string, fallback?: string) => {
  if (!description) return fallback || 'Suivi en cours';
  return description
    .replace('Cargo moved from Guangzhou to Hong Kong for airline handover', 'Transfert du fret de Guangzhou vers Hong Kong pour remise à la compagnie aérienne')
    .replace('Air transit through Addis Ababa', 'Transit aérien via Addis-Abeba')
    .replace('Cargo arrives at Bamako airport', "Arrivée du fret à l'aéroport de Bamako")
    .replace('Customs clearance at Bamako airport', "Dédouanement à l'aéroport de Bamako")
    .replace('Final delivery to LEXD warehouse in Bamako', "Acheminement final vers l'entrepôt LEXD à Bamako")
    .replace('packed and prepared at LEXD Guangzhou warehouse', "préparé à l'entrepôt LEXD de Guangzhou");
};

export const statusColor = (status: WaypointStatus) => ({
  PENDING: Theme.neutral[400],
  IN_PROGRESS: Theme.status.info,
  COMPLETED: Theme.status.success,
  DELAYED: Theme.status.warning,
  CANCELLED: Theme.status.error,
}[status]);

export const formatDate = (date?: string | null) => {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
};

export const getCustomerEtaLabel = (waypoint: TrackingWaypoint) => {
  if (!waypoint.customerEta?.visibleToCustomer || !waypoint.customerEta.label) return null;
  return `ETA client ${waypoint.customerEta.label}`;
};
