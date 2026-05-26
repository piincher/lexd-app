import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { EmptyState } from '../../screens/LoadingList/components';
import { LoadingSequenceItem } from '../LoadingSequenceItem';
import { LoadingListHeader } from './LoadingListHeader';
import { LoadingStatusFilter } from './LoadingListSearch';
import { AdminLoadingListData, ClientGoodsGroup } from '../../types/packingList';
import { WeightDistribution } from '../../screens/LoadingList/types';
import { createStyles } from '../../screens/LoadingList/LoadingListScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface LoadingListContentProps {
  allClients: ClientGoodsGroup[];
  items: AdminLoadingListData['items'];
  summary: AdminLoadingListData['summary'];
  isSingleClientView?: boolean;
  selectedClientId: string | null;
  setSelectedClientId: (id: string | null) => void;
  weightDistribution: WeightDistribution[];
  progressPercentage: number;
  handleToggleLoaded: (goodsId: string, isLoaded: boolean) => void;
}

export const LoadingListContent: React.FC<LoadingListContentProps> = ({
  allClients,
  items,
  summary,
  isSingleClientView,
  selectedClientId,
  setSelectedClientId,
  weightDistribution,
  progressPercentage,
  handleToggleLoaded,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LoadingStatusFilter>('all');

  const pendingItems = useMemo(() => items.filter((item) => !item.isLoaded), [items]);
  const missingInfoCount = useMemo(
    () => items.filter((item) => {
      const { goods } = item;
      const actualCBM = Number(goods.actualCBM || 0);
      const weight = Number(goods.weight || 0);
      return !goods.goodsId || !goods.description || actualCBM <= 0 || weight <= 0;
    }).length,
    [items]
  );
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      if (statusFilter === 'pending' && item.isLoaded) return false;
      if (statusFilter === 'loaded' && !item.isLoaded) return false;
      if (!query) return true;
      return [
        item.goods.goodsId,
        item.goods.expressTrackingNumber,
        item.goods.description,
        item.clientName,
      ].some((value) => String(value || '').toLowerCase().includes(query));
    });
  }, [items, searchQuery, statusFilter]);

  const nextPendingId = pendingItems[0]?.goods._id;
  const renderItem: ListRenderItem<AdminLoadingListData['items'][number]> = useCallback(({ item, index }) => (
    <LoadingSequenceItem
      item={item}
      index={index}
      isNext={item.goods._id === nextPendingId}
      onToggleLoaded={handleToggleLoaded}
    />
  ), [handleToggleLoaded, nextPendingId]);
  const keyExtractor = useCallback((item: AdminLoadingListData['items'][number]) => item.goods._id, []);

  return (
    <FlashList
      style={styles.scrollView}
      data={filteredItems}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={
        <LoadingListHeader
          allClients={allClients}
          items={items}
          summary={summary}
          isSingleClientView={isSingleClientView}
          selectedClientId={selectedClientId}
          setSelectedClientId={setSelectedClientId}
          weightDistribution={weightDistribution}
          progressPercentage={progressPercentage}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          visibleItems={filteredItems.length}
          missingInfoCount={missingInfoCount}
          nextPendingItem={pendingItems[0]}
          onSearchQueryChange={setSearchQuery}
          onStatusFilterChange={setStatusFilter}
        />
      }
      ListEmptyComponent={items.length === 0 ? <EmptyState /> : <FilteredEmptyState />}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<View style={styles.spacer} />}
    />
  );
};

const FilteredEmptyState = () => (
  <View style={localStyles.emptyState}>
    <Text style={localStyles.emptyTitle}>Aucun article trouvé</Text>
    <Text style={localStyles.emptyText}>Ajustez la recherche ou le filtre de chargement.</Text>
  </View>
);

const localStyles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['3xl'],
    paddingHorizontal: Theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Theme.neutral[700],
  },
  emptyText: {
    marginTop: Theme.spacing.xs,
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[500],
    textAlign: 'center',
  },
});
