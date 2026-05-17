import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { styles } from './OrderDetailSkeleton.styles';

interface OrderSkeletonHeaderProps {
  bg: string;
}

export const OrderSkeletonHeader: React.FC<OrderSkeletonHeaderProps> = ({ bg }) => (
  <View style={styles.header}>
    <ShimmerBlock width={160} height={20} style={{ backgroundColor: bg }} />
    <ShimmerBlock width={80} height={26} borderRadius={12} style={{ backgroundColor: bg }} />
  </View>
);
