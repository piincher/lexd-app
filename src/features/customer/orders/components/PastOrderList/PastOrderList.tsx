import React from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Theme } from '@src/constants/Theme';
import { Order } from '../../types';
import { PastOrderCard } from '../PastOrderCard';
import { PastOrderCardSkeleton } from '@src/shared/ui/PastOrderCardSkeleton';

interface PastOrderListProps {
  orders: Order[];
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onOrderPress: (order: Order) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export const PastOrderList: React.FC<PastOrderListProps> = ({
  orders,
  isLoading,
  isRefreshing,
  onRefresh,
  onOrderPress,
  onLoadMore,
  hasMore,
}) => {
  if (isLoading) {
    return <PastOrderCardSkeleton count={5} />;
  }

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucune commande trouvée</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <PastOrderCard order={item} onPress={onOrderPress} />
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
    padding: Theme.spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    color: Theme.neutral[500],
  },
});
