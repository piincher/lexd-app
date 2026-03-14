import { useState, useCallback } from 'react';
import { Linking } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetWhatsAppRequests,
  useGetPendingRequests,
  useGetWhatsAppStats,
  whatsappRequestQueryKeys,
  useMarkRequestProcessing,
  useMarkRequestCompleted,
  useGeneratePdf,
} from '@src/features/admin/whatsapp-requests/hooks/useWhatsAppRequests';
import { WhatsAppRequest, WhatsAppRequestStatus } from '@src/features/admin/whatsapp-requests/api/whatsappRequestApi';
import { ApiClientError } from '@src/api/client';

export const useWhatsAppRequestList = () => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<WhatsAppRequestStatus | 'all'>('PENDING');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<WhatsAppRequest | null>(null);
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [generatedPdf, setGeneratedPdf] = useState<string | null>(null);

  const filters = selectedStatus !== 'all' ? { status: selectedStatus, limit: 50 } : { limit: 50 };

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

  return {
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
    setSelectedRequest,
    pdfModalVisible,
    setPdfModalVisible,
    generatedPdf,
    handleRefresh,
    handleProcessRequest,
    handleGeneratePdf,
    handleCompleteRequest,
    handleCallCustomer,
    handleWhatsAppCustomer,
    isProcessing: markProcessing.isPending || markCompleted.isPending,
    isGeneratingPdf: generatePdf.isPending,
    isCompleting: markCompleted.isPending,
  };
};
