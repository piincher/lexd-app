/**
 * Port-Specific Waypoint Status System - Helper functions
 */

import { ExtendedWaypointStatus, LocationCategory, QuickAction } from './core';
import { getLocationCategory } from './ports';
import { DISCHARGE_PORT_STATUSES, BORDER_STATUSES, WAREHOUSE_STATUSES, STANDARD_STATUSES } from './workflows';

export const getExtendedStatusLabel = (status: ExtendedWaypointStatus): string => {
  const allStatuses = [
    ...DISCHARGE_PORT_STATUSES,
    ...BORDER_STATUSES,
    ...WAREHOUSE_STATUSES,
    ...STANDARD_STATUSES,
  ];
  const found = allStatuses.find((s) => s.status === status);
  return found?.label || status;
};

export const getExtendedStatusColor = (status: ExtendedWaypointStatus): string => {
  const allStatuses = [
    ...DISCHARGE_PORT_STATUSES,
    ...BORDER_STATUSES,
    ...WAREHOUSE_STATUSES,
    ...STANDARD_STATUSES,
  ];
  const found = allStatuses.find((s) => s.status === status);
  return found?.color || '#9CA3AF';
};

export const getExtendedStatusIcon = (status: ExtendedWaypointStatus): string => {
  const allStatuses = [
    ...DISCHARGE_PORT_STATUSES,
    ...BORDER_STATUSES,
    ...WAREHOUSE_STATUSES,
    ...STANDARD_STATUSES,
  ];
  const found = allStatuses.find((s) => s.status === status);
  return found?.icon || 'ellipse';
};

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'mark_arrived',
    label: 'Marquer Arrivé',
    icon: 'anchor',
    color: '#10B981',
    targetStatus: 'ARRIVED_AT_PORT',
    category: ['DISCHARGE_PORT'],
    requiredCurrentStatus: ['PENDING', 'IN_PROGRESS'],
    confirmationMessage: 'Confirmer l\'arrivée au port ?',
  },
  {
    id: 'start_discharging',
    label: 'Début Déchargement',
    icon: 'cube',
    color: '#8B5CF6',
    targetStatus: 'DISCHARGING',
    category: ['DISCHARGE_PORT'],
    requiredCurrentStatus: ['BERTHING', 'ARRIVED_AT_PORT'],
  },
  {
    id: 'customs_clearance',
    label: 'Dédouanement',
    icon: 'document-text',
    color: '#EC4899',
    targetStatus: 'CUSTOMS_CLEARANCE',
    category: ['DISCHARGE_PORT'],
    requiredCurrentStatus: ['DISCHARGING', 'DISCHARGED'],
  },
  {
    id: 'ready_for_pickup',
    label: 'Prêt pour Retrait',
    icon: 'checkmark-done',
    color: '#059669',
    targetStatus: 'READY_FOR_PICKUP',
    category: ['DISCHARGE_PORT'],
    requiredCurrentStatus: ['CUSTOMS_CLEARED', 'DISCHARGED'],
    confirmationMessage: 'Marquer comme prêt pour le transport routier ?',
  },
  
  {
    id: 'arrived_border',
    label: 'Arrivé Frontière',
    icon: 'flag',
    color: '#10B981',
    targetStatus: 'ARRIVED_AT_PORT',
    category: ['BORDER'],
    requiredCurrentStatus: ['PENDING', 'IN_PROGRESS'],
  },
  {
    id: 'border_crossing',
    label: 'Passage Frontière',
    icon: 'swap-horizontal',
    color: '#8B5CF6',
    targetStatus: 'BORDER_CROSSING',
    category: ['BORDER'],
    requiredCurrentStatus: ['ARRIVED_AT_PORT', 'CUSTOMS_INSPECTION'],
  },
  {
    id: 'cleared_border',
    label: 'Frontière Passée',
    icon: 'checkmark-circle',
    color: '#10B981',
    targetStatus: 'CLEARED_BORDER',
    category: ['BORDER'],
    requiredCurrentStatus: ['BORDER_CROSSING'],
  },
  
  {
    id: 'arrived_warehouse',
    label: 'Arrivé Entrepôt',
    icon: 'warehouse',
    color: '#10B981',
    targetStatus: 'ARRIVED_AT_PORT',
    category: ['WAREHOUSE'],
    requiredCurrentStatus: ['PENDING', 'IN_PROGRESS'],
  },
  {
    id: 'available_for_pickup',
    label: 'Disponible',
    icon: 'checkmark-circle',
    color: '#10B981',
    targetStatus: 'AVAILABLE_FOR_PICKUP',
    category: ['WAREHOUSE'],
    requiredCurrentStatus: ['IN_WAREHOUSE', 'CUSTOMS_INSPECTION'],
  },
  {
    id: 'picked_up',
    label: 'Retiré',
    icon: 'checkmark-done',
    color: '#059669',
    targetStatus: 'PICKED_UP',
    category: ['WAREHOUSE'],
    requiredCurrentStatus: ['AVAILABLE_FOR_PICKUP'],
    confirmationMessage: 'Confirmer le retrait par le client ?',
  },
];

export const getQuickActions = (
  locationCode: string,
  currentStatus: ExtendedWaypointStatus
): QuickAction[] => {
  const category = getLocationCategory(locationCode);
  return QUICK_ACTIONS.filter(
    (action) =>
      action.category.includes(category) &&
      action.requiredCurrentStatus.includes(currentStatus)
  );
};
