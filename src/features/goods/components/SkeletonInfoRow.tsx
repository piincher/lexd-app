import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { styles } from './GoodsDetailSkeleton.styles';

export const SkeletonInfoRow: React.FC = () => (
  <View style={styles.infoRow}>
    <ShimmerBlock width={120} height={13} borderRadius={4} />
    <ShimmerBlock width={80} height={13} borderRadius={4} />
  </View>
);
