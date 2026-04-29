/**
 * NotificationsScreen
 * SRP: Layout composition ONLY
 */

import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Theme } from '@src/constants/Theme';
import type { navigationProps } from '@src/navigations/type';
import type { InAppNotification } from '../types';
import { useNotificationsScreen } from '../hooks/useNotificationsScreen';

import { NotificationHeader } from './components/NotificationHeader';
import { NotificationFilterTabs } from './components/NotificationFilterTabs';
import { NotificationList } from './components/NotificationList';

interface NotificationsScreenProps {
  navigation: navigationProps;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ navigation }) => {
  const {
    activeFilter,
    notifications,
    unreadCount,
    hasUnread,
    isLoading,
    isFetching,
    isError,
    isFetchingNextPage,
    isMarkingAll,
    handleFilterChange,
    handleMarkAsRead,
    handleDelete,
    handleMarkAllAsRead,
    handleLoadMore,
    refetch,
  } = useNotificationsScreen();

  const handleNotificationPress = useCallback((notification: InAppNotification) => {
    navigation.navigate('NotificationDetail', { notification });
  }, [navigation]);

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
        isLoading={isLoading && notifications.length === 0}
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
