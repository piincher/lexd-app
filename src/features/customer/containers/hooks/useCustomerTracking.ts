/**
 * Customer Tracking Hooks
 * React Query hooks for customer-facing tracking functionality
 */

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { customerTrackingService } from '../services/customerTrackingService';
import {
  CustomerTrackingInfo,
  PublicTrackingInfo,
  TrackingTimelineEvent,
  TrackingStatus,
} from '../types/tracking';
import { ApiClientError } from '@src/api/client';

// ============================================
// QUERY KEYS
// ============================================

export const trackingQueryKeys = {
  all: ['tracking'] as const,
  lists: () => [...trackingQueryKeys.all, 'list'] as const,
  list: (containerId: string) =>
    [...trackingQueryKeys.lists(), containerId] as const,
  public: () => [...trackingQueryKeys.all, 'public'] as const,
  publicTracking: (containerNumber: string) =>
    [...trackingQueryKeys.public(), containerNumber] as const,
  events: () => [...trackingQueryKeys.all, 'events'] as const,
  progress: (containerId: string) =>
    [...trackingQueryKeys.list(containerId), 'progress'] as const,
  estimatedDelivery: (containerId: string) =>
    [...trackingQueryKeys.list(containerId), 'estimated-delivery'] as const,
};

// ============================================
// AUTHENTICATED CUSTOMER QUERIES
// ============================================

/**
 * Get detailed tracking for a container (customer view)
 */
export const useGetContainerTracking = (
  containerId: string | undefined,
  options?: UseQueryOptions<CustomerTrackingInfo, ApiClientError>
) => {
  return useQuery({
    queryKey: trackingQueryKeys.list(containerId || ''),
    queryFn: async () => {
      const response = await customerTrackingService.getContainerTracking(
        containerId!
      );
      return response.data;
    },
    enabled: !!containerId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: (query) => {
      // Refetch more frequently if in transit
      const data = query.state.data as CustomerTrackingInfo | undefined;
      if (data?.currentStatus === 'IN_TRANSIT') {
        return 2 * 60 * 1000; // Every 2 minutes for in-transit containers
      }
      return 5 * 60 * 1000; // Every 5 minutes otherwise
    },
    ...options,
  });
};

/**
 * Get tracking for a specific goods item
 */
