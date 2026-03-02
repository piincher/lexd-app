/**
 * Customer Tracking Types
 * Type definitions for customer-facing container tracking
 */

// ============================================
// TRACKING STATUS
// ============================================

export type TrackingStatus =
  | 'BOOKED'
  | 'IN_WAREHOUSE'
  | 'LOADING'
  | 'IN_TRANSIT'
  | 'ARRIVED_PORT'
  | 'CUSTOMS_CLEARANCE'
  | 'INLAND_TRANSPORT'
  | 'READY_FOR_PICKUP'
  | 'DELIVERED'
  | 'DELAYED';

// ============================================
// WAYPOINT DISPLAY
// ============================================

export interface TrackingWaypoint {
  order: number;
  location: {
    city: string;
    country: string;
    countryCode: string;
  };
  status: 'COMPLETED' | 'CURRENT' | 'PENDING';
  estimatedArrival?: string;
  actualArrival?: string;
  description: string;
  icon?: string;
}

// ============================================
// TIMELINE EVENT
// ============================================

export interface TrackingTimelineEvent {
  _id: string;
  timestamp: string;
  status: TrackingStatus;
  title: string;
  description: string;
  location?: {
    city: string;
    country: string;
  };
  isImportant?: boolean;
  isRead?: boolean;
}

// ============================================
// CUSTOMER GOODS IN TRACKING
// ============================================

export interface TrackingGoodsItem {
  goodsId: string;
  description: string;
  actualCBM: number;
  weight: number;
  quantity: number;
  status: string;
  photos?: string[];
}

// ============================================
// MAIN TRACKING INFO
// ============================================

export interface CustomerTrackingInfo {
  containerId: string;
  containerNumber: string;
  shippingMode: 'SEA' | 'AIR';
  shippingLine: string;
  
  // Route Info
  origin: {
    city: string;
    country: string;
  };
  destination: {
    city: string;
    country: string;
  };
  
  // Status
  currentStatus: TrackingStatus;
  statusLabel: string;
  statusDescription: string;
  statusUpdatedAt: string;
  
  // Timeline
  timeline: TrackingTimelineEvent[];
  waypoints: TrackingWaypoint[];
  currentWaypointIndex: number;
  
  // Progress
  progressPercentage: number;
  bookedAt: string;
  departedAt?: string;
  estimatedArrival?: string;
  actualArrival?: string;
  readyForPickupAt?: string;
  daysInTransit: number;
  estimatedDaysRemaining: number | null;
  
  // Customer's Goods
  customerGoods: {
    totalItems: number;
    totalCBM: number;
    totalWeight: number;
    items: TrackingGoodsItem[];
  };
  
  // Pickup Info
  pickupLocation?: {
    name: string;
    address: string;
    phone?: string;
    businessHours?: string;
  };
  
  // Tracking Details
  trackingDetails?: {
    vesselName?: string;
    vesselIMO?: string;
    transporterName?: string;
    truckPlateNumber?: string;
    trackingUrl?: string;
  };
}

// ============================================
// PUBLIC TRACKING (Limited Info)
// ============================================

export interface PublicTrackingInfo {
  containerNumber: string;
  shippingMode: 'SEA' | 'AIR';
  shippingLine: string;
  
  // Limited status info
  currentStatus: TrackingStatus;
  statusLabel: string;
  statusDescription: string;
  lastUpdated: string;
  
  // Progress (no sensitive details)
  progressPercentage: number;
  origin: {
    city: string;
    country: string;
  };
  destination: {
    city: string;
    country: string;
  };
  
  // Public timeline (simplified)
  timeline: Array<{
    timestamp: string;
    status: TrackingStatus;
    title: string;
    location?: string;
  }>;
  
  // Estimated delivery only
  estimatedArrival?: string;
  
  // No customer goods info, no pickup location
  // Only general container status
}

// ============================================
// DISPLAY CONSTANTS
// ============================================

export const TRACKING_STATUS_LABELS: Record<TrackingStatus, string> = {
  BOOKED: 'Réservé',
  IN_WAREHOUSE: 'En entrepôt',
  LOADING: 'En chargement',
  IN_TRANSIT: 'En transit',
  ARRIVED_PORT: 'Arrivé au port',
  CUSTOMS_CLEARANCE: 'Dédouanement',
  INLAND_TRANSPORT: 'Transport intérieur',
  READY_FOR_PICKUP: 'Prêt pour retrait',
  DELIVERED: 'Livré',
  DELAYED: 'Retardé',
};

export const TRACKING_STATUS_COLORS: Record<TrackingStatus, string> = {
  BOOKED: '#8B5CF6',
  IN_WAREHOUSE: '#6366F1',
  LOADING: '#F59E0B',
  IN_TRANSIT: '#3B82F6',
  ARRIVED_PORT: '#10B981',
  CUSTOMS_CLEARANCE: '#F97316',
  INLAND_TRANSPORT: '#06B6D4',
  READY_FOR_PICKUP: '#22C55E',
  DELIVERED: '#16A34A',
  DELAYED: '#EF4444',
};

export const TRACKING_STATUS_DESCRIPTIONS: Record<TrackingStatus, string> = {
  BOOKED: 'Votre conteneur est réservé et attend le départ.',
  IN_WAREHOUSE: 'Votre marchandise est enregistrée dans notre entrepôt.',
  LOADING: 'Votre marchandise est en cours de chargement dans le conteneur.',
  IN_TRANSIT: 'Votre conteneur est en route vers la destination.',
  ARRIVED_PORT: 'Votre conteneur est arrivé au port de destination.',
  CUSTOMS_CLEARANCE: 'Votre conteneur est en cours de dédouanement.',
  INLAND_TRANSPORT: 'Votre conteneur est transporté vers l\'entrepôt de retrait.',
  READY_FOR_PICKUP: 'Votre marchandise est prête pour le retrait!',
  DELIVERED: 'Votre marchandise a été retirée avec succès.',
  DELAYED: 'Votre conteneur subit un retard. Nous vous tiendrons informé.',
};

// ============================================
// FILTER TYPES
// ============================================

export interface TrackingEventFilters {
  startDate?: string;
  endDate?: string;
  status?: TrackingStatus;
  isRead?: boolean;
}
