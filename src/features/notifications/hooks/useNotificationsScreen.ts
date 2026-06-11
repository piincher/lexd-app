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

  const allNotifications = useMemo(() => {
    const flat = data?.pages.flatMap(page => page.data ?? []) || [];
    // De-duplicate by _id. Offset-based pages can overlap when new notifications
    // arrive between fetches, which would otherwise yield duplicate React keys
    // ("Encountered two children with the same key") and drop/duplicate rows.
    const seen = new Set<string>();
    return flat.filter((n) => {
      const id = n?._id;
      if (!id) return true;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }, [data]);

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
