/**
 * Route Feature Types - Phase 3
 * Domain types for shipping route management
 */

// ============================================
// DOMAIN ENTITIES
// ============================================

/**
 * Shipping mode for routes
 */
export type ShippingMode = 'SEA' | 'AIR';

/**
 * Available shipping lines for SEA mode
 */
export type ShippingLine = 'MSC' | 'MAERSK' | 'CMA_CGM' | 'HAPAG_LLOYD' | 'ETHIOPIAN_AIRLINES';

/**
 * Core Route entity
 */
export interface Route {
  _id: string;
  name: string;
  shippingMode: ShippingMode;
  origin: string;
  destination: string;
  shippingLine: string;
  estimatedTransitDays: number;
  description?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// DTOs (Data Transfer Objects)
// ============================================

/**
 * Input for creating a route
 */
export type CreateRouteInput = Omit<Route, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'>;

/**
 * Input for updating a route
 */
export type UpdateRouteInput = Partial<CreateRouteInput>;

// ============================================
// FILTER & QUERY TYPES
// ============================================

/**
 * Route filters
 */
export interface RouteFilters {
  shippingMode?: ShippingMode;
  isActive?: boolean;
  shippingLine?: string;
}

// ============================================
// UI STATE TYPES
// ============================================

/**
 * Route form data
 */
export interface RouteFormData {
  name: string;
  shippingMode: ShippingMode | '';
  origin: string;
  destination: string;
  shippingLine: ShippingLine | '';
  estimatedTransitDays: string;
  description: string;
  isActive: boolean;
}

// ============================================
// DISPLAY CONSTANTS
// ============================================

/**
 * Shipping mode display labels
 */
export const SHIPPING_MODE_LABELS: Record<ShippingMode, string> = {
  SEA: 'Maritime',
  AIR: 'Aérien',
};

/**
 * Shipping mode colors for UI
 */
export const SHIPPING_MODE_COLORS: Record<ShippingMode, string> = {
  SEA: '#3B82F6', // Blue
  AIR: '#8B5CF6', // Purple
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
};

/**
 * Available shipping lines by mode
 */
export const SHIPPING_LINES_BY_MODE: Record<ShippingMode, ShippingLine[]> = {
  SEA: ['MSC', 'MAERSK', 'CMA_CGM', 'HAPAG_LLOYD'],
  AIR: [], // Air routes don't use shipping lines
};

/**
 * Common origins
 */
export const COMMON_ORIGINS = [
  'Chine (Guangzhou)',
  'Chine (Shenzhen)',
  'Chine (Shanghai)',
  'Chine (Ningbo)',
  'Chine (Qingdao)',
];

/**
 * Common destinations
 */
export const COMMON_DESTINATIONS = [
  'Mali (Bamako)',
  'Sénégal (Dakar)',
  'Côte d\'Ivoire (Abidjan)',
  'Burkina Faso (Ouagadougou)',
  'Niger (Niamey)',
  'Guinée (Conakry)',
  'Bénin (Cotonou)',
  'Togo (Lomé)',
];
