/**
 * Customer Container Feature Types
 * Types for customer-facing container tracking with Maersk-style timeline
 */

// Re-export tracking types
export * from './tracking';

import { GoodsStatus } from '../../../goods/types';

// ============================================
// STATUS TYPES
// ============================================

/**
 * Container status for customer tracking (simplified from admin status)
 */
export type CustomerContainerStatus =
  | 'BOOKED'
  | 'IN_TRANSIT'
  | 'ARRIVED'
  | 'READY_FOR_PICKUP'
  | 'DELIVERED';

/**
 * Shipping mode
 */
export type ShippingMode = 'SEA' | 'AIR';

/**
 * Shipping line carriers
 */
export type ShippingLine = 'MSC' | 'MAERSK' | 'CMA_CGM' | 'HAPAG_LLOYD' | 'ETHIOPIAN_AIRLINES' | 'AIR_STANDARD';

// ============================================
// DOMAIN ENTITIES
// ============================================

/**
 * Customer's goods within a container
 */
export interface CustomerGoodsInContainer {
  _id: string;
  goodsId: string;
  description: string;
  actualCBM: number;
  weight: number;
  status: GoodsStatus;
  photos?: string[];
}

/**
 * Container route information
 */
export interface ContainerRoute {
  name: string;
  origin: string;
  destination: string;
  estimatedTransitDays: number;
}

/**
 * Container timeline for tracking
 */
export interface ContainerTimeline {
  bookedAt: string;
  loadingStartedAt?: string;
  loadingCompletedAt?: string;
  departedAt?: string;
  arrivedAt?: string;
  readyForPickupAt?: string;
  deliveredAt?: string;
}

/**
 * Customer-facing container entity
 * Customer only sees their own goods in the container
 */
export interface CustomerContainer {
  _id: string;
  virtualContainerNumber: string;
  shippingMode: ShippingMode;
  shippingLine: ShippingLine;
  status: CustomerContainerStatus;
  route: ContainerRoute;
  timeline: ContainerTimeline;
  myGoods: CustomerGoodsInContainer[];
  estimatedArrival?: string;
  pickupContact?: {
    name: string;
    phone: string;
    address: string;
  };
}

// ============================================
// FILTER & QUERY TYPES
// ============================================

/**
 * Filters for customer's containers
 */
export interface CustomerContainerFilters {
  status?: CustomerContainerStatus;
  shippingMode?: ShippingMode;
}

// ============================================
// UI DISPLAY CONSTANTS
// ============================================

/**
 * Customer container status display labels (French)
 */
export const CUSTOMER_STATUS_LABELS: Record<CustomerContainerStatus, string> = {
  BOOKED: 'Réservé',
  IN_TRANSIT: 'En Transit',
  ARRIVED: 'Arrivé',
  READY_FOR_PICKUP: 'Prêt pour Retrait',
  DELIVERED: 'Livré',
};

/**
 * Customer container status colors
 */
export const CUSTOMER_STATUS_COLORS: Record<CustomerContainerStatus, string> = {
  BOOKED: '#8B5CF6',      // Purple
  IN_TRANSIT: '#0EA5E9',  // Ocean blue
  ARRIVED: '#10B981',     // Green
  READY_FOR_PICKUP: '#F59E0B', // Amber
  DELIVERED: '#22C55E',   // Success green
};

/**
 * Status colors for backgrounds
 */
export const CUSTOMER_STATUS_BG_COLORS: Record<CustomerContainerStatus, string> = {
  BOOKED: '#EDE9FE',
  IN_TRANSIT: '#E0F2FE',
  ARRIVED: '#D1FAE5',
  READY_FOR_PICKUP: '#FEF3C7',
  DELIVERED: '#DCFCE7',
};

/**
 * Shipping mode display labels (French)
 */
export const SHIPPING_MODE_LABELS: Record<ShippingMode, string> = {
  SEA: 'Maritime',
  AIR: 'Aérien',
};

/**
 * Shipping line display names
 */
export const SHIPPING_LINE_LABELS: Record<ShippingLine, string> = {
  MSC: 'MSC',
  MAERSK: 'Maersk Line',
  CMA_CGM: 'CMA CGM',
  HAPAG_LLOYD: 'Hapag-Lloyd',
  ETHIOPIAN_AIRLINES: 'Ethiopian Airlines',
  AIR_STANDARD: 'Air Freight',
};

/**
 * Timeline step labels (French)
 */
