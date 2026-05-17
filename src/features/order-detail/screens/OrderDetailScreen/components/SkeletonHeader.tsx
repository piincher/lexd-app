import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { styles } from './OrderDetailSkeleton.styles';

export const SkeletonHeader: React.FC = () => (
  <View style={styles.header}>
    <View style={styles.badgeRow}>
      <ShimmerBlock width={72} height={26} borderRadius={8} />
      <ShimmerBlock width={80} height={26} borderRadius={8} />
    </View>
    <ShimmerBlock width={90} height={12} borderRadius={4} />
  </View>
);
