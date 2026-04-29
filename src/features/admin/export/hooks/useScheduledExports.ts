import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";
import { exportKeys } from "./exportQueryKeys";
import { getErrorMessage } from "./exportHelpers";
import * as exportApi from "../api/exportApi";
import type { ScheduledExportRequest } from "../api/exportApi";
import type { ExportEntity } from "../types";

export const useScheduleExport = () => {
  return useMutation<
    { scheduleId: string; entity: string; frequency: string; nextRunAt: string },
    Error,
    { entity: ExportEntity; request: ScheduledExportRequest }
  >({
    mutationFn: ({ entity, request }) => exportApi.scheduleExport(entity, request),
    onSuccess: (data) => {
      showMessage({ message: "Export Scheduled", description: `Export scheduled to run ${data.frequency.toLowerCase()}`, type: "success" });
    },
    onError: (error) => {
      showMessage({ message: "Schedule Failed", description: getErrorMessage(error, "Failed to schedule export"), type: "danger" });
    },
  });
};

export const useCancelScheduledExport = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (scheduleId) => exportApi.cancelScheduledExport(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exportKeys.lists() });
      showMessage({ message: "Schedule Cancelled", description: "Scheduled export has been cancelled", type: "success" });
    },
    onError: (error) => {
      showMessage({ message: "Cancel Failed", description: getErrorMessage(error, "Failed to cancel scheduled export"), type: "danger" });
    },
  });
};
