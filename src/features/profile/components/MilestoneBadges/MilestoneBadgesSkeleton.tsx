/**
 * MilestoneBadgesSkeleton
 * Inline skeleton for the MilestoneBadges card on the Profile screen
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { ShimmerBlock } from "@src/shared/ui";

const MilestoneItem: React.FC = () => (
  <View style={styles.itemRow}>
    <ShimmerBlock width={40} height={40} borderRadius={20} />
    <View style={styles.itemLines}>
      <ShimmerBlock width="70%" height={14} borderRadius={4} />
      <ShimmerBlock width="50%" height={12} borderRadius={4} />
    </View>
  </View>
);

export const MilestoneBadgesSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Title row */}
      <View style={styles.titleRow}>
        <ShimmerBlock width={140} height={16} borderRadius={4} />
      </View>

      {/* 4 milestone item placeholders */}
      <MilestoneItem />
      <MilestoneItem />
      <MilestoneItem />
      <MilestoneItem />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titleRow: {
    marginBottom: 14,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  itemLines: {
    flex: 1,
    gap: 6,
  },
});
