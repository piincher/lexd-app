import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Surface } from 'react-native-paper';
import { COLORS } from '@src/constants/Colors';

const { width } = Dimensions.get('window');

const SkeletonItem: React.FC<{ width: number | string; height: number; borderRadius?: number; marginBottom?: number }> = ({
  width: w,
  height,
  borderRadius = 4,
  marginBottom = 0,
}) => (
  <View
    style={[
      styles.skeleton,
      { width: w, height, borderRadius, marginBottom },
    ]}
  />
);

export const OrderDetailSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header Skeleton */}
      <Surface style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.avatarSection}>
            <SkeletonItem width={50} height={50} borderRadius={12} />
            <View style={styles.textSection}>
              <SkeletonItem width={150} height={18} marginBottom={8} />
              <SkeletonItem width={100} height={14} />
            </View>
          </View>
          <SkeletonItem width={80} height={28} borderRadius={14} />
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <SkeletonItem width={100} height={16} />
          <SkeletonItem width={120} height={20} />
        </View>
      </Surface>

      {/* Payment Skeleton */}
      <Surface style={styles.card}>
        <SkeletonItem width={150} height={18} marginBottom={16} />
        <View style={styles.paymentStatus}>
          <SkeletonItem width={50} height={50} borderRadius={25} marginBottom={0} />
          <View style={styles.paymentText}>
            <SkeletonItem width={100} height={16} marginBottom={8} />
            <SkeletonItem width={150} height={22} />
          </View>
        </View>
        <View style={styles.divider} />
        <SkeletonItem width="100%" height={40} marginBottom={12} />
        <SkeletonItem width="100%" height={40} />
      </Surface>

      {/* Info Skeleton */}
      <Surface style={styles.card}>
        <SkeletonItem width={150} height={18} marginBottom={16} />
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={styles.infoRow}>
            <SkeletonItem width={40} height={40} borderRadius={10} />
            <View style={styles.infoText}>
              <SkeletonItem width={80} height={14} marginBottom={4} />
              <SkeletonItem width={150} height={16} />
            </View>
          </View>
        ))}
      </Surface>

      {/* Timeline Skeleton */}
      <Surface style={styles.card}>
        <SkeletonItem width={150} height={18} marginBottom={16} />
        <View style={styles.timeline}>
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={styles.timelineItem}>
              <SkeletonItem width={24} height={24} borderRadius={12} />
              <SkeletonItem width={120} height={16} />
            </View>
          ))}
        </View>
      </Surface>

      {/* Actions Skeleton */}
      <View style={styles.actions}>
        <SkeletonItem width="100%" height={48} borderRadius={10} marginBottom={12} />
        <SkeletonItem width="100%" height={48} borderRadius={10} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F5F7FA',
  },
  card: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFF',
  },
  skeleton: {
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSection: {
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    marginLeft: 14,
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
    flex: 1,
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  actions: {
    padding: 12,
  },
});

export default OrderDetailSkeleton;
