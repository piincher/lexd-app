/**
 * OrderDetailSkeleton
 * Shimmer skeleton matching OrderHeader + OrderSummary + PackageList layout
 */

import React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './OrderDetailSkeleton.styles';
import { OrderSkeletonHeader } from './OrderSkeletonHeader';
import { OrderSkeletonSummary } from './OrderSkeletonSummary';
import { OrderSkeletonPackages } from './OrderSkeletonPackages';

export const OrderDetailSkeleton: React.FC = () => {
  const { colors } = useAppTheme();
  const bg = colors.background.paper;
  const cardBg = colors.background.card;
  const borderColor = colors.border;

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <OrderSkeletonHeader bg={bg} />
      <OrderSkeletonSummary bg={bg} cardBg={cardBg} borderColor={borderColor} />
      <OrderSkeletonPackages bg={bg} cardBg={cardBg} borderColor={borderColor} />
    </Animated.View>
  );
};
