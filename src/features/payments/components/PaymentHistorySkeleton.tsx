import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';

interface PaymentHistorySkeletonProps {
  count?: number;
}

const SkeletonCard: React.FC = () => (
  <View style={styles.card}>
    {/* Top row: method icon + method name + amount */}
    <View style={styles.topRow}>
      <View style={styles.methodGroup}>
        <ShimmerBlock width={40} height={40} borderRadius={8} />
        <ShimmerBlock width={100} height={14} borderRadius={4} />
      </View>
      <ShimmerBlock width={90} height={18} borderRadius={4} />
    </View>

    {/* Middle row: date + status chip */}
    <View style={styles.middleRow}>
      <ShimmerBlock width={120} height={12} borderRadius={4} />
      <ShimmerBlock width={80} height={24} borderRadius={6} />
    </View>

    {/* Bottom row: transaction ref */}
    <View style={styles.bottomRow}>
      <ShimmerBlock width={14} height={14} borderRadius={7} />
      <ShimmerBlock width={160} height={12} borderRadius={4} />
    </View>
  </View>
);

export const PaymentHistorySkeleton: React.FC<PaymentHistorySkeletonProps> = ({
  count = 4,
}) => {
  return (
    <View style={styles.list}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    borderRadius: 12,
    elevation: 2,
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  methodGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
});
