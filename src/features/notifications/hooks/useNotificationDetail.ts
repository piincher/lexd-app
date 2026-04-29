import { useEffect, useMemo } from 'react';
import { useMarkAsRead, useDeleteNotification } from './useNotifications';
import { formatFullDate } from '../utils/timeUtils';
import type { InAppNotification } from '../types';
import type { navigationProps } from '@src/navigations/type';

export const useNotificationDetail = (
  notification: InAppNotification,
  navigation: navigationProps
) => {
  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: deleteNotification } = useDeleteNotification();

  useEffect(() => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
  }, [notification._id, notification.isRead, markAsRead]);

  const createdAt = formatFullDate(notification.createdAt);

  const showActionButton = useMemo(() => {
    const data = notification.data;
    return !!(data?.orderId || data?.containerId || data?.ticketId || data?.certificateId);
  }, [notification.data]);

  const handleActionPress = () => {
    const data = notification.data;
    if (data?.type === 'CERTIFICATE_ISSUED' || data?.certificateId) {
      if (data?.certificateId && data?.verificationCode && data?.issuedAt) {
        navigation.navigate('CertificateDetail', {
          certificateId: data.certificateId,
          verificationCode: data.verificationCode,
          issuedAt: data.issuedAt,
          certificateUrl: data.certificateUrl || null,
          certificateMongoId: data.certificateMongoId || data.certificateId,
        });
      } else {
        navigation.navigate('HomeTab', { screen: 'Profile' });
      }
    } else if (data?.orderId) {
      navigation.navigate('OrderDetail', { id: data.orderId });
    } else if (data?.containerId) {
      navigation.navigate('ContainerTracking', { containerId: data.containerId });
    } else if (data?.ticketId) {
      if (data?.screen === 'AdminTicketDetail') {
        navigation.navigate('AdminTicketDetail', { ticketId: data.ticketId });
      } else {
        navigation.navigate('TicketDetail', { ticketId: data.ticketId });
      }
    }
  };

  const handleDelete = () => {
    deleteNotification(notification._id);
    navigation.goBack();
  };

  return {
    createdAt,
    showActionButton,
    handleActionPress,
    handleDelete,
  };
};
