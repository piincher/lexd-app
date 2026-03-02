/**
 * Customer Dashboard Hooks
 * TanStack Query hooks for customer dashboard data fetching
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboardApi';
import { GetActivityParams } from '../api/types';

// ============================================
// QUERY KEYS
// ============================================

const QUERY_KEYS = {
  dashboard: 'customer-dashboard',
  stats: () => [QUERY_KEYS.dashboard, 'stats'] as const,
  activity: (params?: GetActivityParams) =>
    [QUERY_KEYS.dashboard, 'activity', params] as const,
} as const;

// ============================================
// QUERY HOOKS
// ============================================

/**
 * Hook to fetch dashboard overview data (stats and quick actions)
 */
export const useGetDashboard = () => {
  return useQuery({
    queryKey: QUERY_KEYS.stats(),
    queryFn: () => dashboardApi.getDashboard(),
    select: (response) => response.data.data,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

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
      queryKey: [QUERY_KEYS.dashboard],
    });
  };

  const invalidateStats = () => {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.stats(),
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
