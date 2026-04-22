/**
 * Waypoint Hooks - React Query hooks for container waypoint management
 * Provides queries and mutations for detailed route tracking
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { waypointService } from '../services/WaypointService';
import {
  ContainerWaypoint,
  WaypointUpdate,
  SeaSegmentUpdate,
  RoadSegmentUpdate,
  WaypointInitResponse,
  WaypointsResponse,
  WaypointStatus,
} from '../types/waypoints';
import { ApiClientError } from '@src/api/client';
import { waypointQueryKeys, useGetWaypoints } from '@src/shared/hooks/useWaypoints';

export { waypointQueryKeys, useGetWaypoints };

// ============================================
// QUERY HOOKS
// ============================================

/**
 * Get current tracking status for a container
 */
export const useGetTrackingStatus = (
  containerId: string | undefined,
  options?: UseQueryOptions<
    {
      currentWaypoint: ContainerWaypoint | null;
      nextWaypoint: ContainerWaypoint | null;
      progressPercentage: number;
      estimatedTimeRemaining: number | null;
      status: WaypointStatus;
    },
    ApiClientError
  >
) => {
  return useQuery({
    queryKey: waypointQueryKeys.status(containerId || ''),
    queryFn: async () => {
      const response = await waypointService.getTrackingStatus(containerId!);
      return response.data;
    },
    enabled: !!containerId,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes for live tracking
    ...options,
  });
};

// ============================================
// MUTATION HOOKS
// ============================================

/**
 * Initialize waypoints for a container
 */
export const useInitializeWaypoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (containerId: string) => {
      const response = await waypointService.initializeWaypoints(containerId);
      return response.data;
    },
    onSuccess: (_, containerId) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.status(containerId),
      });
    },
  });
};

/**
 * Update a specific waypoint
 */
export const useUpdateWaypoint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      waypointIndex,
      data,
    }: {
      containerId: string;
      waypointIndex: number;
      data: WaypointUpdate;
    }) => {
      const response = await waypointService.updateWaypoint(
        containerId,
        waypointIndex,
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.detail(
          variables.containerId,
          variables.waypointIndex
        ),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.status(variables.containerId),
      });
    },
  });
};

/**
 * Add a new waypoint
 */
export const useAddWaypoint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      waypoint,
    }: {
      containerId: string;
      waypoint: ContainerWaypoint;
    }) => {
      const response = await waypointService.addWaypoint(containerId, waypoint);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.status(variables.containerId),
      });
    },
  });
};

/**
 * Remove a waypoint
 */
export const useRemoveWaypoint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      waypointIndex,
    }: {
      containerId: string;
      waypointIndex: number;
    }) => {
      const response = await waypointService.removeWaypoint(
        containerId,
        waypointIndex
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.status(variables.containerId),
      });
    },
  });
};

/**
 * Update a sea segment
 */
export const useUpdateSeaSegment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      segmentIndex,
      data,
    }: {
      containerId: string;
      segmentIndex: number;
      data: SeaSegmentUpdate;
    }) => {
      const response = await waypointService.updateSeaSegment(
        containerId,
        segmentIndex,
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.seaSegments(variables.containerId),
      });
    },
  });
};

/**
 * Update a road segment
 */
export const useUpdateRoadSegment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      segmentIndex,
      data,
    }: {
      containerId: string;
      segmentIndex: number;
      data: RoadSegmentUpdate;
    }) => {
      const response = await waypointService.updateRoadSegment(
        containerId,
        segmentIndex,
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.roadSegments(variables.containerId),
      });
    },
  });
};

/**
 * Bulk update waypoints
 */
export const useBulkUpdateWaypoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      updates,
    }: {
      containerId: string;
      updates: Array<{
        waypointIndex: number;
        data: WaypointUpdate;
      }>;
    }) => {
      const response = await waypointService.bulkUpdateWaypoints(
        containerId,
        updates
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.status(variables.containerId),
      });
    },
  });
};

/**
 * Mark waypoints as completed
 */
