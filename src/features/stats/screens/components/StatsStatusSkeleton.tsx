import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { createStatsSkeletonStyles } from './StatsSkeleton.styles';

interface StatsStatusSkeletonProps {
  styles: ReturnType<typeof createStatsSkeletonStyles>;
}

export const StatsStatusSkeleton: React.FC<StatsStatusSkeletonProps> = ({
  styles,
}) => (
  <View style={styles.card}>
    <ShimmerBlock width={160} height={16} borderRadius={4} />
    {[0, 1, 2, 3].map((i) => (
      <View key={i} style={styles.statusRow}>
        <View style={styles.statusRowLeft}>
          <ShimmerBlock width={22} height={22} borderRadius={7} />
          <ShimmerBlock width={70} height={13} borderRadius={4} />
        </View>
        <ShimmerBlock width="100%" height={5} borderRadius={3} style={{ marginTop: 6 }} />
      </View>
    ))}
  </View>
);
