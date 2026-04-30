import React from "react";
import { View } from "react-native";
import { Card, Text, Chip, IconButton, Menu } from "react-native-paper";
import { format } from "date-fns/format";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { styles } from "./BackupManager.styles";
import { Backup } from "../../types";

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

interface BackupItemProps {
  item: Backup;
  isSuperAdmin: boolean;
  menuVisible: string | null;
  onMenuOpen: (id: string) => void;
  onMenuClose: () => void;
  onDownload: (backup: Backup) => void;
  onRestore: (backup: Backup) => void;
  onDelete: (backup: Backup) => void;
}

export const BackupItem: React.FC<BackupItemProps> = ({
  item,
  isSuperAdmin,
  menuVisible,
  onMenuOpen,
  onMenuClose,
  onDownload,
  onRestore,
  onDelete,
}) => (
  <Card style={styles.card}>
    <Card.Content>
      <View style={styles.headerRow}>
        <View style={styles.backupInfo}>
          <Text variant="titleMedium" style={styles.backupId}>
            {item.backupId}
          </Text>
          <View style={styles.chipRow}>
            <Chip icon={TYPE_ICONS[item.type] || "backup-restore"} style={styles.chip} compact>
              {item.type}
            </Chip>
            <Chip
              style={[styles.chip, { backgroundColor: STATUS_COLORS[item.status] || "#757575" }]}
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
            onDismiss={onMenuClose}
            anchor={<IconButton icon="dots-vertical" onPress={() => onMenuOpen(item._id)} />}
          >
            <Menu.Item onPress={() => onDownload(item)} title="Download" leadingIcon="download" />
            {item.status === "COMPLETED" && (
              <Menu.Item onPress={() => onRestore(item)} title="Restore" leadingIcon="restore" />
            )}
            <Menu.Item
              onPress={() => onDelete(item)}
              title="Delete"
              leadingIcon="delete"
              titleStyle={{ color: "#F44336" }}
            />
          </Menu>
        )}
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detail}>
          <Text variant="bodySmall" style={styles.detailLabel}>Size</Text>
          <Text variant="bodyMedium">{item.formattedCompressedSize}</Text>
        </View>
        <View style={styles.detail}>
          <Text variant="bodySmall" style={styles.detailLabel}>Compression</Text>
          <Text variant="bodyMedium">{item.storage.compressionRatio}%</Text>
        </View>
        <View style={styles.detail}>
          <Text variant="bodySmall" style={styles.detailLabel}>Collections</Text>
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
