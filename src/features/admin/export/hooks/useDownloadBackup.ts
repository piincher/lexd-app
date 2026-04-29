import { useMutation } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";
import { getErrorMessage } from "./exportHelpers";
import * as exportApi from "../api/exportApi";

export const useDownloadBackup = () => {
  return useMutation<string, Error, string>({
    mutationFn: async (backupId: string) => {
      const { downloadUrl } = await exportApi.getBackupDownloadUrl(backupId);
      return downloadUrl;
    },
    onSuccess: () => {
      showMessage({ message: "Download Ready", description: "Your backup file is ready for download", type: "success" });
    },
    onError: (error) => {
      showMessage({ message: "Download Failed", description: getErrorMessage(error, "Failed to download backup"), type: "danger" });
    },
  });
};
