/**
 * NotificationProvider
 * Context provider for managing in-app toast notifications
 * Handles real-time notifications and polling
 */

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

import type { InAppNotification } from '../types';
import { useGetUnreadCount } from '../hooks/useNotifications';
import NotificationToast from './NotificationToast';
import { useNotificationNavigation } from '../hooks/useNotificationNavigation';

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
  const [toastVisible, setToastVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<InAppNotification | null>(null);
  const [lastNotification, setLastNotification] = useState<InAppNotification | null>(null);

  const seenNotificationsRef = useRef<Set<string>>(new Set());

  const { data: unreadData } = useGetUnreadCount();
  const { handleToastPress } = useNotificationNavigation();

  useEffect(() => {
    if (unreadData?.hasNew && unreadData.count > 0) {
      // Placeholder for polling mechanism
    }
  }, [unreadData]);

  const showToast = (notification: InAppNotification) => {
    if (seenNotificationsRef.current.has(notification._id)) {
      return;
    }

    seenNotificationsRef.current.add(notification._id);

    if (seenNotificationsRef.current.size > 100) {
      const first = seenNotificationsRef.current.values().next().value;
      if (first) seenNotificationsRef.current.delete(first);
    }

    setCurrentNotification(notification);
    setLastNotification(notification);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
    setTimeout(() => {
      setCurrentNotification(null);
    }, 300);
  };

  return (
    <NotificationContext.Provider
      value={{
        showToast,
        hideToast,
        lastNotification,
      }}
    >
      {children}

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

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationProvider');
  }
  return context;
};

export const useShowNotification = () => {
  const { showToast } = useNotificationContext();
  return showToast;
};
