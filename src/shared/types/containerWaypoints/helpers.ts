/**
 * Waypoint Types - Display constants and helpers
 */

import { WaypointStatus, SegmentType, PortType, WaypointType, TransportMode } from './core';

export const WAYPOINT_STATUS_LABELS: Record<WaypointStatus, string> = {
  PENDING: 'En attente',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminé',
  DELAYED: 'Retardé',
  CANCELLED: 'Annulé',
};

export const WAYPOINT_STATUS_COLORS: Record<WaypointStatus, string> = {
  PENDING: '#9CA3AF',
  IN_PROGRESS: '#3B82F6',
  COMPLETED: '#10B981',
  DELAYED: '#EF4444',
  CANCELLED: '#6B7280',
};

export const SEGMENT_TYPE_LABELS: Record<SegmentType, string> = {
  SEA: 'Maritime',
  ROAD: 'Routier',
  AIR: 'Aérien',
  WAREHOUSE: 'Entrepôt',
};

export const SEGMENT_TYPE_OPTIONS: SegmentType[] = ['SEA', 'ROAD', 'AIR', 'WAREHOUSE'];

export const SEGMENT_TYPE_ICONS: Record<SegmentType, string> = {
  SEA: 'boat',
  ROAD: 'car',
  AIR: 'airplane',
  WAREHOUSE: 'warehouse',
};

export const PORT_TYPE_LABELS: Record<PortType, string> = {
  LOADING: 'Chargement',
  TRANSIT: 'Transit',
  DISCHARGE: 'Déchargement',
  FEEDER: 'Feeder',
};

export const WAYPOINT_TYPE_OPTIONS: WaypointType[] = ['PORT', 'WAREHOUSE', 'BORDER', 'TERMINAL', 'DEPOT'];

export const WAYPOINT_TYPE_LABELS: Record<WaypointType, string> = {
  PORT: 'Port',
  WAREHOUSE: 'Entrepôt',
  BORDER: 'Frontière',
  TERMINAL: 'Terminal',
  DEPOT: 'Dépôt',
};

export const WAYPOINT_TYPE_ICONS: Record<WaypointType, string> = {
  PORT: 'boat',
  WAREHOUSE: 'warehouse',
  BORDER: 'flag',
  TERMINAL: 'office-building',
  DEPOT: 'cube',
};

export const TRANSPORT_MODE_OPTIONS: TransportMode[] = ['SEA', 'ROAD', 'AIR', 'RAIL'];

export const TRANSPORT_MODE_LABELS: Record<TransportMode, string> = {
  SEA: 'Maritime',
  ROAD: 'Routier',
  AIR: 'Aérien',
  RAIL: 'Ferroviaire',
};

export const TRANSPORT_MODE_ICONS: Record<TransportMode, string> = {
  SEA: 'boat',
  ROAD: 'car',
  AIR: 'airplane',
  RAIL: 'train',
};
