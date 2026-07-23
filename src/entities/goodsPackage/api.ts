import { apiClientV2, apiRequest } from '@src/shared/api/client';
import type {
  AssignPackageScanInput,
  CreatePrintJobInput,
  GoodsPackage,
  LabelPrintJob,
  LabelPrintJobSummary,
  PrintJobPagination,
  PackageScanResult,
  WarehousePrinter,
} from './types';

const client = apiClientV2;

export const goodsPackageApi = {
  getForGoods: (goodsId: string) =>
    apiRequest.get<{ goodsId: string; goodsCode: string; packages: GoodsPackage[] }>(
      client,
      `/package-labels/goods/${goodsId}`,
    ).then((response) => response.data),

  resolveScan: (code: string) =>
    apiRequest.post<PackageScanResult>(client, '/package-labels/scan/resolve', { code }).then((response) => response.data),

  assignScan: (input: AssignPackageScanInput) =>
    apiRequest.post<PackageScanResult>(client, '/package-labels/scan/assign', input).then((response) => response.data),

  replaceLabel: (packageId: string, reason: string) =>
    apiRequest.post<{ label: GoodsPackage['label'] }>(
      client,
      `/package-labels/packages/${packageId}/replace`,
      { reason },
    ).then((response) => response.data),

  createPrintJob: (input: CreatePrintJobInput) =>
    apiRequest.post<{ job: LabelPrintJob }>(client, '/package-labels/print-jobs', input).then((response) => response.data),

  getPrintJob: (jobId: string) =>
    apiRequest.get<{ job: LabelPrintJob }>(client, `/package-labels/print-jobs/${jobId}`).then((response) => response.data),

  listPrintJobs: (params?: { status?: LabelPrintJob['status']; printerId?: string; page?: number; limit?: number }) =>
    apiRequest.get<{ jobs: LabelPrintJobSummary[]; pagination: PrintJobPagination }>(
      client,
      '/package-labels/print-jobs',
      { params },
    ).then((response) => response.data),

  reportPrintJobStatus: (
    jobId: string,
    status: LabelPrintJob['status'],
    error?: { code?: string; message?: string },
  ) => apiRequest.patch<{ job: LabelPrintJob }>(client, `/package-labels/print-jobs/${jobId}/status`, { status, error })
    .then((response) => response.data),
};

export const warehousePrinterApi = {
  list: (includeInactive = false) =>
    apiRequest.get<{ printers: WarehousePrinter[] }>(client, '/admin/warehouse-printers', {
      params: { includeInactive },
    }).then((response) => response.data),

  create: (input: Omit<WarehousePrinter, '_id' | 'status' | 'lastSeenAt' | 'lastError'>) =>
    apiRequest.post<{ printer: WarehousePrinter }>(client, '/admin/warehouse-printers', input)
      .then((response) => response.data),

  update: (id: string, input: Partial<WarehousePrinter>) =>
    apiRequest.patch<{ printer: WarehousePrinter }>(client, `/admin/warehouse-printers/${id}`, input)
      .then((response) => response.data),

  reportStatus: (id: string, status: WarehousePrinter['status'], error?: string) =>
    apiRequest.patch<{ printer: WarehousePrinter }>(client, `/admin/warehouse-printers/${id}/status`, {
      status,
      error,
    }).then((response) => response.data),
};
