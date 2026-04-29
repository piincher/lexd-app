/**
 * Container Entity Model
 * Core domain types for the Container entity
 */

// ============================================
// BASE TYPES
// ============================================

export type ShippingMode = "SEA" | "AIR";

export type ShippingLine =
  | "MSC"
  | "MAERSK"
  | "CMA_CGM"
  | "HAPAG_LLOYD"
  | "ETHIOPIAN_AIRLINES"
  | "AIR_STANDARD";

export type ContainerStatus =
  | "BOOKED"
  | "EMPTY_TO_WAREHOUSE"
  | "LOADING"
  | "LOADED"
  | "IN_TRANSIT"
  | "ARRIVED"
  | "READY_FOR_PICKUP"
  | "DELIVERED";

export type CustomerContainerStatus =
  | "BOOKED"
  | "IN_TRANSIT"
  | "ARRIVED"
  | "READY_FOR_PICKUP"
  | "DELIVERED";

// ============================================
// TIMELINE & WAYPOINTS
// ============================================

export interface ContainerTimeline {
  bookedAt: string;
  emptyDispatchedAt?: string;
  loadingStartedAt?: string;
  loadingCompletedAt?: string;
  departedAt?: string;
  arrivedAt?: string;
  readyForPickupAt?: string;
  deliveredAt?: string;
  estimatedDeparture?: string;
  estimatedArrival?: string;
}

export interface ContainerWaypoint {
  order: number;
  location: string;
  locationCode: string;
  type: "PORT" | "ROAD_TRANSIT" | "BORDER" | "WAREHOUSE" | "CUSTOMS";
  status: "PENDING" | "IN_TRANSIT" | "ARRIVED" | "DEPARTED";
  coordinates?: { lat: number; lng: number };
  estimatedArrival?: string;
  actualArrival?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  vesselName?: string;
  vesselIMO?: string;
  transportMode: "SEA" | "ROAD" | "RAIL";
  carrier?: string;
  truckPlate?: string;
  driverName?: string;
  driverPhone?: string;
  notes?: string;
}

// ============================================
// CONSIGNEE INFO
// ============================================

export interface ConsigneeInfo {
  _id: string;
  name: string;
  phone: string;
  warehouseAddress: string;
  email?: string;
  businessHours?: string;
}

// ============================================
// ROUTE INFO
// ============================================

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
// CORE CONTAINER ENTITY
// ============================================

export interface Container {
  _id: string;
  virtualContainerNumber: string;
  shippingMode: ShippingMode;
  shippingLine: ShippingLine;
  routeId: string;
  route?: RouteInfo;
  consigneeId: string | ConsigneeInfo;
  status: ContainerStatus;
  goodsIds: string[] | any[]; // Goods[] when populated
  goods?: any[];
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
  // Waypoints
  waypoints?: ContainerWaypoint[];
  currentWaypointIndex?: number;
  waypointTemplateUsed?: string;
  // Profit / Reconciliation
  reconciliationStatus?: "PENDING" | "ESTIMATED" | "RECONCILED";
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
    goodsBreakdown: any[];
  };
}

// ============================================
// CUSTOMER CONTAINER VIEW
// ============================================

export interface CustomerGoodsInContainer {
  _id: string;
  goodsId: string;
  description: string;
  actualCBM: number;
  weight: number;
  status: string; // GoodsStatus
  photos?: string[];
}

export interface ContainerRoute {
  name: string;
  origin: string;
  destination: string;
  estimatedTransitDays: number;
}

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
// DTOs
// ============================================

export interface CreateContainerInput {
  shippingMode: ShippingMode;
  shippingLine: ShippingLine;
  routeId: string;
  consigneeId: string;
  actualContainerNumber?: string;
  bookingReference?: string;
}

export interface UpdateContainerStatusInput {
  status: ContainerStatus;
  timeline?: Partial<ContainerTimeline>;
}

export interface AssignGoodsInput {
  goodsIds: string[];
}

export interface RemoveGoodsInput {
  goodsIds: string[];
}

// ============================================
// FILTERS
// ============================================

export interface ContainerFilters {
  status?: ContainerStatus;
  shippingMode?: ShippingMode;
  shippingLine?: ShippingLine;
  consigneeId?: string;
  routeId?: string;
}

export interface CustomerContainerFilters {
  status?: CustomerContainerStatus;
  shippingMode?: ShippingMode;
}

// ============================================
// PACKING LIST
// ============================================

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

export interface PackingListSummary {
  totalItems: number;
  totalCBM: number;
  totalWeight: number;
  totalPackages: number;
}

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
