/**
 * Container Transit Status Types
 * Detailed transit tracking for container journey from origin to destination
 */

// ============================================
// TRANSIT STATUS TYPE
// ============================================

/**
 * Container transit status - detailed tracking of container journey
 * Represents the complete lifecycle of a container in transit
 */
export type ContainerTransitStatus =
  | 'DEPARTED_ORIGIN'
  | 'AT_SEA'
  | 'IN_AIR'
  | 'ARRIVED_TRANSIT_PORT'
  | 'DEPARTED_TRANSIT_PORT'
  | 'ARRIVED_DESTINATION_PORT'
  | 'CUSTOMS_CLEARANCE'
  | 'CUSTOMS_CLEARED'
  | 'INLAND_TRANSPORT'
  | 'ARRIVED_WAREHOUSE'
  | 'READY_FOR_PICKUP';

// ============================================
// TRANSIT STATUS INFO INTERFACE
// ============================================

/**
 * Complete information about a transit status
 * Used for UI display, validation, and workflow management
 */
export interface TransitStatusInfo {
  status: ContainerTransitStatus;
  label: string;
  description: string;
  icon: string;
  color: string;
  waypointIndex: number;
  allowedPreviousStatuses: ContainerTransitStatus[];
  isFinalStatus: boolean;
}

// ============================================
// TRANSIT STATUS DEFINITIONS
// ============================================

/**
 * Complete transit status configuration
 * Maps each status to its display properties and workflow rules
 */
