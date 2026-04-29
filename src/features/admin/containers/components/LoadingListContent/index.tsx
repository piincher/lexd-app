import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  ClientSelector,
  ProgressCard,
  CapacityCard,
  ClientLegend,
  SectionHeader,
  EmptyState,
  LoadingSequenceList,
} from '../../screens/LoadingList/components';
import { AdminLoadingListData, WeightDistribution, ClientGoodsGroup } from '../../types/packingList';
import { LoadingSummary } from '../../screens/LoadingList/types';
import { MAX_CBM } from '../../screens/LoadingList/hooks';
import { styles } from '../../screens/LoadingList/LoadingListScreen.styles';

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
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {allClients.length > 0 && (
        <ClientSelector
          clients={allClients}
          selectedClientId={selectedClientId}
          onSelectClient={setSelectedClientId}
        />
      )}

      <Animated.View entering={FadeInUp.delay(100)}>
        <ProgressCard summary={summary as unknown as LoadingSummary} progressPercentage={progressPercentage} />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(150)}>
        <CapacityCard totalCBM={summary.totalCBM} maxCBM={MAX_CBM} />
      </Animated.View>

      {isSingleClientView && (
        <View style={styles.singleClientBanner}>
          <Text style={styles.singleClientText}>
            📋 Vue client individuel: {items[0]?.clientName}
          </Text>
        </View>
      )}

      <ClientLegend weightDistribution={weightDistribution} />

      <SectionHeader />

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <LoadingSequenceList items={items} onToggleLoaded={handleToggleLoaded} />
      )}

      <View style={styles.spacer} />
    </ScrollView>
  );
};
