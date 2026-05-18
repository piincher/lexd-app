/**
 * Port-Specific Waypoint Status System - Status workflows
 */

import { ExtendedWaypointStatus, LocationCategory, PortStatusOption } from './core';
import { getLocationCategory } from './ports';

export const DISCHARGE_PORT_STATUSES: PortStatusOption[] = [
  {
    status: 'IN_PROGRESS',
    label: 'En approche',
    icon: 'boat',
    color: '#3B82F6',
    description: 'Navire en approche du port',
    availableFrom: ['PENDING'],
  },
  {
    status: 'ARRIVED_AT_PORT',
    label: 'Arrivé au Port',
    icon: 'anchor',
    color: '#10B981',
    description: 'Navire arrivé au port',
    availableFrom: ['PENDING', 'IN_PROGRESS'],
  },
  {
    status: 'BERTHING',
    label: 'Accostage',
    icon: 'push',
    color: '#F59E0B',
    description: 'En cours d\'accostage',
    availableFrom: ['ARRIVED_AT_PORT'],
  },
  {
    status: 'DISCHARGING',
    label: 'Déchargement',
    icon: 'cube',
    color: '#8B5CF6',
    description: 'Déchargement du conteneur',
    availableFrom: ['BERTHING'],
  },
  {
    status: 'CUSTOMS_CLEARANCE',
    label: 'Dédouanement',
    icon: 'document-text',
    color: '#EC4899',
    description: 'En cours de dédouanement',
    availableFrom: ['DISCHARGING', 'DISCHARGED'],
  },
  {
    status: 'CUSTOMS_CLEARED',
    label: 'Dédouané',
    icon: 'checkmark-circle',
    color: '#10B981',
    description: 'Dédouanement terminé',
    availableFrom: ['CUSTOMS_CLEARANCE'],
  },
  {
    status: 'READY_FOR_PICKUP',
    label: 'Prêt pour Retrait',
    icon: 'checkmark-done',
    color: '#059669',
    description: 'Conteneur prêt pour le transport routier',
    availableFrom: ['CUSTOMS_CLEARED', 'DISCHARGED'],
  },
  {
    status: 'DEPARTED',
    label: 'Départ',
    icon: 'car',
    color: '#6366F1',
    description: 'Conteneur parti du port',
    availableFrom: ['READY_FOR_PICKUP'],
  },
  {
    status: 'COMPLETED',
    label: 'Terminé',
    icon: 'flag',
    color: '#10B981',
    description: 'Étape terminée',
    availableFrom: ['DEPARTED', 'READY_FOR_PICKUP'],
  },
];

export const BORDER_STATUSES: PortStatusOption[] = [
  {
    status: 'IN_PROGRESS',
    label: 'En Transit',
    icon: 'car',
    color: '#3B82F6',
    description: 'En route vers la frontière',
    availableFrom: ['PENDING'],
  },
  {
    status: 'ARRIVED_AT_PORT',
    label: 'Arrivé à la Frontière',
    icon: 'flag',
    color: '#10B981',
    description: 'Arrivé au point de contrôle frontalier',
    availableFrom: ['PENDING', 'IN_PROGRESS'],
  },
  {
    status: 'CUSTOMS_INSPECTION',
    label: 'Inspection Douane',
    icon: 'search',
    color: '#F59E0B',
    description: 'Inspection en cours',
    availableFrom: ['ARRIVED_AT_PORT'],
  },
  {
    status: 'BORDER_CROSSING',
    label: 'Passage Frontière',
    icon: 'swap-horizontal',
    color: '#8B5CF6',
    description: 'En cours de passage',
    availableFrom: ['CUSTOMS_INSPECTION', 'ARRIVED_AT_PORT'],
  },
  {
    status: 'CLEARED_BORDER',
    label: 'Frontière Passée',
    icon: 'checkmark-circle',
    color: '#10B981',
    description: 'Passage de frontière validé',
    availableFrom: ['BORDER_CROSSING'],
  },
  {
    status: 'DEPARTED',
    label: 'Départ',
    icon: 'car',
    color: '#6366F1',
    description: 'Continué vers destination',
    availableFrom: ['CLEARED_BORDER'],
  },
  {
    status: 'COMPLETED',
    label: 'Terminé',
    icon: 'flag',
    color: '#10B981',
    description: 'Étape terminée',
    availableFrom: ['DEPARTED', 'CLEARED_BORDER'],
  },
];

