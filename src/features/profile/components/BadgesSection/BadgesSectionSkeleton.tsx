/**
 * BadgesSectionSkeleton
 * Inline skeleton for the BadgesSection card on the Profile screen
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { ShimmerBlock } from "@src/shared/ui";

export const BadgesSectionSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <ShimmerBlock width={20} height={20} borderRadius={10} />
          <ShimmerBlock width={120} height={16} borderRadius={4} />
        </View>
        <ShimmerBlock width={20} height={20} borderRadius={10} />
      </View>

      {/* Horizontal row of 4 circular badge placeholders */}
      <View style={styles.badgesRow}>
        <ShimmerBlock width={48} height={48} borderRadius={24} />
        <ShimmerBlock width={48} height={48} borderRadius={24} />
        <ShimmerBlock width={48} height={48} borderRadius={24} />
        <ShimmerBlock width={48} height={48} borderRadius={24} />
      </View>

      {/* "Voir tous les badges" text placeholder */}
      <View style={styles.viewAllRow}>
        <ShimmerBlock width={140} height={13} borderRadius={4} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badgesRow: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 4,
  },
  viewAllRow: {
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 6,
  },
});
