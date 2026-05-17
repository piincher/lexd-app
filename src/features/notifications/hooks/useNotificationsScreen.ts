/**
 * useNotificationsScreen
 * SRP: All data fetching, state, and business logic for the notifications screen
 */

import { useMemo } from 'react';
import {
  useGetNotificationsInfinite,
  useGetUnreadCount,
} from './useNotifications';
import { useNotificationFilterState } from './useNotificationFilterState';
import { useNotificationFilter } from './useNotificationFilter';
import { useNotificationPagination } from './useNotificationPagination';
import { useNotificationScreenMutations } from './useNotificationScreenMutations';

export const useNotificationsScreen = () => {
  const { activeFilter, handleFilterChange } = useNotificationFilterState();

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

  const allNotifications = useMemo(
    () => data?.pages.flatMap(page => page.data ?? []) || [],
    [data]
  );

  const { filteredNotifications: notifications, hasUnread } =
    useNotificationFilter(allNotifications, activeFilter);

  const { handleLoadMore } = useNotificationPagination(
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  );

  const {
    handleMarkAsRead,
    handleDelete,
    handleMarkAllAsRead,
    isMarkingAll,
  } = useNotificationScreenMutations();

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
