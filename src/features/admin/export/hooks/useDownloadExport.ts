import { useMutation } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";
import { Linking } from "react-native";
import { getErrorMessage } from "./exportHelpers";
import * as exportApi from "../api/exportApi";

export const useDownloadExport = () => {
  return useMutation<string, Error, string>({
    mutationFn: async (exportId: string) => {
      const { downloadUrl } = await exportApi.getExportDownloadUrl(exportId);
      return downloadUrl;
    },
    onSuccess: (downloadUrl) => {
      Linking.openURL(downloadUrl).catch(() => {
        showMessage({ message: "Download Failed", description: "Could not open download URL", type: "danger" });
      });
      showMessage({ message: "Download Started", description: "Your export file is opening in browser", type: "success" });
    },
    onError: (error) => {
      showMessage({ message: "Download Failed", description: getErrorMessage(error, "Failed to download export"), type: "danger" });
    },
  });
};
