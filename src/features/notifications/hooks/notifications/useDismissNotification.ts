/**
 * Dismiss Notification Hook
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import { notificationApi } from '../../api/notificationApi';
import { notificationQueryKeys } from './useNotificationQueries';

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
