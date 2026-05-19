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
export const getTransitStatusInfo = (colors: any): Record<ContainerTransitStatus, TransitStatusInfo> => ({
  DEPARTED_ORIGIN: {
    status: 'DEPARTED_ORIGIN',
    label: 'Départ Origine',
    description: 'Conteneur parti du port/entrepôt d\'origine',
    icon: 'flag',
    color: colors.status.info,
    waypointIndex: 0,
    allowedPreviousStatuses: [],
    isFinalStatus: false,
  },
  AT_SEA: {
    status: 'AT_SEA',
    label: 'En Transit',
    description: 'En transit vers la destination',
    icon: 'boat',
    color: colors.status.info,
    waypointIndex: 1,
    allowedPreviousStatuses: ['DEPARTED_ORIGIN', 'ARRIVED_TRANSIT_PORT', 'DEPARTED_TRANSIT_PORT'],
    isFinalStatus: false,
  },
  IN_AIR: {
    status: 'IN_AIR',
    label: 'En Transit Aérien',
    description: 'En transit aérien vers la destination',
    icon: 'airplane',
    color: colors.status.info,
    waypointIndex: 1,
    allowedPreviousStatuses: ['DEPARTED_ORIGIN', 'ARRIVED_TRANSIT_PORT', 'DEPARTED_TRANSIT_PORT'],
    isFinalStatus: false,
  },
  ARRIVED_TRANSIT_PORT: {
    status: 'ARRIVED_TRANSIT_PORT',
    label: 'Arrivé Port Transit',
    description: 'Arrivé au port de transit',
    icon: 'anchor',
    color: colors.status.info,
    waypointIndex: 2,
    allowedPreviousStatuses: ['AT_SEA', 'IN_AIR'],
    isFinalStatus: false,
  },
  DEPARTED_TRANSIT_PORT: {
    status: 'DEPARTED_TRANSIT_PORT',
    label: 'Départ Port Transit',
    description: 'Parti du port de transit',
    icon: 'arrow-forward',
    color: colors.status.info,
    waypointIndex: 3,
    allowedPreviousStatuses: ['ARRIVED_TRANSIT_PORT'],
    isFinalStatus: false,
  },
  ARRIVED_DESTINATION_PORT: {
    status: 'ARRIVED_DESTINATION_PORT',
    label: 'Arrivé Port Destination',
    description: 'Arrivé au port de destination finale',
    icon: 'location',
    color: colors.status.success,
    waypointIndex: 4,
    allowedPreviousStatuses: ['AT_SEA', 'DEPARTED_TRANSIT_PORT'],
    isFinalStatus: false,
  },
  CUSTOMS_CLEARANCE: {
    status: 'CUSTOMS_CLEARANCE',
    label: 'Dédouanement',
    description: 'En cours de dédouanement',
    icon: 'document-text',
    color: colors.status.warning,
    waypointIndex: 5,
    allowedPreviousStatuses: ['ARRIVED_DESTINATION_PORT'],
    isFinalStatus: false,
  },
  CUSTOMS_CLEARED: {
    status: 'CUSTOMS_CLEARED',
    label: 'Dédouané',
    description: 'Dédouanement terminé',
    icon: 'checkmark-circle',
    color: colors.status.success,
    waypointIndex: 6,
    allowedPreviousStatuses: ['CUSTOMS_CLEARANCE'],
    isFinalStatus: false,
  },
  INLAND_TRANSPORT: {
    status: 'INLAND_TRANSPORT',
    label: 'Transport Intérieur',
    description: 'Transport routier vers l\'entrepôt final',
    icon: 'car',
    color: colors.accent.rose,
    waypointIndex: 7,
    allowedPreviousStatuses: ['CUSTOMS_CLEARED', 'ARRIVED_DESTINATION_PORT'],
    isFinalStatus: false,
  },
  ARRIVED_WAREHOUSE: {
    status: 'ARRIVED_WAREHOUSE',
    label: 'Arrivé Entrepôt',
    description: 'Arrivé à l\'entrepôt final',
    icon: 'business',
    color: colors.status.info,
    waypointIndex: 8,
    allowedPreviousStatuses: ['INLAND_TRANSPORT'],
    isFinalStatus: false,
  },
  READY_FOR_PICKUP: {
    status: 'READY_FOR_PICKUP',
    label: 'Prêt pour Retrait',
    description: 'Prêt pour le retrait par le client',
    icon: 'checkmark-done',
    color: colors.status.success,
    waypointIndex: 9,
    allowedPreviousStatuses: ['ARRIVED_WAREHOUSE', 'CUSTOMS_CLEARED'],
    isFinalStatus: true,
  },
});

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get French display label for a transit status
 * @param status - The transit status
 * @returns French label string
 */
