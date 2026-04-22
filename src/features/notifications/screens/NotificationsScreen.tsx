/**
 * NotificationsScreen
 * SRP: Layout composition and state coordination ONLY
 * Delegates rendering to sub-components
 */

import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import { Theme } from '@src/constants/Theme';
import type { navigationProps } from '@src/navigations/type';
import type { InAppNotification } from '../types';
import {
  useGetNotificationsInfinite,
  useGetUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification,
} from '../hooks/useNotifications';

import { NotificationHeader } from './components/NotificationHeader';
import { NotificationFilterTabs } from './components/NotificationFilterTabs';
import { NotificationList } from './components/NotificationList';

export type FilterTab = 'all' | 'unread' | 'system';

interface NotificationsScreenProps {
  navigation: navigationProps;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  // Data
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetNotificationsInfinite(activeFilter);

  const { data: unreadData } = useGetUnreadCount();
  const unreadCount = unreadData?.count || 0;

  // Mutations
  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: markAllAsRead, isPending: isMarkingAll } = useMarkAllAsRead();
  const { mutate: deleteNotification } = useDeleteNotification();

  // Flatten paginated data
  const notifications = useMemo(
    () => data?.pages.flatMap(page => page.data ?? []) || [],
    [data]
  );

  const hasUnread = notifications.some(n => n && !n.isRead);

  // Handlers
  const handleFilterChange = useCallback((filter: FilterTab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveFilter(filter);
  }, []);

  const handleMarkAsRead = useCallback((id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    markAsRead(id);
  }, [markAsRead]);

  const handleDelete = useCallback((id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    deleteNotification(id);
  }, [deleteNotification]);

  const handleMarkAllAsRead = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    markAllAsRead();
  }, [markAllAsRead]);

  const handleNotificationPress = useCallback((notification: InAppNotification) => {
    // Navigate to detail screen to show full notification
    navigation.navigate('NotificationDetail', { notification });
  }, [navigation]);

  const navigateByType = (notification: InAppNotification) => {
    const { type, data: notifData } = notification;
    const effectiveType = notifData?.type === 'CERTIFICATE_ISSUED' ? 'CERTIFICATE_ISSUED' : type;

    switch (effectiveType) {
      case 'ORDER_UPDATE':
        if (notifData?.orderId) navigation.navigate('OrderDetail', { id: notifData.orderId });
        break;
      case 'CONTAINER_STATUS':
        if (notifData?.containerId) navigation.navigate('ContainerTracking', { containerId: notifData.containerId });
        break;
      case 'TICKET_REPLY':
        if (notifData?.ticketId) navigation.navigate('TicketDetail', { ticketId: notifData.ticketId });
        break;
      case 'PAYMENT':
        if (notifData?.paymentId) {
          navigation.navigate('MyPaymentHistory');
        }
        break;
      case 'CERTIFICATE_ISSUED':
        if (notifData?.certificateId && notifData?.verificationCode && notifData?.issuedAt) {
          navigation.navigate('CertificateDetail', {
            certificateId: notifData.certificateId,
            verificationCode: notifData.verificationCode,
            issuedAt: notifData.issuedAt,
            certificateUrl: notifData.certificateUrl || null,
            certificateMongoId: notifData.certificateMongoId || notifData.certificateId,
          });
        } else {
          navigation.navigate('Profile');
        }
        break;
    }
  };

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <NotificationHeader
        unreadCount={unreadCount}
        hasUnread={hasUnread}
        isMarkingAll={isMarkingAll}
        onMarkAllAsRead={handleMarkAllAsRead}
        onBack={() => navigation.goBack()}
      />

      <NotificationFilterTabs
        activeFilter={activeFilter}
        unreadCount={unreadCount}
        onFilterChange={handleFilterChange}
      />

      <NotificationList
        notifications={notifications}
        isLoading={isLoading && !data?.pages?.length}
        isFetching={isFetching}
        isError={isError}
        isFetchingNextPage={isFetchingNextPage}
        activeFilter={activeFilter}
        onPress={handleNotificationPress}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
        onRefresh={refetch}
        onLoadMore={handleLoadMore}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
});

export default NotificationsScreen;
