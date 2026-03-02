/**
 * Export Hooks
 * 
 * React hooks for data export and backup functionality
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";

import * as exportApi from "../api/exportApi";
import {
  ExportRequest,
  ExportResponse,
  ScheduledExportRequest,
  Backup,
  ExportLog,
  ExportFormat,
  ExportEntity,
  ScheduleFrequency,
} from "../types";

// Query keys
export const exportKeys = {
  all: ["exports"] as const,
  lists: () => [...exportKeys.all, "list"] as const,
  list: (filters: any) => [...exportKeys.lists(), filters] as const,
  details: () => [...exportKeys.all, "detail"] as const,
  detail: (id: string) => [...exportKeys.details(), id] as const,
  backups: () => [...exportKeys.all, "backups"] as const,
  backupList: (filters: any) => [...exportKeys.backups(), filters] as const,
  stats: () => [...exportKeys.all, "stats"] as const,
  scheduler: () => [...exportKeys.all, "scheduler"] as const,
};

// Export goods hook
export const useExportGoods = () => {
  const queryClient = useQueryClient();

  return useMutation<ExportResponse, Error, ExportRequest>({
    mutationFn: (request) => exportApi.exportGoods(request),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.lists() });
      showMessage({
        message: "Export Complete",
        description: `${data.recordCount} goods records exported successfully`,
        type: "success",
      });
    },
    onError: (error: any) => {
      showMessage({
        message: "Export Failed",
        description: error.message || "Failed to export goods data",
        type: "danger",
      });
    },
  });
};

// Export containers hook
export const useExportContainers = () => {
  const queryClient = useQueryClient();

  return useMutation<ExportResponse, Error, ExportRequest>({
    mutationFn: (request) => exportApi.exportContainers(request),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.lists() });
      showMessage({
        message: "Export Complete",
        description: `${data.recordCount} containers exported successfully`,
        type: "success",
      });
    },
    onError: (error: any) => {
      showMessage({
        message: "Export Failed",
        description: error.message || "Failed to export containers",
        type: "danger",
      });
    },
  });
};

// Export payments hook
export const useExportPayments = () => {
  const queryClient = useQueryClient();

  return useMutation<ExportResponse, Error, ExportRequest>({
    mutationFn: (request) => exportApi.exportPayments(request),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.lists() });
      showMessage({
        message: "Export Complete",
        description: `${data.recordCount} payment records exported successfully`,
        type: "success",
      });
    },
    onError: (error: any) => {
      showMessage({
        message: "Export Failed",
        description: error.message || "Failed to export payments",
        type: "danger",
      });
    },
  });
};

// Export clients hook
export const useExportClients = () => {
  const queryClient = useQueryClient();

  return useMutation<ExportResponse, Error, ExportRequest>({
    mutationFn: (request) => exportApi.exportClients(request),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.lists() });
      showMessage({
        message: "Export Complete",
        description: `${data.recordCount} clients exported successfully`,
        type: "success",
      });
    },
    onError: (error: any) => {
      showMessage({
        message: "Export Failed",
        description: error.message || "Failed to export clients",
        type: "danger",
      });
    },
  });
};

// Generic export hook
export const useExportData = () => {
  const queryClient = useQueryClient();

  return useMutation<ExportResponse, Error, { entity: ExportEntity; request: ExportRequest }>({
    mutationFn: ({ entity, request }) => {
      switch (entity) {
        case "GOODS":
          return exportApi.exportGoods(request);
        case "CONTAINERS":
          return exportApi.exportContainers(request);
        case "PAYMENTS":
          return exportApi.exportPayments(request);
        case "CLIENTS":
          return exportApi.exportClients(request);
        default:
          throw new Error(`Unsupported entity: ${entity}`);
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.lists() });
      showMessage({
        message: "Export Complete",
        description: `${data.recordCount} ${variables.entity.toLowerCase()} records exported`,
        type: "success",
      });
    },
    onError: (error: any) => {
      showMessage({
        message: "Export Failed",
        description: error.message || "Failed to export data",
        type: "danger",
      });
    },
  });
};

// Schedule export hook
export const useScheduleExport = () => {
  return useMutation<
    { scheduleId: string; entity: string; frequency: string; nextRunAt: string },
    Error,
    { entity: ExportEntity; request: ScheduledExportRequest }
  >({
    mutationFn: ({ entity, request }) => exportApi.scheduleExport(entity, request),
    onSuccess: (data) => {
      showMessage({
        message: "Export Scheduled",
        description: `Export scheduled to run ${data.frequency.toLowerCase()}`,
        type: "success",
      });
    },
    onError: (error: any) => {
      showMessage({
        message: "Schedule Failed",
        description: error.message || "Failed to schedule export",
        type: "danger",
      });
    },
  });
};

// Cancel scheduled export hook
export const useCancelScheduledExport = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (scheduleId) => exportApi.cancelScheduledExport(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exportKeys.lists() });
      showMessage({
        message: "Schedule Cancelled",
        description: "Scheduled export has been cancelled",
        type: "success",
      });
    },
    onError: (error: any) => {
      showMessage({
        message: "Cancel Failed",
        description: error.message || "Failed to cancel scheduled export",
        type: "danger",
      });
    },
  });
};

// List exports hook
export const useListExports = (filters?: {
  entity?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: exportKeys.list(filters),
    queryFn: () => exportApi.listExports(filters),
  });
};

// Get export details hook
export const useGetExport = (exportId: string) => {
  return useQuery<ExportLog, Error>({
    queryKey: exportKeys.detail(exportId),
    queryFn: () => exportApi.getExport(exportId),
    enabled: !!exportId,
  });
};

// Get export stats hook
export const useGetExportStats = (params?: { startDate?: string; endDate?: string }) => {
  return useQuery({
    queryKey: [...exportKeys.stats(), params],
    queryFn: () => exportApi.getExportStats(params),
  });
};

// Download export hook
export const useDownloadExport = () => {
  return useMutation<string, Error, string>({
    mutationFn: async (exportId: string) => {
      // Get download URL
      const { downloadUrl } = await exportApi.getExportDownloadUrl(exportId);
      
      // In React Native, we would use FileSystem and Sharing
      // For now, return the URL for the component to handle
      return downloadUrl;
    },
    onSuccess: () => {
      showMessage({
        message: "Download Ready",
        description: "Your export file is ready for download",
        type: "success",
      });
    },
    onError: (error: any) => {
      showMessage({
        message: "Download Failed",
        description: error.message || "Failed to download export",
        type: "danger",
      });
    },
  });
};

// List backups hook
export const useListBackups = (filters?: {
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: exportKeys.backupList(filters),
    queryFn: () => exportApi.listBackups(filters),
  });
};

// Get backup hook
export const useGetBackup = (backupId: string) => {
  return useQuery<Backup, Error>({
    queryKey: [...exportKeys.backups(), backupId],
    queryFn: () => exportApi.getBackup(backupId),
    enabled: !!backupId,
  });
};

// Create backup hook
export const useCreateBackup = () => {
  const queryClient = useQueryClient();

  return useMutation<Backup, Error, string[] | undefined>({
    mutationFn: (collections) => exportApi.createBackup(collections),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.backups() });
      showMessage({
        message: "Backup Created",
        description: `Backup ${data.backupId} created successfully`,
        type: "success",
      });
    },
    onError: (error: any) => {
      showMessage({
        message: "Backup Failed",
        description: error.message || "Failed to create backup",
        type: "danger",
      });
    },
  });
};

// Restore backup hook
export const useRestoreBackup = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: (backupId) => exportApi.restoreBackup(backupId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.backups() });
      showMessage({
        message: "Restore Complete",
        description: `Successfully restored ${data.restoredCollections?.length || 0} collections`,
        type: "success",
        duration: 5000,
      });
    },
    onError: (error: any) => {
      showMessage({
        message: "Restore Failed",
        description: error.message || "Failed to restore backup",
        type: "danger",
        duration: 5000,
      });
    },
  });
};

// Download backup hook
export const useDownloadBackup = () => {
  return useMutation<string, Error, string>({
    mutationFn: async (backupId: string) => {
      const { downloadUrl } = await exportApi.getBackupDownloadUrl(backupId);
      return downloadUrl;
    },
    onSuccess: () => {
      showMessage({
        message: "Download Ready",
        description: "Your backup file is ready for download",
        type: "success",
      });
    },
    onError: (error: any) => {
      showMessage({
        message: "Download Failed",
        description: error.message || "Failed to download backup",
        type: "danger",
      });
    },
  });
};

// Delete backup hook
export const useDeleteBackup = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (backupId) => exportApi.deleteBackup(backupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exportKeys.backups() });
      showMessage({
        message: "Backup Deleted",
        description: "Backup has been deleted successfully",
        type: "success",
      });
    },
    onError: (error: any) => {
      showMessage({
        message: "Delete Failed",
        description: error.message || "Failed to delete backup",
        type: "danger",
      });
    },
  });
};

// Get backup stats hook
export const useGetBackupStats = () => {
  return useQuery({
    queryKey: [...exportKeys.backups(), "stats"],
    queryFn: () => exportApi.getBackupStats(),
  });
};

// Trigger backup hook
export const useTriggerBackup = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, void>({
    mutationFn: () => exportApi.triggerBackup(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.backups() });
      showMessage({
        message: "Backup Triggered",
        description: `Backup ${data.backupId} is in progress`,
        type: "success",
      });
    },
    onError: (error: any) => {
      showMessage({
        message: "Trigger Failed",
        description: error.message || "Failed to trigger backup",
        type: "danger",
      });
    },
  });
};

// Get scheduler status hook
export const useGetSchedulerStatus = () => {
  return useQuery({
    queryKey: exportKeys.scheduler(),
    queryFn: () => exportApi.getSchedulerStatus(),
  });
};
