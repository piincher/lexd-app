import React from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { InAppNotification } from '../../types';
import { NotificationItem } from '../NotificationItem';
import { NotificationEmptyState } from '../NotificationEmptyState';
import { Theme } from '@src/constants/Theme';

interface NotificationListProps {
  notifications: InAppNotification[];
  filter: string;
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onNotificationPress: (notification: InAppNotification) => void;
  onDismiss: (id: string) => void;
  onDelete: (id: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  filter,
  isLoading,
  isRefreshing,
  onRefresh,
  onNotificationPress,
  onDismiss,
  onDelete,
  onLoadMore,
  hasMore,
}) => {
  if (!isLoading && notifications.length === 0) {
    return <NotificationEmptyState filter={filter} />;
  }

  return (
    <FlashList
      data={notifications}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <NotificationItem
          notification={item}
          onPress={onNotificationPress}
          onDismiss={onDismiss}
          onDelete={onDelete}
        />
      )}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={Theme.colors.primary.main}
        />
      }
      onEndReached={hasMore ? onLoadMore : undefined}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
  },
});
