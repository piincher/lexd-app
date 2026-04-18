/**
 * BadgesScreenSkeleton
 * Full-screen skeleton for the BadgesScreen with dark gradient background
 */

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ShimmerBlock } from "@src/shared/ui";

const SKELETON_BG = "rgba(255,255,255,0.1)";

const BadgeCardSkeleton: React.FC = () => (
  <View style={styles.badgeCard}>
    <ShimmerBlock
      width={56}
      height={56}
      borderRadius={28}
      style={{ backgroundColor: SKELETON_BG }}
    />
    <ShimmerBlock
      width="80%"
      height={14}
      borderRadius={4}
      style={{ marginTop: 10, backgroundColor: SKELETON_BG }}
    />
    <ShimmerBlock
      width="90%"
      height={22}
      borderRadius={4}
      style={{ marginTop: 4, backgroundColor: SKELETON_BG }}
    />
    <View style={styles.progressSection}>
      <ShimmerBlock
        width="100%"
        height={5}
        borderRadius={2.5}
        style={{ backgroundColor: SKELETON_BG }}
      />
      <ShimmerBlock
        width={80}
        height={10}
        borderRadius={4}
        style={{ marginTop: 4, backgroundColor: SKELETON_BG }}
      />
    </View>
  </View>
);

const CategorySectionSkeleton: React.FC = () => (
  <View style={styles.categorySection}>
    {/* Category header */}
    <View style={styles.categoryHeader}>
      <ShimmerBlock
        width={20}
        height={20}
        borderRadius={10}
        style={{ backgroundColor: SKELETON_BG }}
      />
      <ShimmerBlock
        width={100}
        height={16}
        borderRadius={4}
        style={{ backgroundColor: SKELETON_BG }}
      />
      <View style={styles.categoryLine} />
    </View>

    {/* 2x2 grid of badge cards */}
    <View style={styles.badgeGrid}>
      <BadgeCardSkeleton />
      <BadgeCardSkeleton />
      <BadgeCardSkeleton />
      <BadgeCardSkeleton />
    </View>
  </View>
);

export const BadgesScreenSkeleton: React.FC = () => {
  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <ShimmerBlock
          width={40}
          height={40}
          borderRadius={20}
          style={{ backgroundColor: SKELETON_BG }}
        />
        <ShimmerBlock
          width={140}
          height={18}
          borderRadius={4}
          style={{ backgroundColor: SKELETON_BG }}
        />
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
          {/* Summary card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              {[0, 1, 2].map((i) => (
                <View key={i} style={styles.summaryItem}>
                  <ShimmerBlock
                    width={24}
                    height={24}
                    borderRadius={12}
                    style={{ backgroundColor: SKELETON_BG }}
                  />
                  <ShimmerBlock
                    width={40}
                    height={22}
                    borderRadius={4}
                    style={{ marginTop: 6, backgroundColor: SKELETON_BG }}
                  />
                  <ShimmerBlock
                    width={80}
                    height={11}
                    borderRadius={4}
                    style={{ marginTop: 2, backgroundColor: SKELETON_BG }}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* 3 category sections */}
          <CategorySectionSkeleton />
          <CategorySectionSkeleton />
          <CategorySectionSkeleton />

          <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  summaryCard: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(212,168,67,0.15)",
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  categoryLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginLeft: 8,
  },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  badgeCard: {
    width: "47%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    minHeight: 170,
  },
  progressSection: {
    width: "100%",
    marginTop: "auto",
  },
});
