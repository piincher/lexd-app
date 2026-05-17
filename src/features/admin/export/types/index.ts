/**
 * Export Types
 * 
 * Type definitions for data export and backup functionality
 */

export type ExportFormat = "CSV" | "EXCEL" | "JSON";
export type ExportEntity = 
  | "GOODS" 
  | "CONTAINERS" 
  | "PAYMENTS" 
  | "CLIENTS" 
  | "USERS" 
  | "INVOICES"
  | "EXPENSES"
  | "ROUTES"
  | "CONSIGNEES"
  | "TICKETS"
  | "NOTIFICATIONS";

export type ScheduleFrequency = "DAILY" | "WEEKLY" | "MONTHLY";
export type BackupType = "AUTOMATED" | "MANUAL" | "SCHEDULED";
export type BackupStatus = "IN_PROGRESS" | "COMPLETED" | "FAILED" | "RESTORING" | "RESTORED";

export interface DateRange {
  startDate?: string;
  endDate?: string;
}

export interface ExportFilters {
  dateRange?: DateRange;
  status?: string;
  clientId?: string;
  containerId?: string;
  customFilters?: Record<string, any>;
}

export interface EmailOptions {
  email: string;
  method: "ATTACHMENT" | "LINK";
}

export interface ExportRequest {
  format: ExportFormat;
  filters?: ExportFilters;
  emailOptions?: EmailOptions;
  reason?: string;
}

export interface ScheduledExportRequest extends ExportRequest {
  frequency: ScheduleFrequency;
}

export interface ExportResponse {
  exportId: string;
  entity: ExportEntity;
  format: ExportFormat;
  status: string;
  recordCount: number;
  downloadUrl: string;
  urlExpiresAt: string;
  fileSize: string;
}

export interface BackupCollection {
  name: string;
  documentCount: number;
  sizeInBytes: number;
}

export interface BackupStorage {
  bucket: string;
  key: string;
  url: string;
  sizeInBytes: number;
  compressedSizeInBytes: number;
  compressionRatio: number;
}

export interface BackupMetadata {
  startedAt: string;
  completedAt?: string;
  durationMs: number;
  errorMessage?: string;
  appVersion?: string;
  mongoVersion?: string;
}

export interface BackupRestore {
  restoredAt?: string;
  restoredBy?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  restoreDurationMs: number;
  collectionsRestored?: Array<{
    name: string;
    documentCount: number;
  }>;
}

export interface Backup {
  _id: string;
  backupId: string;
  type: BackupType;
  status: BackupStatus;
  collections: BackupCollection[];
  storage: BackupStorage;
  formattedSize: string;
  formattedCompressedSize: string;
  metadata: BackupMetadata;
  restore: BackupRestore;
  createdBy?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ExportLogMetadata {
  recordCount: number;
  fileSize: number;
  status: string;
  startedAt: string;
  completedAt?: string;
  durationMs: number;
  errorMessage?: string;
}

export interface ExportLogFile {
  provider?: string;
  bucket?: string;
  key?: string;
  downloadUrl: string;
  urlExpiresAt: string;
  originalName: string;
}

export interface ExportLogScheduled {
  isScheduled: boolean;
  scheduleId?: string;
  frequency?: ScheduleFrequency;
  nextRunAt?: string;
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
  metadata: ExportLogMetadata;
  file: ExportLogFile;
  formattedFileSize: string;
  scheduled?: ExportLogScheduled;
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

export interface SchedulerStatus {
  isRunning: boolean;
  isScheduled: boolean;
  lastRun: string | null;
  stats: {
    totalRuns: number;
    successfulRuns: number;
    failedRuns: number;
    lastSuccess: string | null;
    lastFailure: string | null;
  };
  config: {
    schedule: string;
    timezone: string;
    retentionCount: number;
    retentionDays: number;
  };
}

export interface ExportStats {
  total: number;
  failed: number;
  successRate: string;
  byEntity: Record<string, {
    total: number;
    byStatus: Record<string, number>;
    totalRecords: number;
    totalSize: number;
  }>;
}

export interface BackupStats {
  total: number;
  byStatus: Record<string, {
    count: number;
    totalSize: number;
  }>;
  expired: number;
}
