/**
 * BadgesScreenSkeleton
 * Full-screen skeleton for the BadgesScreen with dark gradient background
 */

import React from "react";
import { View, ScrollView } from "react-native";
import { ShimmerBlock } from "@src/shared/ui";
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CategorySectionSkeleton } from "../components/CategorySectionSkeleton";
import { createStyles, hexToRgba } from "./BadgesScreenSkeleton.styles";

export const BadgesScreenSkeleton: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const skeletonBg = hexToRgba(colors.text.inverse, 0.1);

  return (
    <>
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

        <CategorySectionSkeleton skeletonBg={skeletonBg} />
        <CategorySectionSkeleton skeletonBg={skeletonBg} />
        <CategorySectionSkeleton skeletonBg={skeletonBg} />

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
};
