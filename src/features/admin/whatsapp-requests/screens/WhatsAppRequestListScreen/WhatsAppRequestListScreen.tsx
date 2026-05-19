/**
 * WhatsAppRequestListScreen - Admin dashboard for WhatsApp packing list requests
 * Thin composition screen (<100 lines) - delegates all logic to hooks and components
 */

import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWhatsAppRequestListScreenUI } from './hooks/useWhatsAppRequestListScreenUI';
import { createStyles } from './WhatsAppRequestListScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { WhatsAppRequestHeader } from './components/WhatsAppRequestHeader';
import { WhatsAppRequestStats } from './components/WhatsAppRequestStats';
import { WhatsAppRequestFilters } from './components/WhatsAppRequestFilters';
import { WhatsAppRequestList } from './components/WhatsAppRequestList';
import { WhatsAppRequestLoadingState } from './components/WhatsAppRequestLoadingState';
import { WhatsAppRequestErrorState } from './components/WhatsAppRequestErrorState';
import { WhatsAppRequestPDFModal } from './components/WhatsAppRequestPDFModal';
import { WhatsAppRequestErrorSnackbar } from './components/WhatsAppRequestErrorSnackbar';

export const WhatsAppRequestListScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const { data, handlers } = useWhatsAppRequestListScreenUI();

  return (
    <SafeAreaView style={styles.container}>
      <WhatsAppRequestHeader onRefresh={handlers.handleRefresh} />

      <View style={styles.headerContent}>
        <WhatsAppRequestStats pending={data.stats.pending} processing={data.stats.processing} total={data.stats.total} />
        <WhatsAppRequestFilters
          selectedStatus={data.selectedStatus}
          pendingCount={data.pendingCount}
          onSelectStatus={handlers.setSelectedStatus}
        />
      </View>

      {data.isLoading ? (
        <WhatsAppRequestLoadingState />
      ) : data.error ? (
        <WhatsAppRequestErrorState onRetry={handlers.handleRefresh} />
      ) : (
        <WhatsAppRequestList
          requests={data.requests}
          selectedStatus={data.selectedStatus}
          isRefetching={data.isRefetching}
          isProcessing={data.isProcessing}
          isCompleting={data.isCompleting}
          isGeneratingPdf={data.isGeneratingPdf}
          onRefresh={handlers.handleRefresh}
          onProcess={handlers.handleProcessRequest}
          onGeneratePdf={handlers.handleGeneratePdf}
          onComplete={handlers.handleCompleteRequest}
          onCall={handlers.handleCallCustomer}
          onWhatsApp={handlers.handleWhatsAppCustomer}
        />
      )}

      <WhatsAppRequestPDFModal
        visible={data.pdfModalVisible}
        generatedPdf={data.generatedPdf}
        onDismiss={handlers.handleDismissPdfModal}
        onSend={handlers.handleSendPdfAndComplete}
      />

      <WhatsAppRequestErrorSnackbar message={data.errorMessage} onDismiss={handlers.dismissError} />
    </SafeAreaView>
  );
};

export default WhatsAppRequestListScreen;
