import React from "react";
import { View } from "react-native";
import { Text, IconButton, Menu } from "react-native-paper";
import { format } from "date-fns/format";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Badge } from "@src/shared/ui/Badge";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Backup } from "../../types";
import { createStyles } from "./BackupManager.styles";

const TYPE_LABELS: Record<string, string> = {
  AUTOMATED: "Auto",
  MANUAL: "Manual",
  SCHEDULED: "Scheduled",
};

const getStatusVariant = (status: string): any => {
  switch (status) {
    case "COMPLETED": return "success";
    case "IN_PROGRESS": return "info";
    case "FAILED": return "error";
    case "RESTORING": return "warning";
    case "RESTORED": return "primary";
    default: return "neutral";
  }
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
  item, isSuperAdmin, menuVisible, onMenuOpen, onMenuClose, onDownload, onRestore, onDelete,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={[styles.card, { backgroundColor: colors.background.card }]}>
      <View style={styles.headerRow}>
        <View style={styles.backupInfo}>
          <Text variant="titleSmall" style={styles.backupId}>{item.backupId}</Text>
          <View style={styles.chipRow}>
            <Badge label={TYPE_LABELS[item.type] || item.type} variant="neutral" size="small" />
            <Badge label={item.status} variant={getStatusVariant(item.status)} size="small" />
          </View>
        </View>
        {isSuperAdmin && (
          <Menu visible={menuVisible === item._id} onDismiss={onMenuClose}
            anchor={<IconButton icon="dots-vertical" size={20} onPress={() => onMenuOpen(item._id)} />}>
            <Menu.Item onPress={() => onDownload(item)} title="Download" leadingIcon="download" />
            {item.status === "COMPLETED" && (
              <Menu.Item onPress={() => onRestore(item)} title="Restore" leadingIcon="restore" />
            )}
            <Menu.Item onPress={() => onDelete(item)} title="Delete" leadingIcon="delete" titleStyle={{ color: colors.status.error }} />
          </Menu>
        )}
      </View>

      <View style={styles.detailsRow}>
        {[
          { label: "Size", value: item.formattedCompressedSize },
          { label: "Compression", value: `${item.storage.compressionRatio}%` },
          { label: "Collections", value: String(item.collections.length) },
        ].map((d) => (
          <View key={d.label} style={styles.detail}>
            <Text variant="bodySmall" style={[styles.detailLabel, { color: colors.text.secondary }]}>{d.label}</Text>
            <Text variant="bodyMedium" style={styles.detailValue}>{d.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.dateRow}>
        <Text variant="bodySmall" style={[styles.dateText, { color: colors.text.secondary }]}>
          {format(new Date(item.createdAt), "MMM dd, yyyy HH:mm")}
        </Text>
        {item.metadata.completedAt && (
          <Text variant="bodySmall" style={[styles.dateText, { color: colors.text.secondary }]}>
            {Math.round(item.metadata.durationMs / 1000)}s
          </Text>
        )}
      </View>

      {item.restore.restoredAt && (
        <View style={styles.restoreInfo}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <MaterialCommunityIcons name="restore" size={14} color={colors.primary.main} />
            <Text variant="bodySmall" style={styles.restoreText}>
              Restored {formatDistanceToNow(new Date(item.restore.restoredAt))} ago
              {item.restore.restoredBy && ` by ${item.restore.restoredBy.firstName}`}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
