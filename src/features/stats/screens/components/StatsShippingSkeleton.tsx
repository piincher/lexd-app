import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { createStatsSkeletonStyles } from './StatsSkeleton.styles';

interface StatsShippingSkeletonProps {
  styles: ReturnType<typeof createStatsSkeletonStyles>;
}

export const StatsShippingSkeleton: React.FC<StatsShippingSkeletonProps> = ({
  styles,
}) => (
  <View style={styles.card}>
    <ShimmerBlock width={140} height={16} borderRadius={4} />
    <ShimmerBlock width="100%" height={6} borderRadius={3} style={{ marginTop: 14 }} />
    <View style={styles.modesRow}>
      <View style={styles.modeItem}>
        <ShimmerBlock width={38} height={38} borderRadius={11} />
        <ShimmerBlock width={30} height={20} borderRadius={4} style={{ marginTop: 4 }} />
        <ShimmerBlock width={50} height={11} borderRadius={4} style={{ marginTop: 4 }} />
      </View>
      <ShimmerBlock width={1} height={60} borderRadius={0} />
      <View style={styles.modeItem}>
        <ShimmerBlock width={38} height={38} borderRadius={11} />
        <ShimmerBlock width={30} height={20} borderRadius={4} style={{ marginTop: 4 }} />
        <ShimmerBlock width={50} height={11} borderRadius={4} style={{ marginTop: 4 }} />
      </View>
    </View>
  </View>
);
