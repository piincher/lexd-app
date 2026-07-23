import { Theme } from '@src/constants/Theme';
import {
  AirwayBillStatus,
  AirwayBillWaypoint,
  AirwayBillWaypointSegmentType,
  AirwayBillWaypointStatus,
  CargoBagStatus,
} from './types';

export const STATUS_TRANSITIONS: Record<AirwayBillStatus, AirwayBillStatus[]> = {
  CREATED: ['PACKING', 'READY_FOR_DEPARTURE'], PACKING: ['CREATED', 'READY_FOR_DEPARTURE'],
  READY_FOR_DEPARTURE: ['PACKING', 'IN_TRANSIT'], IN_TRANSIT: ['ARRIVED'],
  ARRIVED: ['READY_FOR_PICKUP'], READY_FOR_PICKUP: ['DELIVERED'], DELIVERED: [],
};

export const STATUS_LABELS: Record<AirwayBillStatus, string> = {
  CREATED: 'Créé', PACKING: 'Préparation', READY_FOR_DEPARTURE: 'Prêt au départ',
  IN_TRANSIT: 'En transit', ARRIVED: 'Arrivé', READY_FOR_PICKUP: 'Prêt pour retrait', DELIVERED: 'Livré',
};

export const CARGO_BAG_STATUS_LABELS: Record<CargoBagStatus, string> = {
  PACKED: 'Emballé',
  CHECKED_IN: 'Enregistré',
  LOADED: 'Chargé',
  IN_TRANSIT: 'En transit',
  ARRIVED: 'Arrivé',
  CLEARED: 'Dédouané',
};

export const CARGO_BAG_STATUS_CONFIG: Record<CargoBagStatus, { label: string; color: string }> = {
  PACKED: { label: 'Emballé', color: Theme.colors.text.secondary },
  CHECKED_IN: { label: 'Enregistré', color: '#3B82F6' },
  LOADED: { label: 'Chargé', color: '#F5A524' },
  IN_TRANSIT: { label: 'En transit', color: '#3B82F6' },
  ARRIVED: { label: 'Arrivé', color: '#00664B' },
  CLEARED: { label: 'Dédouané', color: '#4ECDC4' },
};

export const AIRWAY_BILL_WAYPOINT_STATUS_LABELS: Record<AirwayBillWaypointStatus, string> = {
  PENDING: 'En attente',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminé',
  DELAYED: 'Retardé',
  CANCELLED: 'Annulé',
};

export const AIRWAY_BILL_SEGMENT_LABELS: Record<AirwayBillWaypointSegmentType, string> = {
  AIR: 'Aérien',
  CUSTOMS: 'Douane',
  WAREHOUSE: 'Entrepôt',
  ROAD: 'Route',
  CONTAINER: 'Transfert container',
};

export const getAirwayBillWaypointIcon = (waypoint: AirwayBillWaypoint) => {
  const iconAliases: Record<string, string> = {
    'airplane-outline': 'airplane',
    business: 'warehouse',
    'business-outline': 'warehouse',
    'shield-checkmark': 'shield-check',
    'shield-checkmark-outline': 'shield-check',
    'cube-outline': 'package-variant-closed',
    cube: 'package-variant-closed',
  };
  if (waypoint.icon) return iconAliases[waypoint.icon] || waypoint.icon;
  if (waypoint.segmentType === 'CONTAINER') return 'package-variant-closed';
  if (waypoint.segmentType === 'CUSTOMS') return 'shield-check';
  if (waypoint.segmentType === 'WAREHOUSE') return 'warehouse';
  if (waypoint.segmentType === 'ROAD') return 'truck-fast';
  if (waypoint.airDetails?.actualArrival || waypoint.actualArrival) return 'airplane-landing';
  if (waypoint.airDetails?.actualDeparture || waypoint.actualDeparture || waypoint.order <= 1) return 'airplane-takeoff';
  return 'airplane';
};

export const getAirwayBillWaypointActionLabel = (status: AirwayBillWaypointStatus) => ({
  PENDING: 'Remettre en attente',
  IN_PROGRESS: 'Démarrer cette étape',
  COMPLETED: 'Marquer arrivé/terminé',
  DELAYED: 'Signaler un retard',
  CANCELLED: 'Annuler cette étape',
}[status]);
