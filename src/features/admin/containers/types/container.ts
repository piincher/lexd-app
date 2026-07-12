import { Goods } from '../../goods/types';
import type { ThemeContextType } from '@src/constants/Theme';
import { ShippingMode } from './route';
import { ShippingLine } from './shipping';
import { ConsigneeInfo } from './destination';

/**
 * Container status lifecycle
 * Phase 3: Added READY_FOR_PICKUP for pickup workflow
 */
export type ContainerStatus = 
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

export type ContainerArchiveMode = 'active' | 'archived' | 'all';

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
  { status: 'GATE_IN_FULL', label: 'Entré au Port', icon: 'enter-outline' },
  { status: 'LOADED_ON_VESSEL', label: 'Chargé à Bord', icon: 'boat' },
  { status: 'IN_TRANSIT', label: 'Transit', icon: 'airplane' },
  { status: 'ARRIVED', label: 'Arrivé', icon: 'flag' },
  { status: 'DISCHARGED', label: 'Déchargé', icon: 'archive-outline' },
  { status: 'READY_FOR_PICKUP', label: 'Retrait', icon: 'checkmark-done' },
  { status: 'DELIVERED', label: 'Livré', icon: 'checkmark-done' },
];

/**
 * Timeline tracking for container journey
 */
export interface ContainerTimeline {
  bookedAt: string;
  emptyDispatchedAt?: string;
  loadingStartedAt?: string;
  loadingCompletedAt?: string;
  gateInFullAt?: string;
  loadedOnVesselAt?: string;
  departedAt?: string;
  arrivedAt?: string;
  dischargedAt?: string;
  readyForPickupAt?: string;
  deliveredAt?: string;
  estimatedDeparture?: string;
  estimatedArrival?: string;
}

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
  archived?: boolean;
  archivedAt?: string | null;
  archivedBy?: string | null;
  goodsIds: string[] | Goods[];
  goods?: Goods[];
  totalCBM: number;
  capacityCBM?: number;
  capacityWeight?: number;
  containerNumber?: string;
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
  // Profit / Reconciliation
  reconciliationStatus?: 'PENDING' | 'ESTIMATED' | 'RECONCILED';
  clientTotalCBM?: number;
  clientTotalRevenue?: number;
  agentTotalCBM?: number;
  agentTotalCost?: number;
  realTimeProfit?: number;
  reconciledProfit?: number;
  profitGap?: number;
  unbilledCapacityCost?: number;
  cbmProfit?: {
    revenue: number;
    cost: number;
    profit: number;
    profitMargin: number;
    totalCBM: number;
    clientTotalCBM: number;
    agentTotalCBM: number;
    realTimeProfit: number;
    reconciledProfit: number;
    profitGap: number;
    unbilledCapacityCost: number;
    agentCBMCostPerUnit: number;
    reconciliationStatus: string;
    goodsBreakdown: unknown[];
  };
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
  isCorrection?: boolean;
}

export interface DeleteContainerResult {
  containerId: string;
  releasedGoodsCount: number;
  deletedWaypointTrackingCount: number;
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
  archive?: ContainerArchiveMode;
  shippingMode?: ShippingMode;
  shippingLine?: ShippingLine;
  consigneeId?: string;
  routeId?: string;
}

export interface ContainerListResponse {
  containers: Container[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages?: number;
    totalPages?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
  };
  archiveMode?: ContainerArchiveMode;
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
 * Container status display labels
 * Phase 3: Added READY_FOR_PICKUP label
 */
export const CONTAINER_STATUS_LABELS: Record<ContainerStatus, string> = {
  BOOKED: 'Réservé',
  EMPTY_TO_WAREHOUSE: 'Vide vers Entrepôt',
  LOADING: 'En Chargement',
  LOADED: 'Chargé',
  GATE_IN_FULL: 'Entré au Port',
  LOADED_ON_VESSEL: 'Chargé à Bord',
  IN_TRANSIT: 'En Transit',
  ARRIVED: 'Arrivé',
  DISCHARGED: 'Déchargé',
  READY_FOR_PICKUP: 'Prêt pour Retrait',
  DELIVERED: 'Livré',
};

/**
 * Status colors for UI (theme-aware)
 * Phase 3: Added READY_FOR_PICKUP color
 * @param colors - Theme colors
 * @returns Record of status colors
 */
export const getContainerStatusColors = (colors: ThemeContextType['colors']): Record<ContainerStatus, string> => ({
  BOOKED: colors.status.info,
  EMPTY_TO_WAREHOUSE: colors.status.info,
  LOADING: colors.status.warning,
  LOADED: colors.status.info,
  GATE_IN_FULL: colors.status.info,
  LOADED_ON_VESSEL: colors.status.info,
  IN_TRANSIT: colors.accent.rose,
  ARRIVED: colors.status.success,
  DISCHARGED: colors.accent.mint,
  READY_FOR_PICKUP: colors.status.warning,
  DELIVERED: colors.status.success,
});
