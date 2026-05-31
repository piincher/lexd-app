import React, { useCallback } from 'react';
import { View, RefreshControl, ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import type { productType } from '@src/api/order';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { OrderCard } from '../screens/components/OrderCard';
import { OrderCardSkeleton, OrderCardFooterSkeleton } from '../screens/components/OrderCardSkeleton';
import { EmptyOrders } from '../screens/components/EmptyOrders';
import { createStyles } from '../screens/AllOrdersScreen.styles';

interface AllOrdersListProps {
  data?: { pages?: productType[][] };
  filteredOrders: productType[];
  isLoading: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  refetch: () => Promise<unknown>;
  loadMore: () => void;
  onMomentumScrollBegin: () => void;
  isSelectionMode: boolean;
  selectedOrderIds: string[];
  onToggleSelect: (id: string) => void;
  /** Scrolls with the list — stats, search, status tabs and advanced filters. */
  listHeader?: React.ReactElement | null;
}

export const AllOrdersList: React.FC<AllOrdersListProps> = ({
  data,
  filteredOrders,
  isLoading,
  isFetching,
  isFetchingNextPage,
  refetch,
  loadMore,
  onMomentumScrollBegin,
  isSelectionMode,
  selectedOrderIds,
  onToggleSelect,
  listHeader,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  const renderItem = useCallback(({ item }: { item: productType }) => {
    if (!item) return null;
    return (
      <OrderCard
        order={item}
        isSelectionMode={isSelectionMode}
        isSelected={!!item._id && selectedOrderIds.includes(item._id)}
        onToggleSelect={() => item._id && onToggleSelect(item._id)}
      />
    );
  }, [isSelectionMode, onToggleSelect, selectedOrderIds]);

  const isInitialLoading = !data?.pages?.length && (isLoading || isFetching);

  return (
    <View style={styles.listContainer}>
      {isInitialLoading ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        >
          {listHeader}
          <OrderCardSkeleton count={5} />
        </ScrollView>
      ) : (
        <FlashList
          data={filteredOrders}
          keyExtractor={(item, index) => item?._id || `order-${index}`}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          onMomentumScrollBegin={onMomentumScrollBegin}
          ListFooterComponent={isFetchingNextPage ? <OrderCardFooterSkeleton /> : null}
          ListEmptyComponent={<EmptyOrders />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
        />
      )}
    </View>
  );
};
