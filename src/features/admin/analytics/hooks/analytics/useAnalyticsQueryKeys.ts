/**
 * Analytics Query Keys
 * Centralized React Query keys for analytics
 */

import type { PeriodFilter } from '../../types';

export const analyticsQueryKeys = {
  all: ['analytics'] as const,
  dashboard: () => [...analyticsQueryKeys.all, 'dashboard'] as const,
  realtime: () => [...analyticsQueryKeys.all, 'realtime'] as const,
  revenue: (params?: PeriodFilter & { groupBy?: string; compare?: boolean }) =>
    [...analyticsQueryKeys.all, 'revenue', params] as const,
  containers: (params?: { period?: string }) =>
    [...analyticsQueryKeys.all, 'containers', params] as const,
  customers: (params?: { limit?: number; period?: string }) =>
    [...analyticsQueryKeys.all, 'customers', params] as const,
  goods: (params?: { period?: string; groupBy?: string }) =>
    [...analyticsQueryKeys.all, 'goods', params] as const,
  payments: (params?: { period?: string }) =>
    [...analyticsQueryKeys.all, 'payments', params] as const,
};
