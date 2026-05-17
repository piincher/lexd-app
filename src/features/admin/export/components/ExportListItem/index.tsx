import React from "react";
import { View, Pressable } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Badge } from "@src/shared/ui/Badge";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { ExportLog } from "../../types";
import { ENTITY_CONFIG, FORMAT_ICONS } from "../../constants";
import { styles } from "./ExportListItem.styles";

interface ExportListItemProps {
  item: ExportLog;
  onDownload: (exportLog: ExportLog) => void;
  isDownloading: boolean;
}

const getStatusVariant = (status: string): any => {
  switch (status) {
    case "COMPLETED": return "success";
    case "PENDING": return "warning";
    case "PROCESSING": return "info";
    case "FAILED": return "error";
    default: return "neutral";
  }
};

export const ExportListItem: React.FC<ExportListItemProps> = ({
  item,
  onDownload,
  isDownloading,
}) => {
  const { colors } = useAppTheme();
  const entityConfig = ENTITY_CONFIG[item.entity];
  const statusVariant = getStatusVariant(item.metadata.status);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.background.card,
          shadowColor: colors.neutral[900],
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.entityBadge}>
          <MaterialCommunityIcons
            name={(entityConfig?.icon || "file-export") as any}
            size={16}
            color={entityConfig?.color || colors.text.secondary}
          />
        </View>

        <View style={styles.info}>
          <Text variant="titleSmall" style={styles.exportId}>
            {item.exportId}
          </Text>
          <View style={styles.metaRow}>
            <Badge
              label={entityConfig?.label || item.entity}
              variant="neutral"
              size="small"
            />
            <Badge
              label={item.format}
              variant="info"
              size="small"
            />
            <Badge
              label={item.metadata.status}
              variant={statusVariant}
              size="small"
            />
          </View>
        </View>

        {item.metadata.status === "COMPLETED" && (
          <IconButton
            icon="download"
            size={20}
            onPress={() => onDownload(item)}
            loading={isDownloading}
            style={styles.downloadBtn}
          />
        )}
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={styles.detailsRow}>
        <View style={styles.detail}>
          <Text variant="bodySmall" style={[styles.detailLabel, { color: colors.text.secondary }]}>
            Records
          </Text>
          <Text variant="bodyMedium" style={styles.detailValue}>
            {item.metadata.recordCount.toLocaleString()}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text variant="bodySmall" style={[styles.detailLabel, { color: colors.text.secondary }]}>
            Size
          </Text>
          <Text variant="bodyMedium" style={styles.detailValue}>
            {item.formattedFileSize}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text variant="bodySmall" style={[styles.detailLabel, { color: colors.text.secondary }]}>
            Duration
          </Text>
          <Text variant="bodyMedium" style={styles.detailValue}>
            {Math.round(item.metadata.durationMs / 1000)}s
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text variant="bodySmall" style={{ color: colors.text.secondary }}>
          {formatDistanceToNow(new Date(item.createdAt))} ago
        </Text>
        <Text variant="bodySmall" style={{ color: colors.text.secondary }}>
          by {item.exportedBy.firstName} {item.exportedBy.lastName}
        </Text>
      </View>

      {item.scheduled?.isScheduled && (
        <View style={styles.scheduledBadge}>
          <MaterialCommunityIcons name="calendar-clock" size={12} color={colors.primary.main} />
          <Text variant="bodySmall" style={[styles.scheduledText, { color: colors.primary.main }]}>
            {item.scheduled.frequency}
          </Text>
        </View>
      )}
    </View>
  );
};
