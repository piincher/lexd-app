/**
 * BadgesScreenSkeleton
 * Full-screen skeleton for the BadgesScreen with dark gradient background
 */

import React, { useMemo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ShimmerBlock } from "@src/shared/ui";
import { useAppTheme } from '@src/providers/ThemeProvider';

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

const BadgeCardSkeleton: React.FC<{ skeletonBg: string }> = ({ skeletonBg }) => (
  <View style={styles.badgeCard}>
    <ShimmerBlock
      width={56}
      height={56}
      borderRadius={28}
      style={{ backgroundColor: skeletonBg }}
    />
    <ShimmerBlock
      width="80%"
      height={14}
      borderRadius={4}
      style={{ marginTop: 10, backgroundColor: skeletonBg }}
    />
    <ShimmerBlock
      width="90%"
      height={22}
      borderRadius={4}
      style={{ marginTop: 4, backgroundColor: skeletonBg }}
    />
    <View style={styles.progressSection}>
      <ShimmerBlock
        width="100%"
        height={5}
        borderRadius={2.5}
        style={{ backgroundColor: skeletonBg }}
      />
      <ShimmerBlock
        width={80}
        height={10}
        borderRadius={4}
        style={{ marginTop: 4, backgroundColor: skeletonBg }}
      />
    </View>
  </View>
);

const CategorySectionSkeleton: React.FC<{ skeletonBg: string }> = ({ skeletonBg }) => (
  <View style={styles.categorySection}>
    {/* Category header */}
    <View style={styles.categoryHeader}>
      <ShimmerBlock
        width={20}
        height={20}
        borderRadius={10}
        style={{ backgroundColor: skeletonBg }}
      />
      <ShimmerBlock
        width={100}
        height={16}
        borderRadius={4}
        style={{ backgroundColor: skeletonBg }}
      />
      <View style={styles.categoryLine} />
    </View>

    {/* 2x2 grid of badge cards */}
    <View style={styles.badgeGrid}>
      <BadgeCardSkeleton skeletonBg={skeletonBg} />
      <BadgeCardSkeleton skeletonBg={skeletonBg} />
      <BadgeCardSkeleton skeletonBg={skeletonBg} />
      <BadgeCardSkeleton skeletonBg={skeletonBg} />
    </View>
  </View>
);

export const BadgesScreenSkeleton: React.FC = () => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          backgroundColor: hexToRgba(colors.text.inverse, 0.07),
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: hexToRgba(colors.accent.gold, 0.15),
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
          backgroundColor: hexToRgba(colors.text.inverse, 0.1),
          marginLeft: 8,
        },
        badgeGrid: {
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 12,
        },
        badgeCard: {
          width: "47%",
          backgroundColor: hexToRgba(colors.text.inverse, 0.05),
          borderRadius: 14,
          padding: 14,
          alignItems: "center",
          borderWidth: 1,
          borderColor: hexToRgba(colors.text.inverse, 0.08),
          minHeight: 170,
        },
        progressSection: {
          width: "100%",
          marginTop: "auto",
        },
      }),
    [colors]
  );

  const skeletonBg = hexToRgba(colors.text.inverse, 0.1);

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <ShimmerBlock
          width={40}
          height={40}
          borderRadius={20}
          style={{ backgroundColor: skeletonBg }}
        />
        <ShimmerBlock
          width={140}
          height={18}
          borderRadius={4}
          style={{ backgroundColor: skeletonBg }}
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
                    style={{ backgroundColor: skeletonBg }}
                  />
                  <ShimmerBlock
                    width={40}
                    height={22}
                    borderRadius={4}
                    style={{ marginTop: 6, backgroundColor: skeletonBg }}
                  />
                  <ShimmerBlock
                    width={80}
                    height={11}
                    borderRadius={4}
                    style={{ marginTop: 2, backgroundColor: skeletonBg }}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* 3 category sections */}
          <CategorySectionSkeleton skeletonBg={skeletonBg} />
          <CategorySectionSkeleton skeletonBg={skeletonBg} />
          <CategorySectionSkeleton skeletonBg={skeletonBg} />

          <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
};
