import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { styles } from './OrderDetailSkeleton.styles';

interface OrderSkeletonSummaryProps {
  bg: string;
  cardBg: string;
  borderColor: string;
}

export const OrderSkeletonSummary: React.FC<OrderSkeletonSummaryProps> = ({ bg, cardBg, borderColor }) => (
  <View style={[styles.summaryCard, { backgroundColor: cardBg, borderColor }]}>
    <View style={styles.summaryRow}>
      <View style={styles.summaryItem}>
        <ShimmerBlock width={70} height={10} style={{ backgroundColor: bg }} />
        <View style={{ height: 8 }} />
        <ShimmerBlock width={50} height={18} style={{ backgroundColor: bg }} />
      </View>
      <View style={[styles.summaryDivider, { backgroundColor: borderColor }]} />
      <View style={styles.summaryItem}>
        <ShimmerBlock width={40} height={10} style={{ backgroundColor: bg }} />
        <View style={{ height: 8 }} />
        <ShimmerBlock width={30} height={18} style={{ backgroundColor: bg }} />
      </View>
    </View>
  </View>
);
