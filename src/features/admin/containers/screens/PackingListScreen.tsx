/**
 * PackingListScreen - Admin Packing List with client grouping
 * Enhanced: Shows ALL goods grouped by client with collapsible sections
 * NEW: Single client filter for walk-in customers
 */
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePackingListScreen } from './PackingList/hooks';
import {
  LoadingState,
  ErrorState,
  Header,
  CapacityCard,
  SectionHeader,
  EmptyState,
  SummaryCard,
  ActionBar,
} from './PackingList/components';
import { ClientGoodsSection } from '../components/ClientGoodsSection';
import { ClientSelector } from './PackingList/components/ClientSelector';
import { styles } from './PackingList/PackingListScreen.styles';

export const PackingListScreen: React.FC = () => {
  const {
    container,
    navigation,
    isContainerLoading,
    isGeneratingPDF,
    allExpanded,
    packingListData,
    filteredPackingListData,
    selectedClientId,
    setSelectedClientId,
    handleShare,
    handlePrint,
    handleToggleAll,
    handleGoToLoadingList,
    formatDate,
    containerId,
  } = usePackingListScreen();

  if (isContainerLoading) {
    return <LoadingState />;
  }

  if (!container || !packingListData || !filteredPackingListData) {
    return <ErrorState onBack={() => navigation.goBack()} />;
  }

  // Use filtered data for display (supports single client view for walk-ins)
  const { clients = [], summary } = filteredPackingListData;
  const allClients = packingListData.clients;
  
  // Ensure summary has required fields
  const safeSummary = summary || { totalItems: 0, totalCBM: 0, totalWeight: 0, totalPackages: 0, capacityPercentage: 0 };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        containerNumber={container.number}
        clientCount={clients.length}
        totalItems={safeSummary.totalItems}
        onBack={() => navigation.goBack()}
        onGoToLoadingList={handleGoToLoadingList}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Client Selector - for walk-in customers who need individual packing list */}
        {allClients.length > 1 && (
          <ClientSelector
            clients={allClients}
            selectedClientId={selectedClientId}
            onSelectClient={setSelectedClientId}
          />
        )}

        <CapacityCard summary={safeSummary} />

        {/* Show indicator when viewing single client (walk-in mode) */}
        {selectedClientId && clients.length === 1 && (
          <View style={styles.singleClientBanner}>
            <Text style={styles.singleClientText}>
              📋 Vue client individuel: {clients[0]?.clientName}
            </Text>
          </View>
        )}

        <SectionHeader allExpanded={allExpanded} onToggleAll={handleToggleAll} />

        {clients.length === 0 ? (
          <EmptyState />
        ) : (
          clients.map((clientGroup, index) => (
            <ClientGoodsSection
              key={clientGroup.clientId}
              clientGroup={clientGroup}
              index={index}
              defaultExpanded={allExpanded}
            />
          ))
        )}

        {clients.length > 0 && (
          <SummaryCard summary={safeSummary} formatDate={formatDate} />
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <ActionBar
        isGeneratingPDF={isGeneratingPDF}
        hasClients={clients.length > 0}
        onShare={handleShare}
        onPrint={handlePrint}
      />
    </SafeAreaView>
  );
};

export default PackingListScreen;
