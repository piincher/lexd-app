import { useMemo } from 'react';
import type { FilterTab, InAppNotification } from '../types';
import { filterNotifications } from './notificationFilterHelpers';

export const useNotificationFilter = (
  notifications: InAppNotification[],
  activeFilter: FilterTab,
) => {
  const filteredNotifications = useMemo(
    () => filterNotifications(notifications, activeFilter),
    [notifications, activeFilter]
  );

  const hasUnread = filteredNotifications.some(n => n && !n.isRead);

  return { filteredNotifications, hasUnread };
};
