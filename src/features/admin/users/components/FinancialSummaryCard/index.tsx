import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface FinancialSummaryCardProps {
  totalRevenue: number;
  totalCBM: number;
  orderCount: number;
  avgOrderValue: number;
}

const StatItem: React.FC<{ icon: string; label: string; value: string; color: string }> = ({
  icon, label, value, color,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.statItem}>
      <View style={[styles.statIcon, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.text.secondary }]}>{label}</Text>
    </View>
  );
};

export const FinancialSummaryCard: React.FC<FinancialSummaryCardProps> = ({
  totalRevenue, totalCBM, orderCount, avgOrderValue,
}) => {
  const { colors } = useAppTheme();

  return (
    <Animated.View entering={FadeInUp.delay(500)} style={[styles.card, { backgroundColor: colors.background.card }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Résumé Financier</Text>
      <View style={styles.grid}>
        <StatItem icon="cash-outline" label="Revenu Total" value={`${totalRevenue.toFixed(0)} FCFA`} color={colors.status.success} />
        <StatItem icon="cube-outline" label="CBM Total" value={`${totalCBM.toFixed(2)}`} color={colors.primary.main} />
        <StatItem icon="receipt-outline" label="Commandes" value={String(orderCount)} color={colors.status.info} />
        <StatItem icon="trending-up-outline" label="Panier Moyen" value={`${avgOrderValue.toFixed(0)} FCFA`} color={colors.status.warning} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  statItem: {
    width: "47%",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
});
