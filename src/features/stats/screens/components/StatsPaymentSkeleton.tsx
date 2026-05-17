import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { createStatsSkeletonStyles } from './StatsSkeleton.styles';

interface StatsPaymentSkeletonProps {
  styles: ReturnType<typeof createStatsSkeletonStyles>;
}

export const StatsPaymentSkeleton: React.FC<StatsPaymentSkeletonProps> = ({
  styles,
}) => (
  <View style={styles.card}>
    <ShimmerBlock width={120} height={16} borderRadius={4} />
    <View style={styles.paymentRow}>
      <View style={styles.paymentCard}>
        <ShimmerBlock width={80} height={17} borderRadius={4} />
        <ShimmerBlock width={40} height={10} borderRadius={4} style={{ marginTop: 4 }} />
      </View>
      <View style={styles.paymentCard}>
        <ShimmerBlock width={80} height={17} borderRadius={4} />
        <ShimmerBlock width={40} height={10} borderRadius={4} style={{ marginTop: 4 }} />
      </View>
    </View>
  </View>
);
