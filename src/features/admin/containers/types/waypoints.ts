/**
 * Waypoint Types - Type definitions for container waypoint tracking
 */

// ============================================
// ENUMS & CONSTANTS
// ============================================

export type WaypointStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED' | 'CANCELLED';
export type SegmentType = 'SEA' | 'ROAD' | 'AIR' | 'WAREHOUSE';
export type PortType = 'LOADING' | 'TRANSIT' | 'DISCHARGE' | 'FEEDER';

// ============================================
// LOCATION TYPES
// ============================================

export interface WaypointLocation {
  city: string;
  country: string;
  countryCode: string;
  portCode?: string;
  warehouse?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// ============================================
// SEA SEGMENT TYPES
// ============================================

export interface SeaSegmentDetails {
  vesselName?: string;
  vesselIMO?: string;
  carrier: string;
  bookingReference?: string;
  containerNumber?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  estimatedArrival?: string;
  actualArrival?: string;
  portType?: PortType;
  terminal?: string;
  trackingUrl?: string;
}

// ============================================
// ROAD SEGMENT TYPES
// ============================================

export interface RoadSegmentDetails {
  transporterName?: string;
  transporterPhone?: string;
  driverName?: string;
  driverPhone?: string;
  truckPlateNumber?: string;
  truckType?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  estimatedArrival?: string;
  actualArrival?: string;
  borderCrossing?: string;
  trackingNumber?: string;
  routeDetails?: string;
}

// ============================================
// AIR SEGMENT TYPES
// ============================================

export interface AirSegmentDetails {
  airline: string;
  flightNumber?: string;
  airwayBillNumber?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  estimatedArrival?: string;
  actualArrival?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  trackingUrl?: string;
}

// ============================================
// WAREHOUSE TYPES
// ============================================

export interface WarehouseDetails {
  warehouseName: string;
  warehouseCode?: string;
  address: string;
  contactName?: string;
  contactPhone?: string;
  operatingHours?: string;
}

// ============================================
// MAIN WAYPOINT TYPE
// ============================================

export interface ContainerWaypoint {
  _id?: string;
  order: number;
  location: WaypointLocation;
  segmentType: SegmentType;
  status: WaypointStatus;
  
  // Timing
  estimatedArrival?: string;
  actualArrival?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  durationHours?: number;
  
  // Segment-specific details
  seaDetails?: SeaSegmentDetails;
  roadDetails?: RoadSegmentDetails;
  airDetails?: AirSegmentDetails;
  warehouseDetails?: WarehouseDetails;
  
  // Display
  description: string;
  shortName: string;
  icon?: string;
  
  // Notifications
  notifyOnArrival?: boolean;
  notifyOnDeparture?: boolean;
  
  // Metadata
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
}

// ============================================
// UPDATE DTOs
// ============================================

export interface WaypointUpdate {
  status?: WaypointStatus;
  estimatedArrival?: string;
  actualArrival?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  notes?: string;
  notifyOnArrival?: boolean;
  notifyOnDeparture?: boolean;
}

export interface SeaSegmentUpdate {
  vesselName?: string;
  vesselIMO?: string;
  estimatedArrival?: string;
  actualArrival?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  terminal?: string;
  trackingUrl?: string;
}

export interface RoadSegmentUpdate {
  transporterName?: string;
  driverName?: string;
  driverPhone?: string;
  truckPlateNumber?: string;
  estimatedArrival?: string;
  actualArrival?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  trackingNumber?: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface WaypointInitResponse {
  containerId: string;
  waypoints: ContainerWaypoint[];
  message: string;
}

export interface WaypointsResponse {
  containerId: string;
  containerNumber: string;
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  progressPercentage: number;
  estimatedTimeRemaining: number | null;
  shippingLine: string;
  shippingMode: 'SEA' | 'AIR';
}

// ============================================
// TEMPLATE TYPES
// ============================================

export interface WaypointTemplate {
  shippingLine: string;
  shippingMode: 'SEA' | 'AIR';
  name: string;
  description: string;
  estimatedTotalDays: number;
  waypoints: Omit<ContainerWaypoint, '_id' | 'status' | 'createdAt' | 'updatedAt' | 'updatedBy'>[];
}

// ============================================
// DISPLAY CONSTANTS
// ============================================

export const WAYPOINT_STATUS_LABELS: Record<WaypointStatus, string> = {
  PENDING: 'En attente',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminé',
  DELAYED: 'Retardé',
  CANCELLED: 'Annulé',
};

export const WAYPOINT_STATUS_COLORS: Record<WaypointStatus, string> = {
  PENDING: '#9CA3AF',
  IN_PROGRESS: '#3B82F6',
  COMPLETED: '#10B981',
  DELAYED: '#EF4444',
  CANCELLED: '#6B7280',
};

export const SEGMENT_TYPE_LABELS: Record<SegmentType, string> = {
  SEA: 'Maritime',
  ROAD: 'Routier',
  AIR: 'Aérien',
  WAREHOUSE: 'Entrepôt',
};

export const SEGMENT_TYPE_ICONS: Record<SegmentType, string> = {
  SEA: 'boat',
  ROAD: 'truck',
  AIR: 'airplane',
  WAREHOUSE: 'warehouse',
};

export const PORT_TYPE_LABELS: Record<PortType, string> = {
  LOADING: 'Chargement',
  TRANSIT: 'Transit',
  DISCHARGE: 'Déchargement',
  FEEDER: 'Feeder',
};

// ============================================
// FILTER TYPES
// ============================================

export interface WaypointFilters {
  status?: WaypointStatus;
  segmentType?: SegmentType;
  country?: string;
}