export const useMarkWaypointsCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      waypointIndices,
      completedAt,
    }: {
      containerId: string;
      waypointIndices: number[];
      completedAt?: string;
    }) => {
      const response = await waypointService.markWaypointsCompleted(
        containerId,
        waypointIndices,
        completedAt
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.status(variables.containerId),
      });
    },
  });
};

/**
 * Update current position
 */
export const useUpdateCurrentPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      position,
    }: {
      containerId: string;
      position: {
        waypointIndex: number;
        latitude?: number;
        longitude?: number;
        notes?: string;
      };
    }) => {
      const response = await waypointService.updateCurrentPosition(
        containerId,
        position
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.status(variables.containerId),
      });
    },
  });
};

// ============================================
// UTILITY HOOKS
// ============================================

/**
 * Hook to get waypoint statistics
 */
export const useWaypointStats = (containerId: string | undefined) => {
  const { data: waypoints } = useGetWaypoints(containerId);

  const stats = {
    total: waypoints?.waypoints?.length || 0,
    completed: waypoints?.waypoints?.filter((w) => w.status === 'COMPLETED').length || 0,
    inProgress: waypoints?.waypoints?.filter((w) => w.status === 'IN_PROGRESS').length || 0,
    pending: waypoints?.waypoints?.filter((w) => w.status === 'PENDING').length || 0,
    delayed: waypoints?.waypoints?.filter((w) => w.status === 'DELAYED').length || 0,
    seaSegments: waypoints?.waypoints?.filter((w) => w.segmentType === 'SEA').length || 0,
    roadSegments: waypoints?.waypoints?.filter((w) => w.segmentType === 'ROAD').length || 0,
    airSegments: waypoints?.waypoints?.filter((w) => w.segmentType === 'AIR').length || 0,
    progressPercentage: waypoints?.progressPercentage || 0,
  };

  return stats;
};

/**
 * Hook to check if container has waypoints initialized
 */
export const useHasWaypoints = (containerId: string | undefined) => {
  const { data: waypoints, isLoading } = useGetWaypoints(containerId);
  return {
    hasWaypoints: !!waypoints?.waypoints?.length,
    isLoading,
    waypointsCount: waypoints?.waypoints?.length || 0,
  };
};

// ============================================
// PORT-SPECIFIC HOOKS
// ============================================

/**
 * Hook to get available status options for a specific waypoint
 * Returns port-specific status options based on location
 */
export const useWaypointStatusOptions = (
  containerId: string | undefined,
  waypointIndex: number | undefined
) => {
  const { data: waypointsResponse } = useGetWaypoints(containerId);
  
  const waypoint = waypointIndex !== undefined 
    ? waypointsResponse?.waypoints?.[waypointIndex]
    : undefined;
    
  const locationCode = waypoint?.location?.portCode || '';
  const currentStatus = waypoint?.status as import('../types/waypointStatus').ExtendedWaypointStatus;
  
  return {
    waypoint,
    locationCode,
    currentStatus,
    isPort: import('../types/waypointStatus').getLocationCategory(locationCode) === 'DISCHARGE_PORT',
    isBorder: import('../types/waypointStatus').getLocationCategory(locationCode) === 'BORDER',
    isWarehouse: import('../types/waypointStatus').getLocationCategory(locationCode) === 'WAREHOUSE',
  };
};

/**
 * Hook to update waypoint status with port-specific validation
 */
export const useUpdateWaypointStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      waypointIndex,
      status,
      additionalData,
    }: {
      containerId: string;
      waypointIndex: number;
      status: import('../types/waypointStatus').ExtendedWaypointStatus;
      additionalData?: Partial<ContainerWaypoint>;
    }) => {
      const response = await waypointService.updateWaypoint(
        containerId,
        waypointIndex,
        { status: status as WaypointStatus, ...additionalData }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.detail(
          variables.containerId,
          variables.waypointIndex
        ),
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.status(variables.containerId),
      });
    },
  });
};
