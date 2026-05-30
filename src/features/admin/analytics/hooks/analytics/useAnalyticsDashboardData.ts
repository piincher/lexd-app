/**
 * Analytics Dashboard Data Hooks
 * React Query hooks for dashboard and realtime metrics
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import * as analyticsApi from '../../api/analyticsApi';
import { DashboardData, RealtimeData } from '../../types';
import { analyticsQueryKeys } from './useAnalyticsQueryKeys';

export const useGetDashboard = (options?: UseQueryOptions<DashboardData>) => {
  return useQuery({
    queryKey: analyticsQueryKeys.dashboard(),
    queryFn: analyticsApi.getDashboard,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    // Don't poll a backgrounded admin tab. Cuts request volume from admins
    // who park the analytics screen and switch apps.
    refetchIntervalInBackground: false,
    ...options,
  });
};

export const useGetRealtimeMetrics = (options?: UseQueryOptions<RealtimeData>) => {
  return useQuery({
    queryKey: analyticsQueryKeys.realtime(),
    queryFn: analyticsApi.getRealtimeMetrics,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    // 30 s polling × N idle admin tabs is the worst offender in this file —
    // backgrounded sessions stop polling outright.
    refetchIntervalInBackground: false,
    ...options,
  });
};
