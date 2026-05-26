import React from 'react';
import { View, Text } from 'react-native';
import {
  ClientSelector,
  ClientLegend,
  SectionHeader,
} from '../../screens/LoadingList/components';
import { LoadingListAlerts } from './LoadingListAlerts';
import { LoadingListCommandPanel } from './LoadingListCommandPanel';
import { LoadingListSearch, LoadingStatusFilter } from './LoadingListSearch';
import { AdminLoadingListData, ClientGoodsGroup, LoadingListItem } from '../../types/packingList';
import { WeightDistribution } from '../../screens/LoadingList/types';
import { MAX_CBM } from '../../screens/LoadingList/hooks';
import { createStyles } from '../../screens/LoadingList/LoadingListScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface LoadingListHeaderProps {
  allClients: ClientGoodsGroup[];
  items: AdminLoadingListData['items'];
  summary: AdminLoadingListData['summary'];
  isSingleClientView?: boolean;
  selectedClientId: string | null;
  setSelectedClientId: (id: string | null) => void;
  weightDistribution: WeightDistribution[];
  progressPercentage: number;
  searchQuery: string;
  statusFilter: LoadingStatusFilter;
  visibleItems: number;
  missingInfoCount: number;
  nextPendingItem?: LoadingListItem;
  onSearchQueryChange: (query: string) => void;
  onStatusFilterChange: (filter: LoadingStatusFilter) => void;
}

export const LoadingListHeader: React.FC<LoadingListHeaderProps> = ({
  allClients,
  items,
  summary,
  isSingleClientView,
  selectedClientId,
  setSelectedClientId,
  weightDistribution,
  progressPercentage,
  searchQuery,
  statusFilter,
  visibleItems,
  missingInfoCount,
  nextPendingItem,
  onSearchQueryChange,
  onStatusFilterChange,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View>
      {allClients.length > 0 && (
        <ClientSelector
          clients={allClients}
          selectedClientId={selectedClientId}
          onSelectClient={setSelectedClientId}
        />
      )}

      <LoadingListCommandPanel
        summary={summary}
        progressPercentage={progressPercentage}
        maxCBM={MAX_CBM}
      />

      <LoadingListAlerts
        remainingItems={summary.remainingItems}
        missingInfoCount={missingInfoCount}
        nextPendingItem={nextPendingItem}
      />

      {isSingleClientView && (
        <View style={styles.singleClientBanner}>
          <Text style={styles.singleClientText}>
            Vue client individuel: {items[0]?.clientName}
          </Text>
        </View>
      )}

      <ClientLegend weightDistribution={weightDistribution} />

      <LoadingListSearch
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        totalItems={items.length}
        visibleItems={visibleItems}
        pendingItems={summary.remainingItems}
        loadedItems={summary.loadedItems}
        onSearchQueryChange={onSearchQueryChange}
        onStatusFilterChange={onStatusFilterChange}
      />

      <SectionHeader />
    </View>
  );
};
