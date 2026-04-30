/**
 * Customer Dashboard API
 * API endpoints for customer dashboard data
 */

import { apiClientV2 } from '@src/api/client';

const axios = apiClientV2;
const BASE_URL = '/customer/dashboard';

export interface GetDashboardResponse {
  stats: import('@src/shared/types/dashboard').DashboardStats;
  quickActions: Array<{
    id: string;
    label: string;
    icon: string;
    route?: string;
    action?: () => void;
    color?: string;
  }>;
}

/**
 * Customer Dashboard API client
 */
export const dashboardApi = {
  getDashboard: () => axios.get<{ data: GetDashboardResponse }>(BASE_URL),
};

export default dashboardApi;
