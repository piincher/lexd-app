import React from 'react';
import { View, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { OrderCard } from '../screens/components/OrderCard';
import { OrderCardSkeleton, OrderCardFooterSkeleton } from '../screens/components/OrderCardSkeleton';
import { EmptyOrders } from '../screens/components/EmptyOrders';
import { createStyles } from '../screens/AllOrdersScreen.styles';

interface AllOrdersListProps {
  data: any;
  filteredOrders: any[];
  isLoading: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  refetch: () => Promise<any>;
  loadMore: () => void;
  onMomentumScrollBegin: () => void;
  isSelectionMode: boolean;
  selectedOrderIds: string[];
  onToggleSelect: (id: string) => void;
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
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  const renderItem = ({ item }: { item: any }) => {
    if (!item) return null;
    return (
      <OrderCard
        order={item}
        isSelectionMode={isSelectionMode}
        isSelected={selectedOrderIds.includes(item._id)}
        onToggleSelect={() => onToggleSelect(item._id)}
      />
    );
  };

  const isInitialLoading = !data?.pages?.length && (isLoading || isFetching);

  return (
    <View style={styles.listContainer}>
      {isInitialLoading ? (
        <OrderCardSkeleton count={5} />
      ) : (
        <FlashList
          data={filteredOrders}
          keyExtractor={(item, index) => item?._id || `order-${index}`}
          renderItem={renderItem}
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
