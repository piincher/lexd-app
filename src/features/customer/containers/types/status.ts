import { CUSTOMER_CONTAINER_STATUS_LABELS } from '@src/shared/lib/customerStatus';

/**
 * Customer Container Status Types and Constants
 */

/**
 * Container status for customer tracking (simplified from admin status)
 */
export type CustomerContainerStatus =
  | 'BOOKED'
  | 'EMPTY_TO_WAREHOUSE'
  | 'LOADING'
  | 'LOADED'
  | 'GATE_IN_FULL'
  | 'LOADED_ON_VESSEL'
  | 'IN_TRANSIT'
  | 'ARRIVED'
  | 'DISCHARGED'
  | 'READY_FOR_PICKUP'
  | 'DELIVERED';

/**
 * Customer container status display labels (French)
 */
export const CUSTOMER_STATUS_LABELS: Record<CustomerContainerStatus, string> =
  CUSTOMER_CONTAINER_STATUS_LABELS as Record<CustomerContainerStatus, string>;

/**
 * Customer container status colors
 */
export const CUSTOMER_STATUS_COLORS: Record<CustomerContainerStatus, string> = {
  BOOKED: '#8B5CF6',      // Purple
  EMPTY_TO_WAREHOUSE: '#6366F1', // Indigo
  LOADING: '#F59E0B',     // Amber
  LOADED: '#3B82F6',      // Blue
  GATE_IN_FULL: '#06B6D4', // Cyan
  LOADED_ON_VESSEL: '#2563EB', // Blue
  IN_TRANSIT: '#0EA5E9',  // Ocean blue
  ARRIVED: '#10B981',     // Green
  DISCHARGED: '#14B8A6',  // Teal
  READY_FOR_PICKUP: '#F59E0B', // Amber
  DELIVERED: '#22C55E',   // Success green
};

/**
 * Derive status background from foreground color with reduced opacity.
 * Usage: CUSTOMER_STATUS_COLORS[status] + '15'
 */
