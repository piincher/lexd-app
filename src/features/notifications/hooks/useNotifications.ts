/**
 * Notification Hooks - React Query hooks for in-app notifications
 */

import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { notificationApi } from '../api/notificationApi';
import type { GetNotificationsParams, NotificationFilters, InAppNotification } from '../types';
import { showMessage } from 'react-native-flash-message';

// ============================================
// QUERY KEYS
// ============================================

export const notificationQueryKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationQueryKeys.all, 'list'] as const,
  list: (filters: GetNotificationsParams | undefined) => [...notificationQueryKeys.lists(), filters] as const,
  infinite: (filter?: string) => [...notificationQueryKeys.lists(), 'infinite', filter] as const,
  unread: () => [...notificationQueryKeys.all, 'unread'] as const,
  details: () => [...notificationQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...notificationQueryKeys.details(), id] as const,
};

// ============================================
// QUERY HOOKS
// ============================================

/**
 * Get paginated notifications
 */
export const useGetNotifications = (params?: GetNotificationsParams) => {
  return useQuery({
    queryKey: notificationQueryKeys.list(params),
    queryFn: () => notificationApi.getNotifications(params),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

/**
 * Get infinite scroll notifications
 */
export const useGetNotificationsInfinite = (filter?: 'all' | 'unread' | 'system') => {
  return useInfiniteQuery({
    queryKey: notificationQueryKeys.infinite(filter),
    queryFn: ({ pageParam = 1 }) => 
      notificationApi.getNotifications({ filter, page: pageParam, limit: 20 }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1 * 60 * 1000,
  });
};

/**
 * Get unread count - polls every 30 seconds
 */
export const useGetUnreadCount = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: notificationQueryKeys.unread(),
    queryFn: () => notificationApi.getUnreadCount(),
    refetchInterval: 30000, // Poll every 30 seconds
    refetchIntervalInBackground: true,
    staleTime: 0,
    ...options,
  });
};

// ============================================
// MUTATION HOOKS
// ============================================

/**
 * Mark a single notification as read
 */
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.markAsRead(id),
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: notificationQueryKeys.lists() });
      await queryClient.cancelQueries({ queryKey: notificationQueryKeys.unread() });

      // Snapshot previous values
      const previousLists = queryClient.getQueriesData({ queryKey: notificationQueryKeys.lists() });
      const previousUnread = queryClient.getQueryData(notificationQueryKeys.unread());

      // Optimistically update all list queries
      queryClient.setQueriesData(
        { queryKey: notificationQueryKeys.lists() },
        (old: any) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data?.map((n: InAppNotification) =>
              n._id === id ? { ...n, isRead: true } : n
            ),
          };
        }
      );

      // Optimistically update unread count
      if (previousUnread) {
        queryClient.setQueryData(notificationQueryKeys.unread(), {
          ...previousUnread,
          count: Math.max(0, (previousUnread as { count: number }).count - 1),
        });
      }

      return { previousLists, previousUnread };
    },
    onError: (err, id, context) => {
      // Rollback on error
      if (context?.previousLists) {
        context.previousLists.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
      if (context?.previousUnread) {
        queryClient.setQueryData(notificationQueryKeys.unread(), context.previousUnread);
      }
      showMessage({
        message: 'Erreur lors de la mise à jour',
        type: 'danger',
      });
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.unread() });
    },
  });
};

/**
 * Mark all notifications as read
 */
export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: notificationQueryKeys.lists() });
      await queryClient.cancelQueries({ queryKey: notificationQueryKeys.unread() });

      const previousLists = queryClient.getQueriesData({ queryKey: notificationQueryKeys.lists() });
      const previousUnread = queryClient.getQueryData(notificationQueryKeys.unread());

      // Optimistically mark all as read
      queryClient.setQueriesData(
        { queryKey: notificationQueryKeys.lists() },
        (old: any) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data?.map((n: InAppNotification) => ({ ...n, isRead: true })),
          };
        }
      );

      // Reset unread count
      queryClient.setQueryData(notificationQueryKeys.unread(), { count: 0, hasNew: false });

      return { previousLists, previousUnread };
    },
    onError: (err, variables, context) => {
      if (context?.previousLists) {
        context.previousLists.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
      if (context?.previousUnread) {
        queryClient.setQueryData(notificationQueryKeys.unread(), context.previousUnread);
      }
      showMessage({
        message: 'Erreur lors de la mise à jour',
        type: 'danger',
      });
    },
    onSuccess: (data) => {
      showMessage({
        message: `${data.updatedCount} notification(s) marquée(s) comme lue(s)`,
        type: 'success',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.unread() });
    },
  });
};

/**
 * Dismiss a notification
 */
export const useDismissNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.dismissNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.lists() });
    },
    onError: () => {
      showMessage({
        message: 'Erreur lors de la suppression',
        type: 'danger',
      });
    },
  });
};

/**
 * Delete a notification permanently
 */
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.deleteNotification(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: notificationQueryKeys.lists() });

      const previousLists = queryClient.getQueriesData({ queryKey: notificationQueryKeys.lists() });

      // Optimistically remove from all lists
      queryClient.setQueriesData(
        { queryKey: notificationQueryKeys.lists() },
        (old: any) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data?.filter((n: InAppNotification) => n._id !== id),
          };
        }
      );

      return { previousLists };
    },
    onError: (err, id, context) => {
      if (context?.previousLists) {
        context.previousLists.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
      showMessage({
        message: 'Erreur lors de la suppression',
        type: 'danger',
      });
    },
    onSuccess: () => {
      showMessage({
        message: 'Notification supprimée',
        type: 'success',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.unread() });
    },
  });
};
