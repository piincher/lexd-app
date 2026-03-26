/**
 * UnassignedGoodsHeader - Header component for unassigned goods screen
 * SRP: Display header stats and filter controls
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Theme, lightTheme } from "@src/constants/Theme";
import { ShippingMode } from "@src/features/admin/containers/types";

interface UnassignedGoodsHeaderProps {
  totalCount: number;
  oldestDays: number;
  filterMode: ShippingMode | undefined;
  onFilterChange: (mode: ShippingMode | undefined) => void;
  onAssignPress: () => void;
  onBack: () => void;
}

export const UnassignedGoodsHeader: React.FC<UnassignedGoodsHeaderProps> = ({
  totalCount,
  oldestDays,
  filterMode,
  onFilterChange,
  onAssignPress,
  onBack,
}) => {
  return (
    <LinearGradient colors={Theme.gradients.glass} style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Theme.neutral[700]} />
        </TouchableOpacity>
        <Text style={styles.title}>Unassigned Goods</Text>
        <TouchableOpacity onPress={onAssignPress} style={styles.assignButton}>
          <Ionicons name="add-circle" size={24} color={Theme.primary[500]} />
        </TouchableOpacity>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <LinearGradient colors={Theme.gradients.primary} style={styles.statIconContainer}>
            <Ionicons name="cube" size={20} color="#FFF" />
          </LinearGradient>
          <View>
            <Text style={styles.statValue}>{totalCount}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <LinearGradient colors={['#D4AF37', '#F4D03F']} style={styles.statIconContainer}>
            <Ionicons name="time" size={20} color="#FFF" />
          </LinearGradient>
          <View>
            <Text style={styles.statValue}>{oldestDays}d</Text>
            <Text style={styles.statLabel}>Oldest</Text>
          </View>
        </View>
      </View>

      {/* Filter Pills */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterPill, filterMode === undefined && styles.filterPillActive]}
          onPress={() => onFilterChange(undefined)}
        >
          <Text style={[styles.filterText, filterMode === undefined && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterPill, filterMode === "AIR" && styles.filterPillActive]}
          onPress={() => onFilterChange("AIR")}
        >
          <Ionicons name="airplane" size={14} color={filterMode === "AIR" ? "#FFF" : Theme.neutral[500]} />
          <Text style={[styles.filterText, filterMode === "AIR" && styles.filterTextActive]}>
            Air
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterPill, filterMode === "SEA" && styles.filterPillActive]}
          onPress={() => onFilterChange("SEA")}
        >
          <Ionicons name="boat" size={14} color={filterMode === "SEA" ? "#FFF" : Theme.neutral[500]} />
          <Text style={[styles.filterText, filterMode === "SEA" && styles.filterTextActive]}>
            Sea
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.radius["3xl"],
    borderBottomRightRadius: Theme.radius["3xl"],
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Theme.spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.neutral.white,
    justifyContent: "center",
    alignItems: "center",
    ...Theme.shadows.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Theme.neutral[800],
  },
  assignButton: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.neutral.white,
    justifyContent: "center",
    alignItems: "center",
    ...Theme.shadows.sm,
  },
  statsRow: {
    flexDirection: "row",
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Theme.spacing.md,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: Theme.neutral[800],
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: Theme.neutral[400],
    marginTop: 2,
  },
  filterRow: {
    flexDirection: "row",
    gap: Theme.spacing.sm,
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.neutral.white,
    ...Theme.shadows.sm,
  },
  filterPillActive: {
    backgroundColor: Theme.primary[500],
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.neutral[600],
  },
  filterTextActive: {
    color: "#FFF",
  },
});
