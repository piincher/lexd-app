import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useListBackups } from "./useBackupQueries";
import { useGetSchedulerStatus } from "./useGetSchedulerStatus";
import { useCreateBackup } from "./useCreateBackup";
import { useRestoreBackup } from "./useRestoreBackup";
import { useDownloadBackup } from "./useDownloadBackup";
import { useDeleteBackup } from "./useDeleteBackup";
import { useTriggerBackup } from "./useTriggerBackup";
import type { Backup } from "../types";

export const useBackupManager = (isSuperAdmin = false) => {
  const [page, setPage] = useState(1);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [restoreDialogVisible, setRestoreDialogVisible] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);

  const listQuery = useListBackups({ page, limit: 10 });
  const schedulerQuery = useGetSchedulerStatus();
  const createMutation = useCreateBackup();
  const restoreMutation = useRestoreBackup();
  const downloadMutation = useDownloadBackup();
  const deleteMutation = useDeleteBackup();
  const triggerMutation = useTriggerBackup();

  const backups = listQuery.data?.data || [];

  const handleCreateBackup = useCallback(() => {
    Alert.alert("Create Backup", "This will create a manual backup of the database. Continue?", [
      { text: "Cancel", style: "cancel" },
      { text: "Create", onPress: () => createMutation.mutate([]) },
    ]);
  }, [createMutation]);

  const handleRestore = useCallback((backup: Backup) => {
    setSelectedBackup(backup);
    setRestoreDialogVisible(true);
    setMenuVisible(null);
  }, []);

  const confirmRestore = useCallback(() => {
    if (selectedBackup) restoreMutation.mutate(selectedBackup.backupId);
    setRestoreDialogVisible(false);
    setSelectedBackup(null);
  }, [selectedBackup, restoreMutation]);

  const handleDownload = useCallback(
    (backup: Backup) => {
      downloadMutation.mutate(backup.backupId);
      setMenuVisible(null);
    },
    [downloadMutation]
  );

  const handleDelete = useCallback(
    (backup: Backup) => {
      Alert.alert("Delete Backup", `Are you sure you want to delete backup ${backup.backupId}?`, [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteMutation.mutate(backup.backupId) },
      ]);
      setMenuVisible(null);
    },
    [deleteMutation]
  );

  const handleTriggerBackup = useCallback(() => {
    Alert.alert("Trigger Backup", "This will trigger an automated backup immediately. Continue?", [
      { text: "Cancel", style: "cancel" },
      { text: "Trigger", onPress: () => triggerMutation.mutate() },
    ]);
  }, [triggerMutation]);

  return {
    backups,
    isLoading: listQuery.isLoading,
    isRefetching: listQuery.isRefetching,
    refetch: listQuery.refetch,
    page,
    setPage,
    schedulerStatus: schedulerQuery.data,
    createMutation,
    restoreMutation,
    triggerMutation,
    handleCreateBackup,
    handleRestore,
    confirmRestore,
    handleDownload,
    handleDelete,
    handleTriggerBackup,
    restoreDialogVisible,
    setRestoreDialogVisible,
    selectedBackup,
    setSelectedBackup,
    menuVisible,
    setMenuVisible,
  };
};
