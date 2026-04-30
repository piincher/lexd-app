import React from "react";
import { View } from "react-native";
import { Card, Text, Chip } from "react-native-paper";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { styles } from "./BackupManager.styles";

interface SchedulerStatus {
  isScheduled: boolean;
  isRunning: boolean;
  config: { schedule: string };
  stats?: { totalRuns: number; successfulRuns: number; failedRuns: number };
  lastRun?: string;
}

interface SchedulerStatusCardProps {
  status: SchedulerStatus | undefined;
}

export const SchedulerStatusCard: React.FC<SchedulerStatusCardProps> = ({ status }) => {
  if (!status) return null;

  return (
    <Card style={styles.statusCard}>
      <Card.Content>
        <View style={styles.statusRow}>
          <View>
            <Text variant="titleSmall">Automated Backups</Text>
            <Text variant="bodySmall">
              {status.isScheduled ? "Scheduled" : "Not Scheduled"} • {status.config.schedule}
            </Text>
          </View>
          <Chip
            icon={status.isRunning ? "sync" : "check-circle"}
            style={[styles.statusChip, { backgroundColor: status.isRunning ? "#FF9800" : "#4CAF50" }]}
            textStyle={{ color: "white" }}
          >
            {status.isRunning ? "Running" : "Ready"}
          </Chip>
        </View>
        {status.stats && (
          <View style={styles.statsRow}>
            <Text variant="bodySmall">
              Total: {status.stats.totalRuns} • Success: {status.stats.successfulRuns} • Failed:{" "}
              {status.stats.failedRuns}
            </Text>
          </View>
        )}
        {status.lastRun && (
          <Text variant="bodySmall" style={styles.lastRunText}>
            Last run: {formatDistanceToNow(new Date(status.lastRun))} ago
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};
