/**
 * BackupManager Component
 * 
 * Manage database backups - list, download, restore, create
 */

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  Text,
  Card,
  Button,
  IconButton,
  Chip,
  ActivityIndicator,
  Menu,
  Dialog,
  Portal,
} from "react-native-paper";
import { format } from "date-fns/format";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

import {
  useListBackups,
  useCreateBackup,
  useRestoreBackup,
  useDownloadBackup,
  useDeleteBackup,
  useTriggerBackup,
  useGetSchedulerStatus,
} from "../hooks/useExport";
import { Backup } from "../types";

interface BackupManagerProps {
  isSuperAdmin?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: "#4CAF50",
  IN_PROGRESS: "#2196F3",
  FAILED: "#F44336",
  RESTORING: "#FF9800",
  RESTORED: "#9C27B0",
};

const TYPE_ICONS: Record<string, string> = {
  AUTOMATED: "clock-outline",
  MANUAL: "hand-back-right-outline",
  SCHEDULED: "calendar-clock",
};

export const BackupManager: React.FC<BackupManagerProps> = ({
  isSuperAdmin = false,
}) => {
  const [page, setPage] = useState(1);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [restoreDialogVisible, setRestoreDialogVisible] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);

  const { data, isLoading, refetch, isRefetching } = useListBackups({
    page,
    limit: 10,
  });
  const schedulerStatus = useGetSchedulerStatus();
  
  const createBackup = useCreateBackup();
  const restoreBackup = useRestoreBackup();
  const downloadBackup = useDownloadBackup();
  const deleteBackup = useDeleteBackup();
  const triggerBackup = useTriggerBackup();

  const backups = data?.data || [];

  const handleCreateBackup = () => {
    Alert.alert(
      "Create Backup",
      "This will create a manual backup of the database. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Create", onPress: () => createBackup.mutate() },
      ]
    );
  };

  const handleRestore = (backup: Backup) => {
    setSelectedBackup(backup);
    setRestoreDialogVisible(true);
    setMenuVisible(null);
  };

  const confirmRestore = () => {
    if (selectedBackup) {
      restoreBackup.mutate(selectedBackup.backupId);
    }
    setRestoreDialogVisible(false);
    setSelectedBackup(null);
  };

  const handleDownload = (backup: Backup) => {
    downloadBackup.mutate(backup.backupId);
    setMenuVisible(null);
  };

  const handleDelete = (backup: Backup) => {
    Alert.alert(
      "Delete Backup",
      `Are you sure you want to delete backup ${backup.backupId}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => deleteBackup.mutate(backup.backupId) 
        },
      ]
    );
    setMenuVisible(null);
  };

  const handleTriggerBackup = () => {
    Alert.alert(
      "Trigger Backup",
      "This will trigger an automated backup immediately. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Trigger", onPress: () => triggerBackup.mutate() },
      ]
    );
  };

  const renderBackupItem = ({ item }: { item: Backup }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.headerRow}>
          <View style={styles.backupInfo}>
            <Text variant="titleMedium" style={styles.backupId}>
              {item.backupId}
            </Text>
            <View style={styles.chipRow}>
              <Chip
                icon={TYPE_ICONS[item.type] || "backup-restore"}
                style={styles.chip}
                compact
              >
                {item.type}
              </Chip>
              <Chip
                style={[
                  styles.chip,
                  { backgroundColor: STATUS_COLORS[item.status] || "#757575" },
                ]}
                textStyle={{ color: "white" }}
                compact
              >
                {item.status}
              </Chip>
            </View>
          </View>
          
          {isSuperAdmin && (
            <Menu
              visible={menuVisible === item._id}
              onDismiss={() => setMenuVisible(null)}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  onPress={() => setMenuVisible(item._id)}
                />
              }
            >
              <Menu.Item
                onPress={() => handleDownload(item)}
                title="Download"
                leadingIcon="download"
              />
              {item.status === "COMPLETED" && (
                <Menu.Item
                  onPress={() => handleRestore(item)}
                  title="Restore"
                  leadingIcon="restore"
                />
              )}
              <Menu.Item
                onPress={() => handleDelete(item)}
                title="Delete"
                leadingIcon="delete"
                titleStyle={{ color: "#F44336" }}
              />
            </Menu>
          )}
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detail}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              Size
            </Text>
            <Text variant="bodyMedium">{item.formattedCompressedSize}</Text>
          </View>
          <View style={styles.detail}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              Compression
            </Text>
            <Text variant="bodyMedium">{item.storage.compressionRatio}%</Text>
          </View>
          <View style={styles.detail}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              Collections
            </Text>
            <Text variant="bodyMedium">{item.collections.length}</Text>
          </View>
        </View>

        <View style={styles.dateRow}>
          <Text variant="bodySmall" style={styles.dateText}>
            Created: {format(new Date(item.createdAt), "MMM dd, yyyy HH:mm")}
          </Text>
          {item.metadata.completedAt && (
            <Text variant="bodySmall" style={styles.dateText}>
              Duration: {Math.round(item.metadata.durationMs / 1000)}s
            </Text>
          )}
        </View>

        {item.restore.restoredAt && (
          <View style={styles.restoreInfo}>
            <Text variant="bodySmall" style={styles.restoreText}>
              Restored: {formatDistanceToNow(new Date(item.restore.restoredAt))} ago
              {item.restore.restoredBy && ` by ${item.restore.restoredBy.firstName}`}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Scheduler Status */}
      {schedulerStatus.data && (
        <Card style={styles.statusCard}>
          <Card.Content>
            <View style={styles.statusRow}>
              <View>
                <Text variant="titleSmall">Automated Backups</Text>
                <Text variant="bodySmall">
                  {schedulerStatus.data.isScheduled ? "Scheduled" : "Not Scheduled"} •{" "}
                  {schedulerStatus.data.config.schedule}
                </Text>
              </View>
              <Chip
                icon={schedulerStatus.data.isRunning ? "sync" : "check-circle"}
                style={[
                  styles.statusChip,
                  { 
                    backgroundColor: schedulerStatus.data.isRunning 
                      ? "#FF9800" 
                      : "#4CAF50" 
                  },
                ]}
                textStyle={{ color: "white" }}
              >
                {schedulerStatus.data.isRunning ? "Running" : "Ready"}
              </Chip>
            </View>
            {schedulerStatus.data.stats && (
              <View style={styles.statsRow}>
                <Text variant="bodySmall">
                  Total: {schedulerStatus.data.stats.totalRuns} •{" "}
                  Success: {schedulerStatus.data.stats.successfulRuns} •{" "}
                  Failed: {schedulerStatus.data.stats.failedRuns}
                </Text>
              </View>
            )}
            {schedulerStatus.data.lastRun && (
              <Text variant="bodySmall" style={styles.lastRunText}>
                Last run: {formatDistanceToNow(new Date(schedulerStatus.data.lastRun))} ago
              </Text>
            )}
          </Card.Content>
        </Card>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <Button
          mode="contained"
          icon="plus"
          onPress={handleCreateBackup}
          loading={createBackup.isPending}
          style={styles.actionButton}
        >
          Create Backup
        </Button>
        {isSuperAdmin && (
          <Button
            mode="outlined"
            icon="play-circle"
            onPress={handleTriggerBackup}
            loading={triggerBackup.isPending}
            style={styles.actionButton}
          >
            Trigger Now
          </Button>
        )}
      </View>

      {/* Backup List */}
      <FlashList
        data={backups as Backup[]}
        renderItem={renderBackupItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text variant="bodyLarge">No backups found</Text>
            <Text variant="bodySmall" style={styles.emptySubtext}>
              Create your first backup to get started
            </Text>
          </View>
        }
      />

      {/* Restore Confirmation Dialog */}
      <Portal>
        <Dialog
          visible={restoreDialogVisible}
          onDismiss={() => setRestoreDialogVisible(false)}
        >
          <Dialog.Icon icon="alert" size={40} color="#F44336" />
          <Dialog.Title style={styles.dialogTitle}>Restore Backup?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              This will restore the database from backup{" "}
              <Text style={styles.bold}>{selectedBackup?.backupId}</Text>.
            </Text>
            <Text variant="bodyMedium" style={styles.warningText}>
              This action will overwrite current data and cannot be undone. Proceed with caution!
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setRestoreDialogVisible(false)}>Cancel</Button>
            <Button 
              onPress={confirmRestore}
              loading={restoreBackup.isPending}
              textColor="#F44336"
            >
              Restore
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusCard: {
    margin: 16,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusChip: {
    height: 32,
  },
  statsRow: {
    marginTop: 8,
  },
  lastRunText: {
    marginTop: 4,
    color: "#757575",
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 8,
  },
  actionButton: {
    flex: 1,
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  backupInfo: {
    flex: 1,
  },
  backupId: {
    fontWeight: "600",
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    height: 28,
  },
  detailsRow: {
    flexDirection: "row",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  detail: {
    flex: 1,
  },
  detailLabel: {
    color: "#757575",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  dateText: {
    color: "#757575",
  },
  restoreInfo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  restoreText: {
    color: "#9C27B0",
    fontStyle: "italic",
  },
  empty: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptySubtext: {
    color: "#757575",
    marginTop: 8,
  },
  dialogTitle: {
    textAlign: "center",
  },
  bold: {
    fontWeight: "700",
  },
  warningText: {
    marginTop: 12,
    color: "#F44336",
  },
});

export default BackupManager;
