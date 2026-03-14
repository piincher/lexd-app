/**
 * Container Feature Types - Phase 3 with Route Integration
 * Domain types for container management, packing lists, and route selection
 * Updated: Added FinalDestination type and Dakar route constants
 * Updated Phase 4: Added packing and loading list types
 */

// ============================================
// BASE TYPES
// ============================================

export * from './waypoints';
export * from './waypointStatus';
export * from './packingList';

// ============================================
// CONTAINER WAYPOINT TRACKER PROPS
// ============================================

import { ContainerWaypoint } from './waypoints';
import { ExtendedWaypointStatus } from './waypointStatus';

export interface ContainerWaypointTrackerProps {
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  onMarkArrived?: (waypointIndex: number, status?: ExtendedWaypointStatus) => void;
  onMarkDeparted?: (waypointIndex: number, status?: ExtendedWaypointStatus) => void;
  onAddNotes?: (waypointIndex: number) => void;
  onUpdateInfo?: (waypointIndex: number) => void;
  onUpdateStatus?: (waypointIndex: number, status: ExtendedWaypointStatus) => void;
  containerNumber: string;
  finalDestination?: FinalDestination;
  consignee?: ConsigneeInfo;
}

// ============================================
// ROUTE TYPES (Phase 3)
// ============================================

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

// ============================================
// FINAL DESTINATION TYPE
// ============================================

/**
 * Final destination information with consignee details
 */
export interface FinalDestination {
  city: string;
  country: string;
  warehouse: string;
  consignee: {
    name: string;
    phone: string;
    email?: string;
  };
}

// ============================================
// DOMAIN ENTITIES
// ============================================

/**
 * Container status lifecycle
 * Phase 3: Added READY_FOR_PICKUP for pickup workflow
 */
export type ContainerStatus = 
  | 'BOOKED' 
  | 'EMPTY_TO_WAREHOUSE'
  | 'LOADING' 
  | 'LOADED' 
  | 'IN_TRANSIT' 
  | 'ARRIVED'
  | 'READY_FOR_PICKUP';

/**
 * Timeline step definition for UI
 */
export interface TimelineStep {
  status: ContainerStatus;
  label: string;
  icon: string;
}

/**
 * Timeline steps configuration
 * Phase 3: Added READY_FOR_PICKUP to timeline
 */
export const TIMELINE_STEPS: TimelineStep[] = [
  { status: 'BOOKED', label: 'Réservé', icon: 'bookmark' },
  { status: 'EMPTY_TO_WAREHOUSE', label: 'Vide vers Entrepôt', icon: 'cube-outline' },
  { status: 'LOADING', label: 'Chargement', icon: 'hammer' },
  { status: 'LOADED', label: 'Chargé', icon: 'cube' },
  { status: 'IN_TRANSIT', label: 'Transit', icon: 'airplane' },
  { status: 'ARRIVED', label: 'Arrivé', icon: 'flag' },
  { status: 'READY_FOR_PICKUP', label: 'Retrait', icon: 'checkmark-done' },
];

/**
 * Shipping line carriers
 */
export type ShippingLine = 'MSC' | 'MAERSK' | 'CMA_CGM' | 'HAPAG_LLOYD' | 'ETHIOPIAN_AIRLINES' | 'AIR_STANDARD';

/**
 * Timeline tracking for container journey
 */
export interface ContainerTimeline {
  bookedAt: string;
  emptyDispatchedAt?: string;
  loadingStartedAt?: string;
  loadingCompletedAt?: string;
  departedAt?: string;
  arrivedAt?: string;
  readyForPickupAt?: string;
  estimatedDeparture?: string;
  estimatedArrival?: string;
}

/**
 * Consignee information (populated)
 */
export interface ConsigneeInfo {
  _id: string;
  name: string;
  phone: string;
  warehouseAddress: string;
  email?: string;
  businessHours?: string;
}

// Import Goods type
import { Goods } from '../../goods/types';

/**
 * Core Container entity
 */
