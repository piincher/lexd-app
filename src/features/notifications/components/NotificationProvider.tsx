/**
 * NotificationProvider
 * Context provider for managing in-app toast notifications
 * Handles real-time notifications and polling
 */

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { InAppNotification } from '../types';
import { useGetUnreadCount } from '../hooks/useNotifications';
import NotificationToast from './NotificationToast';
import type { RootStackParamList } from '@src/navigations/type';
import { certificateApi } from '@src/features/profile/api/certificateApi';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface NotificationContextType {
  showToast: (notification: InAppNotification) => void;
  hideToast: () => void;
  lastNotification: InAppNotification | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const navigation = useNavigation<NavigationProp>();
  const [toastVisible, setToastVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<InAppNotification | null>(null);
  const [lastNotification, setLastNotification] = useState<InAppNotification | null>(null);
  
  // Track previously seen notifications to avoid duplicates
  const seenNotificationsRef = useRef<Set<string>>(new Set());
  
  // Get unread count with polling
  const { data: unreadData } = useGetUnreadCount();

  // Show toast for high priority notifications
  useEffect(() => {
    if (unreadData?.hasNew && unreadData.count > 0) {
      // In a real implementation, you would fetch the latest notification
      // and show it as a toast if it's high priority
      // For now, this is a placeholder for the polling mechanism
    }
  }, [unreadData]);

  const showToast = (notification: InAppNotification) => {
    // Prevent duplicate notifications
    if (seenNotificationsRef.current.has(notification._id)) {
      return;
    }
    
    seenNotificationsRef.current.add(notification._id);
    
    // Keep only last 100 notification IDs to prevent memory leak
    if (seenNotificationsRef.current.size > 100) {
      const first = seenNotificationsRef.current.values().next().value;
      seenNotificationsRef.current.delete(first);
    }

    setCurrentNotification(notification);
    setLastNotification(notification);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
    // Delay clearing the notification to allow exit animation
    setTimeout(() => {
      setCurrentNotification(null);
    }, 300);
  };

  const handleToastPress = (notification: InAppNotification) => {
    hideToast();

    // Navigate based on notification type
    const { type, data } = notification;

    // Check both the notification type and data.type for certificate notifications
    const effectiveType = data?.type === 'CERTIFICATE_ISSUED' ? 'CERTIFICATE_ISSUED' : type;

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

      case 'INVOICE':
        if (data?.invoiceId) {
          // navigation.navigate('InvoiceDetail', { id: data.invoiceId });
        }
        break;

      case 'PAYMENT':
        if (data?.paymentId) {
          navigation.navigate('PaymentConfirmation', {
            paymentId: data.paymentId,
            transactionReference: '',
            amount: 0,
            currency: 'XOF',
            paymentMethod: '',
            goodsCount: 0,
          });
        }
        break;

      case 'CERTIFICATE_ISSUED':
        // Fetch certificate progress and navigate to detail screen
        certificateApi.getProgress().then((response) => {
          const progress = response.data.data;
          if (progress.isCertified && progress.certificate) {
            const cert = progress.certificate;
            navigation.navigate('CertificateDetail', {
              certificateId: cert.certificateId,
              verificationCode: cert.verificationCode,
              issuedAt: cert.issuedAt,
              certificateUrl: cert.certificateUrl || null,
              certificateMongoId: cert._id || data?.certificateId,
            });
          }
        }).catch((err) => {
          console.error('[NotificationProvider] Error fetching certificate:', err);
        });
        break;

      default:
        // Show notification detail for other types
        navigation.navigate('NotificationDetail', { notification });
        break;
    }
  };

  return (
    <NotificationContext.Provider 
      value={{ 
        showToast, 
        hideToast, 
        lastNotification 
      }}
    >
      {children}
      
      {/* Global Toast */}
      <NotificationToast
        notification={currentNotification}
        visible={toastVisible}
        onDismiss={hideToast}
        onPress={handleToastPress}
        autoDismissDelay={currentNotification?.priority === 'HIGH' ? 8000 : 5000}
      />
    </NotificationContext.Provider>
  );
};

// Hook for using notification context
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationProvider');
  }
  return context;
};

// Hook for showing notifications
export const useShowNotification = () => {
  const { showToast } = useNotificationContext();
  return showToast;
};
