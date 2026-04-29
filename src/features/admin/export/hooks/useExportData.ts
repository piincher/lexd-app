import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";
import { exportKeys } from "./exportQueryKeys";
import { startExportDownload, getErrorMessage } from "./exportHelpers";
import * as exportApi from "../api/exportApi";
import type { ExportResponse, ExportRequest } from "../api/exportApi";
import type { ExportEntity } from "../types";

export const useExportData = () => {
  const queryClient = useQueryClient();
  return useMutation<ExportResponse, Error, { entity: ExportEntity; request: ExportRequest }>({
    mutationFn: ({ entity, request }) => {
      switch (entity) {
        case "GOODS": return exportApi.exportGoods(request);
        case "CONTAINERS": return exportApi.exportContainers(request);
        case "PAYMENTS": return exportApi.exportPayments(request);
        case "CLIENTS": return exportApi.exportClients(request);
        default: throw new Error(`Unsupported entity: ${entity}`);
      }
    },
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.lists() });
      showMessage({ message: "Export Complete", description: `${data.recordCount} ${variables.entity.toLowerCase()} records exported`, type: "success" });
      await startExportDownload(data);
    },
    onError: (error) => {
      showMessage({ message: "Export Failed", description: getErrorMessage(error, "Failed to export data"), type: "danger" });
    },
  });
};
