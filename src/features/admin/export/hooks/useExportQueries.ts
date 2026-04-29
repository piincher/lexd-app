import { useQuery } from "@tanstack/react-query";
import { exportKeys } from "./exportQueryKeys";
import * as exportApi from "../api/exportApi";
import type { ExportLog } from "../api/exportApi";

export const useListExports = (filters?: {
  entity?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: exportKeys.list(filters),
    queryFn: () => exportApi.listExports(filters),
  });
};

export const useGetExport = (exportId: string) => {
  return useQuery<ExportLog, Error>({
    queryKey: exportKeys.detail(exportId),
    queryFn: () => exportApi.getExport(exportId),
    enabled: !!exportId,
  });
};

export const useGetExportStats = (params?: { startDate?: string; endDate?: string }) => {
  return useQuery({
    queryKey: [...exportKeys.stats(), params],
    queryFn: () => exportApi.getExportStats(params),
  });
};
