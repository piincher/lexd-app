import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME } from '@src/shared/constants/queryConfig';
import { goodsPackageApi, warehousePrinterApi } from './api';
import type { LabelPrintJob } from './types';

export const goodsPackageKeys = {
  all: ['goods-packages'] as const,
  forGoods: (goodsId: string) => [...goodsPackageKeys.all, 'goods', goodsId] as const,
  printers: ['warehouse-printers'] as const,
  printJobs: ['label-print-jobs'] as const,
};

export const useGoodsPackageLabels = (goodsId?: string, enabled = true) =>
  useQuery({
    queryKey: goodsPackageKeys.forGoods(goodsId || ''),
    queryFn: () => goodsPackageApi.getForGoods(goodsId as string),
    enabled: enabled && !!goodsId,
    staleTime: DEFAULT_STALE_TIME,
  });

export const useWarehousePrinters = (enabled = true) =>
  useQuery({
    queryKey: goodsPackageKeys.printers,
    queryFn: () => warehousePrinterApi.list(),
    enabled,
    staleTime: DEFAULT_STALE_TIME,
  });

export const useRecentLabelPrintJobs = (enabled = true) =>
  useQuery({
    queryKey: goodsPackageKeys.printJobs,
    queryFn: () => goodsPackageApi.listPrintJobs({ limit: 20 }),
    enabled,
    staleTime: 15_000,
    refetchInterval: enabled ? 30_000 : false,
  });

export const useCreateLabelPrintJob = () =>
  useMutation({ mutationFn: goodsPackageApi.createPrintJob });

export const useReplacePackageLabel = (goodsId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ packageId, reason }: { packageId: string; reason: string }) =>
      goodsPackageApi.replaceLabel(packageId, reason),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: goodsPackageKeys.forGoods(goodsId) }),
  });
};

export const useReportLabelPrintStatus = () =>
  useMutation({
    mutationFn: ({
      jobId,
      status,
      error,
    }: {
      jobId: string;
      status: LabelPrintJob['status'];
      error?: { code?: string; message?: string };
    }) => goodsPackageApi.reportPrintJobStatus(jobId, status, error),
  });

export const useAssignPackageScan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: goodsPackageApi.assignScan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goodsPackageKeys.all });
      queryClient.invalidateQueries({ queryKey: ['goods'] });
      queryClient.invalidateQueries({ queryKey: ['containers'] });
      queryClient.invalidateQueries({ queryKey: ['airway-bills'] });
      queryClient.invalidateQueries({ queryKey: ['cargo-bags'] });
    },
  });
};
