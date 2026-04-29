/**
 * Analytics Invalidation Hook
 * Utility hook for invalidating analytics queries
 */

import { useQueryClient } from '@tanstack/react-query';
import { analyticsQueryKeys } from './useAnalyticsQueryKeys';

export const useAnalyticsInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateDashboard = () => {
    queryClient.invalidateQueries({ queryKey: analyticsQueryKeys.dashboard() });
  };

  const invalidateRevenue = () => {
    queryClient.invalidateQueries({ queryKey: analyticsQueryKeys.all });
  };

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: analyticsQueryKeys.all });
  };

  return {
    invalidateDashboard,
    invalidateRevenue,
    invalidateAll,
  };
};
