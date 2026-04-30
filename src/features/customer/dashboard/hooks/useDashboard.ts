/**
 * Customer Dashboard Hooks
 * TanStack Query hooks for customer dashboard data fetching
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboardApi';
import { GetActivityParams } from '../api/types';

// Re-export shared hook for backward compatibility
export { useGetDashboard } from '@src/shared/hooks/useDashboard';

// ============================================
// QUERY KEYS
// ============================================

const QUERY_KEYS = {
  dashboard: 'customer-dashboard',
  activity: (params?: GetActivityParams) =>
    [QUERY_KEYS.dashboard, 'activity', params] as const,
} as const;

// ============================================
// QUERY HOOKS
// ============================================

/**
 * Hook to fetch activity feed
 * @param params Optional pagination and filter params
 */
export const useGetActivity = (params?: GetActivityParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.activity(params),
    queryFn: () => dashboardApi.getActivity(params),
    select: (response) => response.data.data,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// ============================================
// INVALIDATION HELPERS
// ============================================

/**
 * Hook to get invalidation functions
 */
export const useDashboardInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateDashboard = () => {
    queryClient.invalidateQueries({
      queryKey: ['customer-dashboard'],
    });
  };

  const invalidateStats = () => {
    queryClient.invalidateQueries({
      queryKey: ['customer-dashboard', 'stats'],
    });
  };

  const invalidateActivity = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.dashboard, 'activity'],
    });
  };

  return {
    invalidateDashboard,
    invalidateStats,
    invalidateActivity,
    queryClient,
  };
};
