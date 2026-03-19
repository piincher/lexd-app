/**
 * LoadingListScreen - Admin Loading List with sequence visualization
 * Shows loading order with client color coding and status toggle
 * NEW: Single client filter for walk-in customers
 */
import React, { useMemo } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useLoadingListScreen } from './LoadingList/hooks';
import {
  LoadingState,
  ErrorState,
  Header,
  ProgressCard,
  CapacityCard,
  ClientLegend,
  SectionHeader,
  EmptyState,
  LoadingSequenceList,
  ActionBar,
} from './LoadingList/components';
import { ClientSelector } from './PackingList/components/ClientSelector';
import { MAX_CBM } from './LoadingList/hooks';
import { styles } from './LoadingList/LoadingListScreen.styles';

export const LoadingListScreen: React.FC = () => {
  const {
    container,
    navigation,
    isContainerLoading,
    isGeneratingPDF,
    loadingListData,
    filteredLoadingListData,
    selectedClientId,
    setSelectedClientId,
    weightDistribution,
    progressPercentage,
    handleToggleLoaded,
    handleMarkAllLoaded,
    handleResetLoading,
    handlePrint,
    containerId,
  } = useLoadingListScreen();

  if (isContainerLoading) {
    return <LoadingState />;
  }

  if (!container || !loadingListData || !filteredLoadingListData) {
    return <ErrorState onBack={() => navigation.goBack()} />;
  }

  // Use filtered data for display (supports single client view for walk-ins)
  const { items, summary, isSingleClientView } = filteredLoadingListData;
  
  // Get unique clients for selector (from ALL data, not filtered)
  const allClients = useMemo(() => {
    if (!loadingListData?.items?.length) return [];
    
    const clientsMap = new Map();
    
    loadingListData.items.forEach((item) => {
      const normalizedId = String(item.clientId).trim();
      if (!clientsMap.has(normalizedId)) {
        const clientItems = loadingListData.items.filter(i => String(i.clientId).trim() === normalizedId);
        clientsMap.set(normalizedId, {
          clientId: normalizedId,
          clientName: item.clientName,
          clientPhone: 'N/A', // Loading list doesn't have phone, but type requires it
          goods: clientItems.map(i => i.goods),
          summary: {
            totalCBM: clientItems.reduce((s, i) => s + (i.goods.actualCBM || 0), 0),
            totalWeight: clientItems.reduce((s, i) => s + (i.goods.weight || 0), 0),
            totalItems: clientItems.length,
            totalQuantity: clientItems.length,
            totalCost: 0,
            totalPaid: 0,
            balanceDue: 0,
          },
        });
      }
    });
    
    return Array.from(clientsMap.values());
  }, [loadingListData]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        containerNumber={container.virtualContainerNumber}
        itemCount={items.length}
        onBack={() => navigation.goBack()}
        onNavigateToPackingList={() => navigation.navigate('PackingList', { containerId })}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Client Selector - for walk-in customers who need individual loading list */}
        {allClients.length > 0 && (
          <ClientSelector
            clients={allClients}
            selectedClientId={selectedClientId}
            onSelectClient={setSelectedClientId}
          />
        )}

        <Animated.View entering={FadeInUp.delay(100)}>
          <ProgressCard summary={summary} progressPercentage={progressPercentage} />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(150)}>
          <CapacityCard totalCBM={summary.totalCBM} maxCBM={MAX_CBM} />
        </Animated.View>

        {/* Show indicator when viewing single client (walk-in mode) */}
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

        <View style={{ height: 100 }} />
      </ScrollView>

      <ActionBar
        isGeneratingPDF={isGeneratingPDF}
        allLoaded={summary.loadedItems === summary.totalItems}
        hasItems={items.length > 0}
        onReset={handleResetLoading}
        onMarkAll={handleMarkAllLoaded}
        onPrint={handlePrint}
      />
    </SafeAreaView>
  );
};

export default LoadingListScreen;
