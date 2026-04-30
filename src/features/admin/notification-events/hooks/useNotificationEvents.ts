import { useQuery } from '@tanstack/react-query';
import { notificationEventApi } from '../api';
import type { NotificationEventFilters } from '../types';

export const notificationEventQueryKeys = {
  all: ['admin', 'notification-events'] as const,
  list: (filters: NotificationEventFilters) =>
    [...notificationEventQueryKeys.all, 'list', filters] as const,
  detail: (id: string) => [...notificationEventQueryKeys.all, 'detail', id] as const,
};

export const useNotificationEvents = (filters: NotificationEventFilters) => {
  return useQuery({
    queryKey: notificationEventQueryKeys.list(filters),
    queryFn: () => notificationEventApi.list(filters),
    staleTime: 30 * 1000,
    placeholderData: (previousData) => previousData,
  });
};

export const useNotificationEventDetail = (id: string) => {
  return useQuery({
    queryKey: notificationEventQueryKeys.detail(id),
    queryFn: () => notificationEventApi.getById(id),
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
};
