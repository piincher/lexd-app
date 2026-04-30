import React, { useState } from "react";
import { View, RefreshControl, Alert } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Button, ActivityIndicator } from "react-native-paper";
import { Text } from "react-native";

import {
  useListBackups,
  useCreateBackup,
  useRestoreBackup,
  useDownloadBackup,
  useDeleteBackup,
  useTriggerBackup,
  useGetSchedulerStatus,
} from "../../hooks";
import { Backup } from "../../types";
import { styles } from "./BackupManager.styles";
import { BackupItem } from "./BackupItem";
import { RestoreDialog } from "./RestoreDialog";
import { SchedulerStatusCard } from "./SchedulerStatusCard";

interface BackupManagerProps {
  isSuperAdmin?: boolean;
}

export const BackupManager: React.FC<BackupManagerProps> = ({ isSuperAdmin = false }) => {
  const [page, setPage] = useState(1);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [restoreDialogVisible, setRestoreDialogVisible] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);

  const { data, isLoading, refetch, isRefetching } = useListBackups({ page, limit: 10 });
  const schedulerStatus = useGetSchedulerStatus();

  const createBackup = useCreateBackup();
  const restoreBackup = useRestoreBackup();
  const downloadBackup = useDownloadBackup();
  const deleteBackup = useDeleteBackup();
  const triggerBackup = useTriggerBackup();

  const backups = data?.data || [];

  const handleCreateBackup = () => {
    Alert.alert("Create Backup", "This will create a manual backup of the database. Continue?", [
      { text: "Cancel", style: "cancel" },
      { text: "Create", onPress: () => createBackup.mutate([]) },
    ]);
  };

  const handleRestore = (backup: Backup) => {
    setSelectedBackup(backup);
    setRestoreDialogVisible(true);
    setMenuVisible(null);
  };

  const confirmRestore = () => {
    if (selectedBackup) restoreBackup.mutate(selectedBackup.backupId);
    setRestoreDialogVisible(false);
    setSelectedBackup(null);
  };

  const handleDownload = (backup: Backup) => {
    downloadBackup.mutate(backup.backupId);
    setMenuVisible(null);
  };

  const handleDelete = (backup: Backup) => {
    Alert.alert("Delete Backup", `Are you sure you want to delete backup ${backup.backupId}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteBackup.mutate(backup.backupId) },
    ]);
    setMenuVisible(null);
  };

  const handleTriggerBackup = () => {
    Alert.alert("Trigger Backup", "This will trigger an automated backup immediately. Continue?", [
      { text: "Cancel", style: "cancel" },
      { text: "Trigger", onPress: () => triggerBackup.mutate() },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SchedulerStatusCard status={schedulerStatus.data} />

      <View style={styles.actions}>
        <Button mode="contained" icon="plus" onPress={handleCreateBackup} loading={createBackup.isPending} style={styles.actionButton}>
          Create Backup
        </Button>
        {isSuperAdmin && (
          <Button mode="outlined" icon="play-circle" onPress={handleTriggerBackup} loading={triggerBackup.isPending} style={styles.actionButton}>
            Trigger Now
          </Button>
        )}
      </View>

      <FlashList
        data={backups as Backup[]}
        renderItem={({ item }) => (
          <BackupItem
            item={item}
            isSuperAdmin={isSuperAdmin}
            menuVisible={menuVisible}
            onMenuOpen={setMenuVisible}
            onMenuClose={() => setMenuVisible(null)}
            onDownload={handleDownload}
            onRestore={handleRestore}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No backups found</Text>
            <Text style={styles.emptySubtext}>Create your first backup to get started</Text>
          </View>
        }
      />

      <RestoreDialog
        visible={restoreDialogVisible}
        backup={selectedBackup}
        isPending={restoreBackup.isPending}
        onDismiss={() => setRestoreDialogVisible(false)}
        onConfirm={confirmRestore}
      />
    </View>
  );
};

export default BackupManager;
