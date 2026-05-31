import React, { useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { PointsBalanceHeader } from '../components/PointsBalanceHeader';
import { RewardCatalogToolbar } from '../components/RewardCatalogToolbar';
import { RewardItemGrid } from '../components/RewardItemGrid';
import { RewardItemSkeleton } from '../components/RewardItemSkeleton';
import { RedemptionEmptyState } from '../components/RedemptionEmptyState';
import { useActiveRewardItemsInfinite } from '../hooks/useRewardItems';
import { useMyRewardSummaryV2 } from '../hooks/useRewards';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import type { RewardCatalogSort } from '../api/rewardApi';
import type { RewardItem } from '../types';
import { createStyles } from './MemberPointsScreen.styles';

export const MemberPointsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  // Filter state (search is debounced before it drives the query).
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<RewardCatalogSort>('points_asc');
  const [affordableOnly, setAffordableOnly] = useState(false);
  const search = useDebouncedValue(searchInput, 350);

  const summaryQuery = useMyRewardSummaryV2();
  const itemsQuery = useActiveRewardItemsInfinite({ search, category, sort });

  const points = summaryQuery.data?.rewardPoints || 0;

  const goToHistory = useCallback(() => (navigation as any).navigate('PointsHistory'), [navigation]);
  const goToRedemptions = useCallback(() => (navigation as any).navigate('MyProductRedemptions'), [navigation]);
  const goToDetail = useCallback((item: RewardItem) => (navigation as any).navigate('RewardDetail', { item }), [navigation]);

  const allItems = useMemo<RewardItem[]>(
    () => itemsQuery.data?.pages.flatMap((page) => page.items) ?? [],
    [itemsQuery.data]
  );

  const categories = itemsQuery.data?.pages[0]?.categories ?? [];

  // Closest reward the user can't quite afford yet — drives the hero nudge.
  const nextReward = useMemo(() => {
    const unaffordable = allItems.filter((item) => item.pointsRequired > points);
    if (unaffordable.length === 0) return null;
    const closest = unaffordable.reduce((best, item) =>
      item.pointsRequired < best.pointsRequired ? item : best
    );
    return { name: closest.name, pointsRequired: closest.pointsRequired };
  }, [allItems, points]);

  const visibleItems = useMemo(
    () => (affordableOnly ? allItems.filter((item) => points >= item.pointsRequired) : allItems),
    [allItems, affordableOnly, points]
  );

  const onRefresh = useCallback(() => {
    itemsQuery.refetch();
    summaryQuery.refetch();
  }, [itemsQuery, summaryQuery]);

  const handleEndReached = useCallback(() => {
    if (itemsQuery.hasNextPage && !itemsQuery.isFetchingNextPage) {
      itemsQuery.fetchNextPage();
    }
  }, [itemsQuery]);

  const isInitialLoading = itemsQuery.isLoading || summaryQuery.isLoading;
  const isError = itemsQuery.isError;

  const header = (
    <View style={styles.headerWrap}>
      <PointsBalanceHeader
        points={points}
        nextReward={nextReward}
        onHistory={goToHistory}
        onRedemptions={goToRedemptions}
      />
      <RewardCatalogToolbar
        search={searchInput}
        onSearchChange={setSearchInput}
        categories={categories}
        activeCategory={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
        affordableOnly={affordableOnly}
        onToggleAffordable={() => setAffordableOnly((value) => !value)}
      />
    </View>
  );

  const emptyComponent = isInitialLoading ? (
    <RewardItemSkeleton count={6} />
  ) : (
    <View style={styles.emptyWrap}>
      <RedemptionEmptyState
        title={affordableOnly ? 'Rien d’échangeable pour le moment' : 'Aucune récompense'}
        subtitle={
          affordableOnly
            ? 'Continuez à cumuler des points pour débloquer des récompenses.'
            : search.trim()
            ? `Aucun résultat pour « ${search.trim()} ».`
            : 'Aucun article disponible pour le moment. Revenez plus tard.'
        }
        icon={affordableOnly ? 'lock-clock' : 'gift-off-outline'}
      />
    </View>
  );

  return (
    <Screen header={{ title: 'Récompenses' }} contentStyle={styles.content}>
      {isError ? (
        <View style={styles.state}>
          <MaterialCommunityIcons name="alert-circle-outline" size={40} color={colors.status.error} />
          <Text style={styles.stateText}>Impossible de charger les récompenses.</Text>
          <TouchableOpacity onPress={onRefresh}>
            <Text style={styles.retryText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <RewardItemGrid
          items={visibleItems}
          userPoints={points}
          onItemPress={goToDetail}
          refreshing={itemsQuery.isRefetching}
          onRefresh={onRefresh}
          onEndReached={handleEndReached}
          isFetchingNextPage={itemsQuery.isFetchingNextPage}
          ListHeaderComponent={header}
          ListEmptyComponent={emptyComponent}
        />
      )}
    </Screen>
  );
};

export default MemberPointsScreen;
