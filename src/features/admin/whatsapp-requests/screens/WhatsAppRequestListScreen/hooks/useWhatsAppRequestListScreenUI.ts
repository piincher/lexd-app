import { useCallback } from 'react';
import { useWhatsAppRequestListScreen } from './useWhatsAppRequestListScreen';

export const useWhatsAppRequestListScreenUI = () => {
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

  const handleDismissPdfModal = useCallback(() => {
    setPdfModalVisible(false);
  }, [setPdfModalVisible]);

  return {
    data: {
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
    },
    handlers: {
      setSelectedStatus,
      handleRefresh,
      handleProcessRequest,
      handleGeneratePdf,
      handleCompleteRequest,
      handleCallCustomer,
      handleWhatsAppCustomer,
      dismissError,
      handleSendPdfAndComplete,
      handleDismissPdfModal,
    },
  };
};
