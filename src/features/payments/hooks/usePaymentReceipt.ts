import { useMutation, useQueryClient } from '@tanstack/react-query';
import { File, Paths } from 'expo-file-system';
import paymentApi from '../api/paymentApi';
import { sharePDFFromUri } from '@src/shared/lib/pdfShare';

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(',')[1];
      base64 ? resolve(base64) : reject(new Error('Failed to convert to base64'));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const useGenerateReceipt = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (paymentId: string) => {
      return paymentApi.generateReceipt(paymentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPaymentHistory'] });
    },
  });

  return {
    generateReceipt: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useDownloadReceipt = () => {
  const mutation = useMutation({
    mutationFn: async (paymentId: string): Promise<string> => {
      const blob = await paymentApi.downloadReceipt(paymentId);
      const base64 = await blobToBase64(blob);
      const filename = `Receipt_${paymentId}_${Date.now()}.pdf`;
      const destFile = new File(Paths.cache, filename);
      await destFile.write(base64, { encoding: 'base64' });
      return destFile.uri;
    },
  });

  return {
    downloadReceipt: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    fileUri: mutation.data,
  };
};

export const useShareReceipt = () => {
  const mutation = useMutation({
    mutationFn: async (paymentId: string) => {
      const blob = await paymentApi.downloadReceipt(paymentId);
      const base64 = await blobToBase64(blob);
      const filename = `Receipt_${paymentId}_${Date.now()}.pdf`;
      const destFile = new File(Paths.cache, filename);
      await destFile.write(base64, { encoding: 'base64' });
      
      await sharePDFFromUri({
        uri: destFile.uri,
        filename,
        dialogTitle: 'Partager le reçu',
      });
    },
  });

  return {
    shareReceipt: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
