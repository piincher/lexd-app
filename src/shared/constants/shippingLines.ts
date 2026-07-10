/**
 * Canonical shipping-line configuration for the mobile app.
 *
 * This is the single source of truth for supported sea-freight carriers in the UI.
 * Any new line must be added here and here only. Types, filters, labels, colors,
 * route presets and packing-list helpers should derive from this file.
 */

/**
 * Supported sea-freight shipping lines.
 */
export const SEA_SHIPPING_LINES = [
  'MSC',
  'MAERSK',
  'CMA_CGM',
  'HAPAG_LLOYD',
  'EVERGREEN',
] as const;

/**
 * All shipping lines including air carriers.
 */
export const SHIPPING_LINES = [
  ...SEA_SHIPPING_LINES,
  'ETHIOPIAN_AIRLINES',
  'AIR_STANDARD',
] as const;

/**
 * Human-readable labels for shipping lines.
 */
export const SHIPPING_LINE_LABELS: Record<ShippingLine, string> = {
  MSC: 'MSC',
  MAERSK: 'Maersk Line',
  CMA_CGM: 'CMA CGM',
  HAPAG_LLOYD: 'Hapag-Lloyd',
  EVERGREEN: 'Evergreen Line',
  ETHIOPIAN_AIRLINES: 'Ethiopian Airlines',
  AIR_STANDARD: 'Air Freight Standard',
};

/**
 * Brand/Chart colors for shipping lines.
 */
export const SHIPPING_LINE_COLORS: Record<SeaShippingLine | 'AIR', string> = {
  MSC: '#1E40AF',
  MAERSK: '#E11D48',
  CMA_CGM: '#059669',
  HAPAG_LLOYD: '#D97706',
  EVERGREEN: '#007A33',
  AIR: '#7C3AED',
};

/**
 * Default waypoint presets per shipping line for the route form.
 */
export const SHIPPING_LINE_WAYPOINT_PRESETS: Record<SeaShippingLine, readonly string[]> = {
  MSC: ['Nansha', 'Dakar', 'Diboli', 'Bamako'],
  MAERSK: ['Nansha', 'Abidjan', 'Dakar', 'Diboli', 'Bamako'],
  CMA_CGM: ['Nansha', 'Singapore', 'Dakar', 'Diboli', 'Bamako'],
  HAPAG_LLOYD: ['Nansha', 'Lagos', 'Dakar', 'Diboli', 'Bamako'],
  EVERGREEN: ['Nansha', 'Dakar', 'Diboli', 'Bamako'],
};

export type SeaShippingLine = (typeof SEA_SHIPPING_LINES)[number];
export type ShippingLine = (typeof SHIPPING_LINES)[number];