export const getTransitStatusLabel = (status: ContainerTransitStatus, shippingMode?: 'SEA' | 'AIR'): string => {
  const info = getTransitStatusInfo({ text: { disabled: '#9CA3AF' }, status: { info: '#3B82F6', success: '#10B981', warning: '#F59E0B' }, accent: { rose: '#EC4899' } })[status];
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
 * Get color for a transit status
 * @param status - The transit status
 * @param colors - Theme colors
 * @returns Theme color string
 */
export const getTransitStatusColor = (status: ContainerTransitStatus, colors: any): string => {
  return getTransitStatusInfo(colors)[status]?.color || colors.text.disabled;
};

/**
 * Get Ionicons icon name for a transit status
 * @param status - The transit status
 * @returns Icon name string
 */
export const getTransitStatusIcon = (status: ContainerTransitStatus): string => {
  return getTransitStatusInfo({ text: { disabled: '#9CA3AF' }, status: { info: '#3B82F6', success: '#10B981', warning: '#F59E0B' }, accent: { rose: '#EC4899' } })[status]?.icon || 'ellipse';
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
  const allStatuses = Object.keys(getTransitStatusInfo({ text: { disabled: '#9CA3AF' }, status: { info: '#3B82F6', success: '#10B981', warning: '#F59E0B' }, accent: { rose: '#EC4899' } })) as ContainerTransitStatus[];
  return allStatuses.filter((status) =>
    getTransitStatusInfo({ text: { disabled: '#9CA3AF' }, status: { info: '#3B82F6', success: '#10B981', warning: '#F59E0B' }, accent: { rose: '#EC4899' } })[status].allowedPreviousStatuses.includes(currentStatus)
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
  return getTransitStatusInfo({ text: { disabled: '#9CA3AF' }, status: { info: '#3B82F6', success: '#10B981', warning: '#F59E0B' }, accent: { rose: '#EC4899' } })[to].allowedPreviousStatuses.includes(from);
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
  const statusInfo = getTransitStatusInfo({ text: { disabled: '#9CA3AF' }, status: { info: '#3B82F6', success: '#10B981', warning: '#F59E0B' }, accent: { rose: '#EC4899' } })[status];
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
 * Status colors for quick lookup (theme-aware)
 * @param colors - Theme colors
 * @returns Record of status colors
 */
export const getTransitStatusColors = (colors: any): Record<ContainerTransitStatus, string> => ({
  DEPARTED_ORIGIN: colors.status.info,
  AT_SEA: colors.status.info,
  IN_AIR: colors.status.info,
  ARRIVED_TRANSIT_PORT: colors.status.info,
  DEPARTED_TRANSIT_PORT: colors.status.info,
  ARRIVED_DESTINATION_PORT: colors.status.success,
  CUSTOMS_CLEARANCE: colors.status.warning,
  CUSTOMS_CLEARED: colors.status.success,
  INLAND_TRANSPORT: colors.accent.rose,
  ARRIVED_WAREHOUSE: colors.status.info,
  READY_FOR_PICKUP: colors.status.success,
});

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
  ARRIVED_WAREHOUSE: 'business',
  READY_FOR_PICKUP: 'checkmark-done',
};
