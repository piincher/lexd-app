/**
 * DashboardWarehouseSnapshot - Warehouse capacity and flow snapshot
 * Shows goods in warehouse, in transit, active containers, and pending actions.
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { formatAmount } from "@src/shared/lib/currency";

export interface DashboardWarehouseSnapshotProps {
  totalGoods: number;
  pendingContainers: number;
  activeContainers: number;
  goodsInTransit: number;
  pendingPayments: number;
}

interface SnapshotRow {
  label: string;
  value: number;
  color: string;
  max?: number;
}

export const DashboardWarehouseSnapshot: React.FC<DashboardWarehouseSnapshotProps> = ({
  totalGoods,
  pendingContainers,
  activeContainers,
  goodsInTransit,
  pendingPayments,
}) => {
  const { colors } = useAppTheme();

  const maxUnits = Math.max(1, totalGoods + goodsInTransit);

  const rows: SnapshotRow[] = [
    { label: "En entrepôt", value: totalGoods, color: colors.status.success, max: maxUnits },
    { label: "En transit", value: goodsInTransit, color: colors.status.info, max: maxUnits },
    { label: "Conteneurs actifs", value: activeContainers, color: colors.status.warning },
    { label: "Conteneurs en attente", value: pendingContainers, color: colors.accent.gold },
    { label: "Paiements en attente", value: pendingPayments, color: colors.status.error },
  ];

  return (
    <View style={styles.container}>
      {rows.map((row) => {
        const pct = row.max ? Math.min(100, (row.value / row.max) * 100) : 0;
        return (
          <View key={row.label} style={styles.row}>
            <View style={styles.headerRow}>
              <Text style={[styles.label, { color: colors.text.secondary }]}>{row.label}</Text>
              <Text style={[styles.value, { color: colors.text.primary }]}>
                {formatAmount(row.value)}
              </Text>
            </View>
            <View style={[styles.track, { backgroundColor: colors.background.paper }]}>
              <View
                style={[
                  styles.bar,
                  {
                    width: `${pct}%`,
                    backgroundColor: row.color,
                  },
                ]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
  row: {
    marginBottom: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
  },
  value: {
    fontSize: 13,
    fontWeight: "700",
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 4,
    minWidth: 4,
  },
});

export default DashboardWarehouseSnapshot;
