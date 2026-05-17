import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { styles } from './OrderDetailSkeleton.styles';

interface OrderSkeletonPackagesProps {
  bg: string;
  cardBg: string;
  borderColor: string;
}

export const OrderSkeletonPackages: React.FC<OrderSkeletonPackagesProps> = ({ bg, cardBg, borderColor }) => (
  <>
    <ShimmerBlock width={90} height={14} style={{ backgroundColor: bg }} />
    <View style={{ height: 14 }} />
    {Array.from({ length: 3 }).map((_, i) => (
      <View key={i} style={[styles.packageCard, { backgroundColor: cardBg, borderColor }]}>
        <View style={styles.packageHeader}>
          <ShimmerBlock width={120} height={14} style={{ backgroundColor: bg }} />
          <ShimmerBlock width={64} height={22} borderRadius={10} style={{ backgroundColor: bg }} />
        </View>
        <ShimmerBlock width={'85%'} height={12} style={{ backgroundColor: bg }} />
        <View style={{ height: 8 }} />
        <ShimmerBlock width={70} height={11} style={{ backgroundColor: bg }} />
      </View>
    ))}
  </>
);
