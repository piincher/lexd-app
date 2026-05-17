/**
 * Export API
 * 
 * API functions for data export and backup management
 */

import { apiClientV2 } from "@src/api/client";
import type { ExportEntity, ExportFormat, ScheduleFrequency } from "../types";

export interface ExportFilters {
  dateRange?: {
    startDate?: string;
    endDate?: string;
  };
  status?: string;
  clientId?: string;
  containerId?: string;
  customFilters?: Record<string, any>;
}

export interface ExportRequest {
  format: "CSV" | "EXCEL" | "JSON";
  filters?: ExportFilters;
  emailOptions?: {
    email: string;
    method: "ATTACHMENT" | "LINK";
  };
  reason?: string;
}

export interface ExportResponse {
  exportId: string;
  entity: string;
  format: string;
  status: string;
  recordCount: number;
  downloadUrl: string;
  urlExpiresAt: string;
  fileSize: string;
}

export interface ScheduledExportRequest extends ExportRequest {
  frequency: "DAILY" | "WEEKLY" | "MONTHLY";
}

export interface Backup {
  _id: string;
  backupId: string;
  type: "AUTOMATED" | "MANUAL" | "SCHEDULED";
  status: string;
  collections: Array<{
    name: string;
    documentCount: number;
    sizeInBytes: number;
  }>;
  storage: {
    bucket: string;
    key: string;
    url: string;
    sizeInBytes: number;
    compressedSizeInBytes: number;
    compressionRatio: number;
  };
  formattedSize: string;
  formattedCompressedSize: string;
  metadata: {
    startedAt: string;
    completedAt: string;
    durationMs: number;
    appVersion: string;
    mongoVersion: string;
  };
  createdBy?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
}

export interface ExportLog {
  _id: string;
  exportId: string;
  entity: ExportEntity;
  format: ExportFormat;
  exportedBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  filters: ExportFilters;
  metadata: {
    recordCount: number;
    fileSize: number;
    status: string;
    startedAt: string;
    completedAt?: string;
    durationMs: number;
  };
  file: {
    downloadUrl: string;
    urlExpiresAt: string;
    originalName: string;
  };
  formattedFileSize: string;
  scheduled?: {
    isScheduled: boolean;
    frequency: ScheduleFrequency;
    nextRunAt?: string;
  };
  emailDelivery?: {
    requested: boolean;
    recipientEmail?: string;
    sentAt?: string;
    status?: string;
    deliveryMethod?: "ATTACHMENT" | "LINK";
  };
  createdAt: string;
  updatedAt?: string;
}

// Export goods data
export const exportGoods = async (request: ExportRequest): Promise<ExportResponse> => {
  const response = await apiClientV2.post("/export/goods", request);
  return response.data.data;
};

// Export containers data
export const exportContainers = async (request: ExportRequest): Promise<ExportResponse> => {
  const response = await apiClientV2.post("/export/containers", request);
  return response.data.data;
};

// Export payments data
export const exportPayments = async (request: ExportRequest): Promise<ExportResponse> => {
  const response = await apiClientV2.post("/export/payments", request);
  return response.data.data;
};

// Export clients data
export const exportClients = async (request: ExportRequest): Promise<ExportResponse> => {
  const response = await apiClientV2.post("/export/clients", request);
  return response.data.data;
};

// Schedule recurring export
export const scheduleExport = async (
  entity: string,
  request: ScheduledExportRequest
): Promise<{ scheduleId: string; entity: string; frequency: string; nextRunAt: string }> => {
  const response = await apiClientV2.post("/export/schedule", { entity, ...request });
  return response.data.data;
};

// Cancel scheduled export
export const cancelScheduledExport = async (scheduleId: string): Promise<void> => {
  await apiClientV2.delete(`/export/schedule/${scheduleId}`);
};

// List exports
export const listExports = async (params?: {
  entity?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: ExportLog[]; pagination: any }> => {
  const response = await apiClientV2.get("/export/exports", { params });
  return {
    data: response.data.data,
    pagination: response.data.pagination,
  };
};

// Get export details
export const getExport = async (exportId: string): Promise<ExportLog> => {
  const response = await apiClientV2.get(`/export/exports/${exportId}`);
  return response.data.data;
};

// Get export download URL
export const getExportDownloadUrl = async (
  exportId: string,
  expirySeconds?: number
): Promise<{ downloadUrl: string; expiresAt: string }> => {
  const response = await apiClientV2.get(`/export/exports/${exportId}/download`, {
    params: { expirySeconds },
  });
  return response.data.data;
};

// Get export statistics
export const getExportStats = async (params?: {
  startDate?: string;
  endDate?: string;
}): Promise<any> => {
  const response = await apiClientV2.get("/export/exports/stats", { params });
  return response.data.data;
};

// List backups
export const listBackups = async (params?: {
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: Backup[]; pagination: any }> => {
  const response = await apiClientV2.get("/export/backups", { params });
  return {
    data: response.data.data,
    pagination: response.data.pagination,
  };
};

// Get backup details
export const getBackup = async (backupId: string): Promise<Backup> => {
  const response = await apiClientV2.get(`/export/backups/${backupId}`);
  return response.data.data;
};

// Create manual backup
export const createBackup = async (collections?: string[]): Promise<Backup> => {
  const response = await apiClientV2.post("/export/backups", { collections });
  return response.data.data;
};

// Restore from backup
export const restoreBackup = async (backupId: string): Promise<any> => {
  const response = await apiClientV2.post(`/export/backups/${backupId}/restore`);
  return response.data.data;
};

// Get backup download URL
export const getBackupDownloadUrl = async (
  backupId: string,
  expirySeconds?: number
): Promise<{ downloadUrl: string }> => {
  const response = await apiClientV2.get(`/export/backups/${backupId}/download`, {
    params: { expirySeconds },
  });
  return response.data.data;
};

// Delete backup
export const deleteBackup = async (backupId: string): Promise<void> => {
  await apiClientV2.delete(`/export/backups/${backupId}`);
};

// Get backup statistics
export const getBackupStats = async (): Promise<any> => {
  const response = await apiClientV2.get("/export/backups/stats");
  return response.data.data;
};

// Trigger backup manually
export const triggerBackup = async (): Promise<any> => {
  const response = await apiClientV2.post("/export/backups/trigger");
  return response.data.data;
};

// Get scheduler status
export const getSchedulerStatus = async (): Promise<any> => {
  const response = await apiClientV2.get("/export/backups/scheduler");
  return response.data.data;
};
