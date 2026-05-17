/**
 * OrderDetailSkeleton
 * Shimmer skeleton matching OrderDetailScreen layout
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { SkeletonHeader } from './SkeletonHeader';
import { SkeletonImageCard } from './SkeletonImageCard';
import { SkeletonQuickStats } from './SkeletonQuickStats';
import { SkeletonTimeline } from './SkeletonTimeline';
import { SkeletonInfoCard } from './SkeletonInfoCard';
import { styles } from './OrderDetailSkeleton.styles';

export const OrderDetailSkeleton: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SkeletonHeader />
        <SkeletonImageCard />
        <SkeletonQuickStats />
        <SkeletonTimeline />
        <SkeletonInfoCard titleWidth={120} rowCount={5} />
        <SkeletonInfoCard titleWidth={100} rowCount={7} />
        <SkeletonInfoCard titleWidth={100} rowCount={4} />
        <View style={styles.bottomPadding} />
      </ScrollView>
    </Animated.View>
  );
};
