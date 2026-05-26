import { useAppTheme } from '@src/providers/ThemeProvider';
/**
 * GoodsListContent - Main content area with list or states
 * SRP: Renders list, loading, error, or empty states
 */

import React, { useCallback } from 'react';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { RefreshControl } from 'react-native';

import { GoodsCard } from './GoodsCard';
import { GoodsEmptyState } from './GoodsEmptyState';
import { Goods } from '../types';
import { createStyles } from './GoodsListContent.styles';
import { GoodsListLoadingState } from './GoodsListLoadingState';
import { GoodsListErrorState } from './GoodsListErrorState';

interface GoodsListContentProps {
  goods: Goods[];
  isLoading: boolean;
  isRefetching: boolean;
  error: Error | null;
  hasFilters: boolean;
  onRefresh: () => Promise<void>;
  onGoodsPress: (goodsId: string) => void;
  onAddPress?: () => void;
}

export const GoodsListContent: React.FC<GoodsListContentProps> = ({
  goods,
  isLoading,
  isRefetching,
  error,
  hasFilters,
  onRefresh,
  onGoodsPress,
  onAddPress,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const renderItem: ListRenderItem<Goods> = useCallback(({ item }) => (
    <GoodsCard goods={item} onPress={() => onGoodsPress(item._id)} />
  ), [onGoodsPress]);

  const keyExtractor = useCallback((item: Goods) => item._id, []);

  if (isLoading) {
    return <GoodsListLoadingState />;
  }

  if (error) {
    return <GoodsListErrorState onRetry={onRefresh} />;
  }

  return (
    <FlashList
      data={goods}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={onRefresh}
          tintColor={colors.primary[500]}
        />
      }
      ListEmptyComponent={
        <GoodsEmptyState hasFilters={hasFilters} onAddPress={onAddPress} />
      }
    />
  );
};
