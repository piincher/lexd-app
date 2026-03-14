import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import styles from "../Stats.styles";

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

const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => (
  <View style={styles.statItem}>
    <Text style={[styles.statLabel, { color }]}>{label}</Text>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
  </View>
);

export const QuickStats: React.FC<QuickStatsProps> = ({
  totalShipments,
  statusCounts,
}) => {
  return (
    <Card style={[styles.statsCard, { backgroundColor: COLORS.Silver }]}>
      <Text style={[styles.sectionTitle, { color: COLORS.black }]}>
        Statistiques
      </Text>
      <View style={styles.statsRow}>
        <StatCard
          label="Total des expéditions"
          value={totalShipments.toString()}
          color={COLORS.blue}
        />
        <StatCard
          label="Chargé"
          value={statusCounts.Active.toString()}
          color={COLORS.orange}
        />
        <StatCard
          label="In Transit"
          value={statusCounts["In Transit"].toString()}
          color={COLORS.green}
        />
        <StatCard
          label="Livré"
          value={statusCounts.Delivered.toString()}
          color={COLORS.redShade}
        />
      </View>
    </Card>
  );
};

export default QuickStats;
