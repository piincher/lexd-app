/**
 * Route Query Hooks - Read operations
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { routeService } from '../../api/routeApi';
import { Route, RouteFilters } from '../../types';
import { ApiClientError } from '@src/api/client';
import { routeQueryKeys } from './routeQueryKeys';
import type { ApiResponse } from './types';

/**
 * Hook to get all routes with optional filters
 * Backend returns { data: { routes: [...], pagination: {...} } }
 */
export const useGetRoutes = (
  filters?: RouteFilters,
  options?: UseQueryOptions<ApiResponse<{ routes: Route[]; pagination?: any }>, ApiClientError>
) => {
  return useQuery({
    queryKey: routeQueryKeys.list(filters),
    queryFn: () => routeService.getRoutes(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Hook to get active routes (for dropdowns)
 * Optionally filter by shipping mode
 * Backend returns { data: { routes: [...] } }
 */
export const useGetActiveRoutes = (
  mode?: string,
  options?: UseQueryOptions<ApiResponse<{ routes: Route[] }>, ApiClientError>
) => {
  return useQuery({
    queryKey: routeQueryKeys.activeByMode(mode),
    queryFn: () => routeService.getActiveRoutes(mode),
    staleTime: 10 * 60 * 1000, // 10 minutes - active routes change less frequently
    ...options,
  });
};

/**
 * Hook to get a single route by ID
 */
export const useGetRoute = (
  id: string | undefined,
  options?: UseQueryOptions<ApiResponse<Route>, ApiClientError>
) => {
  return useQuery({
    queryKey: routeQueryKeys.detail(id || ''),
    queryFn: () => routeService.getRouteById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
