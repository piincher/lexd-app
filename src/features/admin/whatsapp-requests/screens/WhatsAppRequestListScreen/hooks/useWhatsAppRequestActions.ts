import { useCallback } from 'react';
import { Linking } from 'react-native';
import { openWhatsApp } from '@src/shared/lib/openWhatsApp';
import { useMarkRequestProcessing, useMarkRequestCompleted } from '../../../hooks';
import { WhatsAppRequest } from '../../../api/whatsappRequestApi';
import { ApiClientError } from '@src/api/client';

export const useWhatsAppRequestActions = (
  setSelectedRequest: (req: WhatsAppRequest | null) => void,
  setErrorMessage: (msg: string | null) => void,
) => {
  const markProcessing = useMarkRequestProcessing();
  const markCompleted = useMarkRequestCompleted();

  const handleProcessRequest = useCallback(async (request: WhatsAppRequest) => {
    try {
      if (request.status === 'PENDING') {
        await markProcessing.mutateAsync(request._id);
      }
      setSelectedRequest(request);
    } catch (err) {
      setErrorMessage(err instanceof ApiClientError ? err.message : 'Failed to process request');
    }
  }, [markProcessing, setSelectedRequest, setErrorMessage]);

  const handleCompleteRequest = useCallback(async (request: WhatsAppRequest) => {
    try {
      await markCompleted.mutateAsync({ id: request._id });
      setSelectedRequest(null);
    } catch (err) {
      setErrorMessage(err instanceof ApiClientError ? err.message : 'Failed to complete request');
    }
  }, [markCompleted, setSelectedRequest, setErrorMessage]);

  const handleCallCustomer = useCallback((phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  }, []);

  const handleWhatsAppCustomer = useCallback((phoneNumber: string) => {
    openWhatsApp(phoneNumber);
  }, []);

  const dismissError = useCallback(() => setErrorMessage(null), [setErrorMessage]);

  return {
    isProcessing: markProcessing.isPending,
    isCompleting: markCompleted.isPending,
    handleProcessRequest,
    handleCompleteRequest,
    handleCallCustomer,
    handleWhatsAppCustomer,
    dismissError,
  };
};
