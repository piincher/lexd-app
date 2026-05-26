import React from 'react';
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Card } from "@src/shared/ui/Card";
import { ShimmerBlock } from "@src/shared/ui/ShimmerBlock";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { ExportStats } from "../../types";
import { createStyles } from "./ExportStatsCard.styles";

interface ExportStatsCardProps {
  stats?: { data?: ExportStats; isLoading?: boolean };
}

export const ExportStatsCard: React.FC<ExportStatsCardProps> = ({ stats }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  if (stats?.isLoading) {
    return (
      <View style={styles.container}>
        <ShimmerBlock width="100%" height={100} borderRadius={12} />
      </View>
    );
  }

  const data = stats?.data;
  if (!data) return null;

  const statItems = [
    {
      icon: "database-export" as const,
      value: String(data.total),
      label: "Total Exports",
      color: colors.primary.main,
      bgColor: colors.primary.main + "12",
    },
    {
      icon: "check-circle" as const,
      value: `${data.successRate}%`,
      label: "Success Rate",
      color: colors.status.success,
      bgColor: colors.status.success + "12",
    },
    {
      icon: "alert-circle" as const,
      value: String(data.failed),
      label: "Failed",
      color: colors.status.error,
      bgColor: colors.status.error + "12",
    },
  ];

  return (
    <View style={styles.container}>
      <Card variant="elevated" padding="medium">
        <View style={styles.grid}>
          {statItems.map((item, index) => (
            <View key={item.label} style={styles.statCell}>
              <View style={[styles.iconWrap, { backgroundColor: item.bgColor }]}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={20}
                  color={item.color}
                />
              </View>
              <Text style={[styles.value, { color: item.color }]}>
                {item.value}
              </Text>
              <Text style={styles.label}>{item.label}</Text>
              {index < statItems.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
};
