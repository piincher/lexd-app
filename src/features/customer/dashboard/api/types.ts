/**
 * Customer Dashboard API Types
 * Request/Response types for dashboard API endpoints
 */

import { DashboardStats, ActivityItem, QuickAction } from '../types';
import type {
  ActiveWorkSummary,
  MonthlyTrendPoint,
  NextShipmentAction,
  RewardSummary,
  ShipmentHealthItem,
  ShippingSummary,
  VipProgress,
} from '@src/shared/types/dashboard';

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}

/**
 * Container info returned by the dashboard API
 */
export interface DashboardContainer {
  id: string;
  trackingType?: 'CONTAINER' | 'AIRWAY_BILL';
  airwayBillId?: string;
  virtualContainerNumber: string;
  status: string;
  airwayBillStatus?: string;
  shippingMode?: string;
  shippingLine?: string;
  flightNumber?: string;
  goodsCount?: number;
  readyGoodsCount?: number;
  goodsPreview?: {
    goodsId?: string;
    description?: string;
    status?: string;
    quantity?: number;
  }[];
  timeline?: {
    bookedAt?: string;
    emptyDispatchedAt?: string;
    loadingStartedAt?: string;
    loadingCompletedAt?: string;
    gateInFullAt?: string;
    loadedOnVesselAt?: string;
    departedAt?: string;
    arrivedAt?: string;
    dischargedAt?: string;
    readyForPickupAt?: string;
    estimatedArrival?: string;
  };
}

/**
 * Response for fetching dashboard data
 */
export interface GetDashboardResponse {
  stats: DashboardStats;
  quickActions: QuickAction[];
  containers?: DashboardContainer[];
  shippingSummary?: ShippingSummary;
  monthlyTrend?: MonthlyTrendPoint[];
  activeWork?: ActiveWorkSummary;
  shipmentHealth?: ShipmentHealthItem[];
  vipProgress?: VipProgress;
  rewardSummary?: RewardSummary;
  nextShipmentActions?: NextShipmentAction[];
}

/**
 * Response for fetching activity feed
 */
export interface GetActivityResponse {
  activities: ActivityItem[];
  total: number;
  hasMore: boolean;
}

// ============================================
// API REQUEST TYPES
// ============================================

/**
 * Query parameters for activity feed
 */
export interface GetActivityParams {
  page?: number;
  limit?: number;
  type?: string;
  fromDate?: string;
  toDate?: string;
}
