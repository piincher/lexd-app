import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, RefreshControl, View } from 'react-native';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AdminWorkQueueItem, WorkQueueFilter } from '../../types';
import { WorkQueueFilters } from '../WorkQueueFilters';
import { WorkQueueItem } from '../WorkQueueItem';
import { WorkQueueOverview } from '../WorkQueueOverview';
import { WorkQueueState } from '../WorkQueueState';
import { createStyles } from './WorkQueueList.styles';

interface WorkQueueListProps {
  items: AdminWorkQueueItem[];
  filter: WorkQueueFilter;
  counts: Record<WorkQueueFilter, number>;
  isLoading: boolean;
  isRefreshing: boolean;
  isError: boolean;
  isPartialError: boolean;
  isTruncated: boolean;
  onFilterChange: (filter: WorkQueueFilter) => void;
  onRefresh: () => void;
  onOpenItem: (goodsId: string) => void;
  onOpenAssignments: () => void;
  onOpenPayments: () => void;
}

export const WorkQueueList: React.FC<WorkQueueListProps> = (props) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const renderItem = useCallback<ListRenderItem<AdminWorkQueueItem>>(
    ({ item }) => <WorkQueueItem item={item} onPress={props.onOpenItem} />,
    [props.onOpenItem],
  );
  const keyExtractor = useCallback((item: AdminWorkQueueItem) => item.id, []);

  const header = useMemo(() => (
    <View>
      <WorkQueueOverview
        counts={props.counts}
        isPartialError={props.isPartialError}
        isTruncated={props.isTruncated}
        onOpenAssignments={props.onOpenAssignments}
        onOpenPayments={props.onOpenPayments}
      />
      <WorkQueueFilters selected={props.filter} counts={props.counts} onChange={props.onFilterChange} />
    </View>
  ), [props.counts, props.filter, props.isPartialError, props.isTruncated, props.onFilterChange, props.onOpenAssignments, props.onOpenPayments]);

  if (props.isLoading) {
    return <View style={styles.loading}><ActivityIndicator size="large" color={colors.primary.main} /></View>;
  }
  if (props.isError) {
    return <WorkQueueState variant="error" onRetry={props.onRefresh} />;
  }

  return (
    <FlashList
      data={props.items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={header}
      ListEmptyComponent={<WorkQueueState variant="empty" />}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={props.isRefreshing} onRefresh={props.onRefresh} tintColor={colors.primary.main} colors={[colors.primary.main]} />}
    />
  );
};
