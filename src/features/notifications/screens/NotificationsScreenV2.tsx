/**
 * Notifications Screen V2
 * Decomposed version under 100 lines
 */

import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { Button } from '@src/shared/ui/Button';
import {
  useGetNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification,
  useGetUnreadCount,
} from '../hooks/useNotifications';
import { useNotificationFilters } from '../hooks/useNotificationFilters';
import { NotificationFilters } from '../components/NotificationFilters';
import { NotificationList } from '../components/NotificationList';
import { InAppNotification } from '../types';

export const NotificationsScreenV2: React.FC = () => {
  const navigation = useNavigation();
  const { filters, setFilter } = useNotificationFilters();
  const { data, isLoading, refetch, isRefetching } = useGetNotifications({ filter: filters.filter });
  const { data: unreadData } = useGetUnreadCount();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();
  const deleteNotification = useDeleteNotification();

  const handleNotificationPress = useCallback(
    (notification: InAppNotification) => {
      if (!notification.isRead) {
        markAsRead.mutate(notification._id);
      }
      if (notification.action?.screen) {
        navigation.navigate(notification.action.screen as never, notification.action.params as never);
      }
    },
    [markAsRead, navigation]
  );

  const handleDismiss = useCallback(
    (id: string) => markAsRead.mutate(id),
    [markAsRead]
  );

  const handleDelete = useCallback(
    (id: string) => deleteNotification.mutate(id),
    [deleteNotification]
  );

  const notifications = data?.data ?? [];
  const unreadCount = unreadData?.count ?? 0;

  return (
    <Screen variant="plain" scrollable={false}>
      <View style={styles.header}>
        <NotificationFilters
          activeFilter={filters.filter}
          onFilterChange={setFilter}
          unreadCount={unreadCount}
        />
        {unreadCount > 0 && (
          <Button variant="ghost" size="small" onPress={() => markAllAsRead.mutate()}>
            Tout marquer comme lu
          </Button>
        )}
      </View>
      <NotificationList
        notifications={notifications}
        filter={filters.filter}
        isLoading={isLoading}
        isRefreshing={isRefetching}
        onRefresh={refetch}
        onNotificationPress={handleNotificationPress}
        onDismiss={handleDismiss}
        onDelete={handleDelete}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 12,
  },
});
