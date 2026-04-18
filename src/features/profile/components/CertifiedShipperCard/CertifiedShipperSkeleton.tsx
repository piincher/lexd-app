/**
 * CertifiedShipperSkeleton
 * Inline skeleton for the CertifiedShipperCard on the Profile screen
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { ShimmerBlock } from "@src/shared/ui";

export const CertifiedShipperSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Icon + title row */}
      <View style={styles.titleRow}>
        <ShimmerBlock width={22} height={22} borderRadius={11} />
        <ShimmerBlock width={160} height={16} borderRadius={4} />
      </View>

      {/* Progress bar placeholder */}
      <ShimmerBlock width="100%" height={8} borderRadius={4} />

      {/* "X% complété" text placeholder */}
      <View style={styles.progressInfo}>
        <ShimmerBlock width={100} height={13} borderRadius={4} />
        <ShimmerBlock width={40} height={13} borderRadius={4} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
