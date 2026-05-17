/**
 * Customer Tracking Types
 * Type definitions for customer-facing container tracking
 */

import { Theme } from '@src/constants/Theme';

// ============================================
// TRACKING STATUS
// ============================================

export type TrackingStatus =
  | 'BOOKED'
  | 'EMPTY_TO_WAREHOUSE'
  | 'IN_WAREHOUSE'
  | 'LOADING'
  | 'LOADED'
  | 'GATE_IN_FULL'
  | 'LOADED_ON_VESSEL'
  | 'IN_TRANSIT'
  | 'ARRIVED_PORT'
  | 'DISCHARGED'
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
  timeline: {
    timestamp: string;
    status: TrackingStatus;
    title: string;
    location?: string;
  }[];
  
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
  EMPTY_TO_WAREHOUSE: 'Vide vers entrepôt',
  IN_WAREHOUSE: 'En entrepôt',
  LOADING: 'En chargement',
  LOADED: 'Chargé',
  GATE_IN_FULL: 'Entré au port',
  LOADED_ON_VESSEL: 'Chargé à bord',
  IN_TRANSIT: 'En transit',
  ARRIVED_PORT: 'Arrivé au port',
  DISCHARGED: 'Déchargé',
  CUSTOMS_CLEARANCE: 'Dédouanement',
  INLAND_TRANSPORT: 'Transport intérieur',
  READY_FOR_PICKUP: 'Prêt pour retrait',
  DELIVERED: 'Livré',
  DELAYED: 'Retardé',
};

export const TRACKING_STATUS_COLORS: Record<TrackingStatus, string> = {
  BOOKED: Theme.colors.primary.main,
  EMPTY_TO_WAREHOUSE: Theme.colors.primary.main,
  IN_WAREHOUSE: Theme.colors.primary.main,
  LOADING: Theme.colors.status.warning,
  LOADED: Theme.colors.status.info,
  GATE_IN_FULL: Theme.colors.status.info,
  LOADED_ON_VESSEL: Theme.colors.status.info,
  IN_TRANSIT: Theme.colors.status.info,
  ARRIVED_PORT: Theme.colors.status.success,
  DISCHARGED: Theme.colors.status.success,
  CUSTOMS_CLEARANCE: Theme.colors.status.warning,
  INLAND_TRANSPORT: Theme.colors.status.info,
  READY_FOR_PICKUP: Theme.colors.status.success,
  DELIVERED: Theme.colors.status.success,
  DELAYED: Theme.colors.status.error,
};

export const TRACKING_STATUS_DESCRIPTIONS: Record<TrackingStatus, string> = {
  BOOKED: 'Votre conteneur est réservé et attend le départ.',
  EMPTY_TO_WAREHOUSE: 'Le conteneur vide est en route vers l\'entrepôt.',
  IN_WAREHOUSE: 'Votre marchandise est enregistrée dans notre entrepôt.',
  LOADING: 'Votre marchandise est en cours de chargement dans le conteneur.',
  LOADED: 'Votre conteneur est chargé et se prépare pour le port.',
  GATE_IN_FULL: 'Votre conteneur plein est entré au terminal portuaire.',
  LOADED_ON_VESSEL: 'Votre conteneur a été chargé à bord du navire.',
  IN_TRANSIT: 'Votre conteneur est en route vers la destination.',
  ARRIVED_PORT: 'Votre conteneur est arrivé au port de destination.',
  DISCHARGED: 'Votre conteneur a été déchargé et passe aux étapes de sortie.',
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
