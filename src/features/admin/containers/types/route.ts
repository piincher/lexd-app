import { ShippingLine } from './shipping';

/**
 * Shipping mode for route selection
 */
export type ShippingMode = 'SEA' | 'AIR';

/**
 * Route entity for container routing
 */
export interface Route {
  _id: string;
  name: string;
  shippingMode: ShippingMode;
  shippingLine: ShippingLine;
  origin: string;
  destination: string;
  estimatedTransitDays: number;
  description?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Populated route info on container (simplified)
 */
export interface RouteInfo {
  _id: string;
  name: string;
  shippingMode: ShippingMode;
  shippingLine: ShippingLine;
  origin: string;
  destination: string;
  estimatedTransitDays: number;
  description?: string;
}

/**
 * Route filters
 */
export interface RouteFilters {
  shippingMode?: ShippingMode;
  isActive?: boolean;
}

// ============================================
// ROUTE TEMPLATE TYPES
// ============================================

/**
 * Template waypoint for route import
 */
export interface TemplateWaypoint {
  location: string;
  locationCode: string;
  type: string;
}

/**
 * Template sea segment for route import
 */
export interface TemplateSeaSegment {
  fromPort: string;
  toPort: string;
  carrier: string;
}

/**
 * Template road segment for route import
 */
export interface TemplateRoadSegment {
  fromLocation: string;
  toLocation: string;
  carrier: string;
}

/**
 * Route template for importing waypoints
 */
export interface RouteTemplate {
  id: string;
  name: string;
  description: string;
  waypoints: TemplateWaypoint[];
  seaSegments?: TemplateSeaSegment[];
  roadSegments?: TemplateRoadSegment[];
}

// ============================================
// SEGMENT TYPES (for display)
// ============================================

/**
 * Sea segment for display
 */
export interface SeaSegment {
  fromPort: string;
  toPort: string;
  vesselName?: string;
  vesselIMO?: string;
  carrier: string;
  departureDate?: string;
  estimatedArrival?: string;
}

/**
 * Road segment for display
 */
export interface RoadSegment {
  fromLocation: string;
  toLocation: string;
  truckPlate?: string;
  driverName?: string;
  driverPhone?: string;
  carrier?: string;
  estimatedTransitHours?: number;
}

// ============================================
// ROUTE DISPLAY CONSTANTS (Dakar Route)
// ============================================

/**
 * Route display labels for Dakar-Bamako route
 */
export const ROUTE_DISPLAY = {
  SEA_ROUTE: 'Chine → Dakar (Sénégal)',
  ROAD_ROUTE: 'Dakar → Diboli → Bamako',
  FINAL_DESTINATION: 'Warehouse Bamako, Mali',
  MAIN_PORT: 'Dakar',
  BORDER_CROSSING: 'Diboli',
} as const;

/**
 * Waypoint location codes for Dakar route
 */
export const WAYPOINT_LOCATIONS = {
  NANSHA: { code: 'NNS', name: 'Nansha', country: 'CN' },
  DAKAR: { code: 'DKR', name: 'Dakar', country: 'SN' },
  DIBOLI: { code: 'DBL', name: 'Diboli', country: 'ML' },
  BAMAKO: { code: 'BKO', name: 'Bamako', country: 'ML' },
} as const;

/**
 * Route description templates
 */
export const ROUTE_DESCRIPTIONS = {
  SEA_TO_DAKAR: 'Transport maritime de Nansha (Chine) vers Dakar (Sénégal)',
  ROAD_TO_BAMAKO: 'Transport routier Dakar → Diboli (frontière) → Bamako',
  COMPLETE_ROUTE: 'Nansha → [Transit] → DAKAR (Port d\'arrivée) → Diboli (Douane) → Bamako (Retrait)',
} as const;
