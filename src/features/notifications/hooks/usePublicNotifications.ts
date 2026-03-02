/**
 * usePublicNotifications Hook
 * React Query hooks for privacy-conscious public notifications
 * Fetches and polls public arrival/assignment notifications
 */

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { apiClientV2 } from '@src/api/client';
import type { PublicNotification, PaginatedPublicNotifications, PublicNotificationType } from '../types';

// ============================================
// QUERY KEYS
// ============================================

export const publicNotificationQueryKeys = {
  all: ['public-notifications'] as const,
  lists: () => [...publicNotificationQueryKeys.all, 'list'] as const,
  list: (type?: PublicNotificationType) => [...publicNotificationQueryKeys.lists(), type] as const,
  infinite: (type?: PublicNotificationType) => [...publicNotificationQueryKeys.lists(), 'infinite', type] as const,
  stats: () => [...publicNotificationQueryKeys.all, 'stats'] as const,
};

// ============================================
// API FUNCTIONS
// ============================================

const BASE_URL = '/public/notifications';

export interface GetPublicNotificationsParams {
  page?: number;
  limit?: number;
  type?: PublicNotificationType;
}

/**
 * Get paginated public notifications
 */
export const getPublicNotifications = async (
  params?: GetPublicNotificationsParams
): Promise<PaginatedPublicNotifications> => {
  const response = await apiClientV2.get(BASE_URL, {
    params: {
      page: 1,
      limit: 20,
      ...params,
    },
  });
  return response.data.data;
};

/**
 * Get public notification statistics (admin)
 */
export const getPublicNotificationStats = async () => {
  const response = await apiClientV2.get(`${BASE_URL}/stats`);
  return response.data.data;
};

// ============================================
// QUERY HOOKS
// ============================================

/**
 * Get paginated public notifications
 * Uses standard pagination (for simpler use cases)
 */
export const useGetPublicNotifications = (params?: GetPublicNotificationsParams) => {
  return useQuery({
    queryKey: publicNotificationQueryKeys.list(params?.type),
    queryFn: () => getPublicNotifications(params),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

/**
 * Get infinite scroll public notifications
 * Best for feed-style infinite scrolling
 */
export const useGetPublicNotificationsInfinite = (type?: PublicNotificationType) => {
  return useInfiniteQuery({
    queryKey: publicNotificationQueryKeys.infinite(type),
    queryFn: ({ pageParam = 1 }) =>
      getPublicNotifications({ type, page: pageParam, limit: 20 }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1 * 60 * 1000,
  });
};

/**
 * Get public notifications with polling
 * Automatically refreshes every 30 seconds for real-time updates
 */
export const useGetPublicNotificationsPolling = (
  type?: PublicNotificationType,
  options?: { enabled?: boolean; interval?: number }
) => {
  const { enabled = true, interval = 30000 } = options || {};

  return useQuery({
    queryKey: publicNotificationQueryKeys.list(type),
    queryFn: () => getPublicNotifications({ type, limit: 20 }),
    refetchInterval: interval,
    refetchIntervalInBackground: false,
    staleTime: 0,
    enabled,
  });
};

/**
 * Get public notification statistics (admin only)
 */
export const useGetPublicNotificationStats = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: publicNotificationQueryKeys.stats(),
    queryFn: getPublicNotificationStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};