export const TRANSIT_STATUS_INFO: Record<ContainerTransitStatus, TransitStatusInfo> = {
  DEPARTED_ORIGIN: {
    status: 'DEPARTED_ORIGIN',
    label: 'Départ Origine',
    description: 'Conteneur parti du port/entrepôt d\'origine',
    icon: 'flag',
    color: '#3B82F6',
    waypointIndex: 0,
    allowedPreviousStatuses: [],
    isFinalStatus: false,
  },
  AT_SEA: {
    status: 'AT_SEA',
    label: 'En Transit',
    description: 'En transit vers la destination',
    icon: 'boat',
    color: '#0EA5E9',
    waypointIndex: 1,
    allowedPreviousStatuses: ['DEPARTED_ORIGIN', 'ARRIVED_TRANSIT_PORT', 'DEPARTED_TRANSIT_PORT'],
    isFinalStatus: false,
  },
  IN_AIR: {
    status: 'IN_AIR',
    label: 'En Transit Aérien',
    description: 'En transit aérien vers la destination',
    icon: 'airplane',
    color: '#0EA5E9',
    waypointIndex: 1,
    allowedPreviousStatuses: ['DEPARTED_ORIGIN', 'ARRIVED_TRANSIT_PORT', 'DEPARTED_TRANSIT_PORT'],
    isFinalStatus: false,
  },
  ARRIVED_TRANSIT_PORT: {
    status: 'ARRIVED_TRANSIT_PORT',
    label: 'Arrivé Port Transit',
    description: 'Arrivé au port de transit',
    icon: 'anchor',
    color: '#8B5CF6',
    waypointIndex: 2,
    allowedPreviousStatuses: ['AT_SEA', 'IN_AIR'],
    isFinalStatus: false,
  },
  DEPARTED_TRANSIT_PORT: {
    status: 'DEPARTED_TRANSIT_PORT',
    label: 'Départ Port Transit',
    description: 'Parti du port de transit',
    icon: 'arrow-forward',
    color: '#6366F1',
    waypointIndex: 3,
    allowedPreviousStatuses: ['ARRIVED_TRANSIT_PORT'],
    isFinalStatus: false,
  },
  ARRIVED_DESTINATION_PORT: {
    status: 'ARRIVED_DESTINATION_PORT',
    label: 'Arrivé Port Destination',
    description: 'Arrivé au port de destination finale',
    icon: 'location',
    color: '#10B981',
    waypointIndex: 4,
    allowedPreviousStatuses: ['AT_SEA', 'DEPARTED_TRANSIT_PORT'],
    isFinalStatus: false,
  },
  CUSTOMS_CLEARANCE: {
    status: 'CUSTOMS_CLEARANCE',
    label: 'Dédouanement',
    description: 'En cours de dédouanement',
    icon: 'document-text',
    color: '#F59E0B',
    waypointIndex: 5,
    allowedPreviousStatuses: ['ARRIVED_DESTINATION_PORT'],
    isFinalStatus: false,
  },
  CUSTOMS_CLEARED: {
    status: 'CUSTOMS_CLEARED',
    label: 'Dédouané',
    description: 'Dédouanement terminé',
    icon: 'checkmark-circle',
    color: '#10B981',
    waypointIndex: 6,
    allowedPreviousStatuses: ['CUSTOMS_CLEARANCE'],
    isFinalStatus: false,
  },
  INLAND_TRANSPORT: {
    status: 'INLAND_TRANSPORT',
    label: 'Transport Intérieur',
    description: 'Transport routier vers l\'entrepôt final',
    icon: 'car',
    color: '#EC4899',
    waypointIndex: 7,
    allowedPreviousStatuses: ['CUSTOMS_CLEARED', 'ARRIVED_DESTINATION_PORT'],
    isFinalStatus: false,
  },
  ARRIVED_WAREHOUSE: {
    status: 'ARRIVED_WAREHOUSE',
    label: 'Arrivé Entrepôt',
    description: 'Arrivé à l\'entrepôt final',
    icon: 'warehouse',
    color: '#8B5CF6',
    waypointIndex: 8,
    allowedPreviousStatuses: ['INLAND_TRANSPORT'],
    isFinalStatus: false,
  },
  READY_FOR_PICKUP: {
    status: 'READY_FOR_PICKUP',
    label: 'Prêt pour Retrait',
    description: 'Prêt pour le retrait par le client',
    icon: 'checkmark-done',
    color: '#059669',
    waypointIndex: 9,
    allowedPreviousStatuses: ['ARRIVED_WAREHOUSE', 'CUSTOMS_CLEARED'],
    isFinalStatus: true,
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get French display label for a transit status
 * @param status - The transit status
 * @returns French label string
 */
export const getTransitStatusLabel = (status: ContainerTransitStatus, shippingMode?: 'SEA' | 'AIR'): string => {
  const info = TRANSIT_STATUS_INFO[status];
  if (!info) return status;
  // Shipping-mode-aware labels
  if (status === 'AT_SEA' && shippingMode === 'AIR') {
    return 'En Transit Aérien';
  }
  if (status === 'AT_SEA' && shippingMode === 'SEA') {
    return 'En Mer';
  }
  return info.label;
};

/**
 * Get color hex code for a transit status
 * @param status - The transit status
 * @returns Hex color string
 */
export const getTransitStatusColor = (status: ContainerTransitStatus): string => {
  return TRANSIT_STATUS_INFO[status]?.color || '#9CA3AF';
};

/**
 * Get Ionicons icon name for a transit status
 * @param status - The transit status
 * @returns Icon name string
 */
export const getTransitStatusIcon = (status: ContainerTransitStatus): string => {
  return TRANSIT_STATUS_INFO[status]?.icon || 'ellipse';
};

/**
 * Get all allowed next statuses from current status
 * Based on the allowedPreviousStatuses of potential next statuses
 * @param currentStatus - Current transit status
 * @returns Array of allowed next statuses
 */
export const getAllowedNextStatuses = (
  currentStatus: ContainerTransitStatus
): ContainerTransitStatus[] => {
  const allStatuses = Object.keys(TRANSIT_STATUS_INFO) as ContainerTransitStatus[];
  return allStatuses.filter((status) =>
    TRANSIT_STATUS_INFO[status].allowedPreviousStatuses.includes(currentStatus)
  );
};

/**
 * Check if a status transition is valid
 * @param from - Current status
 * @param to - Target status
 * @returns True if transition is valid
 */
export const isValidTransitTransition = (
  from: ContainerTransitStatus,
  to: ContainerTransitStatus
): boolean => {
  return TRANSIT_STATUS_INFO[to].allowedPreviousStatuses.includes(from);
};

/**
 * Calculate progress percentage based on current status
 * @param status - Current transit status
 * @param totalWaypoints - Total number of waypoints in route (default: 10)
 * @returns Progress percentage (0-100)
 */
export const getTransitProgressPercentage = (
  status: ContainerTransitStatus,
  totalWaypoints: number = 10
): number => {
  const statusInfo = TRANSIT_STATUS_INFO[status];
  if (!statusInfo) return 0;

  const progress = ((statusInfo.waypointIndex + 1) / totalWaypoints) * 100;
  return Math.min(Math.round(progress), 100);
};

// ============================================
// STATUS UPDATE TYPES
// ============================================

/**
 * Single transit status update record
 * Used when updating container transit status
 */
export interface TransitStatusUpdate {
  containerId: string;
  waypointIndex: number;
  status: ContainerTransitStatus;
  timestamp?: string;
  notes?: string;
  additionalData?: {
    notes?: string;
    location?: {
      latitude?: number;
      longitude?: number;
    };
    [key: string]: any;
  };
  updatedBy?: string;
}

// ============================================
// STATUS HISTORY TYPES
// ============================================

/**
 * Complete transit status history for a container
 * Tracks all status changes and timing information
 */
export interface TransitStatusHistory {
  updates: TransitStatusUpdate[];
  currentStatus: ContainerTransitStatus;
  startedAt: string;
  estimatedArrival?: string;
  actualArrival?: string;
}

// ============================================
// DISPLAY CONSTANTS
// ============================================

/**
 * All transit statuses in order
 */
export const TRANSIT_STATUS_ORDER: ContainerTransitStatus[] = [
  'DEPARTED_ORIGIN',
  'AT_SEA',
  'IN_AIR',
  'ARRIVED_TRANSIT_PORT',
  'DEPARTED_TRANSIT_PORT',
  'ARRIVED_DESTINATION_PORT',
  'CUSTOMS_CLEARANCE',
  'CUSTOMS_CLEARED',
  'INLAND_TRANSPORT',
  'ARRIVED_WAREHOUSE',
  'READY_FOR_PICKUP',
];

/**
 * Status labels record for quick lookup
 */
export const TRANSIT_STATUS_LABELS: Record<ContainerTransitStatus, string> = {
  DEPARTED_ORIGIN: 'Départ Origine',
  AT_SEA: 'En Transit',
  IN_AIR: 'En Transit Aérien',
  ARRIVED_TRANSIT_PORT: 'Arrivé Port Transit',
  DEPARTED_TRANSIT_PORT: 'Départ Port Transit',
  ARRIVED_DESTINATION_PORT: 'Arrivé Port Destination',
  CUSTOMS_CLEARANCE: 'Dédouanement',
  CUSTOMS_CLEARED: 'Dédouané',
  INLAND_TRANSPORT: 'Transport Intérieur',
  ARRIVED_WAREHOUSE: 'Arrivé Entrepôt',
  READY_FOR_PICKUP: 'Prêt pour Retrait',
};

/**
 * Status colors record for quick lookup
 */
export const TRANSIT_STATUS_COLORS: Record<ContainerTransitStatus, string> = {
  DEPARTED_ORIGIN: '#3B82F6',
  AT_SEA: '#0EA5E9',
  IN_AIR: '#0EA5E9',
  ARRIVED_TRANSIT_PORT: '#8B5CF6',
  DEPARTED_TRANSIT_PORT: '#6366F1',
  ARRIVED_DESTINATION_PORT: '#10B981',
  CUSTOMS_CLEARANCE: '#F59E0B',
  CUSTOMS_CLEARED: '#10B981',
  INLAND_TRANSPORT: '#EC4899',
  ARRIVED_WAREHOUSE: '#8B5CF6',
  READY_FOR_PICKUP: '#059669',
};

/**
 * Status icons record for quick lookup
 */
export const TRANSIT_STATUS_ICONS: Record<ContainerTransitStatus, string> = {
  DEPARTED_ORIGIN: 'flag',
  AT_SEA: 'boat',
  IN_AIR: 'airplane',
  ARRIVED_TRANSIT_PORT: 'anchor',
  DEPARTED_TRANSIT_PORT: 'arrow-forward',
  ARRIVED_DESTINATION_PORT: 'location',
  CUSTOMS_CLEARANCE: 'document-text',
  CUSTOMS_CLEARED: 'checkmark-circle',
  INLAND_TRANSPORT: 'car',
  ARRIVED_WAREHOUSE: 'warehouse',
  READY_FOR_PICKUP: 'checkmark-done',
};
