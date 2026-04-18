/**
 * Customer Dashboard API
 * API endpoints for customer dashboard data
 */

import { apiClientV2 } from '@src/api/client';
import { ApiResponse, GetDashboardResponse, GetActivityResponse, GetActivityParams } from './types';

const axios = apiClientV2;
const BASE_URL = '/customer/dashboard';

/**
 * Customer Dashboard API client
 */
export const dashboardApi = {
  /**
   * Get dashboard overview data (stats and quick actions)
   * @returns Dashboard stats and quick actions
   */
  getDashboard: () =>
    axios.get<ApiResponse<GetDashboardResponse>>(BASE_URL),

  /**
   * Get activity feed
   * @param params Optional pagination and filter params
   * @returns List of recent activities
   */
  getActivity: (params?: GetActivityParams) =>
    axios.get<ApiResponse<GetActivityResponse>>(`${BASE_URL}/activity`, { params }),
};

export default dashboardApi;
