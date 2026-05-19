import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Badge } from "@src/shared/ui/Badge";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./BackupManager.styles";

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
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  if (!status) return null;

  const isActive = status.isScheduled && !status.isRunning;

  return (
    <View style={[styles.statusCard, { backgroundColor: colors.background.card }]}>
      <View style={styles.statusRow}>
        <View>
          <Text variant="titleSmall" style={styles.statusLabel}>
            Automated Backups
          </Text>
          <Text variant="bodySmall" style={[styles.statusMeta, { color: colors.text.secondary }]}>
            {status.isScheduled ? status.config.schedule : "Not configured"}
          </Text>
        </View>
        <Badge
          label={status.isRunning ? "Running" : isActive ? "Active" : "Paused"}
          variant={status.isRunning ? "warning" : isActive ? "success" : "neutral"}
          size="small"
        />
      </View>

      {status.stats && (
        <View style={styles.statsRow}>
          <Text variant="bodySmall" style={[styles.statsText, { color: colors.text.secondary }]}>
            {status.stats.totalRuns} runs ·{" "}
            <Text style={{ color: colors.status.success }}>{status.stats.successfulRuns} success</Text>
            {" · "}
            <Text style={{ color: colors.status.error }}>{status.stats.failedRuns} failed</Text>
          </Text>
        </View>
      )}

      {status.lastRun && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 }}>
          <MaterialCommunityIcons name="history" size={14} color={colors.text.secondary} />
          <Text variant="bodySmall" style={[styles.lastRunText, { color: colors.text.secondary }]}>
            Last run {formatDistanceToNow(new Date(status.lastRun))} ago
          </Text>
        </View>
      )}
    </View>
  );
};
