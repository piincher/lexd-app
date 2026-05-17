/**
 * ClientPackingListScreen - Professional packing list for clients
 * Refactored: Composition pattern
 */

import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './ClientPackingListScreen.styles';
import { useClientPackingListScreenUI } from './hooks/useClientPackingListScreenUI';
import { PackingListHeader } from './components/PackingListHeader';
import { PackingListSummary } from './components/PackingListSummary';
import { PackingListConsignee } from './components/PackingListConsignee';
import { PackingListGoods } from './components/PackingListGoods';
import { PackingListFooter } from './components/PackingListFooter';
import { ContactDialog } from './components/ContactDialog';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';

const ClientPackingListScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const {
    packingList,
    isLoading,
    isError,
    snackbarVisible,
    snackbarMessage,
    contactDialogVisible,
    downloadProgress,
    downloadMutation,
    handleCallConsignee,
    handleOpenMaps,
    handleDownloadPDF,
    handleShare,
    getShippingModeIcon,
    getStatusColor,
    formatDate,
    formatDateTime,
    handleRefresh,
    isFetching,
    handlers,
  } = useClientPackingListScreenUI();

  if (isLoading) return <LoadingState />;
  if (isError || !packingList) {
    return <ErrorState onRetry={handleRefresh} onBack={handlers.handleBack} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <PackingListHeader onBack={handlers.handleBack} onDownload={handleDownloadPDF} onShare={handleShare} downloadProgress={downloadProgress} />
      <ScrollView contentContainerStyle={styles.scrollContent} refreshControl={<RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />}>
        <PackingListSummary containerNumber={packingList.containerNumber} shippingMode={packingList.shippingMode} status={packingList.tracking?.status || 'N/A'} totalCBM={packingList.summary?.totalCBM || 0} totalWeight={packingList.summary?.totalWeight || 0} totalPackages={packingList.summary?.totalItems || 0} departureDate={packingList.route?.departureDate} arrivalDate={packingList.tracking?.estimatedArrival} loadDate={packingList.schedule?.loadDate} dakarPortArrivalAt={packingList.schedule?.dakarPortArrivalAt || packingList.tracking?.dakarPortArrivalAt} signature={packingList.signature} getShippingModeIcon={getShippingModeIcon} getStatusColor={getStatusColor} formatDate={formatDate} formatDateTime={formatDateTime} />
        {packingList.consignee && <PackingListConsignee consignee={packingList.consignee} onContactPress={handlers.handleShowContactDialog} onAddressPress={handleOpenMaps} />}
        <PackingListGoods goods={packingList.items || []} getStatusColor={getStatusColor} />
        <PackingListFooter onDownloadPDF={handleDownloadPDF} onShare={handleShare} isDownloading={downloadMutation.isPending} />
      </ScrollView>
      <ContactDialog visible={contactDialogVisible} onDismiss={handlers.handleDismissContactDialog} consigneeName={packingList.consignee?.name || ''} consigneePhone={packingList.consignee?.phone || ''} onCall={handleCallConsignee} />
      <Snackbar visible={snackbarVisible} onDismiss={handlers.handleDismissSnackbar} duration={3000}>{snackbarMessage}</Snackbar>
    </SafeAreaView>
  );
};

export default ClientPackingListScreen;
