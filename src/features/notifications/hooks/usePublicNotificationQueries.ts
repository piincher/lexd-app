import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { publicNotificationQueryKeys } from './publicNotificationKeys';
import { getPublicNotifications, getPublicNotificationStats } from './publicNotificationApi';
import type { GetPublicNotificationsParams } from './publicNotificationApi';
import type { PublicNotificationType } from '../types';

export { publicNotificationQueryKeys };

export const useGetPublicNotifications = (params?: GetPublicNotificationsParams) => {
  return useQuery({
    queryKey: publicNotificationQueryKeys.list(params?.type),
    queryFn: () => getPublicNotifications(params),
    staleTime: 1 * 60 * 1000,
  });
};

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

export const useGetPublicNotificationsPolling = (
  type?: PublicNotificationType,
  options?: { enabled?: boolean }
) => {
  const { enabled = true } = options || {};

  return useQuery({
    queryKey: publicNotificationQueryKeys.list(type),
    queryFn: () => getPublicNotifications({ type, limit: 20 }),
    refetchOnReconnect: true,
    staleTime: 2 * 60 * 1000,
    enabled,
  });
};

export const useGetPublicNotificationStats = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: publicNotificationQueryKeys.stats(),
    queryFn: getPublicNotificationStats,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
