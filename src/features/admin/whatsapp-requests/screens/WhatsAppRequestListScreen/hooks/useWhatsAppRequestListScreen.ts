/**
 * useWhatsAppRequestListScreen - Main hook for WhatsApp Request List Screen
 * Handles all state, data fetching, and mutations
 */

import { useState, useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Linking } from 'react-native';
import {
  useGetWhatsAppRequests,
  useGetPendingRequests,
  useGetWhatsAppStats,
  whatsappRequestQueryKeys,
  useMarkRequestProcessing,
  useMarkRequestCompleted,
  useGeneratePdf,
} from '../../../hooks';
import { WhatsAppRequest, WhatsAppRequestStatus } from '../../../api/whatsappRequestApi';
import { ApiClientError } from '@src/api/client';

interface UseWhatsAppRequestListScreenReturn {
  // Data
  requests: WhatsAppRequest[];
  pendingCount: number;
  stats: { pending: number; processing: number; total: number };
  
  // Loading states
  isLoading: boolean;
  isRefetching: boolean;
  error: Error | null;
  
  // Mutations loading
  isProcessing: boolean;
  isCompleting: boolean;
  isGeneratingPdf: boolean;
  
  // State
  selectedStatus: WhatsAppRequestStatus | 'all';
  selectedRequest: WhatsAppRequest | null;
  pdfModalVisible: boolean;
  generatedPdf: string | null;
  errorMessage: string | null;
  
  // Actions
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
  const queryClient = useQueryClient();

  const [selectedStatus, setSelectedStatus] = useState<WhatsAppRequestStatus | 'all'>('PENDING');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<WhatsAppRequest | null>(null);
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [generatedPdf, setGeneratedPdf] = useState<string | null>(null);

  const filters = useMemo(() => {
    return selectedStatus !== 'all' ? { status: selectedStatus, limit: 50 } : { limit: 50 };
  }, [selectedStatus]);

  const { data, isLoading, isRefetching, error, refetch } = useGetWhatsAppRequests(filters);
  const { data: pendingData } = useGetPendingRequests();
  const { data: statsData } = useGetWhatsAppStats();

  const markProcessing = useMarkRequestProcessing();
  const markCompleted = useMarkRequestCompleted();
  const generatePdf = useGeneratePdf();

  const requests = data?.requests || [];
  const pendingCount = pendingData?.requests?.length || 0;
  const stats = statsData?.currentQueue || { pending: 0, processing: 0, total: 0 };

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: whatsappRequestQueryKeys.all });
    await refetch();
  }, [queryClient, refetch]);

  const handleProcessRequest = useCallback(async (request: WhatsAppRequest) => {
    try {
      if (request.status === 'PENDING') {
        await markProcessing.mutateAsync(request._id);
      }
      setSelectedRequest(request);
    } catch (err) {
      setErrorMessage(err instanceof ApiClientError ? err.message : 'Failed to process request');
    }
  }, [markProcessing]);

  const handleGeneratePdf = useCallback(async (request: WhatsAppRequest) => {
    try {
      const result = await generatePdf.mutateAsync({
        id: request._id,
        data: { format: request.requestType === 'LOADING_LIST' ? 'LOADING_LIST' : 'PACKING_LIST' },
      });
      setGeneratedPdf(result.pdfContent);
      setPdfModalVisible(true);
    } catch (err) {
      setErrorMessage(err instanceof ApiClientError ? err.message : 'Failed to generate PDF');
    }
  }, [generatePdf]);

  const handleCompleteRequest = useCallback(async (request: WhatsAppRequest) => {
    try {
      await markCompleted.mutateAsync({ id: request._id });
      setSelectedRequest(null);
    } catch (err) {
      setErrorMessage(err instanceof ApiClientError ? err.message : 'Failed to complete request');
    }
  }, [markCompleted]);

  const handleCallCustomer = useCallback((phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  }, []);

  const handleWhatsAppCustomer = useCallback((phoneNumber: string) => {
    const cleanPhone = phoneNumber.replace(/\+/g, '');
    Linking.openURL(`https://wa.me/${cleanPhone}`);
  }, []);

  const dismissError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const handleSendPdfAndComplete = useCallback(() => {
    setPdfModalVisible(false);
    if (selectedRequest) handleCompleteRequest(selectedRequest);
  }, [selectedRequest, handleCompleteRequest]);

  return {
    // Data
    requests,
    pendingCount,
    stats,
    
    // Loading states
    isLoading,
    isRefetching,
    error,
    
    // Mutations loading
    isProcessing: markProcessing.isPending,
    isCompleting: markCompleted.isPending,
    isGeneratingPdf: generatePdf.isPending,
    
    // State
    selectedStatus,
    selectedRequest,
    pdfModalVisible,
    generatedPdf,
    errorMessage,
    
    // Actions
    setSelectedStatus,
    setSelectedRequest,
    setPdfModalVisible,
    setGeneratedPdf,
    setErrorMessage,
    handleRefresh,
    handleProcessRequest,
    handleGeneratePdf,
    handleCompleteRequest,
    handleCallCustomer,
    handleWhatsAppCustomer,
    dismissError,
    handleSendPdfAndComplete,
  };
};
