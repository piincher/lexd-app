import React, { useMemo } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

import { ExportStats } from "../../types";
import { createStyles } from "./ExportStatsCard.styles";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ExportStatsCardProps {
  stats?: ExportStats;
}

export const ExportStatsCard: React.FC<ExportStatsCardProps> = ({ stats }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (!stats) return null;

  return (
    <Card style={styles.statsCard}>
      <Card.Content>
        <Text variant="titleSmall" style={styles.statsTitle}>
          Export Statistics
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={styles.statValue}>
              {stats.total}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Total Exports
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text
              variant="headlineSmall"
              style={[styles.statValue, styles.successValue]}
            >
              {stats.successRate}%
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Success Rate
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text
              variant="headlineSmall"
              style={[styles.statValue, styles.failedValue]}
            >
              {stats.failed}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Failed
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
