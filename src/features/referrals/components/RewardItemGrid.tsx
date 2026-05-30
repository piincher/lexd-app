import React from 'react';
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

export const RewardItemGrid: React.FC<RewardItemGridProps> = ({
  items,
  userPoints,
  onItemPress,
  refreshing,
  onRefresh,
}) => {
  return (
    <FlatList
      data={items}
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
