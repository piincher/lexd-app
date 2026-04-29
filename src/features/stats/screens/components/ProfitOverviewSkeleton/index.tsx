import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';

export const ProfitOverviewSkeleton: React.FC = () => (
  <View style={styles.container}>
    <ShimmerBlock width={'100%'} height={80} borderRadius={12} />
    <View style={styles.rows}>
      <View style={styles.row}>
        <ShimmerBlock width={120} height={14} borderRadius={3} />
        <ShimmerBlock width={80} height={14} borderRadius={3} />
      </View>
      <View style={styles.row}>
        <ShimmerBlock width={100} height={14} borderRadius={3} />
        <ShimmerBlock width={70} height={14} borderRadius={3} />
      </View>
      <View style={styles.row}>
        <ShimmerBlock width={140} height={14} borderRadius={3} />
        <ShimmerBlock width={60} height={14} borderRadius={3} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingVertical: 8,
  },
  rows: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
