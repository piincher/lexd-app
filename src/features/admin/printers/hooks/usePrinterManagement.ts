import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  goodsPackageKeys,
  goodsPackageApi,
  sendLabelPrintJob,
  testNetworkPrinter,
  useRecentLabelPrintJobs,
  useWarehousePrinters,
  warehousePrinterApi,
  type WarehousePrinter,
} from '@src/entities/goodsPackage';

export type PrinterFormInput = Omit<WarehousePrinter, '_id' | 'status' | 'lastSeenAt' | 'lastError'>;
export type PrintJobAction = 'CONFIRM_PRINTED' | 'MARK_FAILED' | 'RETRY' | 'CANCEL';

export const usePrinterManagement = () => {
  const queryClient = useQueryClient();
  const query = useWarehousePrinters(true);
  const jobsQuery = useRecentLabelPrintJobs(true);
  const refresh = () => queryClient.invalidateQueries({ queryKey: goodsPackageKeys.printers });
  const save = useMutation({
    mutationFn: ({ id, input }: { id?: string; input: PrinterFormInput }) => id
      ? warehousePrinterApi.update(id, input)
      : warehousePrinterApi.create(input),
    onSuccess: refresh,
  });
  const update = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<WarehousePrinter> }) => warehousePrinterApi.update(id, input),
    onSuccess: refresh,
  });
  const test = useMutation({
    mutationFn: async (printer: WarehousePrinter) => {
      try {
        const result = await testNetworkPrinter(printer);
        await warehousePrinterApi.reportStatus(printer._id, 'ONLINE');
        return result;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Connection failed';
        await warehousePrinterApi.reportStatus(printer._id, 'ERROR', message).catch(() => undefined);
        throw error;
      }
    },
    onSettled: refresh,
  });
  const recoverJob = useMutation({
    mutationFn: async ({ jobId, action }: { jobId: string; action: PrintJobAction }) => {
      if (action === 'CONFIRM_PRINTED') return goodsPackageApi.reportPrintJobStatus(jobId, 'PRINTED');
      if (action === 'MARK_FAILED') {
        return goodsPackageApi.reportPrintJobStatus(jobId, 'FAILED', {
          code: 'ADMIN_CONFIRMED_NOT_PRINTED', message: 'Administrator confirmed the label was not printed',
        });
      }
      if (action === 'CANCEL') return goodsPackageApi.reportPrintJobStatus(jobId, 'CANCELLED');

      const { job } = await goodsPackageApi.getPrintJob(jobId);
      await goodsPackageApi.reportPrintJobStatus(jobId, 'SENDING');
      try {
        const result = await sendLabelPrintJob(job);
        await goodsPackageApi.reportPrintJobStatus(jobId, 'PRINTED');
        await warehousePrinterApi.reportStatus(job.printerId._id, 'ONLINE').catch(() => undefined);
        return result;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Printer communication failed';
        await goodsPackageApi.reportPrintJobStatus(jobId, 'FAILED', { code: 'PRINT_RETRY_FAILED', message });
        await warehousePrinterApi.reportStatus(job.printerId._id, 'ERROR', message).catch(() => undefined);
        throw error;
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: goodsPackageKeys.printJobs }),
  });

  return {
    printers: query.data?.printers || [], isLoading: query.isLoading, error: query.error,
    refetch: query.refetch, save, update, test, jobs: jobsQuery.data?.jobs || [], jobsQuery, recoverJob,
  };
};
