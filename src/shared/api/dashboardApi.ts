/**
 * Customer Dashboard API
 * API endpoints for customer dashboard data
 */

import { apiClientV2 } from '@src/api/client';
import type {
  ActiveWorkSummary,
  MonthlyTrendPoint,
  NextShipmentAction,
  RewardSummary,
  ShipmentHealthItem,
  ShippingSummary,
  VipProgress,
} from '@src/shared/types/dashboard';

const axios = apiClientV2;
const BASE_URL = '/customer/dashboard';

export interface GetDashboardResponse {
  stats: import('@src/shared/types/dashboard').DashboardStats;
  quickActions: {
    id: string;
    label: string;
    icon: string;
    route?: string;
    action?: () => void;
    color?: string;
  }[];
  containers?: {
    id: string;
    virtualContainerNumber: string;
    status: string;
    shippingMode?: string;
    shippingLine?: string;
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
  }[];
  shippingSummary?: ShippingSummary;
  monthlyTrend?: MonthlyTrendPoint[];
  activeWork?: ActiveWorkSummary;
  shipmentHealth?: ShipmentHealthItem[];
  vipProgress?: VipProgress;
  rewardSummary?: RewardSummary;
  nextShipmentActions?: NextShipmentAction[];
}

/**
 * Customer Dashboard API client
 */
export const dashboardApi = {
  getDashboard: () => axios.get<{ data: GetDashboardResponse }>(BASE_URL),
};

export default dashboardApi;
