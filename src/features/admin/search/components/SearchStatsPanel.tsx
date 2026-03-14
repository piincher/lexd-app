/**
 * SearchStatsPanel - Statistics display for search results
 * Shows total count, CBM, value, balance stats
 */

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { Theme } from "@src/constants/Theme";

interface SearchStats {
  count?: number;
  totalCBM?: number;
  totalValue?: number;
  totalBalance?: number;
}

interface SearchStatsPanelProps {
  stats: SearchStats | undefined;
}

export const SearchStatsPanel: React.FC<SearchStatsPanelProps> = ({ stats }) => {
  if (!stats) return null;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {stats.count !== undefined && (
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.count}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        )}
        {stats.totalCBM !== undefined && (
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalCBM.toFixed(2)}</Text>
            <Text style={styles.statLabel}>CBM Total</Text>
          </View>
        )}
        {stats.totalValue !== undefined && (
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {(stats.totalValue / 1000000).toFixed(1)}M
            </Text>
            <Text style={styles.statLabel}>Valeur (FCFA)</Text>
          </View>
        )}
        {stats.totalBalance !== undefined && (
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {(stats.totalBalance / 1000000).toFixed(1)}M
            </Text>
            <Text style={styles.statLabel}>Solde Total</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
  },
  statItem: {
    alignItems: "center",
    marginRight: Theme.spacing.xl,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: Theme.neutral[800],
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: Theme.neutral[500],
    marginTop: 2,
  },
});
