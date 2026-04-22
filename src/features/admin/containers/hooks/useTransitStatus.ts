/**
 * Transit Status Hooks - React Query hooks for container transit status management
 * Provides queries and mutations for tracking container transit state
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { transitStatusService } from '../services/TransitStatusService';
import {
  TransitStatus,
  TransitHistoryEntry,
  TransitStatusUpdate,
  BulkTransitUpdate,
  TransitValidationResponse,
  TransitProgress,
} from '../types/transitStatus';
import { containerQueryKeys } from './useContainers';
import { ApiClientError } from '@src/api/client';

// ============================================
// QUERY KEYS
// ============================================

export const transitStatusQueryKeys = {
  all: ['transitStatus'] as const,
  detail: (id: string) => [...transitStatusQueryKeys.all, id] as const,
  history: (id: string) => [...transitStatusQueryKeys.detail(id), 'history'] as const,
  current: (id: string) => [...transitStatusQueryKeys.detail(id), 'current'] as const,
};

// ============================================
// QUERY HOOKS
// ============================================

/**
 * Get current transit status for a container
 */
export const useGetTransitStatus = (
  containerId: string | undefined,
  options?: UseQueryOptions<TransitStatus, ApiClientError>
) => {
  return useQuery({
    queryKey: transitStatusQueryKeys.current(containerId || ''),
    queryFn: async () => {
      const response = await transitStatusService.getCurrentTransitStatus(containerId!);
      return response.data;
    },
    enabled: !!containerId,
    staleTime: 1 * 60 * 1000, // 1 minute
    ...options,
  });
};

/**
 * Get transit history for a container
 */
export const useGetTransitHistory = (
  containerId: string | undefined,
  options?: UseQueryOptions<TransitHistoryEntry[], ApiClientError>
) => {
  return useQuery({
    queryKey: transitStatusQueryKeys.history(containerId || ''),
    queryFn: async () => {
      const response = await transitStatusService.getTransitHistory(containerId!);
      return response.data;
    },
    enabled: !!containerId,
    ...options,
  });
};

/**
 * Validate a transit status transition
 */
export const useValidateTransitTransition = (
  containerId: string | undefined,
  newStatus: string | undefined,
  options?: UseQueryOptions<TransitValidationResponse, ApiClientError>
) => {
  return useQuery({
    queryKey: [...transitStatusQueryKeys.detail(containerId || ''), 'validate', newStatus] as const,
    queryFn: async () => {
      const response = await transitStatusService.validateTransitTransition(
        containerId!,
        newStatus!
      );
      return response.data;
    },
    enabled: !!containerId && !!newStatus,
    ...options,
  });
};

// ============================================
// MUTATION HOOKS
// ============================================

/**
 * Update transit status for a container
 */
export const useUpdateTransitStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      containerId,
      data,
    }: {
      containerId: string;
      data: TransitStatusUpdate;
    }) => {
      const response = await transitStatusService.updateTransitStatus(containerId, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate transit status queries
      queryClient.invalidateQueries({
        queryKey: transitStatusQueryKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: transitStatusQueryKeys.detail(variables.containerId),
      });
      // Invalidate container queries
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.detail(variables.containerId),
      });
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.lists(),
      });
    },
  });
};

/**
 * Bulk update transit status for multiple containers
 */
export const useBulkUpdateTransitStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BulkTransitUpdate) => {
      const response = await transitStatusService.bulkUpdateTransitStatus(data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate all transit status queries
      queryClient.invalidateQueries({
        queryKey: transitStatusQueryKeys.all,
      });
      // Invalidate all container queries
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.all,
      });
    },
  });
};

// ============================================
// UTILITY HOOKS
// ============================================

/**
 * Hook to calculate transit progress for a container
 * Returns progress percentage and related status information
 */
export const useTransitProgress = (
  containerId: string | undefined
): TransitProgress & {
  isLoading: boolean;
  isError: boolean;
} => {
  const { data: status, isLoading, isError } = useGetTransitStatus(containerId);

  const progress = status?.progressPercentage || 0;
  const currentStatus = status?.currentStatus || null;
  const nextStatus = status?.nextStatus || null;
  const isComplete = status?.isComplete || false;

  return {
    progress,
    currentStatus,
    nextStatus,
    isComplete,
    isLoading,
    isError,
  };
};
