/**
 * Customer Dashboard API Types
 * Request/Response types for dashboard API endpoints
 */

import { DashboardStats, ActivityItem, QuickAction, DashboardData } from '../types';

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
  virtualContainerNumber: string;
  status: string;
  shippingMode?: string;
  shippingLine?: string;
  timeline?: {
    departedAt?: string;
    arrivedAt?: string;
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
