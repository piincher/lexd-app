/**
 * DashboardTopCustomers - Top customer leaderboard for the admin dashboard
 * Displays the highest-revenue customers with rank, name, and revenue.
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { formatCurrency } from "@src/shared/lib/currency";
import type { TopCustomer } from "@src/shared/types/adminDashboard";

export interface DashboardTopCustomersProps {
  customers: TopCustomer[];
}

export const DashboardTopCustomers: React.FC<DashboardTopCustomersProps> = ({ customers }) => {
  const { colors } = useAppTheme();
  const topCustomers = customers.slice(0, 5);

  if (topCustomers.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
          Aucun client pour la période
        </Text>
      </View>
    );
  }

  const getRankColor = (index: number) => {
    if (index === 0) return colors.accent.gold;
    if (index === 1) return colors.text.muted;
    if (index === 2) return "#CD7F32";
    return colors.text.secondary;
  };

  return (
    <View style={styles.list}>
      {topCustomers.map((customer, index) => (
        <View key={customer.userId} style={styles.row}>
          <View style={[styles.rank, { borderColor: getRankColor(index) }]}>
            <Text style={[styles.rankText, { color: getRankColor(index) }]}>{index + 1}</Text>
          </View>
          <Text style={[styles.name, { color: colors.text.primary }]} numberOfLines={1}>
            {customer.name}
          </Text>
          <Text style={[styles.revenue, { color: colors.text.secondary }]}>
            {formatCurrency(customer.totalRevenueFCFA)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {},
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  rank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rankText: {
    fontSize: 12,
    fontWeight: "700",
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  revenue: {
    fontSize: 14,
    fontWeight: "700",
  },
  empty: {
    paddingVertical: 16,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
  },
});

export default DashboardTopCustomers;
