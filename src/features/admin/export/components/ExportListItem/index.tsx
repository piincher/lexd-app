import React from "react";
import { View } from "react-native";
import { Card, Text, Chip, IconButton, Divider } from "react-native-paper";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

import { ExportLog } from "../../types";
import { ENTITY_CONFIG, FORMAT_ICONS, STATUS_COLORS } from "../../constants";
import { styles } from "./ExportListItem.styles";

interface ExportListItemProps {
  item: ExportLog;
  onDownload: (exportLog: ExportLog) => void;
  isDownloading: boolean;
}

export const ExportListItem: React.FC<ExportListItemProps> = ({
  item,
  onDownload,
  isDownloading,
}) => {
  return (
    <Card style={styles.exportCard}>
      <Card.Content>
        <View style={styles.exportHeader}>
          <View style={styles.exportInfo}>
            <Text variant="titleMedium" style={styles.exportId}>
              {item.exportId}
            </Text>
            <View style={styles.chipRow}>
              <Chip
                icon={ENTITY_CONFIG[item.entity]?.icon || "file-export"}
                style={styles.chip}
                compact
              >
                {ENTITY_CONFIG[item.entity]?.label || item.entity}
              </Chip>
              <Chip
                icon={FORMAT_ICONS[item.format] || "file"}
                style={styles.chip}
                compact
              >
                {item.format}
              </Chip>
              <Chip
                style={[
                  styles.statusChip,
                  {
                    backgroundColor:
                      STATUS_COLORS[item.metadata.status] || "#757575",
                  },
                ]}
                textStyle={styles.statusChipText}
                compact
              >
                {item.metadata.status}
              </Chip>
            </View>
          </View>

          {item.metadata.status === "COMPLETED" && (
            <IconButton
              icon="download"
              onPress={() => onDownload(item)}
              loading={isDownloading}
            />
          )}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.exportDetails}>
          <View style={styles.detail}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              Records
            </Text>
            <Text variant="bodyMedium">
              {item.metadata.recordCount.toLocaleString()}
            </Text>
          </View>
          <View style={styles.detail}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              File Size
            </Text>
            <Text variant="bodyMedium">{item.formattedFileSize}</Text>
          </View>
          <View style={styles.detail}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              Duration
            </Text>
            <Text variant="bodyMedium">
              {Math.round(item.metadata.durationMs / 1000)}s
            </Text>
          </View>
        </View>

        <View style={styles.exportFooter}>
          <Text variant="bodySmall" style={styles.dateText}>
            {formatDistanceToNow(new Date(item.createdAt))} ago
          </Text>
          <Text variant="bodySmall" style={styles.userText}>
            by {item.exportedBy.firstName} {item.exportedBy.lastName}
          </Text>
        </View>

        {item.scheduled?.isScheduled && (
          <View style={styles.scheduledBadge}>
            <Chip icon="calendar-clock" compact>
              {item.scheduled.frequency}
            </Chip>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};
