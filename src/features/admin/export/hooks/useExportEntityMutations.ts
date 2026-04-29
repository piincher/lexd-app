import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";
import { exportKeys } from "./exportQueryKeys";
import { startExportDownload, getErrorMessage } from "./exportHelpers";
import * as exportApi from "../api/exportApi";
import type { ExportRequest, ExportResponse } from "../api/exportApi";

export const useExportGoods = () => {
  const queryClient = useQueryClient();
  return useMutation<ExportResponse, Error, ExportRequest>({
    mutationFn: (request) => exportApi.exportGoods(request),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.lists() });
      showMessage({ message: "Export Complete", description: `${data.recordCount} goods records exported successfully`, type: "success" });
      await startExportDownload(data);
    },
    onError: (error) => {
      showMessage({ message: "Export Failed", description: getErrorMessage(error, "Failed to export goods data"), type: "danger" });
    },
  });
};

export const useExportContainers = () => {
  const queryClient = useQueryClient();
  return useMutation<ExportResponse, Error, ExportRequest>({
    mutationFn: (request) => exportApi.exportContainers(request),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.lists() });
      showMessage({ message: "Export Complete", description: `${data.recordCount} containers exported successfully`, type: "success" });
      await startExportDownload(data);
    },
    onError: (error) => {
      showMessage({ message: "Export Failed", description: getErrorMessage(error, "Failed to export containers"), type: "danger" });
    },
  });
};

export const useExportPayments = () => {
  const queryClient = useQueryClient();
  return useMutation<ExportResponse, Error, ExportRequest>({
    mutationFn: (request) => exportApi.exportPayments(request),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.lists() });
      showMessage({ message: "Export Complete", description: `${data.recordCount} payment records exported successfully`, type: "success" });
      await startExportDownload(data);
    },
    onError: (error) => {
      showMessage({ message: "Export Failed", description: getErrorMessage(error, "Failed to export payments"), type: "danger" });
    },
  });
};

export const useExportClients = () => {
  const queryClient = useQueryClient();
  return useMutation<ExportResponse, Error, ExportRequest>({
    mutationFn: (request) => exportApi.exportClients(request),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.lists() });
      showMessage({ message: "Export Complete", description: `${data.recordCount} clients exported successfully`, type: "success" });
      await startExportDownload(data);
    },
    onError: (error) => {
      showMessage({ message: "Export Failed", description: getErrorMessage(error, "Failed to export clients"), type: "danger" });
    },
  });
};
