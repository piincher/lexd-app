/**
 * UnassignedGoodsLoadingState - Loading state for unassigned goods screen
 * SRP: Display loading skeleton while fetching data
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Theme, lightTheme } from "@src/constants/Theme";

const SkeletonItem: React.FC = () => (
  <View style={styles.skeletonCard}>
    <View style={styles.skeletonImage} />
    <View style={styles.skeletonContent}>
      <View style={styles.skeletonLine} />
      <View style={[styles.skeletonLine, { width: "60%" }]} />
    </View>
  </View>
);

export const UnassignedGoodsLoadingState: React.FC = () => {
  return (
    <LinearGradient colors={["#F8F7FC", "#EDE9FE"]} style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.headerSkeleton}>
        <View style={styles.headerTop}>
          <View style={styles.backButtonSkeleton} />
          <View style={styles.titleSkeleton} />
          <View style={styles.assignButtonSkeleton} />
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCard} />
          <View style={styles.statCard} />
        </View>
      </View>

      {/* List Skeleton */}
      <View style={styles.listContainer}>
        <View style={styles.sectionHeader} />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSkeleton: {
    padding: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Theme.spacing.lg,
  },
  backButtonSkeleton: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    backgroundColor: lightTheme.colors.neutral[200],
  },
  titleSkeleton: {
    width: 150,
    height: 20,
    borderRadius: Theme.radius.sm,
    backgroundColor: lightTheme.colors.neutral[200],
  },
  assignButtonSkeleton: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    backgroundColor: lightTheme.colors.neutral[200],
  },
  statsRow: {
    flexDirection: "row",
    gap: Theme.spacing.md,
  },
  statCard: {
    flex: 1,
    height: 70,
    borderRadius: Theme.radius.xl,
    backgroundColor: lightTheme.colors.neutral[200],
  },
  listContainer: {
    padding: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  sectionHeader: {
    width: 120,
    height: 20,
    borderRadius: Theme.radius.sm,
    backgroundColor: lightTheme.colors.neutral[200],
    marginBottom: Theme.spacing.sm,
  },
  skeletonCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: lightTheme.colors.neutral.white,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  skeletonImage: {
    width: 56,
    height: 56,
    borderRadius: Theme.radius.lg,
    backgroundColor: lightTheme.colors.neutral[200],
    marginRight: Theme.spacing.md,
  },
  skeletonContent: {
    flex: 1,
    gap: 8,
  },
  skeletonLine: {
    height: 14,
    borderRadius: Theme.radius.sm,
    backgroundColor: lightTheme.colors.neutral[200],
  },
});
