/**
 * ReviewsSectionSkeleton
 * Inline skeleton for the ReviewsSection card on the Profile screen
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { ShimmerBlock } from "@src/shared/ui";

export const ReviewsSectionSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header: "Mes Avis" + rating summary */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <ShimmerBlock width={20} height={20} borderRadius={10} />
          <ShimmerBlock width={100} height={16} borderRadius={4} />
        </View>
        <ShimmerBlock width={40} height={20} borderRadius={10} />
      </View>

      {/* Rating summary */}
      <View style={styles.ratingRow}>
        <View style={styles.starsRow}>
          <ShimmerBlock width={20} height={20} borderRadius={10} />
          <ShimmerBlock width={20} height={20} borderRadius={10} />
          <ShimmerBlock width={20} height={20} borderRadius={10} />
          <ShimmerBlock width={20} height={20} borderRadius={10} />
          <ShimmerBlock width={20} height={20} borderRadius={10} />
        </View>
        <ShimmerBlock width={40} height={20} borderRadius={4} />
        <ShimmerBlock width={60} height={14} borderRadius={4} />
      </View>

      {/* 2 review rows */}
      <View style={styles.reviewRow}>
        <ShimmerBlock width={16} height={16} borderRadius={8} />
        <View style={styles.reviewLines}>
          <ShimmerBlock width="80%" height={12} borderRadius={4} />
          <ShimmerBlock width="60%" height={12} borderRadius={4} />
        </View>
      </View>
      <View style={styles.reviewRow}>
        <ShimmerBlock width={16} height={16} borderRadius={8} />
        <View style={styles.reviewLines}>
          <ShimmerBlock width="70%" height={12} borderRadius={4} />
          <ShimmerBlock width="50%" height={12} borderRadius={4} />
        </View>
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
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  starsRow: {
    flexDirection: "row",
    gap: 2,
  },
  reviewRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12,
  },
  reviewLines: {
    flex: 1,
    gap: 6,
  },
});
