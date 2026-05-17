import { useState, useCallback } from 'react';
import { useGeneratePdf } from '../../../hooks';
import { WhatsAppRequest } from '../../../api/whatsappRequestApi';
import { ApiClientError } from '@src/api/client';

export const useWhatsAppRequestPdf = (setErrorMessage: (msg: string | null) => void) => {
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [generatedPdf, setGeneratedPdf] = useState<string | null>(null);
  const generatePdf = useGeneratePdf();

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
  }, [generatePdf, setErrorMessage]);

  return {
    pdfModalVisible,
    setPdfModalVisible,
    generatedPdf,
    setGeneratedPdf,
    handleGeneratePdf,
    isGeneratingPdf: generatePdf.isPending,
  };
};
