/**
 * Port-Specific Waypoint Status System
 * Different status changes for different port/location types
 */

import { WaypointStatus, SegmentType } from './waypoints';

// ============================================
// PORT-SPECIFIC STATUS OPTIONS
// ============================================

/**
 * Extended waypoint status including port-specific statuses
 */
export type ExtendedWaypointStatus = 
  | WaypointStatus
  | 'ARRIVED_AT_PORT'
  | 'CUSTOMS_CLEARANCE'
  | 'CUSTOMS_CLEARED'
  | 'BERTHING'
  | 'DISCHARGING'
  | 'DISCHARGED'
  | 'READY_FOR_PICKUP'
  | 'BORDER_CROSSING'
  | 'CUSTOMS_INSPECTION'
  | 'CLEARED_BORDER'
  | 'IN_WAREHOUSE'
  | 'AVAILABLE_FOR_PICKUP'
  | 'PICKED_UP';

/**
 * Location type categories for port-specific handling
 */
export type LocationCategory = 
  | 'LOADING_PORT'      // Origin port (Nansha)
  | 'TRANSIT_PORT'      // Transit ports (Singapore, Tema)
  | 'DISCHARGE_PORT'    // Main arrival port (Dakar, Lomé, Abidjan)
  | 'BORDER'            // Border crossing (Diboli)
  | 'CUSTOMS'           // Customs checkpoint
  | 'WAREHOUSE'         // Final warehouse
  | 'ROAD_TRANSIT';     // Road transit points

/**
 * Port-specific status options with labels and icons
 */
export interface PortStatusOption {
  status: ExtendedWaypointStatus;
  label: string;
  icon: string;
  color: string;
  description?: string;
  requiresNote?: boolean;
  availableFrom: ExtendedWaypointStatus[];
}

// ============================================
// PORT CODES MAPPING
// ============================================

/**
 * Major ports and their categories
 */
export const PORT_CATEGORIES: Record<string, LocationCategory> = {
  // Loading ports
  'CNNAN': 'LOADING_PORT',
  'CNSHA': 'LOADING_PORT',
  'CNNSA': 'LOADING_PORT',
  
  // Transit ports
  'SGSIN': 'TRANSIT_PORT',
  'GHTEM': 'TRANSIT_PORT',
  'MYPKG': 'TRANSIT_PORT',
  
  // Discharge ports (main arrival ports in West Africa)
  'SNDKR': 'DISCHARGE_PORT',    // Dakar, Senegal
  'CIABJ': 'DISCHARGE_PORT',    // Abidjan, Côte d'Ivoire
  'TGLFW': 'DISCHARGE_PORT',    // Lomé, Togo
  'NGLOS': 'DISCHARGE_PORT',    // Lagos, Nigeria
  
  // Border crossings
  'SNML': 'BORDER',
  'SN_ML_BDR': 'BORDER',
  'DBL': 'BORDER',
  'DIBOLI': 'BORDER',
  
  // Customs
  'SN_DKR_CUS': 'CUSTOMS',
  'ML_DIB_CUS': 'CUSTOMS',
  
  // Warehouse/Final destination
  'MLBKQ': 'WAREHOUSE',
  'MLBKO': 'WAREHOUSE',
  'BKO': 'WAREHOUSE',
};

/**
 * Get location category from location code
 */
export const getLocationCategory = (locationCode: string): LocationCategory => {
  const upperCode = locationCode.toUpperCase();
  return PORT_CATEGORIES[upperCode] || 'ROAD_TRANSIT';
};

// ============================================
// PORT-SPECIFIC STATUS OPTIONS
// ============================================

/**
 * Status options for DISCHARGE ports (Dakar, Lomé, Abidjan)
 */
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

/**
 * Status options for BORDER crossings
 */
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

/**
 * Status options for WAREHOUSE
 */
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
    icon: 'warehouse',
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

/**
 * Standard status options for other locations
 */
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

/**
 * Get available status options based on location category
 */
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

/**
 * Get all possible next statuses for a location
 */
export const getAllNextStatuses = (
  locationCode: string,
  currentStatus: ExtendedWaypointStatus
): ExtendedWaypointStatus[] => {
  const options = getStatusOptionsForLocation(locationCode, currentStatus);
  return options.map((opt) => opt.status);
};

/**
 * Check if a status transition is valid
 */
export const isValidStatusTransition = (
  locationCode: string,
  currentStatus: ExtendedWaypointStatus,
  newStatus: ExtendedWaypointStatus
): boolean => {
  const options = getStatusOptionsForLocation(locationCode, currentStatus);
  return options.some((opt) => opt.status === newStatus);
};

/**
 * Get status label for display
 */
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

/**
 * Get status color for UI
 */
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

/**
 * Get status icon
 */
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

// ============================================
// QUICK ACTION DEFINITIONS
// ============================================

/**
 * Quick action for admin to quickly update status
 */
export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  targetStatus: ExtendedWaypointStatus;
  category: LocationCategory[];
  requiredCurrentStatus: ExtendedWaypointStatus[];
  confirmationMessage?: string;
}

/**
 * Predefined quick actions for common operations
 */
export const QUICK_ACTIONS: QuickAction[] = [
  // Discharge port actions
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
  
  // Border actions
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
  
  // Warehouse actions
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

/**
 * Get quick actions available for a location and status
 */
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

// ============================================
// STATUS FLOW CHART DATA
// ============================================

/**
 * Get the expected status flow for a location type
 */
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
