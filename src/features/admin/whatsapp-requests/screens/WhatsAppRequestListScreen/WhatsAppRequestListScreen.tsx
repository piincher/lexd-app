/**
 * WhatsAppRequestListScreen - Admin dashboard for WhatsApp packing list requests
 * Thin composition screen (<100 lines) - delegates all logic to hooks and components
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWhatsAppRequestListScreen } from './hooks/useWhatsAppRequestListScreen';
import { WhatsAppRequestHeader } from './components/WhatsAppRequestHeader';
import { WhatsAppRequestStats } from './components/WhatsAppRequestStats';
import { WhatsAppRequestFilters } from './components/WhatsAppRequestFilters';
import { WhatsAppRequestList } from './components/WhatsAppRequestList';
import { WhatsAppRequestLoadingState } from './components/WhatsAppRequestLoadingState';
import { WhatsAppRequestErrorState } from './components/WhatsAppRequestErrorState';
import { WhatsAppRequestPDFModal } from './components/WhatsAppRequestPDFModal';
import { WhatsAppRequestErrorSnackbar } from './components/WhatsAppRequestErrorSnackbar';

export const WhatsAppRequestListScreen: React.FC = () => {
  const {
    requests,
    pendingCount,
    stats,
    isLoading,
    isRefetching,
    error,
    isProcessing,
    isCompleting,
    isGeneratingPdf,
    selectedStatus,
    pdfModalVisible,
    generatedPdf,
    errorMessage,
    setSelectedStatus,
    setPdfModalVisible,
    handleRefresh,
    handleProcessRequest,
    handleGeneratePdf,
    handleCompleteRequest,
    handleCallCustomer,
    handleWhatsAppCustomer,
    dismissError,
    handleSendPdfAndComplete,
  } = useWhatsAppRequestListScreen();

  return (
    <SafeAreaView style={styles.container}>
      <WhatsAppRequestHeader onRefresh={handleRefresh} />

      <View style={styles.headerContent}>
        <WhatsAppRequestStats pending={stats.pending} processing={stats.processing} total={stats.total} />
        <WhatsAppRequestFilters
          selectedStatus={selectedStatus}
          pendingCount={pendingCount}
          onSelectStatus={setSelectedStatus}
        />
      </View>

      {isLoading ? (
        <WhatsAppRequestLoadingState />
      ) : error ? (
        <WhatsAppRequestErrorState onRetry={handleRefresh} />
      ) : (
        <WhatsAppRequestList
          requests={requests}
          selectedStatus={selectedStatus}
          isRefetching={isRefetching}
          isProcessing={isProcessing}
          isCompleting={isCompleting}
          isGeneratingPdf={isGeneratingPdf}
          onRefresh={handleRefresh}
          onProcess={handleProcessRequest}
          onGeneratePdf={handleGeneratePdf}
          onComplete={handleCompleteRequest}
          onCall={handleCallCustomer}
          onWhatsApp={handleWhatsAppCustomer}
        />
      )}

      <WhatsAppRequestPDFModal
        visible={pdfModalVisible}
        generatedPdf={generatedPdf}
        onDismiss={() => setPdfModalVisible(false)}
        onSend={handleSendPdfAndComplete}
      />

      <WhatsAppRequestErrorSnackbar message={errorMessage} onDismiss={dismissError} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F7FC' },
  headerContent: { backgroundColor: 'transparent' },
});

export default WhatsAppRequestListScreen;
