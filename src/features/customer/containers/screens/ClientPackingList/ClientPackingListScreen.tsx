/**
 * ClientPackingListScreen - Professional packing list for clients
 * Refactored: Composition pattern
 */

import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper';
import { RootStackScreenProps } from '@src/navigations/type';
import { styles } from './ClientPackingListScreen.styles';
import { useClientPackingListScreen } from './hooks';
import {
  PackingListHeader, PackingListSummary, PackingListConsignee, PackingListGoods,
  PackingListFooter, ContactDialog, LoadingState, ErrorState,
} from './components';

const ClientPackingListScreen: React.FC<RootStackScreenProps<'ClientPackingList'>> = ({
  navigation, route,
}) => {
  const screen = useClientPackingListScreen(route.params.containerId);
  if (screen.isLoading) return <LoadingState />;
  if (screen.isError || !screen.packingList) {
    return <ErrorState onRetry={screen.handleRefresh} onBack={() => navigation.goBack()} />;
  }

  const { packingList, snackbarVisible, setSnackbarVisible, snackbarMessage, contactDialogVisible, setContactDialogVisible } = screen;
  const { downloadProgress, downloadMutation, handleCallConsignee, handleOpenMaps, handleDownloadPDF, handleShare } = screen;
  const { getShippingModeIcon, getStatusColor, formatDate, handleRefresh, isFetching } = screen;

  return (
    <SafeAreaView style={styles.container}>
      <PackingListHeader onBack={() => navigation.goBack()} onDownload={handleDownloadPDF} onShare={handleShare} downloadProgress={downloadProgress} />
      <ScrollView contentContainerStyle={styles.scrollContent} refreshControl={<RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />}>
        <PackingListSummary containerNumber={packingList.containerNumber} shippingMode={packingList.shippingMode} status={packingList.tracking?.status || 'N/A'} totalCBM={packingList.summary?.totalCBM || 0} totalWeight={packingList.summary?.totalWeight || 0} totalPackages={packingList.summary?.totalItems || 0} departureDate={packingList.route?.departureDate} arrivalDate={packingList.tracking?.estimatedArrival} getShippingModeIcon={getShippingModeIcon} getStatusColor={getStatusColor} formatDate={formatDate} />
        {packingList.consignee && <PackingListConsignee consignee={packingList.consignee} onContactPress={() => setContactDialogVisible(true)} onAddressPress={handleOpenMaps} />}
        <PackingListGoods goods={packingList.items || []} getStatusColor={getStatusColor} />
        <PackingListFooter onDownloadPDF={handleDownloadPDF} onShare={handleShare} isDownloading={downloadMutation.isPending} />
      </ScrollView>
      <ContactDialog visible={contactDialogVisible} onDismiss={() => setContactDialogVisible(false)} consigneeName={packingList.consignee?.name || ''} consigneePhone={packingList.consignee?.phone || ''} onCall={handleCallConsignee} />
      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={3000}>{snackbarMessage}</Snackbar>
    </SafeAreaView>
  );
};

export default ClientPackingListScreen;
