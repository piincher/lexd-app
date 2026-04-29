import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";
import { exportKeys } from "./exportQueryKeys";
import { getErrorMessage } from "./exportHelpers";
import * as exportApi from "../api/exportApi";

export const useDeleteBackup = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (backupId) => exportApi.deleteBackup(backupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exportKeys.backups() });
      showMessage({ message: "Backup Deleted", description: "Backup has been deleted successfully", type: "success" });
    },
    onError: (error) => {
      showMessage({ message: "Delete Failed", description: getErrorMessage(error, "Failed to delete backup"), type: "danger" });
    },
  });
};
