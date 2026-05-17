import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { createStatsSkeletonStyles } from './StatsSkeleton.styles';

interface StatsHeaderSkeletonProps {
  styles: ReturnType<typeof createStatsSkeletonStyles>;
}

export const StatsHeaderSkeleton: React.FC<StatsHeaderSkeletonProps> = ({
  styles,
}) => (
  <View style={styles.headerSkeleton}>
    <View style={styles.headerTop}>
      <View>
        <ShimmerBlock width={180} height={22} borderRadius={6} />
        <ShimmerBlock width={120} height={14} borderRadius={4} style={{ marginTop: 6 }} />
      </View>
      <ShimmerBlock width={100} height={30} borderRadius={15} />
    </View>
    <ShimmerBlock width={200} height={12} borderRadius={4} style={{ marginTop: 8 }} />
  </View>
);
