/**
 * CategorySectionSkeleton
 * Skeleton placeholder for a badge category section with header and grid
 */

import React from "react";
import { View } from "react-native";
import { ShimmerBlock } from "@src/shared/ui";
import { BadgeCardSkeleton } from "./BadgeCardSkeleton";
import { styles } from "./CategorySectionSkeleton.styles";

interface CategorySectionSkeletonProps {
  skeletonBg: string;
}

export const CategorySectionSkeleton: React.FC<CategorySectionSkeletonProps> = ({ skeletonBg }) => (
  <View style={styles.categorySection}>
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

    <View style={styles.badgeGrid}>
      <BadgeCardSkeleton skeletonBg={skeletonBg} />
      <BadgeCardSkeleton skeletonBg={skeletonBg} />
      <BadgeCardSkeleton skeletonBg={skeletonBg} />
      <BadgeCardSkeleton skeletonBg={skeletonBg} />
    </View>
  </View>
);
