import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { styles } from './OrderDetailSkeleton.styles';

export const SkeletonInfoRow: React.FC = () => (
  <View style={styles.infoRow}>
    <View style={styles.rowLeft}>
      <ShimmerBlock width={18} height={18} borderRadius={9} />
      <ShimmerBlock width={100} height={13} borderRadius={4} />
    </View>
    <ShimmerBlock width={80} height={13} borderRadius={4} />
  </View>
);
