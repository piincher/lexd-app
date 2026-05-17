import { useCallback } from 'react';
import type { PublicNotification } from '../types';
import { PUBLIC_NOTIFICATION_TYPE_CONFIG } from '../types';

export interface FormattedPublicNotification extends PublicNotification {
  displayLabel: string;
  displayIcon: string;
  displayColor: string;
}

export const usePublicNotificationDisplay = () => {
  const formatNotification = useCallback((notification: PublicNotification): FormattedPublicNotification => {
    const config = PUBLIC_NOTIFICATION_TYPE_CONFIG[notification.type];
    return {
      ...notification,
      displayLabel: config?.label || 'Notification',
      displayIcon: config?.icon || 'bell',
      displayColor: config?.color || '#6B7280',
    };
  }, []);

  const formatNotifications = useCallback((notifications: PublicNotification[]): FormattedPublicNotification[] => {
    return notifications.map(formatNotification);
  }, [formatNotification]);

  return { formatNotification, formatNotifications };
};