export interface Container {
  _id: string;
  virtualContainerNumber: string;
  shippingMode: ShippingMode;
  shippingLine: ShippingLine;
  routeId: string;
  route?: {
    _id: string;
    name: string;
    shippingMode: 'SEA' | 'AIR';
    shippingLine: string;
    estimatedTransitDays: number;
    origin: string;
    destination: string;
  };
  consigneeId: string | ConsigneeInfo;
  status: ContainerStatus;
  goodsIds: string[] | Goods[];
  goods?: Goods[];
  totalCBM: number;
  createdBy: string;
  actualContainerNumber?: string;
  bookingReference?: string;
  timeline: ContainerTimeline;
  createdAt: string;
  updatedAt: string;
  // Virtuals
  goodsCount?: number;
  isFullyPaid?: boolean;
  // Waypoints (Phase 4)
  waypoints?: import('./waypoints').ContainerWaypoint[];
  currentWaypointIndex?: number;
  waypointTemplateUsed?: string;
}

// ============================================
// DTOs (Data Transfer Objects)
// ============================================

/**
 * Input for creating a container
 */
export interface CreateContainerInput {
  shippingMode: ShippingMode;
  shippingLine: ShippingLine;
  routeId: string;
  consigneeId: string;
  actualContainerNumber?: string;
  bookingReference?: string;
}

/**
 * Input for updating container status
 */
export interface UpdateContainerStatusInput {
  status: ContainerStatus;
  timeline?: Partial<ContainerTimeline>;
}

/**
 * Input for assigning goods to container
 */
export interface AssignGoodsInput {
  goodsIds: string[];
}

/**
 * Input for removing goods from container
 */
export interface RemoveGoodsInput {
  goodsIds: string[];
}

// ============================================
// FILTER & QUERY TYPES
// ============================================

/**
 * Container filters
 */
export interface ContainerFilters {
  status?: ContainerStatus;
  shippingMode?: ShippingMode;
  shippingLine?: ShippingLine;
  consigneeId?: string;
  routeId?: string;
}

/**
 * Route filters
 */
export interface RouteFilters {
  shippingMode?: ShippingMode;
  isActive?: boolean;
}

// ============================================
// PACKING LIST TYPES
// ============================================

/**
 * Packing list item (goods detail for document)
 */
export interface PackingListItem {
  itemNo: number;
  goodsId: string;
  description: string;
  clientName: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  actualCBM: number;
  weight: number;
  quantity: number;
  photos?: string[];
}

/**
 * Packing list summary
 */
export interface PackingListSummary {
  totalItems: number;
  totalCBM: number;
  totalWeight: number;
  totalPackages: number;
}

/**
 * Complete packing list document
 */
export interface PackingList {
  containerNumber: string;
  shippingLine: string;
  shippingMode: ShippingMode;
  shippingLineLabel: string;
  consignee: ConsigneeInfo;
  generatedAt: string;
  generatedBy: string;
  items: PackingListItem[];
  summary: PackingListSummary;
  route: {
    origin: string;
    destination: string;
    estimatedTransitDays: number;
  };
  tracking: {
    status: string;
    statusLabel: string;
    estimatedArrival?: string;
  };
  pickupInstructions?: string;
}

// ============================================
// UI STATE TYPES
// ============================================

/**
 * Container form data
 */
export interface ContainerFormData {
  shippingMode: ShippingMode | '';
  shippingLine: ShippingLine | '';
  routeId: string;
  consigneeId: string;
  actualContainerNumber: string;
  bookingReference: string;
}

// ============================================
// DISPLAY CONSTANTS
// ============================================

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
 * Container status display labels
 * Phase 3: Added READY_FOR_PICKUP label
 */
export const CONTAINER_STATUS_LABELS: Record<ContainerStatus, string> = {
  BOOKED: 'Réservé',
  EMPTY_TO_WAREHOUSE: 'Vide vers Entrepôt',
  LOADING: 'En Chargement',
  LOADED: 'Chargé',
  IN_TRANSIT: 'En Transit',
  ARRIVED: 'Arrivé',
  READY_FOR_PICKUP: 'Prêt pour Retrait',
};

/**
 * Status colors for UI
 * Phase 3: Added READY_FOR_PICKUP color (orange)
 */
export const CONTAINER_STATUS_COLORS: Record<ContainerStatus, string> = {
  BOOKED: '#8B5CF6',
  EMPTY_TO_WAREHOUSE: '#6366F1',
  LOADING: '#F59E0B',
  LOADED: '#3B82F6',
  IN_TRANSIT: '#EC4899',
  ARRIVED: '#10B981',
  READY_FOR_PICKUP: '#F97316',
};

/**
 * Shipping mode colors
 */
export const SHIPPING_MODE_COLORS: Record<ShippingMode, string> = {
  SEA: '#0EA5E9', // Ocean blue
  AIR: '#8B5CF6', // Purple
};

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
