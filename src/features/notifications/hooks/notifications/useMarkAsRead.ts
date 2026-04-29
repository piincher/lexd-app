/**
 * Mark Notification As Read Hook
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import { setBadgeCount as setNativeBadgeCount } from '@src/shared/services/notificationService';
import { notificationApi } from '../../api/notificationApi';
import { notificationQueryKeys } from './useNotificationQueries';
import type { InAppNotification } from '../../types';

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.markAsRead(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: notificationQueryKeys.lists() });
      await queryClient.cancelQueries({ queryKey: notificationQueryKeys.unread() });

      const previousLists = queryClient.getQueriesData({ queryKey: notificationQueryKeys.lists() });
      const previousUnread = queryClient.getQueryData(notificationQueryKeys.unread());

      queryClient.setQueriesData(
        { queryKey: notificationQueryKeys.lists() },
        (old: any) => {
          if (!old) return old;
          if (old.pages) {
            return {
              ...old,
              pages: old.pages.map((page: any) => ({
                ...page,
                data: page.data?.map((n: InAppNotification) =>
                  n._id === id ? { ...n, isRead: true } : n
                ),
              })),
            };
          }
          return {
            ...old,
            data: old.data?.map((n: InAppNotification) =>
              n._id === id ? { ...n, isRead: true } : n
            ),
          };
        }
      );

      if (previousUnread) {
        const count = Math.max(0, (previousUnread as { count: number }).count - 1);
        queryClient.setQueryData(notificationQueryKeys.unread(), {
          ...previousUnread,
          count,
          hasNew: count > 0,
        });
        void setNativeBadgeCount(count);
      }

      return { previousLists, previousUnread };
    },
    onError: (err, id, context) => {
      if (context?.previousLists) {
        context.previousLists.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
      if (context?.previousUnread) {
        queryClient.setQueryData(notificationQueryKeys.unread(), context.previousUnread);
        void setNativeBadgeCount((context.previousUnread as { count: number }).count);
      }
      showMessage({
        message: 'Erreur lors de la mise à jour',
        type: 'danger',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.unread() });
    },
  });
};
