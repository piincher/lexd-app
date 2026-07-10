/**
 * Admin dashboard analytics API
 * Thin wrapper around /api/v2/analytics/dashboard so the dashboard feature
 * does not depend on analytics feature runtime code.
 */

import { apiClientV2 } from '@src/api/client';
import type { DashboardData } from '@src/shared/types/adminDashboard';

const unwrap = <T>(response: { data?: { data?: T } }): T => {
  if (response.data?.data) return response.data.data;
  throw new Error('Réponse analytique invalide');
};

export const getDashboardAnalytics = async (): Promise<DashboardData> => {
  const response = await apiClientV2.get('/analytics/dashboard');
  return unwrap<DashboardData>(response);
};
