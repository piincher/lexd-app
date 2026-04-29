import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";
import { exportKeys } from "./exportQueryKeys";
import { getErrorMessage } from "./exportHelpers";
import * as exportApi from "../api/exportApi";

type TriggerBackupResponse = { backupId?: string };

export const useTriggerBackup = () => {
  const queryClient = useQueryClient();
  return useMutation<TriggerBackupResponse, Error, void>({
    mutationFn: () => exportApi.triggerBackup(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.backups() });
      showMessage({ message: "Backup Triggered", description: `Backup ${data.backupId} is in progress`, type: "success" });
    },
    onError: (error) => {
      showMessage({ message: "Trigger Failed", description: getErrorMessage(error, "Failed to trigger backup"), type: "danger" });
    },
  });
};
