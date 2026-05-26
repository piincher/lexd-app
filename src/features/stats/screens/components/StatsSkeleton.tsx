/**
 * StatsSkeleton
 * SRP: Shimmer loading skeleton for the stats screen
 */

import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStatsSkeletonStyles } from './StatsSkeleton.styles';
import { StatsHeaderSkeleton } from './StatsHeaderSkeleton';
import { StatsKpiSkeleton } from './StatsKpiSkeleton';
import { StatsStatusSkeleton } from './StatsStatusSkeleton';
import { StatsShippingSkeleton } from './StatsShippingSkeleton';
import { StatsPaymentSkeleton } from './StatsPaymentSkeleton';

export const StatsSkeleton: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStatsSkeletonStyles(colors);

  return (
    <View style={styles.container}>
      <StatsHeaderSkeleton styles={styles} />
      <StatsKpiSkeleton styles={styles} />

      {/* Period selector skeleton */}
      <View style={styles.periodRow}>
        {[0, 1, 2, 3].map((i) => (
          <ShimmerBlock key={i} width={70} height={32} borderRadius={16} />
        ))}
      </View>

      <StatsStatusSkeleton styles={styles} />
      <StatsShippingSkeleton styles={styles} />
      <StatsPaymentSkeleton styles={styles} />
    </View>
  );
};