export const useGetGoodsTracking = (
  goodsId: string | undefined,
  options?: UseQueryOptions<CustomerTrackingInfo, ApiClientError>
) => {
  return useQuery({
    queryKey: [...trackingQueryKeys.all, 'goods', goodsId || ''],
    queryFn: async () => {
      const response = await customerTrackingService.getGoodsTracking(goodsId!);
      return response.data;
    },
    enabled: !!goodsId,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

/**
 * Get customer's tracking events
 */
export const useGetMyTrackingEvents = (
  filters?: {
    startDate?: string;
    endDate?: string;
    status?: TrackingStatus;
  },
  options?: UseQueryOptions<
    { events: TrackingTimelineEvent[]; unreadCount: number },
    ApiClientError
  >
) => {
  return useQuery({
    queryKey: [trackingQueryKeys.events(), filters],
    queryFn: async () => {
      const response = await customerTrackingService.getMyTrackingEvents(
        filters
      );
      return response.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    ...options,
  });
};

/**
 * Get delivery progress for a container
 */
export const useGetDeliveryProgress = (
  containerId: string | undefined,
  options?: UseQueryOptions<
    {
      progressPercentage: number;
      currentStatus: TrackingStatus;
      daysInTransit: number;
      estimatedDaysRemaining: number | null;
    },
    ApiClientError
  >
) => {
  return useQuery({
    queryKey: trackingQueryKeys.progress(containerId || ''),
    queryFn: async () => {
      const response = await customerTrackingService.getDeliveryProgress(
        containerId!
      );
      return response.data;
    },
    enabled: !!containerId,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

/**
 * Get estimated delivery date
 */
export const useGetEstimatedDelivery = (
  containerId: string | undefined,
  options?: UseQueryOptions<
    {
      estimatedDelivery: string;
      confidence: 'HIGH' | 'MEDIUM' | 'LOW';
      factors: string[];
    },
    ApiClientError
  >
) => {
  return useQuery({
    queryKey: trackingQueryKeys.estimatedDelivery(containerId || ''),
    queryFn: async () => {
      const response = await customerTrackingService.getEstimatedDelivery(
        containerId!
      );
      return response.data;
    },
    enabled: !!containerId,
    staleTime: 5 * 60 * 1000, // 5 minutes - doesn't change often
    ...options,
  });
};

// ============================================
// PUBLIC TRACKING QUERIES
// ============================================

/**
 * Get public tracking by container number (no auth required)
 */
export const useGetPublicTracking = (
  containerNumber: string | undefined,
  options?: UseQueryOptions<PublicTrackingInfo, ApiClientError>
) => {
  return useQuery({
    queryKey: trackingQueryKeys.publicTracking(containerNumber || ''),
    queryFn: async () => {
      const response = await customerTrackingService.getPublicTracking(
        containerNumber!
      );
      return response.data;
    },
    enabled: !!containerNumber,
    staleTime: 2 * 60 * 1000,
    retry: (failureCount, error) => {
      // Don't retry on 404s (container not found)
      if (error instanceof ApiClientError && error.statusCode === 404) {
        return false;
      }
      return failureCount < 2;
    },
    ...options,
  });
};

/**
 * Verify if container number exists
 */
export const useVerifyContainerNumber = (
  containerNumber: string | undefined,
  options?: UseQueryOptions<
    { exists: boolean; isInTransit: boolean },
    ApiClientError
  >
) => {
  return useQuery({
    queryKey: [...trackingQueryKeys.public(), 'verify', containerNumber || ''],
    queryFn: async () => {
      const response = await customerTrackingService.verifyContainerNumber(
        containerNumber!
      );
      return response.data;
    },
    enabled: !!containerNumber && containerNumber.length >= 8,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ============================================
// MUTATION HOOKS
// ============================================

/**
 * Mark tracking events as read
 */
export const useMarkEventsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (eventIds: string[]) => {
      const response = await customerTrackingService.markEventsAsRead(eventIds);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trackingQueryKeys.events(),
      });
    },
  });
};

/**
 * Subscribe to tracking updates
 */
export const useSubscribeToTrackingUpdates = () => {
  return useMutation({
    mutationFn: async ({
      containerId,
      pushToken,
    }: {
      containerId: string;
      pushToken: string;
    }) => {
      const response = await customerTrackingService.subscribeToTrackingUpdates(
        containerId,
        pushToken
      );
      return response.data;
    },
  });
};

/**
 * Unsubscribe from tracking updates
 */
export const useUnsubscribeFromTrackingUpdates = () => {
  return useMutation({
    mutationFn: async ({
      containerId,
      pushToken,
    }: {
      containerId: string;
      pushToken: string;
    }) => {
      const response = await customerTrackingService.unsubscribeFromTrackingUpdates(
        containerId,
        pushToken
      );
      return response.data;
    },
  });
};

// ============================================
// UTILITY HOOKS
// ============================================

/**
 * Hook to check if container is in final stages
 */
export const useIsNearDestination = (
  containerId: string | undefined
): boolean => {
  const { data: tracking } = useGetContainerTracking(containerId);

  if (!tracking) return false;

  const nearDestinationStatuses: TrackingStatus[] = [
    'ARRIVED_PORT',
    'CUSTOMS_CLEARANCE',
    'INLAND_TRANSPORT',
    'READY_FOR_PICKUP',
  ];

  return nearDestinationStatuses.includes(tracking.currentStatus);
};

/**
 * Hook to get days until delivery
 */
export const useDaysUntilDelivery = (
  containerId: string | undefined
): number | null => {
  const { data: progress } = useGetDeliveryProgress(containerId);
  return progress?.estimatedDaysRemaining ?? null;
};

/**
 * Hook to check if there are unread tracking events
 */
export const useHasUnreadTrackingEvents = (): boolean => {
  const { data: events } = useGetMyTrackingEvents();
  return (events?.unreadCount ?? 0) > 0;
};
