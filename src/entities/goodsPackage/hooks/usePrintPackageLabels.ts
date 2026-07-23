import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getDeviceId } from '@src/shared/lib/deviceId';
import { goodsPackageApi } from '../api';
import { sendLabelPrintJob } from '../lib/labelPrintTransport';
import { goodsPackageKeys } from '../hooks';

interface PrintPackageLabelsInput {
  labelIds: string[];
  printerId: string;
  copies?: number;
  reprintReason?: string;
}

const operationKey = () => `print-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

export const usePrintPackageLabels = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: PrintPackageLabelsInput) => {
      const deviceId = await getDeviceId();
      const { job } = await goodsPackageApi.createPrintJob({
        ...input,
        idempotencyKey: operationKey(),
        device: {
          deviceId,
          platform: Platform.OS === 'android' || Platform.OS === 'ios' ? Platform.OS : 'unknown',
          appVersion: Constants.expoConfig?.version,
        },
      });

      let sentToPrinter = false;
      try {
        await goodsPackageApi.reportPrintJobStatus(job.jobId, 'SENDING');
        const transport = await sendLabelPrintJob(job);
        sentToPrinter = true;
        const { job: completedJob } = await goodsPackageApi.reportPrintJobStatus(job.jobId, 'PRINTED');
        return { job: completedJob, transport };
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Printer communication failed';
        if (!sentToPrinter) {
          await goodsPackageApi.reportPrintJobStatus(job.jobId, 'FAILED', { code: 'PRINTER_TRANSPORT_FAILED', message });
        } else {
          throw new Error('Étiquettes transmises, mais confirmation serveur impossible. Vérifiez la sortie avant de réimprimer.');
        }
        throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: goodsPackageKeys.all }),
  });
};
