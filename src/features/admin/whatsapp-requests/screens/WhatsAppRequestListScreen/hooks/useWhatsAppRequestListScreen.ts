/**
 * useWhatsAppRequestListScreen - Main hook for WhatsApp Request List Screen
 * Composes smaller hooks for filtering, PDF generation, and actions
 */

import { useState, useCallback } from 'react';
import { WhatsAppRequest, WhatsAppRequestStatus } from '../../../api/whatsappRequestApi';
import { useWhatsAppRequestFilter } from './useWhatsAppRequestFilter';
import { useWhatsAppRequestPdf } from './useWhatsAppRequestPdf';
import { useWhatsAppRequestActions } from './useWhatsAppRequestActions';

interface UseWhatsAppRequestListScreenReturn {
  requests: WhatsAppRequest[];
  pendingCount: number;
  stats: { pending: number; processing: number; total: number };
  isLoading: boolean;
  isRefetching: boolean;
  error: Error | null;
  isProcessing: boolean;
  isCompleting: boolean;
  isGeneratingPdf: boolean;
  selectedStatus: WhatsAppRequestStatus | 'all';
  selectedRequest: WhatsAppRequest | null;
  pdfModalVisible: boolean;
  generatedPdf: string | null;
  errorMessage: string | null;
  setSelectedStatus: (status: WhatsAppRequestStatus | 'all') => void;
  setSelectedRequest: (request: WhatsAppRequest | null) => void;
  setPdfModalVisible: (visible: boolean) => void;
  setGeneratedPdf: (pdf: string | null) => void;
  setErrorMessage: (message: string | null) => void;
  handleRefresh: () => Promise<void>;
  handleProcessRequest: (request: WhatsAppRequest) => Promise<void>;
  handleGeneratePdf: (request: WhatsAppRequest) => Promise<void>;
  handleCompleteRequest: (request: WhatsAppRequest) => Promise<void>;
  handleCallCustomer: (phoneNumber: string) => void;
  handleWhatsAppCustomer: (phoneNumber: string) => void;
  dismissError: () => void;
  handleSendPdfAndComplete: () => void;
}

export const useWhatsAppRequestListScreen = (): UseWhatsAppRequestListScreenReturn => {
  const [selectedStatus, setSelectedStatus] = useState<WhatsAppRequestStatus | 'all'>('PENDING');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<WhatsAppRequest | null>(null);

  const filter = useWhatsAppRequestFilter(selectedStatus);
  const pdf = useWhatsAppRequestPdf(setErrorMessage);
  const actions = useWhatsAppRequestActions(setSelectedRequest, setErrorMessage);

  const { handleCompleteRequest } = actions;
  const handleSendPdfAndComplete = useCallback(() => {
    pdf.setPdfModalVisible(false);
    if (selectedRequest) handleCompleteRequest(selectedRequest);
  }, [selectedRequest, pdf.setPdfModalVisible, handleCompleteRequest]);

  return {
    requests: filter.requests,
    pendingCount: filter.pendingCount,
    stats: filter.stats,
    isLoading: filter.isLoading,
    isRefetching: filter.isRefetching,
    error: filter.error,
    isProcessing: actions.isProcessing,
    isCompleting: actions.isCompleting,
    isGeneratingPdf: pdf.isGeneratingPdf,
    selectedStatus,
    selectedRequest,
    pdfModalVisible: pdf.pdfModalVisible,
    generatedPdf: pdf.generatedPdf,
    errorMessage,
    setSelectedStatus,
    setSelectedRequest,
    setPdfModalVisible: pdf.setPdfModalVisible,
    setGeneratedPdf: pdf.setGeneratedPdf,
    setErrorMessage,
    handleRefresh: filter.handleRefresh,
    handleProcessRequest: actions.handleProcessRequest,
    handleGeneratePdf: pdf.handleGeneratePdf,
    handleCompleteRequest: actions.handleCompleteRequest,
    handleCallCustomer: actions.handleCallCustomer,
    handleWhatsAppCustomer: actions.handleWhatsAppCustomer,
    dismissError: actions.dismissError,
    handleSendPdfAndComplete,
  };
};
