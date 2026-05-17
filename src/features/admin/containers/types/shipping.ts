import { ShippingMode } from './route';

/**
 * Shipping line carriers
 */
export type ShippingLine = 'MSC' | 'MAERSK' | 'CMA_CGM' | 'HAPAG_LLOYD' | 'ETHIOPIAN_AIRLINES' | 'AIR_STANDARD';

/**
 * Shipping mode display names
 */
export const SHIPPING_MODE_LABELS: Record<ShippingMode, string> = {
  SEA: 'Maritime (SEA)',
  AIR: 'Aérien (AIR)',
};

/**
 * Shipping mode icons
 */
export const SHIPPING_MODE_ICONS: Record<ShippingMode, string> = {
  SEA: 'boat',
  AIR: 'airplane',
};

/**
 * Shipping line display names
 */
export const SHIPPING_LINE_LABELS: Record<ShippingLine, string> = {
  MSC: 'MSC - Mediterranean Shipping',
  MAERSK: 'Maersk Line',
  CMA_CGM: 'CMA CGM',
  HAPAG_LLOYD: 'Hapag-Lloyd',
  ETHIOPIAN_AIRLINES: 'Ethiopian Airlines',
  AIR_STANDARD: 'Air Freight Standard',
};

/**
 * Shipping mode colors
 */
export const SHIPPING_MODE_COLORS: Record<ShippingMode, string> = {
  SEA: '#0EA5E9', // Ocean blue
  AIR: '#8B5CF6', // Purple
};
