import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import type { navigationProps } from '@src/navigations/type';
import type { InAppNotification } from '../../types';
import { useNotificationsScreen } from '../../hooks/useNotificationsScreen';

export const useNotificationsScreenUI = () => {
  const navigation = useNavigation<navigationProps>();

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

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    activeFilter,
    notifications,
    unreadCount,
    hasUnread,
    isLoading,
    isFetching,
    isError,
    isFetchingNextPage,
    isMarkingAll,
    handlers: {
      handleFilterChange,
      handleMarkAsRead,
      handleDelete,
      handleMarkAllAsRead,
      handleLoadMore,
      handleRefresh: refetch,
      handleNotificationPress,
      handleBack,
    },
  };
};