export const WAREHOUSE_STATUSES: PortStatusOption[] = [
  {
    status: 'IN_PROGRESS',
    label: 'En Transit',
    icon: 'car',
    color: '#3B82F6',
    description: 'En route vers l\'entrepôt',
    availableFrom: ['PENDING'],
  },
  {
    status: 'ARRIVED_AT_PORT',
    label: 'Arrivé à l\'Entrepôt',
    icon: 'business',
    color: '#10B981',
    description: 'Arrivé à l\'entrepôt',
    availableFrom: ['PENDING', 'IN_PROGRESS'],
  },
  {
    status: 'IN_WAREHOUSE',
    label: 'En Entrepôt',
    icon: 'cube',
    color: '#8B5CF6',
    description: 'Conteneur stocké',
    availableFrom: ['ARRIVED_AT_PORT'],
  },
  {
    status: 'CUSTOMS_INSPECTION',
    label: 'Inspection',
    icon: 'search',
    color: '#F59E0B',
    description: 'Inspection douanière',
    availableFrom: ['IN_WAREHOUSE'],
  },
  {
    status: 'AVAILABLE_FOR_PICKUP',
    label: 'Disponible',
    icon: 'checkmark-circle',
    color: '#10B981',
    description: 'Prêt pour retrait client',
    availableFrom: ['IN_WAREHOUSE', 'CUSTOMS_INSPECTION'],
  },
  {
    status: 'PICKED_UP',
    label: 'Retiré',
    icon: 'checkmark-done',
    color: '#059669',
    description: 'Retiré par le client',
    availableFrom: ['AVAILABLE_FOR_PICKUP'],
  },
  {
    status: 'COMPLETED',
    label: 'Terminé',
    icon: 'flag',
    color: '#10B981',
    description: 'Étape terminée',
    availableFrom: ['PICKED_UP', 'AVAILABLE_FOR_PICKUP'],
  },
];

export const STANDARD_STATUSES: PortStatusOption[] = [
  {
    status: 'PENDING',
    label: 'En attente',
    icon: 'time-outline',
    color: '#9CA3AF',
    availableFrom: [],
  },
  {
    status: 'IN_PROGRESS',
    label: 'En cours',
    icon: 'boat',
    color: '#3B82F6',
    availableFrom: ['PENDING'],
  },
  {
    status: 'COMPLETED',
    label: 'Terminé',
    icon: 'checkmark-circle',
    color: '#10B981',
    availableFrom: ['IN_PROGRESS'],
  },
  {
    status: 'DELAYED',
    label: 'Retardé',
    icon: 'warning',
    color: '#EF4444',
    requiresNote: true,
    availableFrom: ['PENDING', 'IN_PROGRESS'],
  },
  {
    status: 'CANCELLED',
    label: 'Annulé',
    icon: 'close-circle',
    color: '#6B7280',
    requiresNote: true,
    availableFrom: ['PENDING'],
  },
];

export const getStatusOptionsForLocation = (
  locationCode: string,
  currentStatus: ExtendedWaypointStatus
): PortStatusOption[] => {
  const category = getLocationCategory(locationCode);
  
  switch (category) {
    case 'DISCHARGE_PORT':
      return DISCHARGE_PORT_STATUSES.filter(
        (opt) => opt.availableFrom.includes(currentStatus) || opt.status === currentStatus
      );
    case 'BORDER':
      return BORDER_STATUSES.filter(
        (opt) => opt.availableFrom.includes(currentStatus) || opt.status === currentStatus
      );
    case 'WAREHOUSE':
      return WAREHOUSE_STATUSES.filter(
        (opt) => opt.availableFrom.includes(currentStatus) || opt.status === currentStatus
      );
    default:
      return STANDARD_STATUSES.filter(
        (opt) => opt.availableFrom.includes(currentStatus) || opt.status === currentStatus
      );
  }
};

export const getAllNextStatuses = (
  locationCode: string,
  currentStatus: ExtendedWaypointStatus
): ExtendedWaypointStatus[] => {
  const options = getStatusOptionsForLocation(locationCode, currentStatus);
  return options.map((opt) => opt.status);
};

export const isValidStatusTransition = (
  locationCode: string,
  currentStatus: ExtendedWaypointStatus,
  newStatus: ExtendedWaypointStatus
): boolean => {
  const options = getStatusOptionsForLocation(locationCode, currentStatus);
  return options.some((opt) => opt.status === newStatus);
};

export const getExpectedStatusFlow = (locationCode: string): ExtendedWaypointStatus[] => {
  const category = getLocationCategory(locationCode);
  
  switch (category) {
    case 'DISCHARGE_PORT':
      return [
        'PENDING',
        'IN_PROGRESS',
        'ARRIVED_AT_PORT',
        'BERTHING',
        'DISCHARGING',
        'DISCHARGED',
        'CUSTOMS_CLEARANCE',
        'CUSTOMS_CLEARED',
        'READY_FOR_PICKUP',
        'DEPARTED',
        'COMPLETED',
      ];
    case 'BORDER':
      return [
        'PENDING',
        'IN_PROGRESS',
        'ARRIVED_AT_PORT',
        'CUSTOMS_INSPECTION',
        'BORDER_CROSSING',
        'CLEARED_BORDER',
        'DEPARTED',
        'COMPLETED',
      ];
    case 'WAREHOUSE':
      return [
        'PENDING',
        'IN_PROGRESS',
        'ARRIVED_AT_PORT',
        'IN_WAREHOUSE',
        'CUSTOMS_INSPECTION',
        'AVAILABLE_FOR_PICKUP',
        'PICKED_UP',
        'COMPLETED',
      ];
    default:
      return ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
  }
};
