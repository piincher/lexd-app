import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper';
import { useWhatsAppRequestList } from './WhatsAppRequestList/hooks/useWhatsAppRequestList';
import {
  Header,
  FilterTabs,
  RequestList,
  LoadingState,
  ErrorState,
  PdfPreviewModal,
} from './WhatsAppRequestList/components';
import { styles } from './WhatsAppRequestList/WhatsAppRequestList.styles';

export const WhatsAppRequestListScreen: React.FC = () => {
  const {
    requests,
    pendingCount,
    stats,
    selectedStatus,
    setSelectedStatus,
    isLoading,
    isRefetching,
    error,
    errorMessage,
    setErrorMessage,
    selectedRequest,
    pdfModalVisible,
    setPdfModalVisible,
    generatedPdf,
    handleRefresh,
    handleProcessRequest,
    handleGeneratePdf,
    handleCompleteRequest,
    handleCallCustomer,
    handleWhatsAppCustomer,
    isProcessing,
    isGeneratingPdf,
    isCompleting,
  } = useWhatsAppRequestList();

  return (
    <SafeAreaView style={styles.container}>
      <Header stats={stats} onRefresh={handleRefresh} />

      <FilterTabs
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
        pendingCount={pendingCount}
      />

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState onRetry={handleRefresh} />
      ) : (
        <RequestList
          requests={requests}
          selectedStatus={selectedStatus}
          isRefetching={isRefetching}
          onRefresh={handleRefresh}
          onProcessRequest={handleProcessRequest}
          onGeneratePdf={handleGeneratePdf}
          onCompleteRequest={handleCompleteRequest}
          onCallCustomer={handleCallCustomer}
          onWhatsAppCustomer={handleWhatsAppCustomer}
          isProcessing={isProcessing}
          isGeneratingPdf={isGeneratingPdf}
          isCompleting={isCompleting}
        />
      )}

      <PdfPreviewModal
        visible={pdfModalVisible}
        onDismiss={() => setPdfModalVisible(false)}
        onSend={() => {
          setPdfModalVisible(false);
          if (selectedRequest) {
            handleCompleteRequest(selectedRequest);
          }
        }}
        generatedPdf={generatedPdf}
      />

      <Snackbar
        visible={!!errorMessage}
        onDismiss={() => setErrorMessage(null)}
        action={{ label: 'OK', onPress: () => setErrorMessage(null) }}
        style={styles.snackbar}
      >
        {errorMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

export default WhatsAppRequestListScreen;
