/**
 * Customer Dashboard Types
 * Type definitions for the customer dashboard feature
 */

// ============================================
// DASHBOARD STATS
// ============================================

/**
 * Dashboard statistics for the customer
 */
export interface DashboardStats {
  totalGoods: number;
  goodsByStatus: Record<string, number>;
  totalContainers: number;
  activeContainers: number;
  totalSpent: number;
  totalPaid: number;
  balanceDue: number;
  accountBalance?: number;
}

export type {
  ActiveWorkSummary,
  MonthlyTrendPoint,
  NextShipmentAction,
  RewardSummary,
  ShipmentHealthItem,
  ShippingSummary,
  VipProgress,
  VipTier,
} from '@src/shared/types/dashboard';

// ============================================
// ACTIVITY TYPES
// ============================================

/**
 * Activity item types
 */
export type ActivityType =
  | 'GOODS_RECEIVED'
  | 'CONTAINER_DEPARTED'
  | 'ARRIVED'
  | 'READY'
  | 'PAYMENT';

/**
 * Activity item in the feed
 */
export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

// ============================================
// QUICK ACTIONS
// ============================================

/**
 * Quick action button configuration
 */
export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  route?: string;
  action?: () => void;
  color?: string;
  showIf?: (data: DashboardData) => boolean;
}

// ============================================
// DASHBOARD DATA
// ============================================

/**
 * Complete dashboard data response
 */
export interface DashboardData {
  stats: DashboardStats;
  recentActivity: ActivityItem[];
  quickActions: QuickAction[];
  shippingSummary?: import('@src/shared/types/dashboard').ShippingSummary;
  monthlyTrend?: import('@src/shared/types/dashboard').MonthlyTrendPoint[];
  activeWork?: import('@src/shared/types/dashboard').ActiveWorkSummary;
  shipmentHealth?: import('@src/shared/types/dashboard').ShipmentHealthItem[];
  vipProgress?: import('@src/shared/types/dashboard').VipProgress;
  rewardSummary?: import('@src/shared/types/dashboard').RewardSummary;
  nextShipmentActions?: import('@src/shared/types/dashboard').NextShipmentAction[];
}

// ============================================
// API TYPES
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
 * Dashboard API response
 */
export interface GetDashboardResponse {
  stats: DashboardStats;
  quickActions: QuickAction[];
  shippingSummary?: import('@src/shared/types/dashboard').ShippingSummary;
  monthlyTrend?: import('@src/shared/types/dashboard').MonthlyTrendPoint[];
  activeWork?: import('@src/shared/types/dashboard').ActiveWorkSummary;
  shipmentHealth?: import('@src/shared/types/dashboard').ShipmentHealthItem[];
  vipProgress?: import('@src/shared/types/dashboard').VipProgress;
  rewardSummary?: import('@src/shared/types/dashboard').RewardSummary;
  nextShipmentActions?: import('@src/shared/types/dashboard').NextShipmentAction[];
}

/**
 * Activity feed API response
 */
export interface GetActivityResponse {
  activities: ActivityItem[];
  total: number;
  hasMore: boolean;
}

// ============================================
// UI DISPLAY CONSTANTS
// ============================================

/**
 * Activity type display labels (French)
 */
export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  GOODS_RECEIVED: 'Marchandise Reçue',
  CONTAINER_DEPARTED: 'Container Parti',
  ARRIVED: 'Arrivé à Destination',
  READY: 'Prêt pour Retrait',
  PAYMENT: 'Paiement',
};

/**
 * Activity type colors
 */
export const ACTIVITY_TYPE_COLORS: Record<ActivityType, string> = {
  GOODS_RECEIVED: '#8B5CF6',    // Purple
  CONTAINER_DEPARTED: '#0EA5E9', // Ocean blue
  ARRIVED: '#10B981',           // Green
  READY: '#F59E0B',             // Amber
  PAYMENT: '#007757',           // Success green
};

/**
 * Activity type icons (MaterialCommunityIcons)
 */
export const ACTIVITY_TYPE_ICONS: Record<ActivityType, string> = {
  GOODS_RECEIVED: 'package-variant',
  CONTAINER_DEPARTED: 'ferry',
  ARRIVED: 'map-marker-check',
  READY: 'checkbox-marked-circle',
  PAYMENT: 'cash-check',
};
