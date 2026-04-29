/**
 * Delete Notification Hook
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import { notificationApi } from '../../api/notificationApi';
import { notificationQueryKeys } from './useNotificationQueries';
import type { InAppNotification } from '../../types';

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.deleteNotification(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: notificationQueryKeys.lists() });

      const previousLists = queryClient.getQueriesData({ queryKey: notificationQueryKeys.lists() });

      queryClient.setQueriesData(
        { queryKey: notificationQueryKeys.lists() },
        (old: any) => {
          if (!old) return old;
          if (old.pages) {
            return {
              ...old,
              pages: old.pages.map((page: any) => ({
                ...page,
                data: page.data?.filter((n: InAppNotification) => n._id !== id),
              })),
            };
          }
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
