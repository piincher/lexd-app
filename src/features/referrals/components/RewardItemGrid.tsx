import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RewardItem } from '../types';
import { RewardItemCard } from './RewardItemCard';

interface RewardItemGridProps {
  items: RewardItem[];
  userPoints: number;
  onItemPress: (item: RewardItem) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  isFetchingNextPage?: boolean;
  ListHeaderComponent?: React.ComponentProps<typeof FlatList>['ListHeaderComponent'];
  ListEmptyComponent?: React.ComponentProps<typeof FlatList>['ListEmptyComponent'];
}

const SPACING = 12;

export const RewardItemGrid: React.FC<RewardItemGridProps> = ({
  items,
  userPoints,
  onItemPress,
  refreshing,
  onRefresh,
  onEndReached,
  isFetchingNextPage,
  ListHeaderComponent,
  ListEmptyComponent,
}) => {
  const { colors } = useAppTheme();

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{ gap: SPACING, paddingHorizontal: 16 }}
      contentContainerStyle={{ paddingBottom: 32, gap: SPACING }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={!!refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary.main]}
            tintColor={colors.primary.main}
          />
        ) : undefined
      }
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={{ paddingVertical: 24 }}>
            <ActivityIndicator color={colors.primary.main} />
          </View>
        ) : null
      }
      renderItem={({ item }) => (
        <View style={{ flex: 1, maxWidth: '48%' }}>
          <RewardItemCard item={item} userPoints={userPoints} onPress={onItemPress} />
        </View>
      )}
    />
  );
};
