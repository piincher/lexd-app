/**
 * OrderCardSkeleton
 * SRP: Skeleton loading placeholder matching OrderCard layout
 * Uses reanimated shimmer effect (same pattern as NotificationSkeleton)
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const SKELETON_BG = '#E8EFF5';

const ShimmerBlock: React.FC<{
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
}> = ({ width, height, borderRadius = 4 }) => {
  const shimmer = useSharedValue(0);

  React.useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200 }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(shimmer.value, [0, 1], [-200, 400]) }],
  }));

  return (
    <View style={[styles.block, { width, height, borderRadius }]}>
      <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const OrderCardSkeletonItem: React.FC = () => (
  <View style={styles.card}>
    {/* Status bar */}
    <View style={styles.statusBar} />

    <View style={styles.content}>
      {/* Header: Avatar + Name + Status badge */}
      <View style={styles.header}>
        <View style={styles.clientSection}>
          <ShimmerBlock width={44} height={44} borderRadius={22} />
          <View style={styles.clientInfo}>
            <ShimmerBlock width={120} height={14} />
            <View style={{ height: 6 }} />
            <ShimmerBlock width={80} height={10} />
          </View>
        </View>
        <ShimmerBlock width={76} height={26} borderRadius={16} />
      </View>

      {/* Shipping mode row */}
      <View style={styles.shippingRow}>
        <ShimmerBlock width={100} height={24} borderRadius={6} />
        <ShimmerBlock width={70} height={12} />
      </View>

      {/* Details grid */}
      <View style={styles.detailsGrid}>
        <ShimmerBlock width={80} height={12} />
        <ShimmerBlock width={70} height={12} />
        <ShimmerBlock width={90} height={12} />
      </View>

      {/* Progress bar */}
      <View style={styles.progressSection}>
        <ShimmerBlock width={'100%'} height={4} borderRadius={2} />
        <View style={{ height: 6 }} />
        <ShimmerBlock width={140} height={10} />
      </View>
    </View>
  </View>
);

interface OrderCardSkeletonProps {
  count?: number;
}

export const OrderCardSkeleton: React.FC<OrderCardSkeletonProps> = ({ count = 5 }) => (
  <Animated.View entering={FadeIn.duration(300)} style={styles.list}>
    <ScrollView showsVerticalScrollIndicator={false}>
      {Array.from({ length: count }).map((_, i) => (
        <OrderCardSkeletonItem key={i} />
      ))}
    </ScrollView>
  </Animated.View>
);

/** Compact footer skeleton for loading more pages */
export const OrderCardFooterSkeleton: React.FC = () => (
  <Animated.View entering={FadeIn.duration(200)} style={styles.footer}>
    <OrderCardSkeletonItem />
  </Animated.View>
);

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  footer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  statusBar: {
    width: 4,
    backgroundColor: SKELETON_BG,
  },
  content: {
    flex: 1,
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  clientSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  clientInfo: {
    flex: 1,
    marginLeft: 10,
  },
  shippingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 10,
  },
  progressSection: {
    marginTop: 10,
  },
  block: {
    backgroundColor: SKELETON_BG,
    overflow: 'hidden',
  },
});

export default OrderCardSkeleton;
