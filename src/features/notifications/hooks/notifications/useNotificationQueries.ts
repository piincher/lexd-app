/**
 * Notification Query Hooks
 */

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { notificationApi } from '../../api/notificationApi';
import type { GetNotificationsParams } from '../../types';

export const notificationQueryKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationQueryKeys.all, 'list'] as const,
  list: (filters: GetNotificationsParams | undefined) => [...notificationQueryKeys.lists(), filters] as const,
  infinite: (filter?: string) => [...notificationQueryKeys.lists(), 'infinite', filter] as const,
  unread: () => [...notificationQueryKeys.all, 'unread'] as const,
  details: () => [...notificationQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...notificationQueryKeys.details(), id] as const,
};

export const useGetNotifications = (params?: GetNotificationsParams) => {
  return useQuery({
    queryKey: notificationQueryKeys.list(params),
    queryFn: () => notificationApi.getNotifications(params),
    staleTime: 1 * 60 * 1000,
  });
};

export const useGetNotificationsInfinite = (filter?: GetNotificationsParams['filter']) => {
  const isSmartFilter = filter === 'important' || filter === 'shipments' || filter === 'payments';

  return useInfiniteQuery({
    queryKey: notificationQueryKeys.infinite(filter),
    queryFn: ({ pageParam = 1 }) =>
      notificationApi.getNotifications({ filter, page: pageParam, limit: isSmartFilter ? 60 : 20 }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1 * 60 * 1000,
  });
};

export const useGetUnreadCount = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: notificationQueryKeys.unread(),
    queryFn: () => notificationApi.getUnreadCount(),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 1 * 60 * 1000,
    ...options,
  });
};
