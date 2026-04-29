/**
 * Mark All Notifications As Read Hook
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import { clearBadgeCount, setBadgeCount as setNativeBadgeCount } from '@src/shared/services/notificationService';
import { notificationApi } from '../../api/notificationApi';
import { notificationQueryKeys } from './useNotificationQueries';
import type { InAppNotification } from '../../types';

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onMutate: async () => {
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
                data: page.data?.map((n: InAppNotification) => ({ ...n, isRead: true })),
              })),
            };
          }
          return {
            ...old,
            data: old.data?.map((n: InAppNotification) => ({ ...n, isRead: true })),
          };
        }
      );

      queryClient.setQueryData(notificationQueryKeys.unread(), { count: 0, hasNew: false });
      void clearBadgeCount();

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
        void setNativeBadgeCount((context.previousUnread as { count: number }).count);
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
