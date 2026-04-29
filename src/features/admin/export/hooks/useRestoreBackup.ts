import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";
import { exportKeys } from "./exportQueryKeys";
import { getErrorMessage } from "./exportHelpers";
import * as exportApi from "../api/exportApi";

type RestoreBackupResponse = { restoredCollections?: unknown[] };

export const useRestoreBackup = () => {
  const queryClient = useQueryClient();
  return useMutation<RestoreBackupResponse, Error, string>({
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
    onError: (error) => {
      showMessage({
        message: "Restore Failed",
        description: getErrorMessage(error, "Failed to restore backup"),
        type: "danger",
        duration: 5000,
      });
    },
  });
};
