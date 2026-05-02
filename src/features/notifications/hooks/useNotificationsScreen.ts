/**
 * useNotificationsScreen
 * SRP: All data fetching, state, and business logic for the notifications screen
 */

import { useState, useCallback, useMemo } from 'react';
import * as Haptics from 'expo-haptics';

import type { FilterTab, InAppNotification } from '../types';
import {
  useGetNotificationsInfinite,
  useGetUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification,
} from './useNotifications';

export const useNotificationsScreen = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetNotificationsInfinite(activeFilter);

  const { data: unreadData } = useGetUnreadCount();
  const unreadCount = unreadData?.count || 0;

  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: markAllAsRead, isPending: isMarkingAll } = useMarkAllAsRead();
  const { mutate: deleteNotification } = useDeleteNotification();

  const allNotifications = useMemo(
    () => data?.pages.flatMap(page => page.data ?? []) || [],
    [data]
  );

  const notifications = useMemo(
    () => filterNotifications(allNotifications, activeFilter),
    [allNotifications, activeFilter]
  );

  const hasUnread = notifications.some(n => n && !n.isRead);

  const handleFilterChange = useCallback((filter: FilterTab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveFilter(filter);
  }, []);

  const handleMarkAsRead = useCallback((id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    markAsRead(id);
  }, [markAsRead]);

  const handleDelete = useCallback((id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    deleteNotification(id);
  }, [deleteNotification]);

  const handleMarkAllAsRead = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    markAllAsRead();
  }, [markAllAsRead]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    activeFilter,
    notifications,
    unreadCount,
    hasUnread,
    isLoading,
    isFetching,
    isError,
    isFetchingNextPage,
    isMarkingAll,
    handleFilterChange,
    handleMarkAsRead,
    handleDelete,
    handleMarkAllAsRead,
    handleLoadMore,
    refetch,
  };
};

const filterNotifications = (
  notifications: InAppNotification[],
  filter: FilterTab,
) => {
  if (filter === 'important') {
    return notifications.filter((item) =>
      item.priority === 'HIGH' ||
      item.category === 'WARNING' ||
      item.category === 'ERROR' ||
      ['READY_FOR_PICKUP', 'PAYMENT_OVERDUE'].includes(String(item.data?.movementEventType || item.data?.type || ''))
    );
  }

  if (filter === 'shipments') {
    return notifications.filter((item) =>
      item.type === 'CONTAINER_STATUS' ||
      item.type === 'ORDER_UPDATE' ||
      String(item.data?.screen || '').toLowerCase().includes('container')
    );
  }

  if (filter === 'payments') {
    return notifications.filter((item) =>
      item.type === 'PAYMENT' ||
      item.type === 'INVOICE'
    );
  }

  return notifications;
};
