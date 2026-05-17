import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { createStatsSkeletonStyles } from './StatsSkeleton.styles';

interface StatsKpiSkeletonProps {
  styles: ReturnType<typeof createStatsSkeletonStyles>;
}

export const StatsKpiSkeleton: React.FC<StatsKpiSkeletonProps> = ({
  styles,
}) => (
  <View style={styles.kpiGrid}>
    {[0, 1, 2, 3].map((i) => (
      <View key={i} style={styles.kpiCard}>
        <ShimmerBlock width={38} height={38} borderRadius={11} />
        <ShimmerBlock width={60} height={20} borderRadius={4} style={{ marginTop: 10 }} />
        <ShimmerBlock width={70} height={11} borderRadius={4} style={{ marginTop: 4 }} />
        <ShimmerBlock width={50} height={10} borderRadius={4} style={{ marginTop: 4 }} />
      </View>
    ))}
  </View>
);
