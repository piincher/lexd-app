import { useQuery } from "@tanstack/react-query";
import { exportKeys } from "./exportQueryKeys";
import * as exportApi from "../api/exportApi";
import type { Backup } from "../api/exportApi";

export const useListBackups = (filters?: {
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: exportKeys.backupList(filters),
    queryFn: () => exportApi.listBackups(filters),
  });
};

export const useGetBackup = (backupId: string) => {
  return useQuery<Backup, Error>({
    queryKey: [...exportKeys.backups(), backupId],
    queryFn: () => exportApi.getBackup(backupId),
    enabled: !!backupId,
  });
};

export const useGetBackupStats = () => {
  return useQuery({
    queryKey: [...exportKeys.backups(), "stats"],
    queryFn: () => exportApi.getBackupStats(),
  });
};
