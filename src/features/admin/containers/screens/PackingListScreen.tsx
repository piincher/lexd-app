/**
 * PackingListScreen - Admin Packing List with client grouping
 * Enhanced: Shows ALL goods grouped by client with collapsible sections
 * NEW: Single client filter for walk-in customers
 */
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePackingListScreen } from './PackingList/hooks';
import {
  LoadingState,
  ErrorState,
  Header,
  ActionBar,
} from './PackingList/components';
import { PackingListBody } from '../components/PackingListBody';
import { getStyles } from './PackingList/PackingListScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const PackingListScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);
  const {
    container,
    navigation,
    isContainerLoading,
    isGeneratingPDF,
    allExpanded,
    packingListData,
    filteredPackingListData,
    clients,
    allClients,
    safeSummary,
    selectedClientId,
    setSelectedClientId,
    handleShare,
    handlePrint,
    handleToggleAll,
    handleGoToLoadingList,
    formatDate,
  } = usePackingListScreen();

  if (isContainerLoading) {
    return <LoadingState />;
  }

  if (!container || !packingListData || !filteredPackingListData) {
    return <ErrorState onBack={() => navigation.goBack()} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        containerNumber={container.number}
        clientCount={clients.length}
        totalItems={safeSummary.totalItems}
        onBack={() => navigation.goBack()}
        onGoToLoadingList={handleGoToLoadingList}
      />

      <PackingListBody
        allClients={allClients}
        clients={clients}
        summary={safeSummary}
        allExpanded={allExpanded}
        selectedClientId={selectedClientId}
        onSelectClient={setSelectedClientId}
        onToggleAll={handleToggleAll}
        formatDate={formatDate}
      />

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
