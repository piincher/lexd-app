/**
 * ConnectedNotificationBell - Wrapper with live unread count
 * Imports from features/notifications and passes data to shared/ui/NotificationBell
 */

import React from 'react';
import { NotificationBell as PureNotificationBell, type NotificationBellProps } from '@src/shared/ui/NotificationBell';
import { useAuth } from '@src/store/Auth';
import { useGetUnreadCount } from '../hooks/useNotifications';

export const NotificationBell: React.FC<Omit<NotificationBellProps, 'unreadCount' | 'hasNew'>> = (props) => {
  const { token } = useAuth();
  const { data: unreadData } = useGetUnreadCount({ enabled: !!token });

  return (
    <PureNotificationBell
      {...props}
      unreadCount={unreadData?.count || 0}
      hasNew={unreadData?.hasNew || false}
    />
  );
};

export default NotificationBell;
