import React from 'react';
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";
import { createStyles } from "../Stats.styles";

interface QuickStatsProps {
  totalShipments: number;
  statusCounts: {
    Active: number;
    "In Transit": number;
    Delivered: number;
  };
}

interface StatCardProps {
  label: string;
  value: string;
  color: string;
}

export const QuickStats: React.FC<QuickStatsProps> = ({
  totalShipments,
  statusCounts,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => (
    <View style={styles.statItem}>
      <Text style={[styles.statLabel, { color }]}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );

  return (
    <Card style={[styles.statsCard, { backgroundColor: colors.background.paper }]}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
        Statistiques
      </Text>
      <View style={styles.statsRow}>
        <StatCard
          label="Total des expéditions"
          value={totalShipments.toString()}
          color={colors.primary.main}
        />
        <StatCard
          label="Chargé"
          value={statusCounts.Active.toString()}
          color={colors.status.warning}
        />
        <StatCard
          label="In Transit"
          value={statusCounts["In Transit"].toString()}
          color={colors.status.success}
        />
        <StatCard
          label="Livré"
          value={statusCounts.Delivered.toString()}
          color={colors.status.error}
        />
      </View>
    </Card>
  );
};

export default QuickStats;
