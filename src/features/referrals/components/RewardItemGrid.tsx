import React, { useMemo } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import type { RewardItem } from '../types';
import { RewardItemCard } from './RewardItemCard';

interface RewardItemGridProps {
  items: RewardItem[];
  userPoints: number;
  onItemPress: (item: RewardItem) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const ITEM_WIDTH = 160;
const SPACING = 12;

// Affordability-first ordering: what the user can redeem NOW comes first, then
// in-stock items they're saving toward (cheapest first), then out-of-stock.
const affordabilityTier = (item: RewardItem, userPoints: number): number => {
  if (item.stock <= 0) return 2;
  return userPoints >= item.pointsRequired ? 0 : 1;
};

export const RewardItemGrid: React.FC<RewardItemGridProps> = ({
  items,
  userPoints,
  onItemPress,
  refreshing,
  onRefresh,
}) => {
  const sortedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          affordabilityTier(a, userPoints) - affordabilityTier(b, userPoints) ||
          a.pointsRequired - b.pointsRequired
      ),
    [items, userPoints]
  );

  return (
    <FlatList
      data={sortedItems}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{ gap: SPACING, marginBottom: SPACING }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      renderItem={({ item }) => (
        <View style={{ flex: 1, maxWidth: ITEM_WIDTH }}>
          <RewardItemCard
            item={item}
            userPoints={userPoints}
            onPress={onItemPress}
          />
        </View>
      )}
    />
  );
};
