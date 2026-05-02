/**
 * NotificationList
 * SRP: Renders notification list with FlashList, skeleton loading, and empty state
 */

import React, { useCallback, useRef } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';

import { Theme } from '@src/constants/Theme';
import type { FilterTab, InAppNotification } from '../../types';
import NotificationSkeleton from '../../components/NotificationSkeleton';
import { NotificationCard } from './NotificationCard';
import { NotificationEmpty } from './NotificationEmpty';
import { NotificationListFooter } from './NotificationListFooter';

interface NotificationListProps {
  notifications: InAppNotification[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  activeFilter: FilterTab;
  onPress: (notification: InAppNotification) => void;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
  onLoadMore: () => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  isLoading,
  isFetching,
  isError,
  isFetchingNextPage,
  activeFilter,
  onPress,
  onMarkAsRead,
  onDelete,
  onRefresh,
  onLoadMore,
}) => {
  const hasCalledOnEnd = useRef(false);

  const handleMomentumScrollBegin = useCallback(() => {
    hasCalledOnEnd.current = false;
  }, []);

  const handleEndReached = useCallback(() => {
    if (hasCalledOnEnd.current) return;
    hasCalledOnEnd.current = true;
    onLoadMore();
  }, [onLoadMore]);

  const renderItem: ListRenderItem<InAppNotification> = useCallback(({ item, index }) => (
    <NotificationCard
      notification={item}
      index={index}
      onPress={onPress}
      onMarkAsRead={onMarkAsRead}
      onDelete={onDelete}
    />
  ), [onPress, onMarkAsRead, onDelete]);

  if (isLoading) {
    return (
      <View style={styles.skeletonContainer}>
        <NotificationSkeleton count={6} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}

        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            tintColor={Theme.primary[500]}
            colors={[Theme.primary[500]]}
          />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        ListEmptyComponent={
          <NotificationEmpty
            filter={activeFilter}
            isError={isError}
            onRetry={onRefresh}
          />
        }
        ListFooterComponent={
          isFetchingNextPage ? <NotificationListFooter /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skeletonContainer: {
    flex: 1,
    paddingTop: 8,
  },
  listContent: {
    paddingVertical: 8,
    paddingBottom: 40,
  },
});
