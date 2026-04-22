/**
 * useRoutesList Hook - Paginated routes list with filtering
 * Phase 3: Route Management System
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { routeService } from '../api/routeApi';
import { routeQueryKeys } from './useRoutes';
import { Route, ShippingMode } from '../types';
import { ApiClientError } from '@src/api/client';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface UseRoutesListOptions {
  origin?: string;
  destination?: string;
  shippingMode?: ShippingMode;
  page?: number;
  limit?: number;
  sort?: string;
  isActive?: boolean;
}

interface RoutesListResponse {
  routes: Route[];
  total: number;
  page: number;
  totalPages: number;
}

/**
 * Hook to fetch paginated routes list with filtering and sorting
 */
export const useRoutesList = (
  options: UseRoutesListOptions = {},
  queryOptions?: Omit<
    UseQueryOptions<ApiResponse<Route[]>, ApiClientError, RoutesListResponse>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<ApiResponse<Route[]>, ApiClientError, RoutesListResponse>({
    queryKey: routeQueryKeys.list(options),
    queryFn: () => routeService.getRoutes(options),
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (response) => ({
      routes: response.data || [],
      total: response.data?.length || 0,
      page: options.page || 1,
      totalPages: Math.ceil((response.data?.length || 0) / (options.limit || 20)),
    }),
    ...queryOptions,
  });
};

export type { UseRoutesListOptions, RoutesListResponse };
