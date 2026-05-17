import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { InAppNotification } from '../types';
import type { RootStackParamList } from '@src/navigations/type';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useNotificationNavigation = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleToastPress = useCallback((notification: InAppNotification) => {
    const { type, data } = notification;

    const effectiveType =
      data?.type === 'CERTIFICATE_ISSUED' || data?.type === 'TICKET_CREATED' ? data.type : type;

    switch (effectiveType) {
      case 'ORDER_UPDATE':
        if (data?.orderId) {
          navigation.navigate('OrderDetail', { id: data.orderId });
        }
        break;

      case 'CONTAINER_STATUS':
        if (data?.containerId) {
          navigation.navigate('ContainerTracking', { containerId: data.containerId });
        }
        break;

      case 'TICKET_REPLY':
        if (data?.ticketId) {
          navigation.navigate('TicketDetail', { ticketId: data.ticketId });
        }
        break;

      case 'TICKET_CREATED':
        if (data?.ticketId) {
          navigation.navigate('AdminTicketDetail', { ticketId: data.ticketId });
        } else {
          navigation.navigate('AdminTicketList');
        }
        break;

      case 'INVOICE':
        if (data?.invoiceId) {
          // navigation.navigate('InvoiceDetail', { id: data.invoiceId });
        }
        break;

      case 'CERTIFICATE_ISSUED':
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
        break;

      default:
        navigation.navigate('NotificationDetail', { notification });
        break;
    }
  }, [navigation]);

  return { handleToastPress };
};
