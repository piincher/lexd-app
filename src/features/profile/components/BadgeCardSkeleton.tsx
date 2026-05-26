/**
 * BadgeCardSkeleton
 * Skeleton placeholder for a single badge card
 */

import React from "react";
import { View } from "react-native";
import { ShimmerBlock } from "@src/shared/ui";
import { createStyles } from "./BadgeCardSkeleton.styles";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface BadgeCardSkeletonProps {
  skeletonBg: string;
}

export const BadgeCardSkeleton: React.FC<BadgeCardSkeletonProps> = ({ skeletonBg }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
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
};
