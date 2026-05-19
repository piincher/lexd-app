import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { STATUS_CONFIG } from "../../lib/constants";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from './StatGrid.styles';

interface StatItemProps {
  label: string;
  value: string;
  color: string;
  icon: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, color, icon }) => (
  <View style={styles.card}>
    <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
      <Ionicons name={icon as any} size={22} color={color} />
    </View>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

interface StatGridProps {
  total: number;
  active: number;
  inTransit: number;
  delivered: number;
  totalCBM: number;
  totalPrice: number;
}

export const StatGrid: React.FC<StatGridProps> = ({
  total,
  active,
  inTransit,
  delivered,
  totalCBM,
  totalPrice,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.container}>
      <StatItem label="Total" value={total.toString()} color={colors.primary.main} icon="analytics" />
      <StatItem label="Chargé" value={active.toString()} color={STATUS_CONFIG.Active.color} icon="cube" />
      <StatItem label="Transit" value={inTransit.toString()} color={STATUS_CONFIG["In Transit"].color} icon="airplane" />
      <StatItem label="CBM Total" value={totalCBM.toFixed(2)} color={colors.primary.dark} icon="key" />
      <StatItem label="Prix Total" value={`${totalPrice.toFixed(0)} FCFA`} color={colors.status.success} icon="pricetag" />
      <StatItem label="Livré" value={delivered.toString()} color={colors.status.success} icon="checkmark-circle" />
    </View>
  );
}
