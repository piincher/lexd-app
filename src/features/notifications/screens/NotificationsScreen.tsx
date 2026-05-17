/**
 * NotificationsScreen
 * SRP: Layout composition ONLY
 */

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNotificationsScreenUI } from './hooks/useNotificationsScreenUI';
import { styles } from './NotificationsScreen.styles';

import { NotificationHeader } from './components/NotificationHeader';
import { NotificationFilterTabs } from './components/NotificationFilterTabs';
import { NotificationList } from './components/NotificationList';

const NotificationsScreen: React.FC = () => {
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
    handlers,
  } = useNotificationsScreenUI();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <NotificationHeader
        unreadCount={unreadCount}
        hasUnread={hasUnread}
        isMarkingAll={isMarkingAll}
        onMarkAllAsRead={handlers.handleMarkAllAsRead}
        onBack={handlers.handleBack}
      />

      <NotificationFilterTabs
        activeFilter={activeFilter}
        unreadCount={unreadCount}
        onFilterChange={handlers.handleFilterChange}
      />

      <NotificationList
        notifications={notifications}
        isLoading={isLoading && notifications.length === 0}
        isFetching={isFetching}
        isError={isError}
        isFetchingNextPage={isFetchingNextPage}
        activeFilter={activeFilter}
        onPress={handlers.handleNotificationPress}
        onMarkAsRead={handlers.handleMarkAsRead}
        onDelete={handlers.handleDelete}
        onRefresh={handlers.handleRefresh}
        onLoadMore={handlers.handleLoadMore}
      />
    </SafeAreaView>
  );
};

export default NotificationsScreen;
