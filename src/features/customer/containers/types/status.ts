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
export const CUSTOMER_STATUS_LABELS: Record<CustomerContainerStatus, string> = {
  BOOKED: 'Réservé',
  EMPTY_TO_WAREHOUSE: 'Container vers entrepôt',
  LOADING: 'Chargement en cours',
  LOADED: 'Container chargé',
  GATE_IN_FULL: 'Container au port',
  LOADED_ON_VESSEL: 'Container sur le bateau',
  IN_TRANSIT: 'En route vers Bamako',
  ARRIVED: 'Arrivé à destination',
  DISCHARGED: 'Déchargement terminé',
  READY_FOR_PICKUP: 'Prêt pour retrait',
  DELIVERED: 'Livré',
};

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
 * Status colors for backgrounds
 */
export const CUSTOMER_STATUS_BG_COLORS: Record<CustomerContainerStatus, string> = {
  BOOKED: '#EDE9FE',
  EMPTY_TO_WAREHOUSE: '#E0E7FF',
  LOADING: '#FEF3C7',
  LOADED: '#DBEAFE',
  GATE_IN_FULL: '#CFFAFE',
  LOADED_ON_VESSEL: '#DBEAFE',
  IN_TRANSIT: '#E0F2FE',
  ARRIVED: '#D1FAE5',
  DISCHARGED: '#CCFBF1',
  READY_FOR_PICKUP: '#FEF3C7',
  DELIVERED: '#DCFCE7',
};
