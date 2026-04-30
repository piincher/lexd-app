import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@src/shared/api/dashboardApi';

const QUERY_KEYS = {
  dashboard: 'customer-dashboard',
  stats: () => [QUERY_KEYS.dashboard, 'stats'] as const,
} as const;

export const useGetDashboard = () => {
  return useQuery({
    queryKey: QUERY_KEYS.stats(),
    queryFn: () => dashboardApi.getDashboard(),
    select: (response) => response.data.data,
    staleTime: 2 * 60 * 1000,
  });
};
