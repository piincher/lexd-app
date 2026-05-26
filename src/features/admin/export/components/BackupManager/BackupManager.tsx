import React from "react";
import { View, RefreshControl, ScrollView } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";

import { EmptyState } from "@src/shared/ui/EmptyState";
import { Backup } from "../../types";
import { BackupItem } from "./BackupItem";
import { RestoreDialog } from "./RestoreDialog";
import { SchedulerStatusCard } from "./SchedulerStatusCard";
import { useBackupManager } from "../../hooks/useBackupManager";
import { createStyles } from "./BackupManager.styles";

interface BackupManagerProps {
  isSuperAdmin?: boolean;
}

export const BackupManager: React.FC<BackupManagerProps> = ({ isSuperAdmin = false }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const {
    backups,
    isLoading,
    isRefetching,
    refetch,
    schedulerStatus,
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
    menuVisible,
    setMenuVisible,
  } = useBackupManager(isSuperAdmin);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      >
        <SchedulerStatusCard status={schedulerStatus} />

        <View style={styles.actions}>
          <Button
            mode="contained"
            icon="plus"
            onPress={handleCreateBackup}
            loading={createMutation.isPending}
            style={styles.actionButton}
          >
            Create Backup
          </Button>
          {isSuperAdmin && (
            <Button
              mode="outlined"
              icon="play-circle"
              onPress={handleTriggerBackup}
              loading={triggerMutation.isPending}
              style={styles.actionButton}
            >
              Trigger Now
            </Button>
          )}
        </View>

        {backups.length === 0 ? (
          <EmptyState
            icon="cloud-upload-outline"
            title="No backups found"
            message="Create your first backup to protect your data"
            actionLabel="Create Backup"
            onAction={handleCreateBackup}
          />
        ) : (
          <View style={styles.list}>
            {(backups as Backup[]).map((item) => (
              <BackupItem
                key={item._id}
                item={item}
                isSuperAdmin={isSuperAdmin}
                menuVisible={menuVisible}
                onMenuOpen={setMenuVisible}
                onMenuClose={() => setMenuVisible(null)}
                onDownload={handleDownload}
                onRestore={handleRestore}
                onDelete={handleDelete}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <RestoreDialog
        visible={restoreDialogVisible}
        backup={selectedBackup}
        isPending={restoreMutation.isPending}
        onDismiss={() => setRestoreDialogVisible(false)}
        onConfirm={confirmRestore}
      />
    </View>
  );
};

export default BackupManager;
