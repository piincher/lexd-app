import { showMessage } from "react-native-flash-message";
import { openExportFile } from "../lib/exportDownload";
import type { ExportResponse } from "../api/exportApi";

export const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export const startExportDownload = async (data: ExportResponse) => {
  try {
    await openExportFile(data);
    showMessage({
      message: "Download Ready",
      description: "Choose where to save or open the exported file",
      type: "success",
    });
  } catch (error) {
    showMessage({
      message: "Download Failed",
      description: getErrorMessage(error, "The export was created, but the file could not be opened"),
      type: "danger",
    });
  }
};
