import { File, Paths } from "expo-file-system";
import { Platform } from "react-native";
import RNShare from "react-native-share";

import type { ExportResponse } from "../api/exportApi";

const MIME_TYPES = {
  CSV: "text/csv",
  EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  JSON: "application/json",
} as const;

const EXTENSIONS = {
  CSV: "csv",
  EXCEL: "xlsx",
  JSON: "json",
} as const;

type ExportFormatKey = keyof typeof EXTENSIONS;

const normalizeFormat = (format: string): ExportFormatKey => {
  const normalized = format.toUpperCase();
  return normalized === "EXCEL" || normalized === "JSON" ? normalized : "CSV";
};

const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result?.toString() || "";
      resolve(result.split(",")[1] || "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const sanitizeFilePart = (value: string) =>
  value.replace(/[^a-z0-9_-]+/gi, "_").replace(/^_+|_+$/g, "");

export const buildExportFilename = (exportData: ExportResponse) => {
  const format = normalizeFormat(exportData.format);
  const extension = EXTENSIONS[format];
  const entity = sanitizeFilePart(exportData.entity.toLowerCase());
  const exportId = sanitizeFilePart(exportData.exportId);
  return `chinalink_${entity}_${exportId}.${extension}`;
};

export const downloadExportToCache = async (exportData: ExportResponse) => {
  if (!exportData.downloadUrl) {
    throw new Error("No download URL was returned for this export.");
  }

  const response = await fetch(exportData.downloadUrl);
  if (!response.ok) {
    throw new Error(`Download failed with status ${response.status}`);
  }

  const blob = await response.blob();
  const base64 = await blobToBase64(blob);
  const filename = buildExportFilename(exportData);
  const file = new File(Paths.cache, filename);
  await file.write(base64, { encoding: "base64" });

  return {
    uri: file.uri,
    filename,
    mimeType: MIME_TYPES[normalizeFormat(exportData.format)],
  };
};

export const openExportFile = async (exportData: ExportResponse) => {
  const file = await downloadExportToCache(exportData);

  if (Platform.OS === "web") {
    return;
  }

  try {
    await RNShare.open({
      url: file.uri,
      type: file.mimeType,
      filename: file.filename,
      title: "Exporter le fichier",
      message: "Export ChinaLink Express",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("User did not share") || message.includes("cancelled")) {
      return;
    }
    throw error;
  }
};
