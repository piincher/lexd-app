/**
 * DashboardKPIOverview - High-level KPI grid for the admin mission control view
 * Displays revenue, payments, customers, and in-transit goods at a glance.
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { formatCurrency } from "@src/shared/lib/currency";
import type { KPIData, OutstandingSummary } from "@src/shared/types/adminDashboard";

export interface DashboardKPIOverviewProps {
  kpis: KPIData;
  outstanding?: OutstandingSummary;
}

interface KPIItem {
  label: string;
  value: string;
  accent?: "success" | "warning" | "danger";
}

export const DashboardKPIOverview: React.FC<DashboardKPIOverviewProps> = ({
  kpis,
  outstanding,
}) => {
  const { colors } = useAppTheme();

  const items: KPIItem[] = [
    { label: "CA aujourd'hui", value: formatCurrency(kpis.todayRevenueFCFA), accent: "success" },
    { label: "Cette semaine", value: formatCurrency(kpis.thisWeekRevenueFCFA) },
    { label: "Ce mois", value: formatCurrency(kpis.thisMonthRevenueFCFA) },
    {
      label: "Impayés",
      value: outstanding ? formatCurrency(outstanding.totalFCFA) : formatCurrency(0),
      accent: "danger",
    },
    { label: "Paiements en attente", value: kpis.pendingPayments.toString(), accent: "warning" },
    { label: "Nouveaux clients", value: kpis.newCustomersThisMonth.toString() },
    { label: "Marchandises en transit", value: kpis.goodsInTransit.toString() },
    { label: "Conteneurs actifs", value: kpis.activeContainers.toString() },
  ];

  const getAccentColor = (accent?: KPIItem["accent"]) => {
    switch (accent) {
      case "success":
        return colors.status.success;
      case "warning":
        return colors.status.warning;
      case "danger":
        return colors.status.error;
      default:
        return colors.primary.main;
    }
  };

  return (
    <View style={styles.grid}>
      {items.map((item) => (
        <View key={item.label} style={[styles.tile, { backgroundColor: colors.background.paper }]}>
          <View style={[styles.dot, { backgroundColor: getAccentColor(item.accent) }]} />
          <Text style={[styles.value, { color: colors.text.primary }]}>{item.value}</Text>
          <Text style={[styles.label, { color: colors.text.secondary }]}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tile: {
    width: "48%",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default DashboardKPIOverview;
