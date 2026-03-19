/**
 * Route Hooks - React Query hooks for route management
 * Phase 3: Route Management System
 */

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { routeService } from '../api/routeApi';
import { 
  Route, 
  CreateRouteInput, 
  UpdateRouteInput,
  RouteFilters,
} from '../types';
import { ApiClientError } from '@src/api/client';

// ============================================
// QUERY KEYS
// ============================================

export const routeQueryKeys = {
  all: ['routes'] as const,
  lists: () => [...routeQueryKeys.all, 'list'] as const,
  list: (filters: RouteFilters | undefined) => 
    [...routeQueryKeys.lists(), filters] as const,
  details: () => [...routeQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...routeQueryKeys.details(), id] as const,
  active: () => [...routeQueryKeys.all, 'active'] as const,
  activeByMode: (mode: string | undefined) => 
    [...routeQueryKeys.active(), mode] as const,
};

// ============================================
// READ HOOKS
// ============================================

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

// ============================================
// MUTATION HOOKS
// ============================================

/**
 * Hook to create a new route
 */
export const useCreateRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRouteInput) => routeService.createRoute(data),
    onSuccess: () => {
      // Invalidate all route lists
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.active() });
    },
  });
};

/**
 * Hook to update an existing route
 */
export const useUpdateRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      id, 
      data 
    }: { 
      id: string; 
      data: UpdateRouteInput 
    }) => routeService.updateRoute(id, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific route detail
      queryClient.invalidateQueries({ 
        queryKey: routeQueryKeys.detail(variables.id) 
      });
      // Invalidate all lists
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.active() });
    },
  });
};

/**
 * Hook to delete a route
 */
export const useDeleteRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => routeService.deleteRoute(id),
    onSuccess: () => {
      // Invalidate all route lists
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.active() });
    },
  });
};

// ============================================
// UTILITY HOOKS
// ============================================

/**
 * Hook to toggle route active status
 */
export const useToggleRouteStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      id, 
      isActive 
    }: { 
      id: string; 
      isActive: boolean 
    }) => routeService.updateRoute(id, { isActive }),
    onSuccess: (_, variables) => {
      // Invalidate the specific route detail
      queryClient.invalidateQueries({ 
        queryKey: routeQueryKeys.detail(variables.id) 
      });
      // Invalidate all lists
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.active() });
    },
  });
};

/**
 * Hook to get route statistics
 * Backend returns { data: { routes: [...], pagination: {...} } }
 */
export const useRouteStats = () => {
  const { data: routesData } = useGetRoutes();
  
  // Extract routes array from nested response
  const routes: Route[] = routesData?.data?.routes || [];

  return {
    total: routes.length,
    sea: routes.filter((r: Route) => r.shippingMode === 'SEA').length,
    air: routes.filter((r: Route) => r.shippingMode === 'AIR').length,
    active: routes.filter((r: Route) => r.isActive).length,
    inactive: routes.filter((r: Route) => !r.isActive).length,
  };
};

// Type for the API response
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
