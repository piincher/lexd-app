import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";
import { exportKeys } from "./exportQueryKeys";
import { getErrorMessage } from "./exportHelpers";
import * as exportApi from "../api/exportApi";
import type { Backup } from "../api/exportApi";

export const useCreateBackup = () => {
  const queryClient = useQueryClient();
  return useMutation<Backup, Error, string[] | undefined>({
    mutationFn: (collections) => exportApi.createBackup(collections),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: exportKeys.backups() });
      showMessage({ message: "Backup Created", description: `Backup ${data.backupId} created successfully`, type: "success" });
    },
    onError: (error) => {
      showMessage({ message: "Backup Failed", description: getErrorMessage(error, "Failed to create backup"), type: "danger" });
    },
  });
};