export const TIMELINE_STEP_LABELS: Record<keyof ContainerTimeline, string> = {
  bookedAt: 'Réservé',
  loadingStartedAt: 'Chargement Commencé',
  loadingCompletedAt: 'Chargement Terminé',
  departedAt: 'Départ',
  arrivedAt: 'Arrivé',
  readyForPickupAt: 'Prêt pour Retrait',
  deliveredAt: 'Livré',
};

/**
 * Order of timeline steps for display
 */
export const TIMELINE_STEPS_ORDER: (keyof ContainerTimeline)[] = [
  'bookedAt',
  'departedAt',
  'arrivedAt',
  'readyForPickupAt',
  'deliveredAt',
];

/**
 * Customer-visible steps only (simplified timeline)
 */
export const CUSTOMER_TIMELINE_STEPS: { key: keyof ContainerTimeline; label: string }[] = [
  { key: 'bookedAt', label: 'Réservé' },
  { key: 'departedAt', label: 'En Transit' },
  { key: 'arrivedAt', label: 'Arrivé' },
  { key: 'readyForPickupAt', label: 'Prêt' },
  { key: 'deliveredAt', label: 'Livré' },
];

// ============================================
// WAYPOINT TYPES (Container Tracking)
// ============================================

/**
 * Waypoint location types
 */
export type WaypointType = 'PORT' | 'ROAD_TRANSIT' | 'BORDER' | 'WAREHOUSE' | 'CUSTOMS';

/**
 * Waypoint status in the journey
 */
export type WaypointStatus = 'PENDING' | 'IN_TRANSIT' | 'ARRIVED' | 'DEPARTED';

/**
 * Transport mode for a waypoint segment
 */
export type TransportMode = 'SEA' | 'ROAD' | 'RAIL';

/**
 * Individual waypoint in container journey (customer view - simplified)
 */
export interface ContainerWaypoint {
  order: number;
  location: string;
  locationCode: string;
  type: WaypointType;
  status: WaypointStatus;
  coordinates?: { lat: number; lng: number };
  estimatedArrival?: string;
  actualArrival?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  vesselName?: string;
  vesselIMO?: string;
  transportMode: TransportMode;
  carrier?: string;
  truckPlate?: string;
  driverName?: string;
  driverPhone?: string;
  notes?: string;
}

/**
 * Waypoint status display labels (French) - Customer friendly
 */
export const WAYPOINT_STATUS_LABELS: Record<WaypointStatus, string> = {
  PENDING: 'En Attente',
  IN_TRANSIT: 'En Transit',
  ARRIVED: 'Arrivé',
  DEPARTED: 'Parti',
};

/**
 * Waypoint type display labels (French)
 */
export const WAYPOINT_TYPE_LABELS: Record<WaypointType, string> = {
  PORT: 'Port',
  ROAD_TRANSIT: 'Transit',
  BORDER: 'Frontière',
  WAREHOUSE: 'Entrepôt',
  CUSTOMS: 'Douane',
};

/**
 * Waypoint type icons
 */
export const WAYPOINT_TYPE_ICONS: Record<WaypointType, string> = {
  PORT: 'boat',
  ROAD_TRANSIT: 'car',
  BORDER: 'flag',
  WAREHOUSE: 'cube',
  CUSTOMS: 'shield-checkmark',
};

/**
 * Transport mode display labels (French)
 */
export const TRANSPORT_MODE_LABELS: Record<TransportMode, string> = {
  SEA: 'Maritime',
  ROAD: 'Routier',
  RAIL: 'Ferroviaire',
};

/**
 * Transport mode icons
 */
export const TRANSPORT_MODE_ICONS: Record<TransportMode, string> = {
  SEA: 'boat',
  ROAD: 'car',
  RAIL: 'train',
};

/**
 * Waypoint type colors for customer UI
 */
export const CUSTOMER_WAYPOINT_TYPE_COLORS: Record<WaypointType, string> = {
  PORT: '#0EA5E9',
  ROAD_TRANSIT: '#F59E0B',
  BORDER: '#8B5CF6',
  WAREHOUSE: '#10B981',
  CUSTOMS: '#EF4444',
};

// ============================================
// ROUTE DISPLAY CONSTANTS (Dakar Route)
// ============================================

/**
 * Route display constants for Dakar-Bamako route
 */
export const ROUTE_DISPLAY = {
  SEA_ROUTE: 'Chine → Dakar (Sénégal)',
  ROAD_ROUTE: 'Dakar → Diboli → Bamako',
  FINAL_DESTINATION: 'Warehouse Bamako, Mali',
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
