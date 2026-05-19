/**
 * OrderCardSkeleton
 * SRP: Skeleton loading placeholder matching OrderCard layout
 * Uses reanimated shimmer effect (same pattern as NotificationSkeleton)
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ShimmerBlock } from '@src/shared/ui';
import { createStyles } from './OrderCardSkeleton.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

const OrderCardSkeletonItem: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
  <View style={styles.card}>
    <View style={styles.statusBar} />

    <View style={styles.content}>
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

      <View style={styles.shippingRow}>
        <ShimmerBlock width={100} height={24} borderRadius={6} />
        <ShimmerBlock width={70} height={12} />
      </View>

      <View style={styles.detailsGrid}>
        <ShimmerBlock width={80} height={12} />
        <ShimmerBlock width={70} height={12} />
        <ShimmerBlock width={90} height={12} />
      </View>

      <View style={styles.progressSection}>
        <ShimmerBlock width={'100%'} height={4} borderRadius={2} />
        <View style={{ height: 6 }} />
        <ShimmerBlock width={140} height={10} />
      </View>
    </View>
  </View>
);};

interface OrderCardSkeletonProps {
  count?: number;
}

export const OrderCardSkeleton: React.FC<OrderCardSkeletonProps> = ({ count = 5 }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.list}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Array.from({ length: count }).map((_, i) => (
          <OrderCardSkeletonItem key={i} />
        ))}
      </ScrollView>
    </Animated.View>
  );
};

/** Compact footer skeleton for loading more pages */
export const OrderCardFooterSkeleton: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <Animated.View entering={FadeIn.duration(200)} style={styles.footer}>
      <OrderCardSkeletonItem />
    </Animated.View>
  );
};

export default OrderCardSkeleton;
