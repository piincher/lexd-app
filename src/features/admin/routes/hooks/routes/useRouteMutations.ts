/**
 * Route Mutation Hooks - Write operations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { routeService } from '../../api/routeApi';
import { CreateRouteInput, UpdateRouteInput } from '../../types';
import { routeQueryKeys } from './routeQueryKeys';

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
      data,
    }: {
      id: string;
      data: UpdateRouteInput;
    }) => routeService.updateRoute(id, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific route detail
      queryClient.invalidateQueries({
        queryKey: routeQueryKeys.detail(variables.id),
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

/**
 * Hook to toggle route active status
 */
export const useToggleRouteStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      isActive,
    }: {
      id: string;
      isActive: boolean;
    }) => routeService.updateRoute(id, { isActive }),
    onSuccess: (_, variables) => {
      // Invalidate the specific route detail
      queryClient.invalidateQueries({
        queryKey: routeQueryKeys.detail(variables.id),
      });
      // Invalidate all lists
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: routeQueryKeys.active() });
    },
  });
};
